export type DocumentCategory = 
  | 'Study Materials'
  | 'Certificates'
  | 'Notes'
  | 'Projects'
  | 'Academic Documents'
  | 'Resume'
  | 'Other'
  | 'School Documents'
  | 'Madhyamik'
  | 'Higher Secondary'
  | 'College Documents'
  | 'Mark Sheets'
  | 'ID Cards'
  | 'Other Documents';

export type SupportedFileType = 'pdf' | 'jpg' | 'jpeg' | 'png' | 'webp';

export interface UserProfile {
  id?: string;
  name: string;
  headline: string;
  shortBio: string;
  personalIntro: string;
  careerGoal: string;
  profilePhoto: string;
  college: string;
  course: string;
  department: string;
  yearSemester: string;
  passingYear: string;
  cgpa: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    twitter?: string;
    leetcode?: string;
  };
  resumeUrl?: string;
  resumeFileName?: string;
  resumeUpdatedAt?: string;
  stats?: {
    projectsCount: number;
    certificatesCount: number;
    codingProblemsCount: number;
    cgpaScore: string;
  };
}

export interface EducationItem {
  id: string;
  level: 'School' | 'Madhyamik (10th)' | 'Higher Secondary (12th)' | 'Undergraduate (B.Tech)' | 'Undergraduate (3rd Year CSE)' | 'Undergraduate' | 'Other' | string;
  institution: string;
  boardOrUniversity: string;
  degreeOrStream: string;
  duration: string;
  scoreOrCgpa: string;
  passingYear: string;
  location: string;
  description: string;
  highlights: string[];
}

export type SkillCategory = 
  | 'Programming'
  | 'Web Development'
  | 'Database'
  | 'Computer Science'
  | 'Tools'
  | 'Cyber Security';

export type SkillLevel = 'Learning' | 'Intermediate' | 'Familiar';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory | string;
  proficiency: number; // 0 - 100
  levelLabel: SkillLevel | string;
  tags?: string[];
  overview?: string;
  keyTopics?: string[];
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
  status: 'Completed' | 'In Progress' | 'Maintained';
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  certificateId: string;
  credentialUrl: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
  skillsLearned: string[];
  description?: string;
  category?: string;
}

export interface VaultDocument {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  storagePath: string;
  category: DocumentCategory;
  fileType: SupportedFileType;
  fileSize: number; // in bytes
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface LearningHubItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'In Progress' | 'Active Focus' | 'Exploring' | 'Practicing';
  progress: number;
  iconName: string;
  keyConcepts: string[];
}

export interface DeveloperNetworkProfile {
  id: string;
  platform: 'GitHub' | 'LeetCode' | 'HackerRank' | 'CodeChef' | 'GeeksforGeeks';
  username: string;
  profileUrl: string;
  metrics: string;
  badgeText: string;
  color: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: 'Completed' | 'Current' | 'Upcoming';
}

export interface AchievementItem {
  id: string;
  emoji: string;
  title: string;
  category: string;
  description: string;
  date?: string;
  badge?: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  content: string[];
  tags: string[];
}

export interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    isAnonymous?: boolean;
  } | null;
  loading: boolean;
}
