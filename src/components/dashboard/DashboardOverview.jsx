import React from 'react';
import {
  Moon,
  Utensils,
  HeartPulse,
  BookOpen,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import WellnessScoreRing from '../common/WellnessScoreRing';
import StatCard from '../common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';
import { getTimeGreeting, getStressBadge } from '../../utils/formatters';

export default function DashboardOverview({ setCurrentView }) {
  const { currentUser } = useAuth();
  const {
    wellnessScore,
    todayMetrics,
    checklist,
    toggleChecklistItem,
    routineAlerts,
    recommendations,
    examMode,
    toggleExamMode,
    sleepRecords
  } = useWellness();

  // 7-Day Trend data for Recharts
  const weeklyTrendData = [
    { day: 'Thu', score: 65, sleep: 5.7, stress: 8 },
    { day: 'Fri', score: 60, sleep: 5.2, stress: 9 },
    { day: 'Sat', score: 62, sleep: 5.5, stress: 7 },
    { day: 'Sun', score: 74, sleep: 6.5, stress: 6 },
    { day: 'Mon', score: 71, sleep: 5.5, stress: 8 },
    { day: 'Tue', score: 82, sleep: 7.0, stress: 5 },
    { day: 'Today', score: wellnessScore, sleep: todayMetrics.sleepDuration, stress: todayMetrics.stressLevel }
  ];

  const greeting = getTimeGreeting(currentUser ? currentUser.name.split(' ')[0] : 'Student');
  const completedChecklistCount = checklist.filter(c => c.completed).length;
  const checklistPercent = Math.round((completedChecklistCount / checklist.length) * 100);
  const stressBadge = getStressBadge(todayMetrics.stressLevel);
  const criticalAlerts = routineAlerts.filter(a => a.severity === 'critical');

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Greeting + Persona Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {greeting}
            </h1>
            <span className="text-xl">✨</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {currentUser?.degree || 'Undergraduate'} • {currentUser?.institution || 'Campus'} •
            <span className="text-brand-600 font-semibold ml-1">Prototype Demo Account</span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentView('sleep')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center space-x-1.5 transition-all"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Log Sleep</span>
          </button>
          <button
            onClick={() => setCurrentView('stress')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center space-x-1.5 transition-all"
          >
            <HeartPulse className="w-3.5 h-3.5 text-teal-500" />
            <span>Box Breathe</span>
          </button>
          <button
            onClick={() => setCurrentView('study')}
            className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-sm flex items-center space-x-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pomodoro Focus</span>
          </button>
        </div>
      </div>

      {/* EXAM WEEK MODE PROMINENT BANNER (if active) */}
      {examMode && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-600/20 border border-amber-500/40 shadow-soft animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-md">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Exam Week Mode Active: Maximum Memory Protection
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    High Stakes
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Non-essential tasks are hidden. Focus on sleep retention, active recall, and preventing acute panic spikes.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('routine')}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0"
            >
              Generate Exam Timetable →
            </button>
          </div>
        </div>
      )}

      {/* CRITICAL ROUTINE BREAKDOWN ALERT CARD (if any critical issues found) */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 shadow-soft">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  {criticalAlerts[0].title}
                </h4>
                <button
                  onClick={() => setCurrentView('breakdowns')}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  View All Alerts ({routineAlerts.length}) →
                </button>
              </div>
              <p className="text-xs text-slate-700 mt-1">
                {criticalAlerts[0].message}
              </p>
              <div className="mt-2 text-xs font-semibold text-rose-800 bg-white/80 p-2 rounded-lg border border-rose-100 inline-block">
                ⚡ Recommended Action: {criticalAlerts[0].recommendation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP ROW: WELLNESS SCORE CARD + 4 KEY METRIC CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Daily Wellness Score Ring Card */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl shadow-soft flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Today's Wellness Index
          </h3>
          <WellnessScoreRing score={wellnessScore} size={170} strokeWidth={14} />
          
          <div className="w-full mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-medium">Daily Habits</span>
              <p className="font-extrabold text-slate-800">{checklistPercent}%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-medium">Routine Status</span>
              <p className="font-extrabold text-emerald-600">Tracked</p>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Metric 1: Sleep */}
          <StatCard
            icon={Moon}
            iconColor="text-indigo-600 bg-indigo-50"
            title="Sleep Duration"
            value={`${todayMetrics.sleepDuration} hrs`}
            subtitle="Goal: 7.5 hrs (Target REM window)"
            badgeText={todayMetrics.sleepDuration >= 7 ? 'Optimal' : 'Deficit'}
            badgeColor={todayMetrics.sleepDuration >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}
            onClick={() => setCurrentView('sleep')}
            actionText="Sleep Log"
          />

          {/* Metric 2: Meals */}
          <StatCard
            icon={Utensils}
            iconColor="text-teal-600 bg-teal-50"
            title="Meals Completed"
            value={`${todayMetrics.completedMealsCount} of 4`}
            subtitle={todayMetrics.missedBreakfast ? '⚠️ Breakfast skipped!' : 'Breakfast fueled'}
            badgeText={todayMetrics.completedMealsCount >= 3 ? 'On Track' : 'Skipping Meals'}
            badgeColor={todayMetrics.completedMealsCount >= 3 ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}
            onClick={() => setCurrentView('meals')}
            actionText="Meal Tracker"
          />

          {/* Metric 3: Stress Level */}
          <StatCard
            icon={HeartPulse}
            iconColor="text-rose-600 bg-rose-50"
            title="Current Stress"
            value={`${todayMetrics.stressLevel} / 10`}
            subtitle="Reported via daily check-in"
            badgeText={stressBadge.text}
            badgeColor={stressBadge.color}
            onClick={() => setCurrentView('stress')}
            actionText="Relief Tools"
          />

          {/* Metric 4: Study Hours */}
          <StatCard
            icon={BookOpen}
            iconColor="text-blue-600 bg-blue-50"
            title="Study Time Logged"
            value={`${todayMetrics.studyHours} hrs`}
            subtitle="Balanced focus with breaks"
            badgeText={todayMetrics.studyHours <= 7 ? 'Healthy Load' : 'High Load'}
            badgeColor="bg-blue-100 text-blue-800"
            onClick={() => setCurrentView('study')}
            actionText="Study Planner"
          />

        </div>
      </div>

      {/* MIDDLE ROW: WEEKLY TREND GRAPH + TODAY'S TASK CHECKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts 7-Day Trend Card */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Weekly Wellness & Stress Trajectory
              </h3>
              <p className="text-xs text-slate-500">
                Score progression (0-100) vs. Daily Stress Index (1-10)
              </p>
            </div>
            <button
              onClick={() => setCurrentView('analytics')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  name="Wellness Score"
                  stroke="#7C3AED"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex items-center justify-center space-x-6 text-xs text-slate-500">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-brand-600 mr-1.5" />
              Wellness Score (Target: &gt;75)
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-slate-300 mr-1.5" />
              Recorded Daily
            </span>
          </div>
        </div>

        {/* Today's Habit Checklist */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Today's Wellness Habits
                </h3>
                <p className="text-xs text-slate-500">
                  {completedChecklistCount} of {checklist.length} completed ({checklistPercent}%)
                </p>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                +20 XP each
              </span>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-600 to-teal-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>

            {/* List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    item.completed
                      ? 'bg-emerald-50/60 border-emerald-100 text-slate-500 line-through'
                      : 'bg-white border-slate-200/80 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {item.completed && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <span className="font-medium text-[11px]">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('survey')}
            className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors text-center"
          >
            Update Baseline Survey Answers →
          </button>
        </div>

      </div>

      {/* BOTTOM ROW: REAL-TIME PERSONALIZED RECOMMENDATIONS PREVIEW */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Personalized Recommendations (Live Data Driven)
            </h3>
          </div>
          <button
            onClick={() => setCurrentView('recommendations')}
            className="text-xs font-semibold text-brand-600 hover:underline"
          >
            View All ({recommendations.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-soft transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  rec.priority === 'critical'
                    ? 'bg-rose-100 text-rose-700'
                    : rec.priority === 'high'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {rec.priority} priority
                </span>
                <span className="text-[10px] text-slate-400 capitalize">{rec.category}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{rec.action}</p>
              <p className="text-[10px] font-semibold text-emerald-600 mt-2">Impact: {rec.impact}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
