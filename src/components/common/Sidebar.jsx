import React from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  Moon,
  Utensils,
  HeartPulse,
  BookOpen,
  ShieldAlert,
  Sparkles,
  Clock,
  TrendingUp,
  User,
  Shield,
  RotateCcw,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';

export default function Sidebar({ currentView, setCurrentView, onCloseMobile }) {
  const { role, loginDemoStudent, loginDemoAdmin } = useAuth();
  const { routineAlerts, examMode, resetAllData } = useWellness();

  const activeAlertsCount = routineAlerts.filter(a => a.severity !== 'success').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'survey', label: 'Student Survey', icon: ClipboardCheck, badge: 'Assess' },
    { id: 'sleep', label: 'Sleep Tracker', icon: Moon },
    { id: 'meals', label: 'Meal Tracker', icon: Utensils },
    { id: 'stress', label: 'Stress & Relief', icon: HeartPulse },
    { id: 'study', label: 'Study Planner', icon: BookOpen, badge: 'Pomodoro' },
    {
      id: 'breakdowns',
      label: 'Routine Breakdown Detector',
      icon: ShieldAlert,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount} Alerts` : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    { id: 'recommendations', label: 'Smart Recommendations', icon: Sparkles },
    { id: 'routine', label: 'Routine Generator', icon: Clock, badge: 'New' },
    { id: 'analytics', label: 'Progress & Reports', icon: TrendingUp },
    { id: 'profile', label: 'Profile & Badges', icon: User },
    {
      id: 'admin',
      label: 'Admin Portal',
      icon: Shield,
      badge: 'Analytics',
      badgeColor: 'bg-purple-600 text-white'
    }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`w-64 flex-shrink-0 flex flex-col justify-between border-r min-h-[calc(100vh-4rem)] p-4 transition-colors duration-300 ${
      examMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200/80 text-slate-700'
    }`}>
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white shadow-sm'
                  : examMode
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor
                      ? item.badgeColor
                      : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-50 text-brand-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Exam Survival Pill & Demo Controls */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
        {/* Exam Countdown Box */}
        <div className={`p-3 rounded-xl border text-xs ${
          examMode
            ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
            : 'bg-gradient-to-br from-brand-50 to-blue-50 border-brand-100 text-brand-900'
        }`}>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold">Next Exam in 7 Days</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            "End-Term Theory" starting Dec 2. Keep your sleep non-negotiable!
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Demo Persona Switcher
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                loginDemoStudent();
                setCurrentView('dashboard');
              }}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                role === 'student'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => {
                loginDemoAdmin();
                setCurrentView('admin');
              }}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Admin View
            </button>
          </div>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm('Reset all sleep, meal, and survey data to initial prototype defaults?')) {
              resetAllData();
            }
          }}
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
}
