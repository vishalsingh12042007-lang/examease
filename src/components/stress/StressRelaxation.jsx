import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  Wind,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';
import { playGentleBell, playBreathTick, startAmbientSound, stopAmbientSound } from '../../utils/audio';

export default function StressRelaxation() {
  const { moodRecords, logMood, todayMetrics } = useWellness();

  // Mood Check-in Form state
  const [selectedMood, setSelectedMood] = useState('good');
  const [stressInput, setStressInput] = useState(todayMetrics.stressLevel || 5);
  const [moodNote, setMoodNote] = useState('');
  const [loggedTodaySuccess, setLoggedTodaySuccess] = useState(false);

  // Breathing Exercise state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale (4s) -> hold1 (4s) -> exhale (4s) -> hold2 (4s)
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Ambient Relaxation Timer state
  const [ambientActive, setAmbientActive] = useState(false);
  const [relaxationTimeLeft, setRelaxationTimeLeft] = useState(300); // 5 mins default
  const [relaxationTimerRunning, setRelaxationTimerRunning] = useState(false);

  // Breathing Interval Hook
  useEffect(() => {
    let interval = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setPhaseSecondsLeft((prevSec) => {
          if (prevSec > 1) {
            return prevSec - 1;
          }

          // Transition to next phase
          setBreathPhase((prevPhase) => {
            if (prevPhase === 'inhale') {
              if (soundEnabled) playBreathTick('hold');
              return 'hold1';
            } else if (prevPhase === 'hold1') {
              if (soundEnabled) playBreathTick('exhale');
              return 'exhale';
            } else if (prevPhase === 'exhale') {
              if (soundEnabled) playBreathTick('hold');
              return 'hold2';
            } else {
              // Cycle complete
              if (soundEnabled) playGentleBell(528, 1.5);
              setBreathCyclesCompleted(c => c + 1);
              return 'inhale';
            }
          });
          return 4; // 4 seconds for next box breath step
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breathingActive, soundEnabled]);

  // Relaxation Timer Hook
  useEffect(() => {
    let timer = null;
    if (relaxationTimerRunning && relaxationTimeLeft > 0) {
      timer = setInterval(() => {
        setRelaxationTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (relaxationTimeLeft === 0) {
      setRelaxationTimerRunning(false);
      stopAmbientSound();
      setAmbientActive(false);
      playGentleBell(440, 2);
    }
    return () => clearInterval(timer);
  }, [relaxationTimerRunning, relaxationTimeLeft]);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    logMood(selectedMood, stressInput, moodNote);
    setLoggedTodaySuccess(true);
    setTimeout(() => setLoggedTodaySuccess(false), 4000);
  };

  const toggleBreathing = () => {
    if (!breathingActive) {
      setBreathingActive(true);
      setBreathPhase('inhale');
      setPhaseSecondsLeft(4);
      if (soundEnabled) playBreathTick('inhale');
    } else {
      setBreathingActive(false);
    }
  };

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('inhale');
    setPhaseSecondsLeft(4);
    setBreathCyclesCompleted(0);
  };

  const toggleAmbientRelaxation = () => {
    if (!relaxationTimerRunning) {
      setRelaxationTimerRunning(true);
      setAmbientActive(true);
      startAmbientSound('rain');
    } else {
      setRelaxationTimerRunning(false);
      setAmbientActive(false);
      stopAmbientSound();
    }
  };

  const resetRelaxationTimer = (seconds = 300) => {
    setRelaxationTimerRunning(false);
    setAmbientActive(false);
    stopAmbientSound();
    setRelaxationTimeLeft(seconds);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-rose-100 text-rose-700">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Mental Wellness & Stress Regulation
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Rapid physiological interventions to de-escalate exam anxiety and prevent cognitive freeze.
            </p>
          </div>
        </div>
      </div>

      {/* MEDICAL DISCLAIMER BANNER (Mandatory Requirement) */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start space-x-3 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800">General Wellness Support Notice</p>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
            This module provides behavioral coping tools (breathing rhythms, guided timers, cognitive reframing) designed for general exam stress. It is not clinical psychotherapy or a substitute for medical or mental healthcare. If you are in acute crisis, please contact student counseling or emergency helplines immediately.
          </p>
        </div>
      </div>

      {/* TWO COLUMN GRID: BREATHING CIRCLE + DAILY MOOD CHECK-IN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* INTERACTIVE BOX BREATHING ANIMATION CARD */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl shadow-soft flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                Box Breathing 4-4-4-4
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Parasympathetic Nervous System Reset
              </h3>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>
          </div>

          {/* Animated SVG Breathing Circle */}
          <div className="relative my-8 flex items-center justify-center">
            {/* Outer pulsating ring */}
            <div
              className={`w-64 h-64 rounded-full border-4 border-dashed border-teal-200 flex items-center justify-center transition-all duration-1000 ${
                breathingActive && (breathPhase === 'inhale' || breathPhase === 'hold1')
                  ? 'scale-110 border-teal-400'
                  : 'scale-90 border-teal-100'
              }`}
            >
              {/* Inner animated glowing circle */}
              <div
                className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 shadow-2xl ${
                  breathPhase === 'inhale'
                    ? 'bg-gradient-to-tr from-teal-500 to-emerald-400 scale-105 shadow-glow-teal'
                    : breathPhase === 'hold1'
                    ? 'bg-gradient-to-tr from-teal-600 to-indigo-500 scale-105'
                    : breathPhase === 'exhale'
                    ? 'bg-gradient-to-tr from-brand-600 to-blue-500 scale-85 shadow-glow-purple'
                    : 'bg-gradient-to-tr from-indigo-500 to-slate-600 scale-85'
                }`}
              >
                <Wind className="w-6 h-6 mb-1 animate-pulse" />
                <span className="text-xl font-extrabold uppercase tracking-widest">
                  {breathPhase === 'inhale'
                    ? 'Inhale'
                    : breathPhase === 'hold1'
                    ? 'Hold'
                    : breathPhase === 'exhale'
                    ? 'Exhale'
                    : 'Hold'}
                </span>
                <span className="text-3xl font-black mt-1">
                  {phaseSecondsLeft}s
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
              Completed: <strong className="text-slate-800">{breathCyclesCompleted}</strong> full cycles
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={resetBreathing}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
                title="Reset Cycles"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleBreathing}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center space-x-1.5 ${
                  breathingActive
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{breathingActive ? 'Pause Exercise' : 'Start 4-4-4-4 Breathing'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* DAILY MOOD CHECK-IN & STRESS SELECTOR (1-10) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Daily Mood & Stress Check-In
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Recording your emotional state helps prevent unconscious anxiety build-up.
            </p>

            {loggedTodaySuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Check-in saved! Your wellness score updated (+25 XP).</span>
              </div>
            )}

            <form onSubmit={handleMoodSubmit} className="space-y-4">
              {/* Emoji mood selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  How are you feeling right now?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: 'great', label: 'Great', emoji: '😄' },
                    { key: 'good', label: 'Calm', emoji: '😌' },
                    { key: 'stressed', label: 'Tense', emoji: '😰' },
                    { key: 'overwhelmed', label: 'Panic', emoji: '😫' }
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setSelectedMood(m.key)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedMood === m.key
                          ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold ring-1 ring-brand-500 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-2xl">{m.emoji}</div>
                      <div className="text-[11px] mt-1">{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress level 1-10 slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Exam Stress Index (1–10)
                  </label>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    stressInput >= 8
                      ? 'bg-rose-100 text-rose-800'
                      : stressInput >= 5
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {stressInput} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressInput}
                  onChange={(e) => setStressInput(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 (Low)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (Severe)</span>
                </div>
              </div>

              {/* Context Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Study Context or Triggers (Optional)
                </label>
                <input
                  type="text"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="e.g. Worried about algorithms paper tomorrow morning"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-sm transition-all"
              >
                Log Today's Mood (+25 XP)
              </button>
            </form>
          </div>

          {/* Quick Encouragement */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            "Your worth is not defined by an exam grade. One deep breath at a time."
          </div>
        </div>

      </div>

      {/* GUIDED RELAXATION TIMER & AMBIENT RAIN SOUND */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Offline Web Audio Synthesizer
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Guided Relaxation & Ambient Rain Generator
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Synthesizes gentle pink-noise rainfall to mask background library/dorm distractions.
            </p>
          </div>

          <div className="flex space-x-2">
            {[
              { label: '2 Mins', sec: 120 },
              { label: '5 Mins', sec: 300 },
              { label: '10 Mins', sec: 600 }
            ].map((preset) => (
              <button
                key={preset.sec}
                onClick={() => resetRelaxationTimer(preset.sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  relaxationTimeLeft === preset.sec && !relaxationTimerRunning
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Timer Display */}
        <div className="text-center py-6 bg-slate-50/70 rounded-2xl border border-slate-100">
          <div className="text-5xl font-black tracking-tight text-slate-800">
            {Math.floor(relaxationTimeLeft / 60).toString().padStart(2, '0')}:
            {(relaxationTimeLeft % 60).toString().padStart(2, '0')}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {relaxationTimerRunning ? '🌧️ Ambient Rain Playing • Close your eyes & unwind' : 'Press play to start calming audio session'}
          </p>

          <div className="mt-4 flex justify-center space-x-3">
            <button
              onClick={toggleAmbientRelaxation}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center space-x-1.5 ${
                relaxationTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {relaxationTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{relaxationTimerRunning ? 'Pause Relaxation' : 'Start Audio Relaxation'}</span>
            </button>
            <button
              onClick={() => resetRelaxationTimer(300)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* MINDFULNESS ACTIVITIES & GROUNDING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl shadow-soft space-y-3">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-teal-600" />
            <h4 className="text-sm font-bold text-slate-900">The 5-4-3-2-1 Sensory Grounding Technique</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Use this in examination halls or when pre-exam dread overwhelms your attention:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li><strong>5 Things:</strong> Look around and silently name 5 distinct objects you see.</li>
            <li><strong>4 Things:</strong> Feel 4 sensations (pen in hand, feet on floor, desk texture).</li>
            <li><strong>3 Things:</strong> Listen for 3 subtle ambient sounds (fan hum, page turns).</li>
            <li><strong>2 Things:</strong> Acknowledge 2 smells or scents in the air.</li>
            <li><strong>1 Thing:</strong> Say one true positive anchor: <em>"I am prepared and calm."</em></li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl shadow-soft space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h4 className="text-sm font-bold text-slate-900">Progressive Muscle Relaxation (PMR)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Exam anxiety causes unconscious physical tightening of shoulders and jaw:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li><strong>1. Shoulders:</strong> Shrug your shoulders tightly up to your ears for 5s, then release.</li>
            <li><strong>2. Jaw:</strong> Unclench your teeth and let your tongue rest away from the palate.</li>
            <li><strong>3. Hands:</strong> Clench fists tightly for 5s, then release completely onto your lap.</li>
            <li><strong>4. Exhale:</strong> Let out a long sigh through pursed lips to drop heart rate.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
