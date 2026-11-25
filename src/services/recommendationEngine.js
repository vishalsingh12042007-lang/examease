/**
 * Personalized Wellness Recommendation Engine
 * Dynamically generates practical, actionable recommendations tailored to
 * the student's actual logged sleep, meal, stress, and study metrics.
 */

export function generatePersonalizedRecommendations({
  sleepHours = 7,
  latestBedtime = '01:00',
  mealsCompleted = 3,
  missedBreakfast = false,
  stressLevel = 5,
  studyHours = 6,
  examWeekMode = false
}) {
  const recommendations = [];

  // Sleep Recommendations
  if (sleepHours < 6.5) {
    recommendations.push({
      id: 'rec-sleep-curfew',
      category: 'sleep',
      priority: 'high',
      title: 'Enforce a 2:00 PM Caffeine Curfew',
      reason: `Your average sleep is currently ${sleepHours} hours. Caffeine consumed in late afternoon has a 6-hour half-life, preventing deep non-REM restorative sleep.`,
      action: 'Replace evening coffee/energy drinks with warm herbal chai, water, or warm milk.',
      impact: '+45 mins deeper sleep cycle',
      timeToImplement: 'Today at 2:00 PM'
    });
    recommendations.push({
      id: 'rec-sleep-alarm',
      category: 'sleep',
      priority: 'high',
      title: 'Set a "Go to Bed" Phone Alarm',
      reason: `Late bedtimes (${latestBedtime}) often happen because of continuous revision momentum.`,
      action: 'Set an alarm for 11:00 PM titled "Power Down for Exam Memory Consolidation".',
      impact: 'Protects hippocampus memory transfer',
      timeToImplement: 'Immediate'
    });
  } else {
    recommendations.push({
      id: 'rec-sleep-maintain',
      category: 'sleep',
      priority: 'medium',
      title: 'Maintain Your Solid Sleep Foundation',
      reason: 'Your 7+ hours of sleep are giving you a measurable cognitive advantage over sleep-deprived peers.',
      action: 'Keep your room cool and dark to maximize REM dreaming phase where concepts solidify.',
      impact: 'Peak alertness during exams',
      timeToImplement: 'Tonight'
    });
  }

  // Nutrition Recommendations
  if (missedBreakfast || mealsCompleted < 3) {
    recommendations.push({
      id: 'rec-nutr-breakfast',
      category: 'nutrition',
      priority: 'high',
      title: 'Fuel Up with 5-Minute Student Breakfasts',
      reason: 'Missing morning meals forces your brain to operate in starvation mode, spiking cortisol and inducing brain fog.',
      action: 'Try warm Poha with roasted peanuts or banana with peanut butter on whole wheat toast.',
      impact: 'Steady 3-hour focus boost without sugar crashes',
      timeToImplement: 'Tomorrow morning'
    });
    recommendations.push({
      id: 'rec-nutr-water',
      category: 'nutrition',
      priority: 'medium',
      title: 'Desktop Water Bottle Rule',
      reason: 'Even mild dehydration (1-2%) drops working memory efficiency by 15%.',
      action: 'Keep a 1-liter water bottle on your study desk. Drink 2 full bottles before sunset.',
      impact: 'Prevents midday headaches and fatigue',
      timeToImplement: 'Right now'
    });
  } else {
    recommendations.push({
      id: 'rec-nutr-light',
      category: 'nutrition',
      priority: 'low',
      title: 'Light Dinner for Restful Sleep',
      reason: 'Heavy, oily late-night meals force digestion to compete with sleep quality.',
      action: 'Choose comfort food like warm Moong Dal Khichdi or Curd Rice 2 hours before bed.',
      impact: 'Smoother sleep onset',
      timeToImplement: 'Tonight'
    });
  }

  // Stress & Mental Balance Recommendations
  if (stressLevel >= 7) {
    recommendations.push({
      id: 'rec-stress-box-breath',
      category: 'stress',
      priority: 'critical',
      title: 'Reset Fight-or-Flight with Box Breathing',
      reason: `Elevated stress (${stressLevel}/10) stimulates the sympathetic nervous system and triggers mind-blanking.`,
      action: 'Use the ExamEase animated breathing tool for 3 minutes: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
      impact: 'Lowers heart rate and re-engages prefrontal cortex in 180 seconds',
      timeToImplement: 'Immediate'
    });
    recommendations.push({
      id: 'rec-stress-perspective',
      category: 'stress',
      priority: 'high',
      title: 'The 5-4-3-2-1 Grounding Practice',
      reason: 'Grounding anchors racing thoughts back into physical reality when exam worry spirals.',
      action: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 positive affirmation.',
      impact: 'Stops acute anticipatory anxiety',
      timeToImplement: 'Whenever tension peaks'
    });
  } else {
    recommendations.push({
      id: 'rec-stress-mindset',
      category: 'stress',
      priority: 'medium',
      title: 'Daily Micro-Mindfulness Check-In',
      reason: 'Your stress is well managed. Proactive micro-breaks prevent cumulative end-of-week burnout.',
      action: 'Take 2 minutes after completing each study chapter to gaze out a window and relax your jaw.',
      impact: 'Sustained endurance throughout exam week',
      timeToImplement: 'Between study blocks'
    });
  }

  // Study Balance & Cramming Protection
  if (studyHours > 7) {
    recommendations.push({
      id: 'rec-study-intervals',
      category: 'study',
      priority: 'high',
      title: 'Break Marathon Study into Pomodoro Chunks',
      reason: `Studying ${studyHours} hours continuously causes diminishing mental returns and eye strain.`,
      action: 'Cap study sessions at 45 minutes, followed by a mandatory 5-minute physical stand-and-stretch.',
      impact: 'Retains 40% more information per hour',
      timeToImplement: 'Next study session'
    });
    recommendations.push({
      id: 'rec-study-eye-reset',
      category: 'study',
      priority: 'medium',
      title: 'The 20-20-20 Vision Rule',
      reason: 'Prolonged reading and screen staring triggers tension headaches misattributed to study stress.',
      action: 'Every 20 minutes, look at an object 20 feet away for at least 20 seconds.',
      impact: 'Reduces optic nerve strain and head pressure',
      timeToImplement: 'During study'
    });
  }

  // Exam Week Mode Special Recommendation
  if (examWeekMode) {
    recommendations.unshift({
      id: 'rec-exam-mode-priority',
      category: 'exam',
      priority: 'critical',
      title: 'Exam Week Mode: Prioritize Active Recall over Rereading',
      reason: 'During the final 48 hours, passive rereading gives a false illusion of competence while draining precious energy.',
      action: 'Close your book and explain core formulas or concepts out loud as if teaching a classmate.',
      impact: 'Doubles long-term retrieval speed under pressure',
      timeToImplement: 'Today'
    });
  }

  return recommendations;
}
