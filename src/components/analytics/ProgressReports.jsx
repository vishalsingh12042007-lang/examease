import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Moon,
  Utensils,
  HeartPulse,
  BookOpen,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useWellness } from '../../context/WellnessContext';
import { formatDateLabel } from '../../utils/formatters';

export default function ProgressReports() {
  const { sleepRecords, mealRecords, moodRecords, studyTasks, surveyData, wellnessScore } = useWellness();
  const [reportDateRange, setReportDateRange] = useState('7days');

  // Chart 1: Sleep vs Stress Correlation Data
  const correlationData = [
    { day: '19 Nov', sleep: 5.7, stress: 8, study: 7.5 },
    { day: '20 Nov', sleep: 5.2, stress: 9, study: 8.5 },
    { day: '21 Nov', sleep: 5.5, stress: 7, study: 9.0 },
    { day: '22 Nov', sleep: 6.5, stress: 6, study: 6.5 },
    { day: '23 Nov', sleep: 5.5, stress: 8, study: 8.0 },
    { day: '24 Nov', sleep: 7.0, stress: 5, study: 6.0 },
    { day: '25 Nov', sleep: 7.2, stress: 4, study: 5.5 }
  ];

  // Chart 2: Meal Completion distribution
  const mealPieData = [
    { name: 'Completed Meals', value: 18, color: '#10B981' },
    { name: 'Skipped Breakfast', value: 3, color: '#F59E0B' },
    { name: 'Delayed Lunch/Dinner', value: 4, color: '#F43F5E' }
  ];

  // Chart 3: Wellness Score Progression over 14 Days
  const wellnessProgressionData = [
    { date: 'Day 1', score: 52, label: 'Pre-ExamEase Baseline' },
    { date: 'Day 3', score: 58, label: 'Started Sleep Log' },
    { date: 'Day 5', score: 64, label: 'Added Poha Breakfast' },
    { date: 'Day 7', score: 60, label: 'Mock Test Stress' },
    { date: 'Day 9', score: 71, label: 'Used Box Breathing' },
    { date: 'Day 11', score: 78, label: 'Pomodoro Implemented' },
    { date: 'Day 14', score: wellnessScore, label: 'Current Routine' }
  ];

  // Before vs After comparison stats
  const beforeStats = {
    sleep: surveyData ? surveyData.sleepHours : 5.0,
    stress: surveyData ? surveyData.stressLevel : 8.5,
    studyHours: surveyData ? surveyData.studyHours : 9.0,
    wellnessScore: 52
  };

  const afterStats = {
    sleep: 7.1,
    stress: 4.5,
    studyHours: 5.8,
    wellnessScore: wellnessScore
  };

  const exportReport = () => {
    const reportText = `
========================================
EXAMEASE - STUDENT WELLNESS & PROGRESS REPORT
========================================
Generated on: ${new Date().toLocaleDateString()}
Student: Prototype Student Demo Account

1. BEFORE VS. AFTER RECOVERY METRICS:
- Sleep Duration: ${beforeStats.sleep} hrs/night -> ${afterStats.sleep} hrs/night (+${(afterStats.sleep - beforeStats.sleep).toFixed(1)} hrs)
- Stress Level: ${beforeStats.stress}/10 -> ${afterStats.stress}/10 (-${(beforeStats.stress - afterStats.stress).toFixed(1)} points)
- Study Hours Load: ${beforeStats.studyHours} hrs -> ${afterStats.studyHours} hrs (Stabilized with Pomodoro intervals)
- Daily Wellness Score: ${beforeStats.wellnessScore} -> ${afterStats.wellnessScore}/100 (+${afterStats.wellnessScore - beforeStats.wellnessScore} pts)

2. CORE FINDINGS:
- Consistent 7h+ sleep improved daytime alertness and eliminated afternoon mental crashes.
- Breakfast consistency reduced mid-morning brain fog.
- 4-4-4-4 Box Breathing kept acute panic spikes under control prior to practice papers.

========================================
ExamEase: Study Smart. Sleep Well. Stay Healthy.
========================================
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamEase_Student_Progress_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Personal Progress & Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizes longitudinal trends across sleep duration, meal consistency, stress reduction, and study balance.
            </p>
          </div>
        </div>

        <button
          onClick={exportReport}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm flex items-center space-x-1.5 transition-all self-start sm:self-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary Report</span>
        </button>
      </div>

      {/* BEFORE VS. AFTER COMPARISON CARDS */}
      <div className="glass-card p-6 rounded-3xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Before vs. After ExamEase Intervention
            </h3>
            <p className="text-xs text-slate-500">
              Comparison between your initial survey baseline and recent 7-day tracked performance.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Significant Progress
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Sleep Compare */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nightly Sleep</span>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-xs text-slate-400 line-through">{beforeStats.sleep} hrs</div>
              <div className="text-xl font-extrabold text-indigo-600 flex items-center">
                <span>{afterStats.sleep} hrs</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5 text-emerald-500" />
              </div>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">+2.1 hrs restorative sleep</p>
          </div>

          {/* Stress Compare */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stress Index</span>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-xs text-slate-400 line-through">{beforeStats.stress} / 10</div>
              <div className="text-xl font-extrabold text-rose-600 flex items-center">
                <span>{afterStats.stress} / 10</span>
                <ArrowDownRight className="w-4 h-4 ml-0.5 text-emerald-500" />
              </div>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">-4.0 pts anxiety reduction</p>
          </div>

          {/* Study Load Compare */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Study Structure</span>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-xs text-slate-400 line-through">{beforeStats.studyHours}h marathon</div>
              <div className="text-xl font-extrabold text-blue-600 flex items-center">
                <span>{afterStats.studyHours}h focus</span>
              </div>
            </div>
            <p className="text-[10px] text-blue-600 font-semibold mt-1">High retention Pomodoros</p>
          </div>

          {/* Wellness Score Compare */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Balance</span>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-xs text-slate-400 line-through">{beforeStats.wellnessScore} pts</div>
              <div className="text-xl font-extrabold text-emerald-600 flex items-center">
                <span>{afterStats.wellnessScore} pts</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5 text-emerald-500" />
              </div>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Optimal exam readiness</p>
          </div>

        </div>
      </div>

      {/* CHART ROW: SLEEP VS STRESS CORRELATION & MEAL STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sleep Duration vs Stress Line Chart */}
        <div className="lg:col-span-8 glass-card p-6 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Sleep Duration vs. Reported Stress Correlation
              </h3>
              <p className="text-xs text-slate-500">
                Demonstrating that higher sleep duration directly correlates with lower exam anxiety.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={correlationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep Hours"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  name="Stress Level (1-10)"
                  stroke="#F43F5E"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meal Pie Chart */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Meal Completion Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Weekly nutritional adherence
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mealPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {mealPieData.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
            {mealPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-800">{item.value} times</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 14-DAY WELLNESS SCORE PROGRESSION LINE CHART */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <h3 className="text-sm font-bold text-slate-800 mb-1">
          14-Day Daily Wellness Score Trajectory
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Progression from initial survey baseline towards optimal exam readiness.
        </p>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wellnessProgressionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="progressionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[40, 100]} />
              <Tooltip
                formatter={(val, name, item) => [`${val} / 100`, item.payload.label]}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                name="Score"
                stroke="#7C3AED"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#progressionGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
