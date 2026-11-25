import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StorageService } from '../services/storageService';
import { detectRoutineBreakdowns, calculateWellnessScore } from '../services/routineDetector';
import { generatePersonalizedRecommendations } from '../services/recommendationEngine';
import { BADGES } from '../data/challenges';

const WellnessContext = createContext();

export function WellnessProvider({ children }) {
  const [surveyData, setSurveyData] = useState(() => StorageService.getSurvey());
  const [sleepRecords, setSleepRecords] = useState(() => StorageService.getSleepRecords());
  const [mealRecords, setMealRecords] = useState(() => StorageService.getMealRecords());
  const [moodRecords, setMoodRecords] = useState(() => StorageService.getMoodRecords());
  const [studyTasks, setStudyTasks] = useState(() => StorageService.getStudyTasks());
  const [checklist, setChecklist] = useState(() => StorageService.getChecklist());
  const [examMode, setExamModeState] = useState(() => StorageService.getExamMode());
  const [xp, setXp] = useState(380);
  const [completedChallenges, setCompletedChallenges] = useState(['challenge-water', 'challenge-sunlight']);

  // Dynamic Routine Breakdown Alerts
  const routineAlerts = useMemo(() => {
    return detectRoutineBreakdowns({
      surveyData,
      sleepRecords,
      mealRecords,
      moodRecords,
      studyTasks
    });
  }, [surveyData, sleepRecords, mealRecords, moodRecords, studyTasks]);

  // Dynamic Today Metrics
  const todayMetrics = useMemo(() => {
    // Latest sleep
    const latestSleep = sleepRecords.length > 0 ? sleepRecords[sleepRecords.length - 1] : null;
    const sleepDuration = latestSleep ? latestSleep.duration : (surveyData ? surveyData.sleepHours : 7);

    // Latest meal
    const todayStr = new Date().toISOString().split('T')[0];
    const todayMeal = mealRecords.find(m => m.date === todayStr) || mealRecords[mealRecords.length - 1] || {};
    let completedMealsCount = 0;
    if (todayMeal.breakfast) completedMealsCount++;
    if (todayMeal.lunch) completedMealsCount++;
    if (todayMeal.dinner) completedMealsCount++;
    if (todayMeal.snack) completedMealsCount++;

    // Latest mood
    const latestMood = moodRecords.length > 0 ? moodRecords[moodRecords.length - 1] : null;
    const stressLevel = latestMood ? latestMood.stressLevel : (surveyData ? surveyData.stressLevel : 5);

    // Study minutes completed
    const studyHoursCompleted = studyTasks
      .filter(t => t.completed)
      .reduce((sum, t) => sum + (t.estMinutes || 0), 0) / 60;

    return {
      sleepDuration,
      completedMealsCount,
      missedBreakfast: todayMeal.breakfast === false,
      stressLevel,
      studyHours: Number(studyHoursCompleted.toFixed(1)),
      latestBedtime: latestSleep ? latestSleep.bedtime : (surveyData ? surveyData.bedtime : '00:30')
    };
  }, [sleepRecords, mealRecords, moodRecords, studyTasks, surveyData]);

  // Dynamic Unified Wellness Score
  const wellnessScore = useMemo(() => {
    return calculateWellnessScore({
      sleepHours: todayMetrics.sleepDuration,
      mealsCompleted: todayMetrics.completedMealsCount,
      stressLevel: todayMetrics.stressLevel,
      studyHours: todayMetrics.studyHours || 5,
      breaksTaken: 3
    });
  }, [todayMetrics]);

  // Dynamic Personalized Recommendations
  const recommendations = useMemo(() => {
    return generatePersonalizedRecommendations({
      sleepHours: todayMetrics.sleepDuration,
      latestBedtime: todayMetrics.latestBedtime,
      mealsCompleted: todayMetrics.completedMealsCount,
      missedBreakfast: todayMetrics.missedBreakfast,
      stressLevel: todayMetrics.stressLevel,
      studyHours: todayMetrics.studyHours,
      examWeekMode: examMode
    });
  }, [todayMetrics, examMode]);

  // Unlocked Badges based on streak & achievements
  const unlockedBadges = useMemo(() => {
    return BADGES.map(badge => {
      let isUnlocked = false;
      if (badge.id === 'badge-sleep-guardian' && todayMetrics.sleepDuration >= 7) isUnlocked = true;
      if (badge.id === 'badge-breakfast-champ' && !todayMetrics.missedBreakfast) isUnlocked = true;
      if (badge.id === 'badge-zen-master' && todayMetrics.stressLevel <= 5) isUnlocked = true;
      if (badge.id === 'badge-pomodoro-pro' && studyTasks.some(t => t.completed)) isUnlocked = true;
      if (badge.id === 'badge-routine-warrior' && wellnessScore >= 75) isUnlocked = true;
      return { ...badge, unlocked: isUnlocked };
    });
  }, [todayMetrics, studyTasks, wellnessScore]);

  // Handlers
  const toggleExamMode = () => {
    setExamModeState(prev => {
      const next = !prev;
      StorageService.setExamMode(next);
      return next;
    });
  };

  const submitSurvey = (newSurvey) => {
    setSurveyData(newSurvey);
    StorageService.setSurvey(newSurvey);
    triggerCelebration();
  };

  const addSleepLog = (entry) => {
    const updated = StorageService.addSleepRecord(entry);
    setSleepRecords(updated);
    addXp(30);
  };

  const toggleMeal = (mealKey) => {
    const updated = StorageService.toggleMealToday(mealKey);
    setMealRecords(updated);
    addXp(15);
  };

  const logMood = (mood, stressLevel, notes = '') => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newEntry = {
      date: todayStr,
      mood,
      stressLevel: Number(stressLevel),
      energy: 7,
      notes
    };
    const updated = StorageService.addMoodRecord(newEntry);
    setMoodRecords(updated);
    addXp(25);
  };

  const addStudyTask = (task) => {
    const newTask = {
      id: `t-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      completed: false,
      ...task
    };
    const updated = [...studyTasks, newTask];
    setStudyTasks(updated);
    StorageService.saveStudyTasks(updated);
  };

  const toggleStudyTask = (taskId) => {
    const updated = studyTasks.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) {
          addXp(35);
          triggerCelebration();
        }
        return { ...t, completed: nextState };
      }
      return t;
    });
    setStudyTasks(updated);
    StorageService.saveStudyTasks(updated);
  };

  const deleteStudyTask = (taskId) => {
    const updated = studyTasks.filter(t => t.id !== taskId);
    setStudyTasks(updated);
    StorageService.saveStudyTasks(updated);
  };

  const toggleChecklistItem = (checkId) => {
    const updated = checklist.map(c => {
      if (c.id === checkId) {
        const next = !c.completed;
        if (next) addXp(20);
        return { ...c, completed: next };
      }
      return c;
    });
    setChecklist(updated);
    StorageService.saveChecklist(updated);
  };

  const completeChallenge = (challengeId, xpPoints = 40) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      addXp(xpPoints);
      triggerCelebration();
    }
  };

  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#7C3AED', '#2563EB', '#0D9488', '#F59E0B']
      });
    } catch {}
  };

  const resetAllData = () => {
    StorageService.resetAllToDefaults();
    setSurveyData(StorageService.getSurvey());
    setSleepRecords(StorageService.getSleepRecords());
    setMealRecords(StorageService.getMealRecords());
    setMoodRecords(StorageService.getMoodRecords());
    setStudyTasks(StorageService.getStudyTasks());
    setChecklist(StorageService.getChecklist());
    setExamModeState(false);
  };

  return (
    <WellnessContext.Provider
      value={{
        surveyData,
        sleepRecords,
        mealRecords,
        moodRecords,
        studyTasks,
        checklist,
        examMode,
        routineAlerts,
        recommendations,
        todayMetrics,
        wellnessScore,
        xp,
        unlockedBadges,
        completedChallenges,
        toggleExamMode,
        submitSurvey,
        addSleepLog,
        toggleMeal,
        logMood,
        addStudyTask,
        toggleStudyTask,
        deleteStudyTask,
        toggleChecklistItem,
        completeChallenge,
        resetAllData
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
}
