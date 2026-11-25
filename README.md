# 🎓 ExamEase – Student Exam Wellness Platform

> **Study Smart. Sleep Well. Stay Healthy.**

ExamEase is a student wellness platform designed to identify exam-week routine breakdowns (sleep deficits, skipped meals, acute stress, and cramming fatigue) and provide immediate, practical micro-interventions.

---

## 🌟 Key Features

### 1. 🛡️ Routine Breakdown Detector (Core Unique Feature)
- Algorithmic analysis of survey baselines and real-time daily logs.
- Detects:
  - **Insufficient Sleep Patterns** (< 6 hours).
  - **Irregular Sleeping Schedules** (frequent bedtimes past 2:00 AM).
  - **Frequently Skipped Meals** (especially morning breakfast).
  - **High Reported Stress** ($\ge 7/10$).
  - **Excessive Study Sessions Without Breaks** (> 8 hours continuous study).
- Generates categorized cards (Critical / Warning) detailing:
  1. The identified pattern.
  2. Cognitive penalty in examination halls (e.g. memory consolidation loss).
  3. One clear, practical recommendation.

### 2. ⚡ Dedicated Exam Week Mode
- One-click toggle in the navigation bar.
- Shifts the platform into an exam survival interface:
  - Highlights exam countdowns and emergency sleep reminders.
  - Prioritizes active recall over passive reading.
  - Immediate access to quick relaxation tools.

### 3. ⏰ Smart Routine Generator
- Generates a customized 24-hour hour-by-hour schedule based on the student's wake-up time, study targets, and exam shifts.
- Ensures protected sleep (8 hours), 3 warm meal windows, and cognitive break intervals.
- Downloadable and exportable timetable.

### 4. 🌙 Circadian Sleep Tracker
- Inputs for bedtime and wake-up time with automatic duration calculation.
- Interactive Recharts bar chart showing 7-day sleep duration with a 7.5h recommended line.
- Sleep Consistency score based on wake-time regularity.
- Science-backed sleep hygiene guidance (10h caffeine curfew, digital sunset).

### 5. 🍲 Student-Friendly Budget Meal Tracker
- 4-slot tracker: Breakfast, Lunch, Brain Snack, and Dinner.
- **Missed Meal Detection**: Alerts when breakfast is skipped.
- **Affordable Indian Student Brain Meals**: Curated recipes under ₹45 / $0.50 with preparation time under 15 minutes (Warm Poha with peanuts, Moong Dal Khichdi, Curd Rice, Yellow Dal Roti, Sprouts Chaat, Banana Peanut Toast).

### 6. 🧘 Stress Monitoring & Animated Box Breathing
- Daily mood check-in with emoji selector and 1–10 stress slider.
- **Interactive Animated Box Breathing**: 4-4-4-4 synchronized pulsating circle with Web Audio API chime sounds.
- **Offline Ambient Rain Sound Generator**: Synthesized calming pink noise for dorms and libraries.
- 5-4-3-2-1 Sensory Grounding and Progressive Muscle Relaxation (PMR) guides.
- Mandatory medical disclaimer with student crisis helpline info (Tele-MANAS: 14416).

### 7. ⏱️ Smart Study Planner & Pomodoro Timer
- Subject-wise task creation with estimated duration and priority tags.
- **Integrated Pomodoro Timer**: 25m Focus / 5m Break / 15m Long Reset with audible bell chimes.
- **Burnout Shield Alert**: Warns if total planned study exceeds 8 hours without breaks.

### 8. 📊 Longitudinal Progress & Analytics
- Recharts visualizations: Sleep vs. Stress correlation line chart, meal completion pie chart, 14-day wellness trajectory.
- **Before vs. After Comparison**: Pre-ExamEase baseline vs. Current 7-day average.
- Downloadable summary report.

### 9. 🏫 University Admin Analytics Portal
- Aggregate metrics: Total submissions, average sleep duration, % skipping meals, average stress index.
- Routine Breakdown distribution chart across student cohorts.
- Student adoption statistics.
- Searchable & filterable student survey responses table.
- **Real CSV Download**: Exports all anonymized student responses for institutional research.

### 10. 🏆 Wellness Streaks & Gamification
- Daily streaks, XP points, and level progression.
- Unlockable achievement badges (Sleep Guardian, Breakfast Champion, Zen Master, Pomodoro Pro, Routine Warrior).
- Achievable Daily Wellness Challenges.

---

## 🛠️ Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom glassmorphism and animations
- **Icons**: Lucide React
- **Analytics Charts**: Recharts
- **Gamification**: Canvas Confetti
- **Audio Synthesis**: Web Audio API (100% offline, zero external audio asset dependencies)
- **Data Persistence**: Offline-first reactive LocalStorage engine + PostgreSQL / Supabase Schema + Firebase Firestore Rules

---

## 🔑 Demo Access & Testing Personas

The application includes frictionless 1-click demo logins on the sign-in modal and in the sidebar persona switcher:

| Persona | Email | Access Level |
|---|---|---|
| **Student** | `student@examease.edu` | Full Student Dashboard, Trackers, Survey, Routine Generator |
| **Admin** | `admin@examease.edu` | Institutional Analytics, Cohort Data Table, CSV Exporter |

*(Password can be any string for demo testing)*

---

## 🚀 Setup & Local Execution

1. **Clone or navigate to the directory**:
   ```bash
   cd C:\Users\visha\.gemini\antigravity\scratch\examease
   ```

2. **Install dependencies** (already installed in this environment):
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🗄️ Database Architecture

- **Supabase / PostgreSQL**: Schema and RLS policies are located in `supabase/schema.sql`.
- **Firebase Firestore**: Security rules are located in `firebase/firestore.rules`.
- Environment template: `.env.example`.

---

## 📦 Deployment Instructions

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify via drag & drop or Netlify CLI
```
