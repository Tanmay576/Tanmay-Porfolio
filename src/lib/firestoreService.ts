import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  UserProfile, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  VaultDocument,
  ContactMessage 
} from '../types';
import {
  INITIAL_PROFILE,
  INITIAL_EDUCATION,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATES,
  INITIAL_SAMPLE_DOCS,
} from '../data/initialData';

// --- PROFILE SERVICE ---
const PROFILE_DOC_ID = 'main_profile';

export async function fetchUserProfile(userId?: string): Promise<UserProfile> {
  try {
    const docId = userId && userId !== 'guest' ? `user_${userId}` : PROFILE_DOC_ID;
    const docRef = doc(db, 'profile', docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...INITIAL_PROFILE, ...(snap.data() as UserProfile) };
    }
  } catch (error) {
    console.warn('Error fetching user profile from Firestore, using initial data:', error);
  }
  return INITIAL_PROFILE;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const docRef = doc(db, 'profile', PROFILE_DOC_ID);
    await setDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    throw error;
  }
}

// --- EDUCATION SERVICE ---
export async function fetchEducationList(): Promise<EducationItem[]> {
  try {
    const colRef = collection(db, 'education');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: EducationItem[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as EducationItem);
      });
      return items;
    }
  } catch (error) {
    console.warn('Error fetching education from Firestore, using initial data:', error);
  }
  return INITIAL_EDUCATION;
}

// --- SKILLS SERVICE ---
export async function fetchSkillsList(): Promise<SkillItem[]> {
  try {
    const colRef = collection(db, 'skills');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: SkillItem[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as SkillItem);
      });
      return items;
    }
  } catch (error) {
    console.warn('Error fetching skills from Firestore, using initial data:', error);
  }
  return INITIAL_SKILLS;
}

// --- PROJECTS SERVICE ---
export async function fetchProjectsList(): Promise<ProjectItem[]> {
  try {
    const colRef = collection(db, 'projects');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: ProjectItem[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as ProjectItem);
      });
      return items;
    }
  } catch (error) {
    console.warn('Error fetching projects from Firestore, using initial data:', error);
  }
  return INITIAL_PROJECTS;
}

export async function saveProject(project: Omit<ProjectItem, 'id'>, existingId?: string): Promise<string> {
  if (existingId) {
    const docRef = doc(db, 'projects', existingId);
    await updateDoc(docRef, { ...project, updatedAt: new Date().toISOString() });
    return existingId;
  } else {
    const colRef = collection(db, 'projects');
    const docRef = await addDoc(colRef, { ...project, createdAt: new Date().toISOString() });
    return docRef.id;
  }
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}

// --- CERTIFICATES SERVICE ---
export async function fetchCertificatesList(): Promise<CertificateItem[]> {
  try {
    const colRef = collection(db, 'certificates');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: CertificateItem[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as CertificateItem);
      });
      return items;
    }
  } catch (error) {
    console.warn('Error fetching certificates from Firestore, using initial data:', error);
  }
  return INITIAL_CERTIFICATES;
}

export async function saveCertificate(cert: Omit<CertificateItem, 'id'>, existingId?: string): Promise<string> {
  if (existingId) {
    const docRef = doc(db, 'certificates', existingId);
    await updateDoc(docRef, { ...cert, updatedAt: new Date().toISOString() });
    return existingId;
  } else {
    const colRef = collection(db, 'certificates');
    const docRef = await addDoc(colRef, { ...cert, createdAt: new Date().toISOString() });
    return docRef.id;
  }
}

export async function deleteCertificate(id: string): Promise<void> {
  const docRef = doc(db, 'certificates', id);
  await deleteDoc(docRef);
}

// --- PRIVATE DOCUMENTS SERVICE ---
export async function fetchUserDocuments(userId: string): Promise<VaultDocument[]> {
  if (!userId) return [];
  try {
    const colRef = collection(db, 'documents');
    const q = query(colRef, where('userId', '==', userId));
    const snap = await getDocs(q);
    
    if (!snap.empty) {
      const items: VaultDocument[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as VaultDocument);
      });
      // Sort newest first
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // If user is demo or newly registered, seed with demo documents mapped to this userId
      return INITIAL_SAMPLE_DOCS.map((doc) => ({
        ...doc,
        userId: userId,
      }));
    }
  } catch (error) {
    console.warn('Error fetching user documents from Firestore:', error);
    // Return sample docs with user id so vault is immediately testable
    return INITIAL_SAMPLE_DOCS.map((doc) => ({
      ...doc,
      userId: userId,
    }));
  }
}

export async function addVaultDocument(
  docData: Omit<VaultDocument, 'id'>
): Promise<VaultDocument> {
  try {
    const colRef = collection(db, 'documents');
    const ref = await addDoc(colRef, {
      ...docData,
      createdAt: docData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return {
      ...docData,
      id: ref.id,
    };
  } catch (error) {
    console.warn('Failed to save document to Firestore directly, generating local ID:', error);
    return {
      ...docData,
      id: 'doc-' + Date.now(),
    };
  }
}

export async function updateVaultDocument(
  id: string,
  updates: Partial<VaultDocument>
): Promise<void> {
  try {
    const docRef = doc(db, 'documents', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Failed to update document in Firestore:', error);
  }
}

export async function deleteVaultDocument(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'documents', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('Failed to delete document from Firestore:', error);
  }
}

// --- CONTACT MESSAGES ---
export async function sendContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>
): Promise<void> {
  const colRef = collection(db, 'messages');
  await addDoc(colRef, {
    ...data,
    createdAt: new Date().toISOString(),
    read: false,
  });
}
