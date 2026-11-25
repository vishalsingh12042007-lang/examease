import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Moon,
  Utensils,
  BookOpen,
  Info,
  Zap
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

export default function RoutineBreakdownAlerts({ setCurrentView }) {
  const { routineAlerts, todayMetrics, surveyData } = useWellness();

  const criticalCount = routineAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = routineAlerts.filter(a => a.severity === 'warning').length;

  const handleActionClick = (category) => {
    if (category === 'sleep') setCurrentView('sleep');
    else if (category === 'nutrition') setCurrentView('meals');
    else if (category === 'stress') setCurrentView('stress');
    else if (category === 'study') setCurrentView('study');
    else setCurrentView('recommendations');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-rose-100 text-rose-700">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                Routine Breakdown Detector
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Core Feature
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuously cross-analyzes your survey baselines and live logs (sleep, meals, stress, focus) to detect exam-week behavioral breakdowns before burnout hits.
            </p>
          </div>
        </div>

        {/* Status Count Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>{criticalCount} Critical Breakdowns</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{warningCount} Warnings</span>
          </div>
          <div className="text-slate-400 text-xs">
            Based on {surveyData ? 'Active Survey & 7-Day Logs' : 'Default Student Seed'}
          </div>
        </div>
      </div>

      {/* NON-DIAGNOSTIC NOTICE */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center space-x-2">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          <strong>Important:</strong> ExamEase detects routine breakdown patterns based on self-reported inputs. It does not provide medical diagnoses or psychological evaluations.
        </span>
      </div>

      {/* BREAKDOWN ALERTS CARDS */}
      <div className="space-y-4">
        {routineAlerts.map((alert) => {
          const isCritical = alert.severity === 'critical';
          const isWarning = alert.severity === 'warning';
          const isSuccess = alert.severity === 'success';

          return (
            <div
              key={alert.id}
              className={`p-6 rounded-3xl border transition-all shadow-soft hover:shadow-soft-hover ${
                isCritical
                  ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                  : isWarning
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`p-3 rounded-2xl shrink-0 mt-0.5 text-white shadow-sm ${
                      isCritical ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                  >
                    {isCritical ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : isWarning ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-200/80 text-rose-900'
                            : isWarning
                            ? 'bg-amber-200/80 text-amber-900'
                            : 'bg-emerald-200/80 text-emerald-900'
                        }`}
                      >
                        {alert.severity} Priority
                      </span>
                      <span className="text-xs font-semibold text-slate-500 capitalize">
                        {alert.category} breakdown
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold tracking-tight">
                      {alert.title}
                    </h3>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {alert.message}
                    </p>

                    {alert.cognitiveImpact && (
                      <div className="p-3 rounded-xl bg-white/80 border border-slate-200/60 text-xs">
                        <strong className="text-slate-900">Cognitive & Exam Hall Penalty: </strong>
                        <span className="text-slate-700">{alert.cognitiveImpact}</span>
                      </div>
                    )}

                    {/* Single Practical Action Item */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 flex items-start space-x-2">
                      <span className="text-base shrink-0">⚡</span>
                      <div>
                        <strong className="text-brand-700">Immediate Practical Recommendation: </strong>
                        <span>{alert.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                {alert.actionLabel && (
                  <button
                    onClick={() => handleActionClick(alert.category)}
                    className="self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm shrink-0 flex items-center space-x-1.5 transition-all"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
