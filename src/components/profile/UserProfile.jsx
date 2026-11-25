import React, { useState } from 'react';
import {
  User,
  Award,
  Flame,
  Calendar,
  School,
  Mail,
  Sparkles,
  CheckCircle2,
  Lock,
  LogOut,
  Edit3,
  Save,
  Moon,
  Coffee,
  Heart,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';
import { DAILY_CHALLENGES } from '../../data/challenges';

export default function UserProfile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const { xp, unlockedBadges, completedChallenges, completeChallenge } = useWellness();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [institution, setInstitution] = useState(currentUser?.institution || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [examStartDate, setExamStartDate] = useState(currentUser?.examStartDate || '2026-12-02');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate days until exam
  const today = new Date();
  const examDate = new Date(examStartDate);
  const diffDays = Math.max(0, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      institution,
      degree,
      examStartDate
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const badgeIcons = {
    Moon,
    Coffee,
    Heart,
    Clock,
    Award
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* PROFILE HEADER CARD */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-blue-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900">{currentUser?.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {currentUser?.role || 'student'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser?.email}</p>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {currentUser?.degree} • {currentUser?.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* GAMIFICATION STATS BAR */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-slate-50">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Daily Streak</div>
            <div className="text-xl font-extrabold text-amber-600 mt-1 flex items-center justify-center">
              <Flame className="w-4 h-4 mr-1 text-amber-500 fill-amber-500" />
              4 Days
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Wellness XP</div>
            <div className="text-xl font-extrabold text-brand-600 mt-1 flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-1 text-brand-500" />
              {xp} XP
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Exam Countdown</div>
            <div className="text-xl font-extrabold text-slate-800 mt-1">
              {diffDays} Days Left
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Badges Unlocked</div>
            <div className="text-xl font-extrabold text-teal-600 mt-1 flex items-center justify-center">
              <Award className="w-4 h-4 mr-1 text-teal-500" />
              {unlockedBadges.filter(b => b.unlocked).length} of {unlockedBadges.length}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE FORM */}
      {isEditing && (
        <form onSubmit={handleSave} className="glass-card p-6 rounded-2xl shadow-soft space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800">Edit Student Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">University / College</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree & Major</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Upcoming Exam Date</label>
              <input
                type="date"
                value={examStartDate}
                onChange={(e) => setExamStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* WELLNESS STREAKS & BADGES SHOWCASE */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Wellness Badges & Habit Achievements
            </h3>
            <p className="text-xs text-slate-500">
              Earned by maintaining consistent sleep schedules, fueling mornings, and calming exam anxiety.
            </p>
          </div>
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
            {unlockedBadges.filter(b => b.unlocked).length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => {
            const IconComponent = badgeIcons[badge.icon] || Award;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  badge.unlocked
                    ? 'bg-white border-slate-200/80 shadow-soft'
                    : 'bg-slate-50/60 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className={`p-3 rounded-2xl text-white shadow-sm shrink-0 bg-gradient-to-tr ${badge.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                    {badge.unlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{badge.description}</p>
                  <p className="text-[10px] font-bold text-brand-600 mt-1.5">
                    {badge.unlocked ? 'Unlocked ✓' : `Requires ${badge.unlockedAtStreak}-day streak`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DAILY WELLNESS CHALLENGES */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Daily Wellness Challenges
            </h3>
            <p className="text-xs text-slate-500">
              Micro-habits designed to prevent exam burnout. Complete for instant XP.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
            Refreshes Daily
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAILY_CHALLENGES.map((challenge) => {
            const isCompleted = completedChallenges.includes(challenge.id);
            return (
              <div
                key={challenge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    : 'bg-white border-slate-200/80 text-slate-800 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-slate-900">{challenge.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-brand-50 text-brand-700">
                      +{challenge.xp} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <button
                  onClick={() => completeChallenge(challenge.id, challenge.xp)}
                  disabled={isCompleted}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-brand-600 text-white hover:bg-brand-700 shadow-2xs'
                  }`}
                >
                  {isCompleted ? 'Done ✓' : 'Complete'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
