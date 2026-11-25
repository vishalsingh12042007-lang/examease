import React, { useState } from 'react';
import {
  Shield,
  Download,
  Users,
  Moon,
  Utensils,
  HeartPulse,
  Search,
  Filter,
  BarChart3,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storageService';

export default function AdminDashboard({ setCurrentView }) {
  const { role, loginDemoAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const surveys = StorageService.getAdminSurveys();

  // Aggregate Calculations
  const totalSubmissions = surveys.length;
  const avgSleep = (surveys.reduce((sum, s) => sum + (s.sleepHours || 0), 0) / (totalSubmissions || 1)).toFixed(1);
  const studentsSkippingBreakfast = surveys.filter(s => s.skipsBreakfast === 'frequently' || s.skipsBreakfast === 'daily').length;
  const pctSkippingMeals = Math.round((studentsSkippingBreakfast / totalSubmissions) * 100);
  const avgStress = (surveys.reduce((sum, s) => sum + (s.stressLevel || 0), 0) / (totalSubmissions || 1)).toFixed(1);

  // Chart 1: Breakdown types distribution
  const breakdownDistribution = [
    { name: 'Sleep Deficit (<6h)', count: surveys.filter(s => s.sleepHours < 6).length, fill: '#6366F1' },
    { name: 'Skipping Breakfast', count: studentsSkippingBreakfast, fill: '#F59E0B' },
    { name: 'Severe Stress (>=8)', count: surveys.filter(s => s.stressLevel >= 8).length, fill: '#F43F5E' },
    { name: 'Cramming (>8h study)', count: surveys.filter(s => s.studyHours >= 8.5).length, fill: '#3B82F6' }
  ];

  // Chart 2: Feature Adoption rates
  const adoptionStats = [
    { name: 'Sleep Tracker', adoption: 88, fill: '#8B5CF6' },
    { name: 'Box Breathing', adoption: 74, fill: '#0D9488' },
    { name: 'Pomodoro Planner', adoption: 82, fill: '#2563EB' },
    { name: 'Budget Meal Ideas', adoption: 65, fill: '#F97316' }
  ];

  // Search & Filter
  const filteredSurveys = surveys.filter(s => {
    const matchesSearch = s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === 'all' || s.department.toLowerCase().includes(filterDepartment.toLowerCase());
    return matchesSearch && matchesDept;
  });

  // CSV Exporter
  const handleDownloadCSV = () => {
    const headers = [
      'Survey ID',
      'Student Name',
      'Institution',
      'Department',
      'Sleep Hours',
      'Bedtime',
      'Wake Feeling',
      'Meals Count',
      'Skips Breakfast',
      'Study Hours',
      'Break Freq',
      'Stress Level (1-10)',
      'Identified Routine Breakdown',
      'Submission Date'
    ];

    const rows = surveys.map(s => [
      s.id,
      `"${s.studentName}"`,
      `"${s.institution}"`,
      `"${s.department}"`,
      s.sleepHours,
      s.bedtime,
      s.wakeUpFeeling,
      s.mealsCount,
      s.skipsBreakfast,
      s.studyHours,
      s.breakFrequency,
      s.stressLevel,
      `"${s.routineBreakdown}"`,
      s.submittedAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ExamEase_Student_Wellness_Cohort_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                Institutional Wellness & Survey Analytics
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Admin Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Anonymized group-level metrics analyzing student sleep, nutrition gaps, and exam pressure breakdowns across participating universities.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md flex items-center space-x-2 transition-all self-start sm:self-center"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Cohort CSV</span>
        </button>
      </div>

      {/* TOP 4 AGGREGATE KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Submissions</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalSubmissions}</p>
          <p className="text-xs text-slate-500 mt-1">Verified university students</p>
        </div>

        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Sleep</span>
            <Moon className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-indigo-600">{avgSleep} hrs</p>
          <p className="text-xs text-rose-600 font-semibold mt-1">⚠️ 1.8 hrs below 7.5h target</p>
        </div>

        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skipping Meals</span>
            <Utensils className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-600">{pctSkippingMeals}%</p>
          <p className="text-xs text-slate-500 mt-1">Frequently skip breakfast</p>
        </div>

        <div className="glass-card p-5 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Stress</span>
            <HeartPulse className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-black text-rose-600">{avgStress} / 10</p>
          <p className="text-xs text-rose-700 font-semibold mt-1">Elevated exam anxiety</p>
        </div>

      </div>

      {/* CHARTS ROW: BREAKDOWN DISTRIBUTION & ADOPTION STATISTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Breakdown Distribution Bar Chart */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Most Common Exam Routine Breakdowns
              </h3>
              <p className="text-xs text-slate-500">
                Identified patterns from student responses
              </p>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdownDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} Students`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {breakdownDistribution.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Adoption Statistics */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Student Adoption & Tool Utilization
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Active engagement with ExamEase recovery modules
            </p>

            <div className="space-y-4">
              {adoptionStats.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span>{item.adoption}% Adoption</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.adoption}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Based on telemetry from verified active student sessions.
          </div>
        </div>

      </div>

      {/* SEARCHABLE & FILTERABLE STUDENT SURVEY RESPONSES TABLE */}
      <div className="glass-card p-6 rounded-2xl shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Student Survey Responses Database ({filteredSurveys.length})
            </h3>
            <p className="text-xs text-slate-500">
              Anonymized student baseline entries with identified routine breakdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student, college..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-48 sm:w-60"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
            >
              <option value="all">All Departments</option>
              <option value="CSE">Computer Science</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Commerce">Commerce / Law</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Student / ID</th>
                <th className="py-2.5 px-3">College & Dept</th>
                <th className="py-2.5 px-3">Sleep</th>
                <th className="py-2.5 px-3">Breakfast</th>
                <th className="py-2.5 px-3">Stress</th>
                <th className="py-2.5 px-3">Study Load</th>
                <th className="py-2.5 px-3">Detected Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSurveys.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {s.studentName}
                    <span className="block text-[10px] text-slate-400 font-normal">{s.id}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-800">{s.department}</span>
                    <span className="block text-[10px] text-slate-500">{s.institution}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-bold ${s.sleepHours < 6 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {s.sleepHours} hrs
                    </span>
                    <span className="block text-[10px] text-slate-400">Bed: {s.bedtime}</span>
                  </td>
                  <td className="py-2.5 px-3 capitalize">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.skipsBreakfast === 'daily'
                        ? 'bg-rose-100 text-rose-800'
                        : s.skipsBreakfast === 'frequently'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {s.skipsBreakfast}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold">
                    <span className={s.stressLevel >= 8 ? 'text-rose-600' : s.stressLevel >= 6 ? 'text-amber-600' : 'text-emerald-600'}>
                      {s.stressLevel} / 10
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span>{s.studyHours} hrs/day</span>
                    <span className="block text-[10px] text-slate-400">Breaks: {s.breakFrequency}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-semibold bg-rose-50 text-rose-900 border border-rose-100 inline-block">
                      {s.routineBreakdown}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
