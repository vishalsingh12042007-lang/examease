import React, { useState } from 'react';
import {
  Utensils,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Clock,
  Coins,
  ChevronRight,
  Info,
  Apple,
  Coffee,
  Heart
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';
import { STUDENT_MEALS } from '../../data/mealSuggestions';

export default function MealTracker() {
  const { mealRecords, toggleMeal, todayMetrics } = useWellness();
  const [selectedMealRecipe, setSelectedMealRecipe] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = mealRecords.find(m => m.date === todayStr) || mealRecords[mealRecords.length - 1] || {};

  const mealSlots = [
    { key: 'breakfast', label: 'Breakfast', icon: Coffee, targetTime: 'Before 09:30 AM', color: 'from-amber-500 to-orange-500', isMissed: todayRecord.breakfast === false },
    { key: 'lunch', label: 'Lunch', icon: Utensils, targetTime: '01:00 PM - 02:00 PM', color: 'from-teal-500 to-emerald-500', isMissed: todayRecord.lunch === false },
    { key: 'snack', label: 'Afternoon Brain Snack', icon: Apple, targetTime: '04:30 PM - 05:30 PM', color: 'from-blue-500 to-cyan-500', isMissed: todayRecord.snack === false },
    { key: 'dinner', label: 'Nourishing Dinner', icon: Heart, targetTime: '08:00 PM - 09:30 PM', color: 'from-purple-500 to-indigo-500', isMissed: todayRecord.dinner === false }
  ];

  const filteredMeals = activeCategoryFilter === 'all'
    ? STUDENT_MEALS
    : STUDENT_MEALS.filter(m => m.type === activeCategoryFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-teal-100 text-teal-700">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Student Meal & Brain-Fuel Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Consistent blood glucose keeps your prefrontal cortex alert. Track your 4 daily meals and access fast, budget-friendly Indian student recipes.
            </p>
          </div>
        </div>
      </div>

      {/* MISSED MEAL DETECTION ALERT */}
      {todayMetrics.missedBreakfast && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-soft flex items-start space-x-3 animate-in fade-in">
          <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Missed Meal Detection: Breakfast Deprivation Flagged
            </h4>
            <p className="text-xs text-slate-700 mt-1">
              You haven't checked off breakfast today. Studying on zero morning glucose causes neurotransmitter fatigue and drops test problem-solving efficiency.
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-900 bg-white/80 p-2 rounded-lg border border-amber-100 inline-block">
              💡 Quick Fix: Grab a banana with peanut butter or a warm cup of curd rice in 5 minutes!
            </div>
          </div>
        </div>
      )}

      {/* TODAY'S 4 MEAL SLOTS INTERACTIVE STATUS */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
          <span>Today's Meal Completion Status</span>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
            {todayMetrics.completedMealsCount} of 4 Completed
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealSlots.map((slot) => {
            const Icon = slot.icon;
            const isCompleted = !!todayRecord[slot.key];

            return (
              <div
                key={slot.key}
                onClick={() => toggleMeal(slot.key)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-soft hover:shadow-soft-hover ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 ring-1 ring-emerald-400'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${slot.color} text-white shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark Eaten'}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 mt-3">{slot.label}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{slot.targetTime}</span>
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className={isCompleted ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {isCompleted ? 'Glycogen Fueled' : 'Not yet logged'}
                  </span>
                  <span className="text-brand-600 font-semibold text-[10px]">
                    Click to toggle
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HEALTHY & AFFORDABLE STUDENT MEAL SUGGESTIONS */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Affordable Student Brain-Fuel Meals (Under ₹45 / $0.50)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quick Indian student-friendly meals with preparation time under 15 minutes. High protein, complex fiber, and zero food coma.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategoryFilter(filter)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeCategoryFilter === filter
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => setSelectedMealRecipe(meal)}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-soft hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                    {meal.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {meal.cost}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">{meal.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{meal.benefits}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {meal.prepTime}
                </span>
                <span className="text-teal-600 font-bold hover:underline flex items-center">
                  <span>Recipe</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECIPE DETAILS MODAL */}
      {selectedMealRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setSelectedMealRecipe(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">
                  {selectedMealRecipe.type} • {selectedMealRecipe.cost}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                  {selectedMealRecipe.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMealRecipe(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900">
              <strong>Cognitive Benefit:</strong> {selectedMealRecipe.benefits}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 mb-1.5">Affordable Student Ingredients:</p>
              <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                {selectedMealRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 mb-1">Superfast Prep Method ({selectedMealRecipe.prepTime}):</p>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                {selectedMealRecipe.quickRecipe}
              </p>
            </div>

            <button
              onClick={() => setSelectedMealRecipe(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm"
            >
              Got It, Ready to Fuel Up!
            </button>
          </div>
        </div>
      )}

      {/* DAILY MEAL HISTORY */}
      <div className="glass-card p-6 rounded-2xl shadow-soft">
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Weekly Meal Consistency Log
        </h3>
        <div className="space-y-2">
          {mealRecords.slice().reverse().map((rec) => (
            <div
              key={rec.id}
              className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-slate-800">{rec.date}</p>
                <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                  <span className={rec.breakfast ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                    Breakfast: {rec.breakfast ? '✓' : '✕'}
                  </span>
                  <span>•</span>
                  <span className={rec.lunch ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                    Lunch: {rec.lunch ? '✓' : '✕'}
                  </span>
                  <span>•</span>
                  <span className={rec.dinner ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                    Dinner: {rec.dinner ? '✓' : '✕'}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                rec.missedCount === 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {rec.missedCount === 0 ? 'Full Nutrition' : `${rec.missedCount} Missed`}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
