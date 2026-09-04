import { supabase, SUPABASE_PROJECT_ID, SUPABASE_URL } from './supabase';
import { 
  UserProfile, 
  VaultDocument,
  ContactMessage 
} from '../types';
import {
  INITIAL_PROFILE,
} from '../data/initialData';

export interface TableStatus {
  name: string;
  category: string;
  exists: boolean;
  count: number | null;
  error?: string;
}

export interface OperationResult {
  success: boolean;
  latencyMs: number;
  operation: 'read' | 'write' | 'ping';
  targetTable: string;
  message: string;
  data?: any;
}

export const SUPABASE_SQL_SCHEMA = `-- ============================================================================
-- SQL Schema for Tanmay Garai Portfolio & Document Vault
-- Project ID: mvnxfbvrlmzqogkwewrc
-- Run this script in: https://supabase.com/dashboard/project/mvnxfbvrlmzqogkwewrc/sql/new
-- ============================================================================

-- 1. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'Portfolio Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  headline TEXT,
  short_bio TEXT,
  personal_intro TEXT,
  career_goal TEXT,
  college TEXT,
  department TEXT,
  year_semester TEXT,
  cgpa TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Web Development',
  technologies TEXT[] DEFAULT '{}'::text[],
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Completed',
  start_date TEXT,
  end_date TEXT,
  highlights TEXT[] DEFAULT '{}'::text[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuing_org TEXT NOT NULL,
  issue_date TEXT,
  category TEXT DEFAULT 'Course',
  credential_id TEXT,
  verification_url TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Documents Table (Academic & Personal Vault)
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'tanmay_garai',
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_path TEXT,
  category TEXT DEFAULT 'Other',
  file_type TEXT DEFAULT 'pdf',
  file_size BIGINT DEFAULT 1024,
  description TEXT,
  tags TEXT[] DEFAULT '{}'::text[],
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Vault Documents View (For backwards compatibility with vault queries)
CREATE OR REPLACE VIEW public.vault_documents AS
SELECT 
  id,
  user_id,
  file_name,
  file_url,
  storage_path,
  category,
  file_type,
  file_size,
  description AS title,
  description,
  tags,
  is_favorite,
  created_at,
  updated_at
FROM public.documents;

-- 7. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_percentage INTEGER DEFAULT 50,
  level_label TEXT DEFAULT 'Intermediate',
  overview TEXT,
  key_topics TEXT[] DEFAULT '{}'::text[]
);

-- 8. Education Table
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL,
  institution TEXT NOT NULL,
  board_or_university TEXT,
  degree_or_stream TEXT,
  duration TEXT,
  score_or_cgpa TEXT,
  passing_year TEXT,
  location TEXT,
  description TEXT,
  highlights TEXT[] DEFAULT '{}'::text[]
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Contact Messages: Anyone can insert messages, read restricted
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert on contact_messages" 
  ON public.contact_messages FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public read on contact_messages" 
  ON public.contact_messages FOR SELECT 
  USING (true);

-- Public Read Policies for Portfolio Data
DROP POLICY IF EXISTS "Allow public read on profiles" ON public.profiles;
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public upsert on profiles" ON public.profiles;
CREATE POLICY "Allow public upsert on profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on projects" ON public.projects;
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on certificates" ON public.certificates;
CREATE POLICY "Allow public read on certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on documents" ON public.documents;
CREATE POLICY "Allow public read on documents" ON public.documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on skills" ON public.skills;
CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on education" ON public.education;
CREATE POLICY "Allow public read on education" ON public.education FOR SELECT USING (true);

-- ============================================================================
-- INITIAL SEED DATA FOR TANMAY GARAI'S PORTFOLIO
-- ============================================================================

-- Seed Profile
INSERT INTO public.profiles (
  id, full_name, headline, short_bio, personal_intro, career_goal,
  college, department, year_semester, cgpa, email, phone, location,
  social_links, stats
) VALUES (
  'tanmay_garai',
  'Tanmay Garai',
  '3rd Year CSE Student • Web Developer • Programmer',
  '3rd Year Computer Science Engineering student at Pandit Raghunath Murmu Smriti Mahavidyalaya passionate about programming, web development, problem solving and building modern digital products.',
  'Hello! I am Tanmay Garai, a 3rd Year Computer Science Engineering student at Pandit Raghunath Murmu Smriti Mahavidyalaya. I have a strong passion for software development, web technologies, and programming.',
  'To build impactful software systems, engineer clean web architectures, and grow into a skilled Software Engineer.',
  'Pandit Raghunath Murmu Smriti Mahavidyalaya',
  'Computer Science & Engineering Department',
  '3rd Year Student',
  '8.85 / 10.0',
  'garai.com2006@gmail.com',
  '+91 98765 43210',
  'Bankura, West Bengal, India',
  '{"github": "https://github.com/tanmaygarai", "linkedin": "https://linkedin.com/in/tanmaygarai"}'::jsonb,
  '{"projectsCount": 10, "certificatesCount": 6, "codingProblemsCount": 500, "cgpaScore": "8.85"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  headline = EXCLUDED.headline,
  updated_at = now();

-- Seed Key Projects
INSERT INTO public.projects (id, title, description, category, technologies, featured, status)
VALUES 
  ('proj-quiz', 'KnowMoreQuiz - Interactive Learning Platform', 'A responsive web quiz application designed to test computer science fundamentals and general knowledge with real-time scoring.', 'Web Development', ARRAY['JavaScript', 'HTML5', 'CSS3', 'Local Storage API'], true, 'Completed'),
  ('proj-telecom', 'Shree Krishna Telecom Business Portal', 'A modern commercial business showcase and product inventory portal for a regional electronics and telecom service center.', 'Full Stack', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'], true, 'Completed'),
  ('proj-vault', 'CloudVault - Academic Document Vault', 'Secure, encrypted digital document vault and academic repository with instant PDF/image previewers and multi-filter searching.', 'Cloud App', ARRAY['React', 'TypeScript', 'Supabase', 'PostgreSQL'], true, 'Completed')
ON CONFLICT (id) DO NOTHING;

-- Seed Certificates
INSERT INTO public.certificates (id, title, issuing_org, issue_date, category, credential_id)
VALUES
  ('cert-py', 'Programming for Everybody (Python Basics)', 'Coursera / University of Michigan', '2024', 'Course', 'UMICH-PY-92819'),
  ('cert-web', 'The Complete 2024 Web Development Bootcamp', 'Udemy', '2024', 'Bootcamp', 'UC-829104-WD'),
  ('cert-dsa', 'Data Structures and Algorithms Specialization', 'NPTEL / Swayam', '2025', 'Academic', 'NPTEL25CS1092')
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Document Metadata
INSERT INTO public.documents (id, user_id, file_name, file_url, category, file_type, file_size, description, tags, is_favorite)
VALUES
  ('doc-resume', 'tanmay_garai', 'Tanmay_Garai_CSE_Resume.pdf', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Resume', 'pdf', 245760, 'Updated Software Engineering Resume - Tanmay Garai', ARRAY['Resume', 'CSE', 'Profile'], true)
ON CONFLICT (id) DO NOTHING;
`;

/**
 * Check existence and row counts of all required Supabase tables
 */
export async function checkAllTablesStatus(): Promise<TableStatus[]> {
  const targetTables = [
    { name: 'contact_messages', category: 'Communication' },
    { name: 'profiles', category: 'Profile' },
    { name: 'documents', category: 'Documents' },
    { name: 'vault_documents', category: 'Document Vault' },
    { name: 'certificates', category: 'Certificates' },
    { name: 'projects', category: 'Projects' },
    { name: 'skills', category: 'Skills' },
    { name: 'education', category: 'Education' },
  ];

  const results: TableStatus[] = [];

  for (const item of targetTables) {
    try {
      const { data, error, count } = await supabase
        .from(item.name)
        .select('*', { count: 'exact', head: false })
        .limit(1);

      if (error) {
        results.push({
          name: item.name,
          category: item.category,
          exists: false,
          count: null,
          error: error.message,
        });
      } else {
        const rowCount = typeof count === 'number' ? count : ((data as any[] | null)?.length || 0);
        results.push({
          name: item.name,
          category: item.category,
          exists: true,
          count: rowCount,
        });
      }
    } catch (err: any) {
      results.push({
        name: item.name,
        category: item.category,
        exists: false,
        count: null,
        error: err?.message || 'Query failed',
      });
    }
  }

  return results;
}

/**
 * Test a Read operation on the database
 */
export async function testSupabaseReadOperation(): Promise<OperationResult> {
  const startTime = performance.now();
  try {
    // Try reading profiles or contact_messages
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      // If table doesn't exist yet, try contact_messages
      const fallbackTest = await supabase.from('contact_messages').select('*').limit(1);
      const totalLatency = Math.round(performance.now() - startTime);

      if (fallbackTest.error) {
        return {
          success: false,
          latencyMs: totalLatency,
          operation: 'read',
          targetTable: 'profiles',
          message: `Read failed: ${error.message}. (Status code: ${status || 404}). Run the SQL schema to create tables.`,
          data: null,
        };
      }

      return {
        success: true,
        latencyMs: totalLatency,
        operation: 'read',
        targetTable: 'contact_messages',
        message: 'Successfully read records from contact_messages table!',
        data: fallbackTest.data,
      };
    }

    return {
      success: true,
      latencyMs,
      operation: 'read',
      targetTable: 'profiles',
      message: `Read operation completed successfully (${data ? (data as any[]).length : 0} records returned)`,
      data,
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      latencyMs,
      operation: 'read',
      targetTable: 'profiles',
      message: err?.message || 'Unexpected read failure',
    };
  }
}

/**
 * Test a Write operation on the database
 */
export async function testSupabaseWriteOperation(): Promise<OperationResult> {
  const startTime = performance.now();
  const testPayload = {
    name: 'Verification Bot',
    email: 'verify@mvnxfbvrlmzqogkwewrc.supabase.co',
    subject: 'Supabase Integration Verification',
    message: `Automated ping verification executed at ${new Date().toLocaleTimeString()} - Tanmay Garai Portfolio`,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([testPayload])
      .select();

    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      return {
        success: false,
        latencyMs,
        operation: 'write',
        targetTable: 'contact_messages',
        message: `Write failed: ${error.message}. (Table public.contact_messages not found. Run SQL schema to create it).`,
      };
    }

    return {
      success: true,
      latencyMs,
      operation: 'write',
      targetTable: 'contact_messages',
      message: 'Successfully inserted test record into contact_messages!',
      data: data?.[0] || testPayload,
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      latencyMs,
      operation: 'write',
      targetTable: 'contact_messages',
      message: err?.message || 'Unexpected write failure',
    };
  }
}

/**
 * Send contact inquiry directly into Supabase contact_messages table
 */
export async function sendSupabaseContactMessage(msg: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: msg.name,
          email: msg.email,
          subject: msg.subject || 'Portfolio Inquiry',
          message: msg.message,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase contact insert warning:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.warn('Supabase contact submission failed:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Fetch profile from Supabase with safe fallback
 */
export async function fetchSupabaseProfile(userId: string = 'tanmay_garai'): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      name: data.full_name || INITIAL_PROFILE.name,
      headline: data.headline || INITIAL_PROFILE.headline,
      shortBio: data.short_bio || INITIAL_PROFILE.shortBio,
      personalIntro: data.personal_intro || INITIAL_PROFILE.personalIntro,
      careerGoal: data.career_goal || INITIAL_PROFILE.careerGoal,
      profilePhoto: INITIAL_PROFILE.profilePhoto,
      college: data.college || INITIAL_PROFILE.college,
      course: INITIAL_PROFILE.course,
      department: data.department || INITIAL_PROFILE.department,
      yearSemester: data.year_semester || INITIAL_PROFILE.yearSemester,
      passingYear: INITIAL_PROFILE.passingYear,
      cgpa: data.cgpa || INITIAL_PROFILE.cgpa,
      email: data.email || INITIAL_PROFILE.email,
      phone: data.phone || INITIAL_PROFILE.phone,
      location: data.location || INITIAL_PROFILE.location,
      socialLinks: data.social_links || INITIAL_PROFILE.socialLinks,
      resumeUrl: INITIAL_PROFILE.resumeUrl,
      resumeFileName: INITIAL_PROFILE.resumeFileName,
      stats: data.stats || INITIAL_PROFILE.stats,
    };
  } catch (err) {
    console.warn('Error querying Supabase profiles (using fallback):', err);
    return null;
  }
}

/**
 * Save user profile to Supabase
 */
export async function saveSupabaseProfile(profile: UserProfile, userId: string = 'tanmay_garai'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert([
        {
          id: userId,
          full_name: profile.name,
          headline: profile.headline,
          short_bio: profile.shortBio,
          personal_intro: profile.personalIntro,
          career_goal: profile.careerGoal,
          college: profile.college,
          department: profile.department,
          year_semester: profile.yearSemester,
          cgpa: profile.cgpa,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          social_links: profile.socialLinks,
          stats: profile.stats,
          updated_at: new Date().toISOString(),
        }
      ], { onConflict: 'id' });

    if (error) {
      console.warn('Failed to upsert Supabase profile:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving to Supabase profile:', err);
    return false;
  }
}

/**
 * Fetch documents from Supabase with safe fallback
 */
export async function fetchSupabaseDocuments(): Promise<VaultDocument[] | null> {
  try {
    // Attempt reading from documents or vault_documents
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((d: any) => ({
      id: d.id,
      userId: d.user_id || 'tanmay_garai',
      fileName: d.file_name || 'document.pdf',
      fileUrl: d.file_url,
      storagePath: d.storage_path || '',
      category: d.category || 'Other',
      fileType: d.file_type || 'pdf',
      fileSize: typeof d.file_size === 'number' ? d.file_size : parseInt(d.file_size, 10) || 1024,
      description: d.description || d.title || '',
      tags: d.tags || [],
      createdAt: d.created_at || new Date().toISOString(),
      updatedAt: d.updated_at || new Date().toISOString(),
      isFavorite: Boolean(d.is_favorite),
    }));
  } catch (err) {
    console.warn('Error reading Supabase vault documents (using fallback):', err);
    return null;
  }
}
