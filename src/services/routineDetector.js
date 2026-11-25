/**
 * Routine Breakdown Detector
 *
 * Evaluates student tracking data and survey answers to detect unhealthy patterns
 * like sleep deficits, late circadian shifts, skipped meals, high stress, and marathon cramming.
 *
 * IMPORTANT: This module offers behavioral wellness alerts only and does not diagnose
 * medical or psychiatric conditions.
 */

export function detectRoutineBreakdowns({ surveyData, sleepRecords, mealRecords, moodRecords, studyTasks }) {
  const alerts = [];

  // 1. Analyze Sleep Patterns
  const recentSleep = sleepRecords && sleepRecords.length > 0 ? sleepRecords.slice(-5) : [];
  if (recentSleep.length > 0) {
    const avgSleep = recentSleep.reduce((sum, r) => sum + (r.duration || 0), 0) / recentSleep.length;
    const lateNightsCount = recentSleep.filter(r => {
      if (!r.bedtime) return false;
      const [h] = r.bedtime.split(':').map(Number);
      return h >= 2 && h <= 5;
    }).length;

    // Check for severe sleep deficit
    if (avgSleep < 6.0) {
      alerts.push({
        id: 'breakdown-sleep-deficit',
        category: 'sleep',
        severity: 'critical',
        title: 'Insufficient Sleep Pattern Detected',
        message: `Your average sleep duration over recent nights is ${avgSleep.toFixed(1)} hours, which is below the 7–8 hour target needed for memory consolidation.`,
        cognitiveImpact: 'Sleep deprivation directly impairs memory recall, working memory retrieval, and problem-solving speed in examination halls by up to 35%.',
        recommendation: 'Anchor a non-negotiable bedtime tonight at 11:30 PM. Set an alarm 45 minutes prior to power down all screens.',
        icon: 'Moon',
        actionLabel: 'Adjust Sleep Goal'
      });
    }

    // Check for irregular sleep schedule
    if (lateNightsCount >= 2) {
      alerts.push({
        id: 'breakdown-irregular-sleep',
        category: 'sleep',
        severity: 'warning',
        title: 'Your Sleep Schedule Appears Irregular',
        message: `You went to bed past 2:00 AM on ${lateNightsCount} of your recent logged nights, shifting your internal circadian clock.`,
        cognitiveImpact: 'Irregular sleep times reduce REM sleep density, causing morning grogginess (sleep inertia) during morning exam papers.',
        recommendation: 'Fix your morning wake-up time within a 30-minute window regardless of bedtime to reset your circadian rhythm.',
        icon: 'Clock',
        actionLabel: 'Set Consistent Wake Time'
      });
    }
  } else if (surveyData && surveyData.sleepHours < 6) {
    alerts.push({
      id: 'breakdown-survey-sleep',
      category: 'sleep',
      severity: 'critical',
      title: 'Survey Alert: Insufficient Sleep Reported',
      message: `You reported sleeping only ${surveyData.sleepHours} hours during exam week.`,
      cognitiveImpact: 'Persistent short sleep suppresses neurotransmitter recovery and triggers exam panic spirals.',
      recommendation: 'Protect a mandatory 7-hour sleep window on your calendar as you would an important exam paper.',
      icon: 'Moon',
      actionLabel: 'View Sleep Tips'
    });
  }

  // 2. Analyze Meal Habits (especially Breakfast)
  const recentMeals = mealRecords && mealRecords.length > 0 ? mealRecords.slice(-5) : [];
  if (recentMeals.length > 0) {
    const skippedBreakfastCount = recentMeals.filter(m => m.breakfast === false).length;
    const totalMissed = recentMeals.reduce((sum, m) => sum + (m.missedCount || 0), 0);

    if (skippedBreakfastCount >= 2) {
      alerts.push({
        id: 'breakdown-skipped-breakfast',
        category: 'nutrition',
        severity: 'warning',
        title: 'You Have Missed Breakfast Several Times This Week',
        message: `Breakfast was skipped on ${skippedBreakfastCount} tracked days. Studying on an empty stomach depletes blood glucose.`,
        cognitiveImpact: 'The brain uses 20% of your metabolic glucose. Skipping morning nourishment causes mid-morning attention drift and irritability.',
        recommendation: 'Keep a quick 5-minute breakfast on hand: warm poha, a banana with peanut butter, or boiled eggs with warm water.',
        icon: 'Utensils',
        actionLabel: 'Explore 5-Min Student Meals'
      });
    } else if (totalMissed >= 3) {
      alerts.push({
        id: 'breakdown-missed-meals',
        category: 'nutrition',
        severity: 'warning',
        title: 'Irregular Meal Intervals Detected',
        message: 'Multiple meals have been delayed or skipped over the past few days during revision.',
        cognitiveImpact: 'Unstable blood sugar levels produce sudden afternoon fatigue and synthetic cravings for sugary energy drinks.',
        recommendation: 'Schedule two fixed 30-minute meal alarms in your phone at 1:00 PM (Lunch) and 8:30 PM (Dinner).',
        icon: 'Utensils',
        actionLabel: 'Set Meal Reminders'
      });
    }
  } else if (surveyData && (surveyData.skipsBreakfast === 'frequently' || surveyData.skipsBreakfast === 'daily')) {
    alerts.push({
      id: 'breakdown-survey-breakfast',
      category: 'nutrition',
      severity: 'warning',
      title: 'Survey Alert: Frequent Breakfast Skipping',
      message: 'Your baseline survey indicates you frequently or daily skip breakfast during exam weeks.',
      cognitiveImpact: 'Depriving neural pathways of morning glycogen leads to lower test performance on morning shifts.',
      recommendation: 'Prepare easy overnight oats or stock bananas and nuts for instant morning nutrition.',
      icon: 'Utensils',
      actionLabel: 'View Quick Recipes'
    });
  }

  // 3. Analyze Stress Levels
  const latestMood = moodRecords && moodRecords.length > 0 ? moodRecords[moodRecords.length - 1] : null;
  const currentStress = latestMood ? latestMood.stressLevel : (surveyData ? surveyData.stressLevel : 5);

  if (currentStress >= 7) {
    alerts.push({
      id: 'breakdown-high-stress',
      category: 'stress',
      severity: currentStress >= 9 ? 'critical' : 'warning',
      title: 'Your Reported Stress Level Is Elevated',
      message: `Current stress is recorded at ${currentStress}/10. High sustained cortisol impairs prefrontal cortex decision making.`,
      cognitiveImpact: 'Severe stress narrows attention onto anxiety rather than the study material, causing "mind blanking" on test day.',
      recommendation: 'Take an immediate 5-minute pause right now to practice Box Breathing (4 seconds in, 4 hold, 4 out, 4 hold).',
      icon: 'HeartPulse',
      actionLabel: 'Start 3-Min Breathing'
    });
  }

  // 4. Analyze Study Cramming vs. Breaks
  const totalStudyMinutes = studyTasks ? studyTasks.reduce((sum, t) => sum + (t.completed ? t.estMinutes : 0), 0) : 0;
  const breakFrequency = surveyData ? surveyData.breakFrequency : 'regularly';

  if (totalStudyMinutes > 360 || (surveyData && surveyData.studyHours >= 9 && breakFrequency === 'rarely')) {
    alerts.push({
      id: 'breakdown-cramming-burnout',
      category: 'study',
      severity: 'warning',
      title: 'Excessive Continuous Study Sessions Detected',
      message: `You have planned or logged extensive study hours (${Math.round(totalStudyMinutes / 60)} hrs) with minimal designated rest periods.`,
      cognitiveImpact: 'After 90 minutes of continuous focus, cognitive diminishing returns set in. Retention drops precipitously without mental breaks.',
      recommendation: 'Switch to Pomodoro cycles: 25 minutes of deep focus followed by 5 minutes of standing, stretching, or looking out a window.',
      icon: 'AlertTriangle',
      actionLabel: 'Start Pomodoro Timer'
    });
  }

  // 5. Positive Reinforcement if no breakdowns found
  if (alerts.length === 0) {
    alerts.push({
      id: 'breakdown-healthy',
      category: 'overall',
      severity: 'success',
      title: 'Exam Routine Is Well-Balanced!',
      message: 'Your sleep, meals, and focus sessions are currently within healthy, sustainable parameters for optimal exam performance.',
      cognitiveImpact: 'Consistent routines promote neural plasticity, sharper recall, and high emotional resilience.',
      recommendation: 'Keep maintaining this steady cadence. Remember to drink water regularly throughout the afternoon.',
      icon: 'CheckCircle',
      actionLabel: 'Keep Going'
    });
  }

  return alerts;
}

/**
 * Calculates a unified Wellness Score out of 100 based on multi-dimensional metrics
 */
export function calculateWellnessScore({ sleepHours = 7, mealsCompleted = 3, stressLevel = 5, studyHours = 6, breaksTaken = 3 }) {
  // 1. Sleep score (30 points max: 7-8 hours is 30, drops if < 6 or > 10)
  let sleepScore = 0;
  if (sleepHours >= 7 && sleepHours <= 8.5) {
    sleepScore = 30;
  } else if (sleepHours >= 6) {
    sleepScore = 22;
  } else if (sleepHours >= 5) {
    sleepScore = 14;
  } else {
    sleepScore = 6;
  }

  // 2. Nutrition score (25 points max: 3-4 meals is 25, 2 meals is 15, 1 meal is 5)
  let nutritionScore = 0;
  if (mealsCompleted >= 3) {
    nutritionScore = 25;
  } else if (mealsCompleted === 2) {
    nutritionScore = 15;
  } else {
    nutritionScore = 6;
  }

  // 3. Stress score (25 points max: stress 1-3 is 25, 4-6 is 18, 7-8 is 10, 9-10 is 4)
  let stressScore = 0;
  if (stressLevel <= 3) {
    stressScore = 25;
  } else if (stressLevel <= 5) {
    stressScore = 20;
  } else if (stressLevel <= 7) {
    stressScore = 12;
  } else {
    stressScore = 4;
  }

  // 4. Study balance score (20 points max: balanced study 4-7h with breaks is 20; 8h+ without breaks drops)
  let studyScore = 0;
  if (studyHours <= 7 && breaksTaken >= 2) {
    studyScore = 20;
  } else if (studyHours <= 8) {
    studyScore = 15;
  } else if (studyHours > 9) {
    studyScore = 8; // penalty for extreme cramming
  } else {
    studyScore = 14;
  }

  const total = Math.min(100, Math.max(10, sleepScore + nutritionScore + stressScore + studyScore));
  return Math.round(total);
}
