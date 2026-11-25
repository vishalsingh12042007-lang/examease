import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Bookmark,
  Clock,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

export default function SmartRecommendations({ setCurrentView }) {
  const { recommendations, completeChallenge } = useWellness();
  const [completedRecs, setCompletedRecs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const toggleCompleted = (id) => {
    setCompletedRecs(prev => {
      const exists = prev.includes(id);
      if (!exists) {
        completeChallenge('rec-bonus', 30);
        return [...prev, id];
      }
      return prev.filter(i => i !== id);
    });
  };

  const filteredRecs = categoryFilter === 'all'
    ? recommendations
    : recommendations.filter(r => r.category === categoryFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-600 text-white shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Personalized Wellness Recommendations
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Dynamically derived from your recorded sleep duration, missed meal logs, self-reported stress, and study durations.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-1.5 self-start sm:self-center">
          {['all', 'sleep', 'nutrition', 'stress', 'study'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-brand-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RECOMMENDATIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecs.map((rec) => {
          const isDone = completedRecs.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`glass-card p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-soft hover:shadow-soft-hover ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200 opacity-80'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      rec.priority === 'critical'
                        ? 'bg-rose-100 text-rose-800'
                        : rec.priority === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {rec.priority} priority
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize font-medium">
                    {rec.category} recommendation
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                  {rec.title}
                </h3>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  <strong>Why it matters:</strong> {rec.reason}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 mb-3">
                  <strong className="text-brand-700">Action Step: </strong>
                  {rec.action}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-bold">
                  ⚡ {rec.impact}
                </span>

                <button
                  onClick={() => toggleCompleted(rec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Implemented ✓' : 'Mark Implemented'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
