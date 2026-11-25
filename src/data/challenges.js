/**
 * Daily wellness challenges and badges for gamification
 */

export const DAILY_CHALLENGES = [
  {
    id: 'challenge-water',
    title: 'Hydration Anchor',
    description: 'Drink 2 full liters of water or coconut water today to prevent brain fog and tension headaches.',
    category: 'hydration',
    xp: 40,
    icon: 'Droplets'
  },
  {
    id: 'challenge-sunlight',
    title: 'Morning Circadian Reset',
    description: 'Step outside for 10 minutes of direct sunlight before 10:00 AM to set your melatonin sleep clock.',
    category: 'sleep',
    xp: 50,
    icon: 'Sun'
  },
  {
    id: 'challenge-box-breath',
    title: 'Pre-Study Box Breathing',
    description: 'Complete 1 cycle of 4-4-4-4 Box Breathing before opening your first textbook today.',
    category: 'stress',
    xp: 45,
    icon: 'Wind'
  },
  {
    id: 'challenge-warm-breakfast',
    title: 'Brain Fuel Breakfast',
    description: 'Do not skip breakfast! Eat a warm meal (poha, toast, or eggs) with water before studying.',
    category: 'nutrition',
    xp: 50,
    icon: 'Utensils'
  },
  {
    id: 'challenge-screen-curfew',
    title: 'Digital Screen Sunset',
    description: 'Turn off phone screens and laptop monitors 30 minutes before bed to protect deep sleep phases.',
    category: 'sleep',
    xp: 60,
    icon: 'Moon'
  },
  {
    id: 'challenge-walk-break',
    title: 'Post-Study Decompression',
    description: 'Take a 15-minute gentle outdoor walk without looking at study notes or social media.',
    category: 'movement',
    xp: 40,
    icon: 'Footprints'
  }
];

export const BADGES = [
  {
    id: 'badge-sleep-guardian',
    name: 'Sleep Guardian',
    description: 'Logged 7+ hours of sleep for 3 consecutive days during exam period.',
    icon: 'Moon',
    color: 'from-indigo-500 to-purple-600',
    category: 'sleep',
    unlockedAtStreak: 3
  },
  {
    id: 'badge-breakfast-champ',
    name: 'Breakfast Champion',
    description: 'Fuelled your morning routine without skipping breakfast 5 days in a row.',
    icon: 'Coffee',
    color: 'from-amber-500 to-orange-600',
    category: 'nutrition',
    unlockedAtStreak: 5
  },
  {
    id: 'badge-zen-master',
    name: 'Zen Master',
    description: 'Maintained stress score below 6 or completed 3 breathing sessions.',
    icon: 'Heart',
    color: 'from-teal-500 to-emerald-600',
    category: 'stress',
    unlockedAtStreak: 4
  },
  {
    id: 'badge-pomodoro-pro',
    name: 'Pomodoro Pro',
    description: 'Completed 6 focused study blocks with intentional 5-minute recovery intervals.',
    icon: 'Clock',
    color: 'from-blue-500 to-cyan-600',
    category: 'study',
    unlockedAtStreak: 2
  },
  {
    id: 'badge-routine-warrior',
    name: 'Routine Warrior',
    description: 'Achieved a daily wellness score above 80 for 7 consecutive days.',
    icon: 'Award',
    color: 'from-purple-500 to-pink-600',
    category: 'overall',
    unlockedAtStreak: 7
  }
];
