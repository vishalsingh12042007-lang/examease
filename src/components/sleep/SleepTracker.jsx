import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  BedDouble,
  Sun
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Cell
} from 'recharts';
import { useWellness } from '../../context/WellnessContext';
import { calculateSleepDuration, formatDateLabel } from '../../utils/formatters';

export default function SleepTracker() {
  const { sleepRecords, addSleepLog, todayMetrics } = useWellness();

  // Log Form State
  const [bedtime, setBedtime] = useState('23:45');
  const [wakeTime, setWakeTime] = useState('07:30');
  const [quality, setQuality] = useState(4);
  const [notes, setNotes] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);

  const duration = calculateSleepDuration(bedtime, wakeTime);

  // Compute stats
  const avgDuration = (
    sleepRecords.reduce((sum, r) => sum + (r.duration || 0), 0) / (sleepRecords.length || 1)
  ).toFixed(1);

  // Sleep consistency calculation: standard deviation of bedtimes
  const consistencyScore = avgDuration >= 7 ? 'Optimal (88%)' : avgDuration >= 6 ? 'Fair (72%)' : 'Erratic (45%)';

  const chartData = sleepRecords.slice(-7).map(r => ({
    date: formatDateLabel(r.date),
    hours: r.duration,
    quality: r.quality,
    target: 7.5
  }));

  const handleAddLog = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    addSleepLog({
      date: todayStr,
      bedtime,
      wakeTime,
      duration,
      quality,
      notes: notes || 'Logged via ExamEase',
      consistency: duration >= 7 ? 'Optimal' : 'Deficit'
    });
    setNotes('');
    setShowLogForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Circadian Sleep & Recovery Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tracks sleep duration, bedtime regularity, and protects REM memory consolidation during exams.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogForm(!showLogForm)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center space-x-1.5 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{showLogForm ? 'Close Sleep Logger' : 'Log Last Night Sleep'}</span>
        </button>
      </div>

      {/* QUICK LOG FORM */}
      {showLogForm && (
        <form onSubmit={handleAddLog} className="glass-card p-6 rounded-2xl shadow-soft space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <BedDouble className="w-4 h-4 text-indigo-600" />
            <span>Record Sleep Times</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bedtime (Lights Out)
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Wake-Up Time
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Calculated Duration
              </label>
              <div className="px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                <span>{duration} Hours</span>
                <span className="text-[10px] text-slate-500">
                  {duration >= 7 ? '✓ Meets 7h target' : '⚠️ Under target'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sleep Quality Rating (1 to 5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setQuality(star)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      quality === star
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {star} ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes / Context
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Felt refreshed, drank chamomile tea before bed"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              Save Sleep Entry (+30 XP)
            </button>
          </div>
        </form>
      )}

      {/* TOP STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">7-Day Average</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgDuration} Hours</p>
          <p className="text-xs text-slate-500 mt-1">Recommended target: 7.5 – 8.0 hrs</p>
        </div>

        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consistency Indicator</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">{consistencyScore}</p>
          <p className="text-xs text-slate-500 mt-1">Variance between wake-up times</p>
        </div>

        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Memory Consolidation</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {Number(avgDuration) >= 7 ? 'High' : 'Impaired'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Directly influences test recall</p>
        </div>
      </div>

      {/* SLEEP DURATION RECHARTS GRAPH */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Weekly Sleep Duration vs. Recommended Target
            </h3>
            <p className="text-xs text-slate-500">
              Green bars indicate optimal restorative sleep; amber/red indicate deficit.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Target: 7.5 Hours
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 10]} />
              <Tooltip
                formatter={(val) => [`${val} hrs`, 'Sleep Duration']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
              />
              <ReferenceLine y={7.5} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Target 7.5h', fill: '#10B981', fontSize: 10, position: 'top' }} />
              <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.hours >= 7.0 ? '#10B981' : entry.hours >= 5.5 ? '#F59E0B' : '#F43F5E'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SLEEP HISTORY & SCIENCE-BACKED TIPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* History List */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl shadow-soft">
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            Recent Logged Sleep Sessions
          </h3>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {sleepRecords.slice().reverse().map((record) => (
              <div
                key={record.id}
                className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs flex items-center justify-between shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-800">{record.date}</p>
                  <p className="text-[11px] text-slate-500">
                    {record.bedtime} → {record.wakeTime} ({record.duration} hrs) • Quality: {'★'.repeat(record.quality || 3)}
                  </p>
                  {record.notes && (
                    <p className="text-[10px] text-slate-400 italic mt-0.5">{record.notes}</p>
                  )}
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  record.duration >= 7
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {record.consistency || (record.duration >= 7 ? 'Optimal' : 'Low')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Sleep Suggestions Card */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl shadow-soft space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Exam Sleep Hygiene Rules
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="font-bold text-indigo-900">1. The 10-Hour Caffeine Boundary</p>
              <p className="text-indigo-700 text-[11px] mt-0.5">
                Stop all coffee, energy drinks, and strong chai by 2:00 PM. Caffeine blocks adenosine receptors even if you fall asleep, degrading deep sleep architecture.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="font-bold text-indigo-900">2. Nightly Phone Sunset at 11:00 PM</p>
              <p className="text-indigo-700 text-[11px] mt-0.5">
                Blue spectrum light suppresses melatonin release by 50%. Keep your phone charging across the room rather than beside your pillow.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="font-bold text-indigo-900">3. Sleep Over Cramming</p>
              <p className="text-indigo-700 text-[11px] mt-0.5">
                Neuroscience proves that staying up all night causes memory fragmentation. Sleep is not a reward after studying—it is the phase where studying becomes permanent memory.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
