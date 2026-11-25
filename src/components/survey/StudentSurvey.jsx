import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Moon,
  Utensils,
  BookOpen,
  HeartPulse,
  Save,
  RotateCcw
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

export default function StudentSurvey({ onComplete }) {
  const { surveyData, submitSurvey } = useWellness();

  // Local state initialized with existing or default answers
  const [formData, setFormData] = useState({
    sleepHours: surveyData?.sleepHours || 6,
    bedtime: surveyData?.bedtime || '02:00',
    wakeUpFeeling: surveyData?.wakeUpFeeling || 'groggy',
    mealsCount: surveyData?.mealsCount || 2,
    skipsBreakfast: surveyData?.skipsBreakfast || 'frequently',
    studyHours: surveyData?.studyHours || 8,
    breakFrequency: surveyData?.breakFrequency || 'rarely',
    stressLevel: surveyData?.stressLevel || 8,
    stressTriggers: surveyData?.stressTriggers || ['Syllabus volume', 'Fear of underperforming'],
    routineBarriers: surveyData?.routineBarriers || 'Procrastination during the day followed by panic studying at night.'
  });

  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1); // 2 steps for clean UX (5 questions each)

  const STRESS_TRIGGER_OPTIONS = [
    'Syllabus volume',
    'Fear of underperforming',
    'Parental/family expectations',
    'Lack of sleep & fatigue',
    'Competition with peers',
    'Poor time management',
    'Unclear concepts / difficult topics',
    'Exam timetable scheduling'
  ];

  const handleTriggerToggle = (trigger) => {
    setFormData(prev => {
      const exists = prev.stressTriggers.includes(trigger);
      return {
        ...prev,
        stressTriggers: exists
          ? prev.stressTriggers.filter(t => t !== trigger)
          : [...prev.stressTriggers, trigger]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSurvey(formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-brand-100 text-brand-700">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Exam Week Routine & Wellness Survey
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies your baseline sleep debt, nutritional gaps, and exam pressure triggers. Responses calibrate your Routine Breakdown Detector.
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? 'Sleep & Nutrition Focus' : 'Study Habits & Stress Triggers'}</span>
        </div>
        <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-brand-600 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Confirmation View */}
      {submitted ? (
        <div className="glass-card p-8 rounded-3xl shadow-soft text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Survey Recorded Successfully!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your responses have been synced with the <strong>Routine Breakdown Detector</strong> and anonymized for institutional cohort analytics.
          </p>

          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 max-w-sm mx-auto text-left text-xs space-y-2">
            <p className="font-bold text-brand-900">Your Exam Baseline Summary:</p>
            <p className="text-slate-700">• Average Sleep: <strong>{formData.sleepHours} hours/night</strong></p>
            <p className="text-slate-700">• Breakfast Habits: <strong>{formData.skipsBreakfast}</strong></p>
            <p className="text-slate-700">• Reported Stress Level: <strong>{formData.stressLevel}/10</strong></p>
            <p className="text-slate-700">• Daily Study Target: <strong>{formData.studyHours} hours</strong></p>
          </div>

          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => onComplete && onComplete('breakdowns')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>View Your Routine Breakdown Alerts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Edit Survey Answers
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1: SLEEP & NUTRITION */}
          {step === 1 && (
            <div className="glass-card p-6 rounded-2xl shadow-soft space-y-6">
              
              {/* Question 1: Sleep hours */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-brand-600" />
                    <span>1. How many hours do you sleep during exam week?</span>
                  </label>
                  <span className="text-sm font-extrabold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    {formData.sleepHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: Number(e.target.value) })}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>3 hrs (Severe deficit)</span>
                  <span>7-8 hrs (Recommended)</span>
                  <span>10 hrs</span>
                </div>
              </div>

              {/* Question 2: Bedtime */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  2. What time do you usually go to bed during exam preparation?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['22:30', '00:00', '02:00', '03:30+'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, bedtime: time.replace('+', '') })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formData.bedtime === time.replace('+', '')
                          ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {time === '22:30' ? 'Before 11 PM' : time === '00:00' ? 'Midnight (12 AM)' : time === '02:00' ? 'Late (2 AM)' : 'Deep Night (3:30 AM+)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Wake-up feeling */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  3. Do you wake up feeling refreshed?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'refreshed', label: 'Refreshed & Ready', emoji: '⚡' },
                    { val: 'groggy', label: 'Somewhat Groggy', emoji: '🥱' },
                    { val: 'exhausted', label: 'Completely Exhausted', emoji: '😫' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, wakeUpFeeling: opt.val })}
                      className={`p-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                        formData.wakeUpFeeling === opt.val
                          ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold ring-1 ring-brand-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-lg mb-1">{opt.emoji}</div>
                      <div>{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Meals count */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-teal-600" />
                    <span>4. How many meals do you eat daily during exams?</span>
                  </label>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                    {formData.mealsCount} Meals
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, mealsCount: num })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        formData.mealsCount === num
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {num} {num === 1 ? 'Meal' : 'Meals'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 5: Breakfast skipping */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  5. Do you skip breakfast during exam week?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'never', label: 'Never (Always eat)' },
                    { val: 'sometimes', label: 'Sometimes (1-2x)' },
                    { val: 'frequently', label: 'Frequently (3-4x)' },
                    { val: 'daily', label: 'Daily (Every morning)' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, skipsBreakfast: opt.val })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formData.skipsBreakfast === opt.val
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <span>Continue to Study & Stress Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: STUDY LOAD & STRESS TRIGGERS */}
          {step === 2 && (
            <div className="glass-card p-6 rounded-2xl shadow-soft space-y-6">

              {/* Question 6: Study hours */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>6. How many hours do you study daily?</span>
                  </label>
                  <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {formData.studyHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  step="0.5"
                  value={formData.studyHours}
                  onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>2 hrs</span>
                  <span>6 hrs (Balanced)</span>
                  <span>14 hrs (Severe Cramming)</span>
                </div>
              </div>

              {/* Question 7: Break frequency */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  7. How frequently do you take breaks during revision?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'frequently', label: 'Every 30-45 mins (Pomodoro)' },
                    { val: 'regularly', label: 'Every 90 mins' },
                    { val: 'rarely', label: 'Rarely / 3+ hours continuously' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, breakFrequency: opt.val })}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        formData.breakFrequency === opt.val
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-1 ring-blue-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 8: Stress level (1-10 slider) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                    <HeartPulse className="w-4 h-4 text-rose-600" />
                    <span>8. What is your current stress level (1–10)?</span>
                  </label>
                  <span className={`text-sm font-extrabold px-3 py-0.5 rounded-full ${
                    formData.stressLevel >= 8
                      ? 'bg-rose-100 text-rose-800'
                      : formData.stressLevel >= 5
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {formData.stressLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={(e) => setFormData({ ...formData, stressLevel: Number(e.target.value) })}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>1 (Zen / Confident)</span>
                  <span>5 (Moderate Pressure)</span>
                  <span>10 (Overwhelming Panic)</span>
                </div>
              </div>

              {/* Question 9: Stress triggers (multi-choice checkboxes) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  9. What causes the most stress during exams? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STRESS_TRIGGER_OPTIONS.map((trigger) => {
                    const isSelected = formData.stressTriggers.includes(trigger);
                    return (
                      <button
                        key={trigger}
                        type="button"
                        onClick={() => handleTriggerToggle(trigger)}
                        className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all flex items-center space-x-2 ${
                          isSelected
                            ? 'bg-purple-50 border-purple-400 text-purple-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{trigger}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 10: Routine barriers (Text response) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  10. What prevents you from maintaining a healthy routine?
                </label>
                <textarea
                  rows={3}
                  value={formData.routineBarriers}
                  onChange={(e) => setFormData({ ...formData, routineBarriers: e.target.value })}
                  placeholder="e.g., Late-night phone scrolling, inability to stop studying when anxious, hostel canteen closes early..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 shadow-md flex items-center space-x-2 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Submit Survey & Update Baseline</span>
                </button>
              </div>

            </div>
          )}

        </form>
      )}

    </div>
  );
}
