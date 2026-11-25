import {
  INITIAL_STUDENT_USER,
  INITIAL_ADMIN_USER,
  INITIAL_SURVEY_RESPONSE,
  INITIAL_SLEEP_RECORDS,
  INITIAL_MEAL_RECORDS,
  INITIAL_MOOD_RECORDS,
  INITIAL_STUDY_TASKS,
  INITIAL_TODAY_CHECKLIST,
  MOCK_ADMIN_SURVEYS
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'examease_user',
  SURVEY: 'examease_survey',
  SLEEP: 'examease_sleep_records',
  MEALS: 'examease_meal_records',
  MOOD: 'examease_mood_records',
  STUDY_TASKS: 'examease_study_tasks',
  CHECKLIST: 'examease_today_checklist',
  ADMIN_SURVEYS: 'examease_admin_surveys',
  EXAM_MODE: 'examease_exam_mode',
  XP_STREAK: 'examease_xp_streak'
};

function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

export const StorageService = {
  // User Authentication
  getUser: () => safeGet(STORAGE_KEYS.USER, INITIAL_STUDENT_USER),
  setUser: (user) => safeSet(STORAGE_KEYS.USER, user),
  clearUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {}
  },

  // Student Survey
  getSurvey: () => safeGet(STORAGE_KEYS.SURVEY, INITIAL_SURVEY_RESPONSE),
  setSurvey: (survey) => {
    safeSet(STORAGE_KEYS.SURVEY, survey);

    // Also sync into admin survey aggregate list
    try {
      const allSurveys = safeGet(STORAGE_KEYS.ADMIN_SURVEYS, MOCK_ADMIN_SURVEYS);
      const currentUser = safeGet(STORAGE_KEYS.USER, INITIAL_STUDENT_USER);
      const newEntry = {
        id: `surv-${Date.now()}`,
        studentName: currentUser.name || 'Anonymous Student',
        institution: currentUser.institution || 'University',
        department: currentUser.degree || 'General',
        sleepHours: Number(survey.sleepHours) || 6,
        bedtime: survey.bedtime || '01:00',
        wakeUpFeeling: survey.wakeUpFeeling || 'fair',
        mealsCount: Number(survey.mealsCount) || 3,
        skipsBreakfast: survey.skipsBreakfast || 'sometimes',
        studyHours: Number(survey.studyHours) || 6,
        breakFrequency: survey.breakFrequency || 'regularly',
        stressLevel: Number(survey.stressLevel) || 6,
        stressTriggers: Array.isArray(survey.stressTriggers) ? survey.stressTriggers : [],
        routineBreakdown: survey.stressLevel >= 8 ? 'High Exam Pressure' : 'Moderate Inconsistency',
        submittedAt: new Date().toISOString().split('T')[0]
      };
      safeSet(STORAGE_KEYS.ADMIN_SURVEYS, [newEntry, ...allSurveys]);
    } catch (e) {
      console.warn('Sync to admin error:', e);
    }
  },

  // Sleep Records
  getSleepRecords: () => safeGet(STORAGE_KEYS.SLEEP, INITIAL_SLEEP_RECORDS),
  addSleepRecord: (record) => {
    const list = safeGet(STORAGE_KEYS.SLEEP, INITIAL_SLEEP_RECORDS);
    const updated = [...list, { ...record, id: `s-${Date.now()}` }];
    safeSet(STORAGE_KEYS.SLEEP, updated);
    return updated;
  },

  // Meal Records
  getMealRecords: () => safeGet(STORAGE_KEYS.MEALS, INITIAL_MEAL_RECORDS),
  saveMealRecords: (records) => safeSet(STORAGE_KEYS.MEALS, records),
  toggleMealToday: (mealKey) => {
    const records = safeGet(STORAGE_KEYS.MEALS, INITIAL_MEAL_RECORDS);
    const todayStr = new Date().toISOString().split('T')[0];
    let todayRecord = records.find(r => r.date === todayStr);

    if (!todayRecord) {
      todayRecord = {
        id: `m-${Date.now()}`,
        date: todayStr,
        breakfast: false,
        lunch: false,
        dinner: false,
        snack: false,
        missedCount: 4,
        notes: ''
      };
      records.push(todayRecord);
    }

    todayRecord[mealKey] = !todayRecord[mealKey];
    // Recalculate missed
    let missed = 0;
    if (!todayRecord.breakfast) missed++;
    if (!todayRecord.lunch) missed++;
    if (!todayRecord.dinner) missed++;
    todayRecord.missedCount = missed;

    safeSet(STORAGE_KEYS.MEALS, [...records]);
    return [...records];
  },

  // Mood Records
  getMoodRecords: () => safeGet(STORAGE_KEYS.MOOD, INITIAL_MOOD_RECORDS),
  addMoodRecord: (moodEntry) => {
    const list = safeGet(STORAGE_KEYS.MOOD, INITIAL_MOOD_RECORDS);
    const updated = [...list, { ...moodEntry, id: `mood-${Date.now()}` }];
    safeSet(STORAGE_KEYS.MOOD, updated);
    return updated;
  },

  // Study Tasks
  getStudyTasks: () => safeGet(STORAGE_KEYS.STUDY_TASKS, INITIAL_STUDY_TASKS),
  saveStudyTasks: (tasks) => safeSet(STORAGE_KEYS.STUDY_TASKS, tasks),

  // Today Checklist
  getChecklist: () => safeGet(STORAGE_KEYS.CHECKLIST, INITIAL_TODAY_CHECKLIST),
  saveChecklist: (checklist) => safeSet(STORAGE_KEYS.CHECKLIST, checklist),

  // Admin Aggregate Surveys
  getAdminSurveys: () => safeGet(STORAGE_KEYS.ADMIN_SURVEYS, MOCK_ADMIN_SURVEYS),
  saveAdminSurveys: (surveys) => safeSet(STORAGE_KEYS.ADMIN_SURVEYS, surveys),

  // Exam Week Mode
  getExamMode: () => safeGet(STORAGE_KEYS.EXAM_MODE, false),
  setExamMode: (val) => safeSet(STORAGE_KEYS.EXAM_MODE, val),

  // Reset to demo defaults
  resetAllToDefaults: () => {
    safeSet(STORAGE_KEYS.USER, INITIAL_STUDENT_USER);
    safeSet(STORAGE_KEYS.SURVEY, INITIAL_SURVEY_RESPONSE);
    safeSet(STORAGE_KEYS.SLEEP, INITIAL_SLEEP_RECORDS);
    safeSet(STORAGE_KEYS.MEALS, INITIAL_MEAL_RECORDS);
    safeSet(STORAGE_KEYS.MOOD, INITIAL_MOOD_RECORDS);
    safeSet(STORAGE_KEYS.STUDY_TASKS, INITIAL_STUDY_TASKS);
    safeSet(STORAGE_KEYS.CHECKLIST, INITIAL_TODAY_CHECKLIST);
    safeSet(STORAGE_KEYS.ADMIN_SURVEYS, MOCK_ADMIN_SURVEYS);
    safeSet(STORAGE_KEYS.EXAM_MODE, false);
  }
};
