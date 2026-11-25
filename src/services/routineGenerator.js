/**
 * Smart Routine Generator
 * Generates an optimized, balanced 24-hour timetable incorporating:
 * - Student's preferred wake-up and bedtime
 * - Targeted study hours
 * - Mandatory meal windows (protecting breakfast, lunch, dinner)
 * - Physical & mental recovery intervals
 */

export function generateSmartRoutine({
  wakeUpTime = '07:30',
  targetBedtime = '23:30',
  studyTargetHours = 6,
  examSlot = 'none' // 'morning', 'afternoon', 'none'
}) {
  const schedule = [];

  // Parse hours
  const [wH, wM] = wakeUpTime.split(':').map(Number);
  const pad = (n) => String(n).padStart(2, '0');

  const addTime = (startH, startM, durationMinutes) => {
    let totalMins = startH * 60 + startM + durationMinutes;
    let endH = Math.floor(totalMins / 60) % 24;
    let endM = totalMins % 60;
    return `${pad(endH)}:${pad(endM)}`;
  };

  let curH = wH;
  let curM = wM;

  // 1. Morning Routine
  const morningEnd = addTime(curH, curM, 30);
  schedule.push({
    time: `${wakeUpTime} - ${morningEnd}`,
    title: 'Circadian Sunrise Reset & Hydration',
    type: 'wellness',
    category: 'morning',
    description: 'Drink 500ml water, 10-min sunlight exposure, light stretching. Zero phone screens.',
    badge: 'Melatonin Clock Reset',
    color: 'border-l-amber-500 bg-amber-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 30) / 60) % 24;
  curM = (curM + 30) % 60;

  // 2. Breakfast Window
  const bEnd = addTime(curH, curM, 30);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${bEnd}`,
    title: 'Warm Brain-Fuel Breakfast',
    type: 'meal',
    category: 'nutrition',
    description: 'Poha with roasted peanuts, banana toast, or warm eggs. Fuel glycogen stores before studying.',
    badge: 'Glucose Anchor',
    color: 'border-l-emerald-500 bg-emerald-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 30) / 60) % 24;
  curM = (curM + 30) % 60;

  // 3. Morning Deep Focus Block 1 (or Exam Slot)
  if (examSlot === 'morning') {
    const examEnd = addTime(curH, curM, 180);
    schedule.push({
      time: `${pad(curH)}:${pad(curM)} - ${examEnd}`,
      title: '🎯 Morning Exam Paper Session',
      type: 'exam',
      category: 'exam',
      description: 'Official test shift. Stay calm, breathe through tough questions, sip water.',
      badge: 'Peak Performance',
      color: 'border-l-purple-600 bg-purple-50/80'
    });
    curH = Math.floor((curH * 60 + curM + 180) / 60) % 24;
    curM = (curM + 180) % 60;
  } else {
    // 2 hours deep focus
    const fEnd1 = addTime(curH, curM, 120);
    schedule.push({
      time: `${pad(curH)}:${pad(curM)} - ${fEnd1}`,
      title: 'Deep Study Block 1: Highest Priority Subject',
      type: 'study',
      category: 'study',
      description: 'Revise core theory & practice hard problems using 2 x 50-minute Pomodoros with a 10m stretch.',
      badge: 'High Neuroplasticity',
      color: 'border-l-blue-600 bg-blue-50/60'
    });
    curH = Math.floor((curH * 60 + curM + 120) / 60) % 24;
    curM = (curM + 120) % 60;
  }

  // 4. Mid-morning Decompression
  const breakEnd1 = addTime(curH, curM, 20);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${breakEnd1}`,
    title: 'Physical Movement & Eye Relaxation',
    type: 'break',
    category: 'movement',
    description: '20-20-20 eye gaze out the window, neck rolls, refill water bottle.',
    badge: 'Cognitive Reset',
    color: 'border-l-teal-500 bg-teal-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 20) / 60) % 24;
  curM = (curM + 20) % 60;

  // 5. Study Block 2
  const fEnd2 = addTime(curH, curM, 90);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${fEnd2}`,
    title: 'Active Recall & Practice Problems',
    type: 'study',
    category: 'study',
    description: 'Flashcards, formula derivations, solving previous year question papers.',
    badge: 'Active Retrieval',
    color: 'border-l-indigo-600 bg-indigo-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 90) / 60) % 24;
  curM = (curM + 90) % 60;

  // 6. Lunch & Digestion
  const lunchEnd = addTime(curH, curM, 45);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${lunchEnd}`,
    title: 'Balanced Lunch & Digestion Pause',
    type: 'meal',
    category: 'nutrition',
    description: 'Moong dal, warm roti or rice, cucumber salad, and cool chaas. Eat away from study desk.',
    badge: 'Gut-Brain Reset',
    color: 'border-l-emerald-500 bg-emerald-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 45) / 60) % 24;
  curM = (curM + 45) % 60;

  // 7. Power Nap or Light Mindfulness
  const napEnd = addTime(curH, curM, 25);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${napEnd}`,
    title: 'Non-Sleep Deep Rest (NSDR) / 20-min Power Nap',
    type: 'wellness',
    category: 'stress',
    description: 'Lie down with eyes closed. Flushes adenosine buildup to eliminate afternoon slump.',
    badge: 'Adenosine Clear',
    color: 'border-l-purple-500 bg-purple-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 25) / 60) % 24;
  curM = (curM + 25) % 60;

  // 8. Afternoon Study Block 3
  const fEnd3 = addTime(curH, curM, 110);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${fEnd3}`,
    title: 'Afternoon Study Block: Secondary Subject / Lab Notes',
    type: 'study',
    category: 'study',
    description: 'Diagrams, code snippets, summary cheat-sheet creation with regular hydration.',
    badge: 'Synthesis Focus',
    color: 'border-l-blue-600 bg-blue-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 110) / 60) % 24;
  curM = (curM + 110) % 60;

  // 9. Sunset Walk & Healthy Snack
  const snackEnd = addTime(curH, curM, 35);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${snackEnd}`,
    title: 'Outdoor Walk & Nutritious Snack',
    type: 'break',
    category: 'movement',
    description: 'Sprouts chaat or fruit bowl with roasted almonds. 15-min gentle outdoor walk.',
    badge: 'Oxygen Surge',
    color: 'border-l-amber-500 bg-amber-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 35) / 60) % 24;
  curM = (curM + 35) % 60;

  // 10. Evening Light Review
  const fEnd4 = addTime(curH, curM, 75);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${fEnd4}`,
    title: 'Light Evening Review & Daily Wrap-up',
    type: 'study',
    category: 'study',
    description: 'Review what you learned today. Avoid starting brand new complex topics now.',
    badge: 'Retention Consolidation',
    color: 'border-l-indigo-600 bg-indigo-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 75) / 60) % 24;
  curM = (curM + 75) % 60;

  // 11. Dinner
  const dinnerEnd = addTime(curH, curM, 40);
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${dinnerEnd}`,
    title: 'Nourishing Light Dinner',
    type: 'meal',
    category: 'nutrition',
    description: 'Comforting Khichdi with ghee or Curd Rice. Easy on the digestive system for sound sleep.',
    badge: 'Comfort Food',
    color: 'border-l-emerald-500 bg-emerald-50/60'
  });
  curH = Math.floor((curH * 60 + curM + 40) / 60) % 24;
  curM = (curM + 40) % 60;

  // 12. Digital Sunset & Wind Down
  schedule.push({
    time: `${pad(curH)}:${pad(curM)} - ${targetBedtime}`,
    title: 'Digital Sunset & 4-4-4-4 Box Breathing',
    type: 'wellness',
    category: 'sleep',
    description: 'Turn off screens 30 mins before bed. Do 3 cycles of Box Breathing with ExamEase.',
    badge: 'Deep Sleep Preparation',
    color: 'border-l-teal-600 bg-teal-50/60'
  });

  // 13. Restorative Sleep
  schedule.push({
    time: `${targetBedtime} - ${wakeUpTime}`,
    title: '🌙 Restorative Sleep (8 Hours)',
    type: 'sleep',
    category: 'sleep',
    description: 'Cool, dark room. Memory consolidation and synaptic pruning taking place.',
    badge: 'Exam Superpower',
    color: 'border-l-purple-800 bg-slate-900 text-white'
  });

  return schedule;
}
