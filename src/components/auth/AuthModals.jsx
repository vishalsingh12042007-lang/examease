import React, { useState } from 'react';
import { Mail, Lock, User, School, Calendar, ArrowRight, Sparkles, Shield, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

export default function AuthModals() {
  const { authModal, setAuthModal, login, loginDemoStudent, loginDemoAdmin, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [examStartDate, setExamStartDate] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isOpen = authModal.isOpen;
  const mode = authModal.mode;

  const handleClose = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
    setError('');
    setSuccessMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      handleClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !name) {
      setError('Please fill in your name, email, and password.');
      return;
    }
    const res = register({
      name,
      email,
      institution: institution || 'College of Engineering',
      degree: degree || 'B.Tech Computer Science',
      examStartDate: examStartDate || '2026-12-05'
    });
    if (res.success) {
      handleClose();
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email to receive recovery instructions.');
      return;
    }
    setSuccessMsg(`A password reset link has been dispatched to ${email}. You can also sign in with the instant demo buttons below.`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        mode === 'login'
          ? 'Sign In to ExamEase'
          : mode === 'register'
          ? 'Create Student Account'
          : 'Reset Password'
      }
      maxWidth="max-w-md"
    >
      {/* Quick 1-Click Demo Logins Banner */}
      <div className="mb-5 p-3.5 bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 rounded-xl">
        <p className="text-xs font-bold text-brand-900 flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Frictionless Prototype Testing:
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={loginDemoStudent}
            className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 hover:border-brand-300 shadow-2xs transition-all flex items-center justify-center space-x-1"
          >
            <User className="w-3.5 h-3.5" />
            <span>1-Click Student</span>
          </button>
          <button
            type="button"
            onClick={loginDemoAdmin}
            className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-2xs transition-all flex items-center justify-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>1-Click Admin</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
          {successMsg}
        </div>
      )}

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student / Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@examease.edu or admin@examease.edu"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setAuthModal({ isOpen: true, mode: 'forgot' })}
                className="text-[11px] font-semibold text-brand-600 hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-slate-500 pt-2">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
              className="font-bold text-brand-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      )}

      {/* REGISTER FORM */}
      {mode === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@college.edu"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="NIT / Apex Univ"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Next Exam Date</label>
              <input
                type="date"
                value={examStartDate}
                onChange={(e) => setExamStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Course</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="B.Tech Computer Science, Semester 6"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Create Account & Start Wellness Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-slate-500 pt-1">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
              className="font-bold text-brand-600 hover:underline"
            >
              Sign in here
            </button>
          </p>
        </form>
      )}

      {/* FORGOT PASSWORD FORM */}
      {mode === 'forgot' && (
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <p className="text-xs text-slate-600">
            Enter your college email address and we'll generate an instant recovery magic link.
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@examease.edu"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all"
          >
            Send Reset Instructions
          </button>

          <p className="text-center text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
              className="font-bold text-brand-600 hover:underline"
            >
              ← Back to Sign In
            </button>
          </p>
        </form>
      )}
    </Modal>
  );
}
