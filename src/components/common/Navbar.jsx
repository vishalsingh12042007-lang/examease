import React, { useState } from 'react';
import { Sparkles, Flame, Bell, Zap, LogOut, User, ShieldAlert, Award, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';

export default function Navbar({ onOpenMobileMenu, currentView, setCurrentView }) {
  const { currentUser, role, logout, setAuthModal, loginDemoStudent, loginDemoAdmin } = useAuth();
  const { examMode, toggleExamMode, routineAlerts, xp } = useWellness();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const activeBreakdownsCount = routineAlerts.filter(a => a.severity !== 'success').length;

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
      examMode
        ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md'
        : 'bg-white/85 border-slate-200/80 text-slate-800 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenMobileMenu && onOpenMobileMenu()}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-600 to-teal-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
                  ExamEase
                </span>
                {examMode && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full animate-pulse">
                    Exam Mode
                  </span>
                )}
              </div>
              <p className={`text-[10px] font-medium hidden sm:block ${examMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Study Smart. Sleep Well. Stay Healthy.
              </p>
            </div>
          </button>
        </div>

        {/* Center: Exam Week Mode Dedicated Switch */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={toggleExamMode}
            className={`flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              examMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-glow-orange'
                : 'bg-slate-100/80 text-slate-700 border-slate-200 hover:bg-slate-200/80'
            }`}
          >
            <Zap className={`w-4 h-4 ${examMode ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>Exam Week Mode:</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              examMode ? 'bg-amber-500 text-slate-900' : 'bg-slate-300 text-slate-700'
            }`}>
              {examMode ? 'ACTIVE' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Right: Gamification, Alerts & User Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Streak & XP Counter */}
          <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
            examMode
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-brand-50/70 border-brand-100 text-brand-900'
          }`}>
            <span className="flex items-center text-amber-600 font-bold">
              <Flame className="w-4 h-4 mr-1 text-amber-500 fill-amber-500" />
              4 Days
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-brand-600 font-bold">{xp} XP</span>
          </div>

          {/* Routine Breakdown Alert Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-xl relative transition-colors ${
                examMode
                  ? 'hover:bg-slate-800 text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Routine Breakdown Alerts"
            >
              <Bell className="w-5 h-5" />
              {activeBreakdownsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {activeBreakdownsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-brand-600" />
                    <h4 className="font-bold text-sm text-slate-800">Routine Breakdown Alerts</h4>
                  </div>
                  <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-full">
                    {activeBreakdownsCount} detected
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                  {routineAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setShowNotifications(false);
                        setCurrentView('breakdowns');
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                        alert.severity === 'critical'
                          ? 'bg-rose-50 border-rose-100 text-rose-900'
                          : alert.severity === 'warning'
                          ? 'bg-amber-50 border-amber-100 text-amber-900'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-900'
                      }`}
                    >
                      <p className="font-bold">{alert.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{alert.message}</p>
                      <p className="text-brand-600 font-semibold mt-1 text-[11px]">Action: {alert.recommendation}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setCurrentView('breakdowns');
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View Breakdown Details & Solutions →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <p className="font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-xs text-slate-800">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                      {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setCurrentView('profile');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Student Profile</span>
                    </button>

                    {role === 'admin' ? (
                      <button
                        onClick={() => {
                          loginDemoStudent();
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-brand-600 hover:bg-brand-50 font-semibold flex items-center space-x-2"
                      >
                        <User className="w-4 h-4 text-brand-500" />
                        <span>Switch to Demo Student</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          loginDemoAdmin();
                          setShowUserDropdown(false);
                          setCurrentView('admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-purple-600 hover:bg-purple-50 font-semibold flex items-center space-x-2"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-500" />
                        <span>Switch to Admin Portal</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-sm transition-all"
              >
                Get Started
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
