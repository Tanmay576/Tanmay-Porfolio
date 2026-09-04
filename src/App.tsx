import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TechBackground } from './components/common/TechBackground';
import { CustomCursor } from './components/common/CustomCursor';

import { HeroSection } from './components/portfolio/HeroSection';
import { DashboardStatsSection } from './components/portfolio/DashboardStatsSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { CurrentlyLearningSection } from './components/portfolio/CurrentlyLearningSection';
import { DeveloperNetworkSection } from './components/portfolio/DeveloperNetworkSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { AchievementsSection } from './components/portfolio/AchievementsSection';
import { NotesBlogSection } from './components/portfolio/NotesBlogSection';
import { CertificatesSection } from './components/portfolio/CertificatesSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ResumeSection } from './components/portfolio/ResumeSection';
import { ContactSection } from './components/portfolio/ContactSection';

import { DocumentVault } from './components/vault/DocumentVault';
import { Dashboard } from './components/dashboard/Dashboard';
import { UploadDocumentModal } from './components/vault/UploadDocumentModal';
import { AuthModal } from './components/auth/AuthModal';
import { FirebaseGuideModal } from './components/setup/FirebaseGuideModal';
import { SupabaseModal } from './components/setup/SupabaseModal';
import { EditProfileModal } from './components/portfolio/EditProfileModal';

import { 
  UserProfile, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  VaultDocument 
} from './types';

import { 
  INITIAL_PROFILE, 
  INITIAL_EDUCATION, 
  INITIAL_SKILLS, 
  INITIAL_PROJECTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_SAMPLE_DOCS 
} from './data/initialData';

import { fetchUserProfile, fetchUserDocuments } from './lib/firestoreService';
import { fetchSupabaseProfile } from './lib/supabaseService';
import { downloadFile } from './lib/storageService';

const MainAppContent: React.FC = () => {
  const { user, isGuest } = useAuth();
  const { showToast } = useToast();

  // Navigation View State
  const [currentView, setCurrentView] = useState<'portfolio' | 'vault' | 'dashboard'>('portfolio');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Application Data States
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [education, setEducation] = useState<EducationItem[]>(INITIAL_EDUCATION);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [documents, setDocuments] = useState<VaultDocument[]>(INITIAL_SAMPLE_DOCS);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [firebaseGuideOpen, setFirebaseGuideOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [quickUploadOpen, setQuickUploadOpen] = useState(false);

  // Load custom user profile & docs from Supabase / Firestore
  useEffect(() => {
    async function loadData() {
      // 1. Try fetching from Supabase database
      try {
        const supaProfile = await fetchSupabaseProfile(user?.uid || 'tanmay_garai');
        if (supaProfile) {
          setProfile(prev => ({ ...prev, ...supaProfile }));
        }
      } catch (err) {
        console.warn('Supabase profile load check:', err);
      }

      // 2. Load Firestore custom profile & docs if logged in
      if (user) {
        try {
          const userDoc = await fetchUserProfile(user.uid);
          if (userDoc) {
            setProfile(prev => ({ ...prev, ...userDoc }));
          }
          const userDocs = await fetchUserDocuments(user.uid);
          if (userDocs && userDocs.length > 0) {
            setDocuments(userDocs);
          }
        } catch (err) {
          console.warn('Could not fetch cloud profile, using local state:', err);
        }
      }
    }
    loadData();
  }, [user]);

  // Navigate to portfolio section smoothly
  const handleNavigateToPortfolioSection = (sectionId: string) => {
    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
    }
    if (sectionId) {
      setActiveSection(sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  // Download Resume
  const handleDownloadResume = () => {
    const resumeUrl = profile.resumeUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    downloadFile(resumeUrl, profile.resumeFileName || 'Tanmay_Garai_CSE_Resume.pdf');
    showToast('info', 'Downloading Resume', profile.resumeFileName || 'Tanmay_Garai_CSE_Resume.pdf');
  };

  // Guard navigation to protected views if not logged in
  const handleViewChange = (view: 'portfolio' | 'vault' | 'dashboard') => {
    if ((view === 'vault' || view === 'dashboard') && !user && !isGuest) {
      showToast('info', 'Authentication Required', 'Please sign in or continue as Guest to access the private portal.');
      setAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030718] text-slate-100 transition-colors duration-200 antialiased selection:bg-cyan-500 selection:text-white relative">
      
      {/* Desktop Interactive Custom Cursor */}
      <CustomCursor />

      {/* Cybernetic Tech Animated Background */}
      <TechBackground />

      {/* Futuristic Floating Glass Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleViewChange}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        profile={profile}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfileSettings={() => setEditProfileOpen(true)}
        onOpenFirebaseGuide={() => setFirebaseGuideOpen(true)}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
      />

      {/* Main Content Area based on current view */}
      <main className="flex-1 relative z-10">
        {currentView === 'portfolio' && (
          <div className="space-y-4">
            {/* Hero Section with Floating Terminal UI */}
            <HeroSection
              profile={profile}
              onViewProjects={() => handleNavigateToPortfolioSection('projects')}
              onOpenVault={() => handleViewChange('vault')}
              onDownloadResume={handleDownloadResume}
            />

            {/* Dynamic Dashboard Statistics */}
            <DashboardStatsSection
              stats={profile.stats}
              totalDocuments={documents.length}
              totalSkills={skills.length}
            />

            {/* Developer Profile Dashboard & Learning Journey Timeline */}
            <AboutSection profile={profile} />

            {/* Interactive Technology Ecosystem */}
            <SkillsSection skills={skills} />

            {/* Learning Hub: Currently Learning */}
            <CurrentlyLearningSection />

            {/* Coding Profiles & Developer Network */}
            <DeveloperNetworkSection />

            {/* Featured Projects with interactive cards */}
            <ProjectsSection
              projects={projects}
              isOwner={!!user}
              onAddProjectClick={() => setEditProfileOpen(true)}
            />

            {/* Key Achievements & Coding Milestones */}
            <AchievementsSection />

            {/* Learning Notes & Technical Insights */}
            <NotesBlogSection />

            {/* Certificate Gallery with preview & verify */}
            <CertificatesSection
              certificates={certificates}
              isOwner={!!user}
              onAddCertificateClick={() => setEditProfileOpen(true)}
            />

            {/* Academic Education Timeline */}
            <EducationSection educationList={education} />

            {/* ATS-Optimized Resume Section */}
            <ResumeSection
              profile={profile}
              onProfileUpdated={(updated) => setProfile(updated)}
              onOpenAuth={() => setAuthModalOpen(true)}
            />

            {/* Clean Glass Contact Form */}
            <ContactSection profile={profile} />
          </div>
        )}

        {currentView === 'vault' && (
          <DocumentVault
            documents={documents}
            onDocumentsChange={(updatedDocs) => setDocuments(updatedDocs)}
            userId={user ? user.uid : 'guest'}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            profile={profile}
            documents={documents}
            projects={projects}
            certificates={certificates}
            onNavigateToVault={() => setCurrentView('vault')}
            onNavigateToPortfolio={handleNavigateToPortfolioSection}
            onOpenUpload={() => setQuickUploadOpen(true)}
          />
        )}
      </main>

      {/* Futuristic Footer */}
      <Footer
        profile={profile}
        onOpenFirebaseGuide={() => setFirebaseGuideOpen(true)}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        onOpenVault={() => handleViewChange('vault')}
      />

      {/* Modals & Dialogs */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          showToast('success', 'Welcome!', 'Authentication successful.');
        }}
      />

      <FirebaseGuideModal
        isOpen={firebaseGuideOpen}
        onClose={() => setFirebaseGuideOpen(false)}
      />

      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        profile={profile}
      />

      <EditProfileModal
        profile={profile}
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onProfileUpdated={(updated) => setProfile(updated)}
      />

      <UploadDocumentModal
        isOpen={quickUploadOpen}
        onClose={() => setQuickUploadOpen(false)}
        onDocumentAdded={(newDoc) => setDocuments([newDoc, ...documents])}
      />

    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <MainAppContent />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
