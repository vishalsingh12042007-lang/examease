import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { INITIAL_STUDENT_USER, INITIAL_ADMIN_USER } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => StorageService.getUser());
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' }); // 'login' | 'register' | 'forgot'

  useEffect(() => {
    if (currentUser) {
      StorageService.setUser(currentUser);
    }
  }, [currentUser]);

  const loginDemoStudent = () => {
    setCurrentUser(INITIAL_STUDENT_USER);
    StorageService.setUser(INITIAL_STUDENT_USER);
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const loginDemoAdmin = () => {
    setCurrentUser(INITIAL_ADMIN_USER);
    StorageService.setUser(INITIAL_ADMIN_USER);
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      loginDemoAdmin();
      return { success: true, role: 'admin' };
    }
    const studentUser = {
      ...INITIAL_STUDENT_USER,
      email: email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase()
    };
    setCurrentUser(studentUser);
    StorageService.setUser(studentUser);
    setAuthModal({ isOpen: false, mode: 'login' });
    return { success: true, role: 'student' };
  };

  const register = (data) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name || 'New Student',
      email: data.email,
      role: 'student',
      institution: data.institution || 'University',
      degree: data.degree || 'Undergraduate',
      semester: data.semester || 'Semester 1',
      examStartDate: data.examStartDate || '2026-12-10',
      examName: data.examName || 'Upcoming Exams',
      xp: 100,
      streakDays: 1,
      level: 1,
      completedChallenges: []
    };
    setCurrentUser(newUser);
    StorageService.setUser(newUser);
    setAuthModal({ isOpen: false, mode: 'login' });
    return { success: true };
  };

  const logout = () => {
    StorageService.clearUser();
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => {
      const next = { ...prev, ...updates };
      StorageService.setUser(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser ? currentUser.role : null,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser ? currentUser.role === 'admin' : false,
        login,
        loginDemoStudent,
        loginDemoAdmin,
        register,
        logout,
        updateProfile,
        authModal,
        setAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
