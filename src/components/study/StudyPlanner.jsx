import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Trash2,
  Calendar,
  Volume2
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';
import { playGentleBell } from '../../utils/audio';

export default function StudyPlanner() {
  const { studyTasks, addStudyTask, toggleStudyTask, deleteStudyTask } = useWellness();

  // Task Creation Form State
  const [newSubject, setNewSubject] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [estMinutes, setEstMinutes] = useState(45);
  const [priority, setPriority] = useState('medium');
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessionsCount, setCompletedSessionsCount] = useState(0);

  // Pomodoro Timer Countdown Effect
  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      playGentleBell(587, 2.5); // Clear celebratory chime

      if (timerMode === 'focus') {
        const nextSessions = completedSessionsCount + 1;
        setCompletedSessionsCount(nextSessions);
        if (nextSessions % 4 === 0) {
          setTimerMode('longBreak');
          setSecondsLeft(15 * 60);
        } else {
          setTimerMode('shortBreak');
          setSecondsLeft(5 * 60);
        }
      } else {
        setTimerMode('focus');
        setSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, timerMode, completedSessionsCount]);

  const switchMode = (mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    if (mode === 'focus') setSecondsLeft(25 * 60);
    if (mode === 'shortBreak') setSecondsLeft(5 * 60);
    if (mode === 'longBreak') setSecondsLeft(15 * 60);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newSubject || !newTitle) return;
    addStudyTask({
      subject: newSubject,
      title: newTitle,
      estMinutes: Number(estMinutes),
      priority
    });
    setNewTitle('');
    setShowTaskForm(false);
  };

  // Calculate total study load today
  const totalPlannedMinutes = studyTasks.reduce((sum, t) => sum + (t.estMinutes || 0), 0);
  const totalCompletedMinutes = studyTasks.filter(t => t.completed).reduce((sum, t) => sum + (t.estMinutes || 0), 0);
  const isOverloading = totalPlannedMinutes > 480; // > 8 hours

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Balanced Study & Pomodoro Planner
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Prioritizes structured active recall while enforcing mandatory mental rest intervals.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center space-x-1.5 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{showTaskForm ? 'Close Task Creator' : 'Add Subject Task'}</span>
        </button>
      </div>

      {/* BURNOUT SHIELD WARNING (If planned study > 8 hours) */}
      {isOverloading && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 shadow-soft flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Burnout Risk: Excessive Daily Study Load Planned ({Math.round(totalPlannedMinutes / 60)} hrs)
            </h4>
            <p className="text-xs text-slate-700 mt-1">
              Planning more than 8 hours of intense study without proportional breaks triggers mental exhaustion and decreases exam retention by 40%.
            </p>
            <p className="text-xs font-semibold text-rose-700 mt-1.5">
              💡 ExamEase Recommendation: Trim secondary tasks and insert 15-minute physical breaks between major subjects.
            </p>
          </div>
        </div>
      )}

      {/* INTEGRATED POMODORO TIMER CARD */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Cognitive Focus System
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Active Focus & Recovery Intervals
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex space-x-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => switchMode('focus')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'focus' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              25m Focus Block
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'shortBreak' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5m Short Rest
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'longBreak' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              15m Reset
            </button>
          </div>
        </div>

        {/* Digital Timer Face */}
        <div className={`text-center py-8 rounded-3xl border transition-all ${
          timerMode === 'focus'
            ? 'bg-blue-50/60 border-blue-100'
            : timerMode === 'shortBreak'
            ? 'bg-teal-50/60 border-teal-100'
            : 'bg-purple-50/60 border-purple-100'
        }`}>
          <div className="text-6xl font-black tracking-tight text-slate-900">
            {Math.floor(secondsLeft / 60).toString().padStart(2, '0')}:
            {(secondsLeft % 60).toString().padStart(2, '0')}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-2">
            {timerMode === 'focus'
              ? '🎯 Deep Subject Revision • Put your phone away'
              : '🌱 Rest Window • Stand up, stretch your neck, sip water'}
          </p>

          {/* Controls */}
          <div className="mt-6 flex justify-center space-x-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center space-x-2 ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-gradient-to-r from-blue-600 to-brand-600 hover:from-blue-700 hover:to-brand-700'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Timer' : 'Start Focus Session'}</span>
            </button>
            <button
              onClick={() => switchMode(timerMode)}
              className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            Focus sessions finished today: <strong className="text-slate-800">{completedSessionsCount}</strong>
          </div>
        </div>
      </div>

      {/* NEW TASK CREATION FORM */}
      {showTaskForm && (
        <form onSubmit={handleCreateTask} className="glass-card p-6 rounded-2xl shadow-soft space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800">Create Study Objective</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Course</label>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g. Data Structures / Calculus"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Revision Goal</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Solve 4 Binary Tree questions"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Min)</label>
                <input
                  type="number"
                  min="15"
                  max="180"
                  step="15"
                  value={estMinutes}
                  onChange={(e) => setEstMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Add to Study Schedule
            </button>
          </div>
        </form>
      )}

      {/* TODAY'S SUBJECT TASKS LIST */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Today's Subject Objectives
            </h3>
            <p className="text-xs text-slate-500">
              {studyTasks.filter(t => t.completed).length} of {studyTasks.length} objectives completed ({Math.round(totalCompletedMinutes / 60)} hrs done)
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            Total Planned: {(totalPlannedMinutes / 60).toFixed(1)} hrs
          </span>
        </div>

        <div className="space-y-2.5">
          {studyTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                task.completed
                  ? 'bg-slate-50/80 border-slate-200 text-slate-400 line-through'
                  : 'bg-white border-slate-200 text-slate-800 shadow-2xs hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleStudyTask(task.id)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 bg-white hover:border-emerald-400'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{task.subject}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                      task.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : task.priority === 'medium'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{task.title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-slate-400 font-medium text-[11px]">
                  {task.estMinutes} mins
                </span>
                <button
                  onClick={() => deleteStudyTask(task.id)}
                  className="p-1 rounded-lg text-slate-300 hover:text-rose-500 transition-colors"
                  title="Remove Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
