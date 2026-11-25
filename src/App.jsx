import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WellnessProvider, useWellness } from './context/WellnessContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import MobileNav from './components/common/MobileNav';
import AuthModals from './components/auth/AuthModals';

// Page Views
import LandingPage from './components/landing/LandingPage';
import DashboardOverview from './components/dashboard/DashboardOverview';
import StudentSurvey from './components/survey/StudentSurvey';
import SleepTracker from './components/sleep/SleepTracker';
import MealTracker from './components/meals/MealTracker';
import StressRelaxation from './components/stress/StressRelaxation';
import StudyPlanner from './components/study/StudyPlanner';
import RoutineBreakdownAlerts from './components/detector/RoutineBreakdownAlerts';
import SmartRecommendations from './components/recommendations/SmartRecommendations';
import SmartRoutineGenerator from './components/routine/SmartRoutineGenerator';
import ProgressReports from './components/analytics/ProgressReports';
import UserProfile from './components/profile/UserProfile';
import AdminDashboard from './components/admin/AdminDashboard';

function MainAppContent() {
  const { currentUser, role } = useAuth();
  const { examMode } = useWellness();
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user explicitly views Landing
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen">
        <Navbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <LandingPage onEnterApp={(view = 'dashboard') => setCurrentView(view)} />
        <AuthModals />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      examMode ? 'bg-slate-950 text-slate-100' : 'bg-mesh-gradient text-slate-800'
    }`}>
      {/* Top Navigation */}
      <Navbar
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto flex">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-slate-900 h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-12 min-w-0">
          
          {/* Quick Breadcrumb / Return to Landing Header */}
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setCurrentView('landing')}
                className="hover:text-brand-600 transition-colors font-semibold"
              >
                ExamEase
              </button>
              <span>/</span>
              <span className="capitalize font-bold text-slate-800 dark:text-slate-200">
                {currentView}
              </span>
            </div>

            <button
              onClick={() => setCurrentView('landing')}
              className="text-[11px] font-semibold text-brand-600 hover:underline"
            >
              ← Back to Product Tour
            </button>
          </div>

          {/* VIEW ROUTER */}
          {currentView === 'dashboard' && (
            <DashboardOverview setCurrentView={setCurrentView} />
          )}

          {currentView === 'survey' && (
            <StudentSurvey onComplete={(nextView) => setCurrentView(nextView || 'breakdowns')} />
          )}

          {currentView === 'sleep' && (
            <SleepTracker />
          )}

          {currentView === 'meals' && (
            <MealTracker />
          )}

          {currentView === 'stress' && (
            <StressRelaxation />
          )}

          {currentView === 'study' && (
            <StudyPlanner />
          )}

          {currentView === 'breakdowns' && (
            <RoutineBreakdownAlerts setCurrentView={setCurrentView} />
          )}

          {currentView === 'recommendations' && (
            <SmartRecommendations setCurrentView={setCurrentView} />
          )}

          {currentView === 'routine' && (
            <SmartRoutineGenerator />
          )}

          {currentView === 'analytics' && (
            <ProgressReports />
          )}

          {currentView === 'profile' && (
            <UserProfile />
          )}

          {currentView === 'admin' && (
            <AdminDashboard setCurrentView={setCurrentView} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Global Auth Modals */}
      <AuthModals />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WellnessProvider>
        <MainAppContent />
      </WellnessProvider>
    </AuthProvider>
  );
}
