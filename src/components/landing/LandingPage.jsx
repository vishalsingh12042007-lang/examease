import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Moon,
  Utensils,
  HeartPulse,
  BookOpen,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Compass,
  Smile,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import WellnessScoreRing from '../common/WellnessScoreRing';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';

export default function LandingPage({ onEnterApp }) {
  const { setAuthModal, loginDemoStudent } = useAuth();
  const { wellnessScore, todayMetrics } = useWellness();

  return (
    <div className="bg-mesh-gradient min-h-screen text-slate-800">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>The Student Wellness Platform for Exam Weeks</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Health Matters <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-brand-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">
                  During Exams.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                ExamEase is a student-first wellness platform designed to identify routine breakdowns—sleep deprivation, skipped meals, and cramming burnout—and provide immediate, practical micro-interventions.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    loginDemoStudent();
                    onEnterApp('dashboard');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-glow-purple transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>Explore Live Student Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-soft transition-all duration-300"
                >
                  Create Student Account
                </button>
              </div>

              {/* Tagline & Stat Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center text-brand-700 bg-brand-50/80 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-brand-600" />
                  Study Smart
                </span>
                <span className="flex items-center text-teal-700 bg-teal-50/80 px-2.5 py-1 rounded-lg">
                  <Moon className="w-3.5 h-3.5 mr-1 text-teal-600" />
                  Sleep Well
                </span>
                <span className="flex items-center text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-lg">
                  <HeartPulse className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  Stay Healthy
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Preview Widget */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl border border-white/60 relative">
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold rounded-full shadow-md flex items-center space-x-1 animate-pulse">
                  <Zap className="w-3 h-3" />
                  <span>Exam Survival Engine</span>
                </div>

                <div className="text-center pb-4 border-b border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Dashboard Preview
                  </p>
                  <h3 className="text-base font-bold text-slate-800 mt-1">
                    Daily Wellness Balance
                  </h3>
                </div>

                <div className="my-6 flex justify-center">
                  <WellnessScoreRing score={wellnessScore} size={170} strokeWidth={14} />
                </div>

                {/* Micro Metric Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
                  <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-100">
                    <p className="text-[10px] font-bold uppercase text-purple-600">Sleep</p>
                    <p className="text-base font-extrabold text-slate-800">{todayMetrics.sleepDuration}h</p>
                    <p className="text-[9px] text-slate-500">Restorative</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-100">
                    <p className="text-[10px] font-bold uppercase text-teal-600">Meals</p>
                    <p className="text-base font-extrabold text-slate-800">{todayMetrics.completedMealsCount}/4</p>
                    <p className="text-[9px] text-slate-500">Fuelled</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-100">
                    <p className="text-[10px] font-bold uppercase text-amber-600">Stress</p>
                    <p className="text-base font-extrabold text-slate-800">{todayMetrics.stressLevel}/10</p>
                    <p className="text-[9px] text-slate-500">Controlled</p>
                  </div>
                </div>

                {/* Routine Breakdown Teaser */}
                <div className="mt-4 p-3 rounded-xl bg-rose-50/80 border border-rose-100 text-xs text-rose-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-semibold text-[11px]">Active Routine Breakdown Check</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                    Real-time
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM VS. SOLUTION SECTION */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Exam Week Reality Check
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">
              Why Traditional Exam Preparation Breaks Down
            </p>
            <p className="text-slate-600 text-sm mt-3">
              College students push themselves into high-stakes cramming cycles, sacrificing sleep, nutrition, and mental bandwidth—leading to severe exam-day recall failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Breakdown Pattern */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-4">
              <div className="inline-flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>The Exam Breakdown Spiral</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Irregular & Sub-5h Sleep:</strong> Destroys memory consolidation in the hippocampus, leading to exam-hall brain fog.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Skipping Breakfast & Junk Eating:</strong> Causes blood glucose crashes and severe mid-afternoon attention deficits.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>8+ Hour Marathon Cramming:</strong> Severe cognitive diminishing returns with zero physical or eye breaks.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Unchecked Stress Spirals:</strong> Cortisol overload triggers fight-or-flight panic and anxiety-induced insomnia.</span>
                </li>
              </ul>
            </div>

            {/* The ExamEase Solution */}
            <div className="p-6 sm:p-8 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-4">
              <div className="inline-flex items-center space-x-2 text-teal-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span>The ExamEase Intervention</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-2.5">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Sleep Consistency Engine:</strong> Monitors bedtime variance and protects deep REM recovery windows.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Student Budget Nutrition:</strong> 5-minute Indian brain-fuel recipes (poha, curd rice, moong dal) preventing glucose crashes.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Smart Pomodoro & Burnout Shield:</strong> Encourages balanced 25/5 study blocks with gentle synthesized chimes.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span><strong>Automated Routine Breakdown Detector:</strong> Flags unhealthy trends immediately with practical single-step actions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Built Specifically For College & University Students
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">
              Everything You Need to Ace Exams in Peak Health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Routine Breakdown Detector</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Algorithmic detection that scans sleep logs, meal records, and stress self-reports to warn you before burnout happens.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Circadian Sleep Tracker</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Automatic duration calculator, weekly consistency graphs, and sleep debt alerts to protect your memory consolidation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Student Budget Meal Tracker</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Missed meal detection with affordable Indian student staples like warm poha, curd rice, and moong dal khichdi.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Stress Relief & Box Breathing</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Interactive animated 4-4-4-4 breathing circle with synthesized calm chimes and guided relaxation timers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Smart Balanced Study Planner</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Integrated Pomodoro timer with audible intervals that caps excessive study blocks to maintain high cognitive retention.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Dedicated Exam Week Mode</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                One-click toggle that transitions the UI into a high-focus exam survival view with emergency sleep protection.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Simple 4-Step Methodology
            </h2>
            <p className="text-3xl font-extrabold mt-2">
              How ExamEase Keeps You Balanced
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-2xl font-black text-brand-400">01</span>
              <h4 className="text-base font-bold mt-2">Take Student Survey</h4>
              <p className="text-xs text-slate-400 mt-2">
                10 questions on sleep hours, skipped meals, study load, and stress triggers to establish your exam baseline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-2xl font-black text-blue-400">02</span>
              <h4 className="text-base font-bold mt-2">Quick Daily Check-ins</h4>
              <p className="text-xs text-slate-400 mt-2">
                Log bedtime, check off your breakfast/lunch, and note stress level in 45 seconds each morning and evening.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-2xl font-black text-amber-400">03</span>
              <h4 className="text-base font-bold mt-2">Breakdown Detection</h4>
              <p className="text-xs text-slate-400 mt-2">
                Our engine instantly warns you if you miss 2 breakfasts, sleep under 6h, or cram past 2:00 AM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-2xl font-black text-teal-400">04</span>
              <h4 className="text-base font-bold mt-2">Targeted Recovery</h4>
              <p className="text-xs text-slate-400 mt-2">
                Apply one-step actionable fixes: 3-min Box Breathing, warm poha fuel, or a 15-minute sunlight walk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS (Clearly labeled sample content) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2">
              Sample Student Peer Reviews
            </div>
            <p className="text-3xl font-extrabold text-slate-900">
              What Students Say During Exam Weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl shadow-soft">
              <div className="flex items-center space-x-1 text-amber-500 mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "During my Semester 5 finals, I was sleeping 4 hours and living on black coffee. The Routine Breakdown Detector alerted me when my sleep dropped two nights in a row. Switching to 7h sleep gave me so much more clarity during morning papers."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  AP
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Aarav Patel</p>
                  <p className="text-[10px] text-slate-500">3rd Year B.Tech, NIT Trichy</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl shadow-soft">
              <div className="flex items-center space-x-1 text-amber-500 mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "The student meal suggestions were a lifesaver. Warm poha and curd rice take under 10 minutes to make in my hostel room and kept my stomach settled instead of greasy delivery food."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">
                  PI
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pooja Iyer</p>
                  <p className="text-[10px] text-slate-500">2nd Year MBBS, AIIMS</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl shadow-soft">
              <div className="flex items-center space-x-1 text-amber-500 mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "The animated Box Breathing with the gentle chime stops panic spikes right before mock tests. Having the Pomodoro timer enforce 5-minute physical breaks prevented my usual neck spasms."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  RD
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Rohan Deshmukh</p>
                  <p className="text-[10px] text-slate-500">4th Year Law, Delhi Univ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900">ExamEase</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Study Smart. Sleep Well. Stay Healthy.
              Designed specifically for university students during examination seasons.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2.5">Platform Tools</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => onEnterApp('survey')} className="hover:text-brand-600">Student Survey</button></li>
              <li><button onClick={() => onEnterApp('sleep')} className="hover:text-brand-600">Sleep Consistency Tracker</button></li>
              <li><button onClick={() => onEnterApp('meals')} className="hover:text-brand-600">Student Budget Meals</button></li>
              <li><button onClick={() => onEnterApp('stress')} className="hover:text-brand-600">Animated Box Breathing</button></li>
              <li><button onClick={() => onEnterApp('study')} className="hover:text-brand-600">Pomodoro Study Planner</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2.5">Administration & Analytics</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => onEnterApp('admin')} className="hover:text-brand-600">University Admin Portal</button></li>
              <li><button onClick={() => onEnterApp('analytics')} className="hover:text-brand-600">Cohort Wellness Reports</button></li>
              <li><button onClick={() => onEnterApp('breakdowns')} className="hover:text-brand-600">Routine Breakdown Engine</button></li>
              <li><button onClick={() => onEnterApp('routine')} className="hover:text-brand-600">Smart Routine Generator</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2.5">Student Support & Crisis Notice</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ExamEase provides behavioral wellness guidance. It is not a clinical mental healthcare provider. If you are experiencing acute distress, please reach out to national student support hotlines or your campus psychological counseling center.
            </p>
            <p className="text-[11px] font-bold text-slate-700 mt-2">
              National Helpline (India): 14416 (Tele-MANAS)
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <p>© 2026 ExamEase Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with React, Tailwind CSS, Lucide & Recharts.</p>
        </div>
      </footer>

    </div>
  );
}
