import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import { SupportedFileType } from '../types';

export interface UploadProgressCallback {
  (progress: number): void;
}

export interface UploadResult {
  fileUrl: string;
  storagePath: string;
  fileSize: number;
  fileType: SupportedFileType;
  isLocalFallback?: boolean;
}

const SUPPORTED_EXTENSIONS: Record<string, SupportedFileType> = {
  pdf: 'pdf',
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png',
  webp: 'webp',
};

export function validateFile(file: File): { valid: boolean; error?: string; fileType?: SupportedFileType } {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const fileType = SUPPORTED_EXTENSIONS[extension];

  if (!fileType) {
    return {
      valid: false,
      error: `Unsupported file type ".${extension}". Only PDF, JPG, JPEG, PNG, and WEBP files are allowed.`,
    };
  }

  // Max 15MB limit
  const maxBytes = 15 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File is too large (${formatFileSize(file.size)}). Maximum allowed size is 15MB.`,
    };
  }

  return { valid: true, fileType };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads file to Firebase Storage under /users/{userId}/{folder}/
 * If Firebase Storage is not yet initialized on the project, safely falls back
 * to a local data URL so the user can test the vault seamlessly.
 */
export async function uploadVaultFile(
  userId: string,
  folder: 'documents' | 'certificates' | 'resume',
  file: File,
  onProgress?: UploadProgressCallback
): Promise<UploadResult> {
  const validation = validateFile(file);
  if (!validation.valid || !validation.fileType) {
    throw new Error(validation.error || 'Invalid file');
  }

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `users/${userId}/${folder}/${timestamp}_${safeName}`;

  try {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type || 'application/octet-stream',
    });

    return await new Promise<UploadResult>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(Math.min(100, Math.round(progress)));
          }
        },
        async (error) => {
          console.warn('Firebase Storage upload encountered error, activating seamless fallback:', error.message);
          // Fallback to data URL
          try {
            if (onProgress) onProgress(80);
            const dataUrl = await readFileAsDataUrl(file);
            if (onProgress) onProgress(100);
            resolve({
              fileUrl: dataUrl,
              storagePath,
              fileSize: file.size,
              fileType: validation.fileType!,
              isLocalFallback: true,
            });
          } catch (fallbackError) {
            reject(fallbackError);
          }
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);
            resolve({
              fileUrl: downloadUrl,
              storagePath,
              fileSize: file.size,
              fileType: validation.fileType!,
              isLocalFallback: false,
            });
          } catch (urlError) {
            console.warn('Failed to retrieve download URL, using data URL fallback:', urlError);
            const dataUrl = await readFileAsDataUrl(file);
            resolve({
              fileUrl: dataUrl,
              storagePath,
              fileSize: file.size,
              fileType: validation.fileType!,
              isLocalFallback: true,
            });
          }
        }
      );
    });
  } catch (err) {
    console.warn('Direct storage ref creation error, using fallback:', err);
    if (onProgress) onProgress(50);
    const dataUrl = await readFileAsDataUrl(file);
    if (onProgress) onProgress(100);
    return {
      fileUrl: dataUrl,
      storagePath,
      fileSize: file.size,
      fileType: validation.fileType,
      isLocalFallback: true,
    };
  }
}

export async function deleteVaultFile(storagePath: string): Promise<void> {
  if (!storagePath) return;
  try {
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn('Could not delete file from Firebase storage (might be fallback or already removed):', err);
  }
}

export function downloadFile(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
