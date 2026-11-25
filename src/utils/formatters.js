export function formatHoursMinutes(decimalHours) {
  if (decimalHours === null || decimalHours === undefined || isNaN(decimalHours)) return '0h 0m';
  const hrs = Math.floor(decimalHours);
  const mins = Math.round((decimalHours - hrs) * 60);
  return `${hrs}h ${mins}m`;
}

export function calculateSleepDuration(bedtimeStr, wakeTimeStr) {
  if (!bedtimeStr || !wakeTimeStr) return 0;
  const [bHours, bMins] = bedtimeStr.split(':').map(Number);
  const [wHours, wMins] = wakeTimeStr.split(':').map(Number);

  let bedMinutes = bHours * 60 + bMins;
  let wakeMinutes = wHours * 60 + wMins;

  if (wakeMinutes <= bedMinutes) {
    // Crosses midnight
    wakeMinutes += 24 * 60;
  }

  const diffMinutes = wakeMinutes - bedMinutes;
  return Number((diffMinutes / 60).toFixed(1));
}

export function getWellnessScoreColor(score) {
  if (score >= 80) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', fill: '#10B981', label: 'Optimal' };
  if (score >= 65) return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', fill: '#3B82F6', label: 'Balanced' };
  if (score >= 50) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', fill: '#F59E0B', label: 'Needs Attention' };
  return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', fill: '#F43F5E', label: 'High Burnout Risk' };
}

export function getStressBadge(level) {
  if (level <= 3) return { text: 'Low / Zen', color: 'bg-emerald-100 text-emerald-800' };
  if (level <= 6) return { text: 'Moderate', color: 'bg-amber-100 text-amber-800' };
  if (level <= 8) return { text: 'Elevated Stress', color: 'bg-orange-100 text-orange-800' };
  return { text: 'Severe Overload', color: 'bg-rose-100 text-rose-800' };
}

export function getTimeGreeting(name = 'Student') {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}

export function formatDateLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
