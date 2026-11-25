/**
 * Realistic seed data for ExamEase demo experience.
 */

export const INITIAL_STUDENT_USER = {
  id: 'student-demo-1',
  name: 'Aarav Patel',
  email: 'student@examease.edu',
  role: 'student',
  institution: 'National Institute of Technology',
  degree: 'B.Tech Computer Science & Engineering',
  semester: 'Semester 6',
  examStartDate: '2026-12-02',
  examName: 'End-Term Theory Examinations',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  xp: 380,
  streakDays: 4,
  level: 3,
  completedChallenges: ['challenge-water', 'challenge-sunlight']
};

export const INITIAL_ADMIN_USER = {
  id: 'admin-demo-1',
  name: 'Dr. Meera Sharma',
  email: 'admin@examease.edu',
  role: 'admin',
  department: 'Student Affairs & Psychological Wellness Cell',
  institution: 'Apex University Consortium'
};

export const INITIAL_SURVEY_RESPONSE = {
  submittedAt: '2026-11-23T10:30:00Z',
  sleepHours: 5.5,
  bedtime: '02:30',
  wakeUpFeeling: 'groggy',
  mealsCount: 2,
  skipsBreakfast: 'frequently',
  studyHours: 8.5,
  breakFrequency: 'rarely',
  stressLevel: 8,
  stressTriggers: ['Syllabus volume', 'Fear of underperforming', 'Lack of sleep'],
  routineBarriers: 'Late-night cramming with friends and ordering junk food when stressed.'
};

export const INITIAL_SLEEP_RECORDS = [
  { id: 's-1', date: '2026-11-19', bedtime: '01:45', wakeTime: '07:30', duration: 5.75, quality: 3, consistency: 'Fair', notes: 'Studied Operating Systems till late' },
  { id: 's-2', date: '2026-11-20', bedtime: '02:30', wakeTime: '07:45', duration: 5.25, quality: 2, consistency: 'Poor', notes: 'Phone scrolling + coffee' },
  { id: 's-3', date: '2026-11-21', bedtime: '03:00', wakeTime: '08:30', duration: 5.5, quality: 2, consistency: 'Poor', notes: 'Heavy headache upon waking' },
  { id: 's-4', date: '2026-11-22', bedtime: '01:15', wakeTime: '07:45', duration: 6.5, quality: 4, consistency: 'Good', notes: 'Took 10 min warm shower' },
  { id: 's-5', date: '2026-11-23', bedtime: '02:30', wakeTime: '08:00', duration: 5.5, quality: 3, consistency: 'Fair', notes: 'Woke up groggy' },
  { id: 's-6', date: '2026-11-24', bedtime: '00:45', wakeTime: '07:45', duration: 7.0, quality: 4, consistency: 'Very Good', notes: 'ExamEase guided breathing before bed' },
  { id: 's-7', date: '2026-11-25', bedtime: '00:30', wakeTime: '07:45', duration: 7.25, quality: 5, consistency: 'Optimal', notes: 'Felt well-rested and alert' }
];

export const INITIAL_MEAL_RECORDS = [
  { id: 'm-1', date: '2026-11-21', breakfast: false, lunch: true, dinner: true, snack: false, missedCount: 2, notes: 'Skipped breakfast for morning mock test' },
  { id: 'm-2', date: '2026-11-22', breakfast: false, lunch: true, dinner: true, snack: true, missedCount: 1, notes: 'Just had cold chai' },
  { id: 'm-3', date: '2026-11-23', breakfast: true, lunch: true, dinner: false, snack: false, missedCount: 2, notes: 'Crammed through dinner time' },
  { id: 'm-4', date: '2026-11-24', breakfast: true, lunch: true, dinner: true, snack: true, missedCount: 0, notes: 'Ate warm poha & dal roti' },
  { id: 'm-5', date: '2026-11-25', breakfast: true, lunch: true, dinner: true, snack: false, missedCount: 1, notes: 'Current day tracking' }
];

export const INITIAL_MOOD_RECORDS = [
  { id: 'mood-1', date: '2026-11-20', mood: 'anxious', stressLevel: 8, energy: 4, notes: 'Overwhelmed with database normalization chapters' },
  { id: 'mood-2', date: '2026-11-21', mood: 'stressed', stressLevel: 9, energy: 3, notes: 'Panic spike after seeing peer progress' },
  { id: 'mood-3', date: '2026-11-22', mood: 'neutral', stressLevel: 7, energy: 5, notes: 'Calmer after writing out study timetable' },
  { id: 'mood-4', date: '2026-11-23', mood: 'stressed', stressLevel: 8, energy: 4, notes: 'Exam timetable released' },
  { id: 'mood-5', date: '2026-11-24', mood: 'good', stressLevel: 5, energy: 7, notes: 'Finished 3 Pomodoro sessions + breathing' },
  { id: 'mood-6', date: '2026-11-25', mood: 'great', stressLevel: 4, energy: 8, notes: 'Feeling confident and well-fueled' }
];

export const INITIAL_STUDY_TASKS = [
  { id: 't-1', subject: 'Computer Networks', title: 'Revise TCP/IP Handshake & Congestion Control', estMinutes: 50, completed: true, date: '2026-11-25', priority: 'high' },
  { id: 't-2', subject: 'Database Management', title: 'Practice B+ Trees and Transaction ACID properties', estMinutes: 45, completed: true, date: '2026-11-25', priority: 'medium' },
  { id: 't-3', subject: 'Algorithms', title: 'Solve 3 Dynamic Programming problems (Knapsack/LCS)', estMinutes: 60, completed: false, date: '2026-11-25', priority: 'high' },
  { id: 't-4', subject: 'Operating Systems', title: 'Quick summary notes: Virtual Memory & Page Replacement', estMinutes: 30, completed: false, date: '2026-11-25', priority: 'low' },
  { id: 't-5', subject: 'Wellness Interval', title: '15-min sunlight walk & hydrate with lemon water', estMinutes: 15, completed: false, date: '2026-11-25', priority: 'high' }
];

export const INITIAL_TODAY_CHECKLIST = [
  { id: 'chk-1', text: '7+ hours of uninterrupted sleep', completed: true, category: 'sleep' },
  { id: 'chk-2', text: 'Eat a nutritious breakfast before 9:30 AM', completed: true, category: 'nutrition' },
  { id: 'chk-3', text: 'Hydrate with at least 2L of water', completed: false, category: 'hydration' },
  { id: 'chk-4', text: 'Complete at least 1 Pomodoro session with breaks', completed: true, category: 'study' },
  { id: 'chk-5', text: '5-minute Box Breathing relaxation session', completed: false, category: 'stress' },
  { id: 'chk-6', text: 'No phone screen 30 minutes before sleep', completed: false, category: 'sleep' }
];

/**
 * 25 realistic student survey submissions for the Admin Analytics Dashboard
 */
export const MOCK_ADMIN_SURVEYS = [
  {
    id: 'surv-101',
    studentName: 'Aarav Patel',
    institution: 'NIT Trichy',
    department: 'CSE',
    sleepHours: 5.5,
    bedtime: '02:30',
    wakeUpFeeling: 'groggy',
    mealsCount: 2,
    skipsBreakfast: 'frequently',
    studyHours: 8.5,
    breakFrequency: 'rarely',
    stressLevel: 8,
    stressTriggers: ['Syllabus volume', 'Fear of underperforming'],
    routineBreakdown: 'Critical Sleep Deficit & Skipped Breakfast',
    submittedAt: '2026-11-23'
  },
  {
    id: 'surv-102',
    studentName: 'Pooja Iyer',
    institution: 'BITS Pilani',
    department: 'Electrical',
    sleepHours: 4.5,
    bedtime: '03:30',
    wakeUpFeeling: 'exhausted',
    mealsCount: 2,
    skipsBreakfast: 'daily',
    studyHours: 10.0,
    breakFrequency: 'rarely',
    stressLevel: 9,
    stressTriggers: ['Fear of failure', 'Family expectations', 'Sleep deficit'],
    routineBreakdown: 'Severe Exam Burnout Risk',
    submittedAt: '2026-11-23'
  },
  {
    id: 'surv-103',
    studentName: 'Rohan Deshmukh',
    institution: 'IIT Bombay',
    department: 'Mechanical',
    sleepHours: 6.5,
    bedtime: '01:30',
    wakeUpFeeling: 'refreshed',
    mealsCount: 3,
    skipsBreakfast: 'sometimes',
    studyHours: 6.0,
    breakFrequency: 'regularly',
    stressLevel: 5,
    stressTriggers: ['Syllabus volume'],
    routineBreakdown: 'Moderate Sleep Inconsistency',
    submittedAt: '2026-11-22'
  },
  {
    id: 'surv-104',
    studentName: 'Ananya Sen',
    institution: 'St. Xavier’s College',
    department: 'Economics',
    sleepHours: 5.0,
    bedtime: '02:45',
    wakeUpFeeling: 'groggy',
    mealsCount: 2,
    skipsBreakfast: 'frequently',
    studyHours: 9.0,
    breakFrequency: 'rarely',
    stressLevel: 8,
    stressTriggers: ['Time management', 'Procrastination aftermath'],
    routineBreakdown: 'Frequent Breakfast Skipping & High Stress',
    submittedAt: '2026-11-22'
  },
  {
    id: 'surv-105',
    studentName: 'Vikramaditya Roy',
    institution: 'Delhi University',
    department: 'Commerce',
    sleepHours: 7.5,
    bedtime: '23:45',
    wakeUpFeeling: 'refreshed',
    mealsCount: 4,
    skipsBreakfast: 'never',
    studyHours: 5.5,
    breakFrequency: 'frequently',
    stressLevel: 3,
    stressTriggers: ['Minor nervousness'],
    routineBreakdown: 'None (Healthy Baseline)',
    submittedAt: '2026-11-21'
  },
  {
    id: 'surv-106',
    studentName: 'Sneha Kulkarni',
    institution: 'COEP Pune',
    department: 'Information Tech',
    sleepHours: 5.0,
    bedtime: '03:00',
    wakeUpFeeling: 'exhausted',
    mealsCount: 2,
    skipsBreakfast: 'daily',
    studyHours: 9.5,
    breakFrequency: 'rarely',
    stressLevel: 9,
    stressTriggers: ['Exam pressure', 'Heavy caffeine dependency'],
    routineBreakdown: 'Severe Sleep Deficit & Meal Skips',
    submittedAt: '2026-11-21'
  },
  {
    id: 'surv-107',
    studentName: 'Kabir Nambiar',
    institution: 'Manipal Univ',
    department: 'Biotechnology',
    sleepHours: 6.0,
    bedtime: '01:00',
    wakeUpFeeling: 'groggy',
    mealsCount: 3,
    skipsBreakfast: 'sometimes',
    studyHours: 7.0,
    breakFrequency: 'regularly',
    stressLevel: 6,
    stressTriggers: ['Lab practical evaluations'],
    routineBreakdown: 'Mild Irregular Rhythm',
    submittedAt: '2026-11-20'
  },
  {
    id: 'surv-108',
    studentName: 'Mehak Gill',
    institution: 'Panjab University',
    department: 'Law',
    sleepHours: 4.0,
    bedtime: '04:00',
    wakeUpFeeling: 'exhausted',
    mealsCount: 1,
    skipsBreakfast: 'daily',
    studyHours: 11.0,
    breakFrequency: 'never',
    stressLevel: 10,
    stressTriggers: ['Vast case law memorization', 'Severe panic'],
    routineBreakdown: 'Critical Emergency Burnout Pattern',
    submittedAt: '2026-11-20'
  },
  {
    id: 'surv-109',
    studentName: 'Devansh Verma',
    institution: 'SRM Institute',
    department: 'CSE',
    sleepHours: 7.0,
    bedtime: '00:30',
    wakeUpFeeling: 'refreshed',
    mealsCount: 3,
    skipsBreakfast: 'sometimes',
    studyHours: 6.5,
    breakFrequency: 'regularly',
    stressLevel: 4,
    stressTriggers: ['Presentation fear'],
    routineBreakdown: 'Balanced Routine',
    submittedAt: '2026-11-19'
  },
  {
    id: 'surv-110',
    studentName: 'Tanvi Mehra',
    institution: 'Symbiosis Pune',
    department: 'Business Analytics',
    sleepHours: 5.5,
    bedtime: '02:00',
    wakeUpFeeling: 'groggy',
    mealsCount: 2,
    skipsBreakfast: 'frequently',
    studyHours: 8.0,
    breakFrequency: 'rarely',
    stressLevel: 7,
    stressTriggers: ['Math fear', 'Competitive ranking'],
    routineBreakdown: 'Cramming without breaks',
    submittedAt: '2026-11-19'
  },
  {
    id: 'surv-111',
    studentName: 'Farhan Ali',
    institution: 'Aligarh Muslim Univ',
    department: 'Civil Engg',
    sleepHours: 5.2,
    bedtime: '02:15',
    wakeUpFeeling: 'exhausted',
    mealsCount: 2,
    skipsBreakfast: 'daily',
    studyHours: 9.0,
    breakFrequency: 'rarely',
    stressLevel: 8,
    stressTriggers: ['Late night study marathons'],
    routineBreakdown: 'Skipped Meals & Sleep Inversion',
    submittedAt: '2026-11-18'
  },
  {
    id: 'surv-112',
    studentName: 'Ishaan Gupta',
    institution: 'IIIT Hyderabad',
    department: 'AI & Data Science',
    sleepHours: 4.8,
    bedtime: '03:15',
    wakeUpFeeling: 'exhausted',
    mealsCount: 2,
    skipsBreakfast: 'frequently',
    studyHours: 10.5,
    breakFrequency: 'rarely',
    stressLevel: 9,
    stressTriggers: ['Project deadlines overlapping exams'],
    routineBreakdown: 'Extreme Cramming Pattern',
    submittedAt: '2026-11-18'
  }
];
