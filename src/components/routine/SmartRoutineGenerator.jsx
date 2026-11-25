import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Zap,
  Sliders,
  Calendar,
  Download,
  CheckCircle2,
  Moon,
  Utensils,
  BookOpen,
  Coffee,
  Heart
} from 'lucide-react';
import { generateSmartRoutine } from '../../services/routineGenerator';

export default function SmartRoutineGenerator() {
  const [wakeUpTime, setWakeUpTime] = useState('07:30');
  const [targetBedtime, setTargetBedtime] = useState('23:30');
  const [studyTargetHours, setStudyTargetHours] = useState(6);
  const [examSlot, setExamSlot] = useState('none'); // 'morning' | 'afternoon' | 'none'
  const [generatedRoutine, setGeneratedRoutine] = useState(() =>
    generateSmartRoutine({ wakeUpTime: '07:30', targetBedtime: '23:30', studyTargetHours: 6, examSlot: 'none' })
  );

  const handleGenerate = (e) => {
    e.preventDefault();
    const routine = generateSmartRoutine({
      wakeUpTime,
      targetBedtime,
      studyTargetHours,
      examSlot
    });
    setGeneratedRoutine(routine);
  };

  const applyPreset = (wake, bed, hours) => {
    setWakeUpTime(wake);
    setTargetBedtime(bed);
    setStudyTargetHours(hours);
    const routine = generateSmartRoutine({
      wakeUpTime: wake,
      targetBedtime: bed,
      studyTargetHours: hours,
      examSlot
    });
    setGeneratedRoutine(routine);
  };

  const exportRoutineText = () => {
    const text = generatedRoutine
      .map(b => `${b.time} | ${b.title} [${b.badge}]\n- ${b.description}`)
      .join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamEase_Balanced_Schedule_${wakeUpTime.replace(':', '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                Smart Routine Generator
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Automated Scheduler
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Generates an optimized, balanced 24-hour hour-by-hour exam preparation timetable incorporating sleep protection, meal windows, and cognitive break intervals.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Quick Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset('06:30', '22:30', 6.5)}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            🌅 Early Bird (6:30 AM Wake)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('07:30', '23:30', 6)}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            ⚖️ Standard Balanced (7:30 AM Wake)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('08:30', '00:30', 7)}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            🦉 Moderate Owl (8:30 AM Wake)
          </button>
        </div>
      </div>

      {/* GENERATOR PARAMETERS FORM */}
      <form onSubmit={handleGenerate} className="glass-card p-6 rounded-2xl shadow-soft space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-brand-600" />
          <span>Configure Your Routine Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Wake-Up Time</label>
            <input
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Bedtime</label>
            <input
              type="time"
              value={targetBedtime}
              onChange={(e) => setTargetBedtime(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Study Hours Goal</label>
            <select
              value={studyTargetHours}
              onChange={(e) => setStudyTargetHours(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
            >
              <option value="4">4 Hours (Light Prep / Rest Day)</option>
              <option value="6">6 Hours (Recommended Standard)</option>
              <option value="7.5">7.5 Hours (Intensive Final Review)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Shift Today</label>
            <select
              value={examSlot}
              onChange={(e) => setExamSlot(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
            >
              <option value="none">No Exam (Full Study Day)</option>
              <option value="morning">Morning Paper (09:30 AM)</option>
              <option value="afternoon">Afternoon Paper (02:00 PM)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Protects: <strong>8h Sleep</strong>, <strong>3 Warm Meals</strong>, <strong>2 Mental Breaks</strong>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-sm flex items-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Optimized Schedule</span>
          </button>
        </div>
      </form>

      {/* GENERATED 24-HOUR BALANCED TIMETABLE */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Your 24-Hour Balanced Exam Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Synchronized to your circadian rhythm with mandatory cognitive recovery periods.
            </p>
          </div>

          <button
            onClick={exportRoutineText}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Timetable</span>
          </button>
        </div>

        {/* Timetable Blocks */}
        <div className="space-y-3">
          {generatedRoutine.map((block, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-l-4 border text-xs transition-all shadow-2xs hover:shadow-soft ${block.color}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="font-extrabold text-slate-900 min-w-28 text-xs font-mono">
                    {block.time}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{block.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{block.description}</p>
                  </div>
                </div>

                <span className="self-start sm:self-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-2xs border border-slate-200 shrink-0">
                  {block.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
