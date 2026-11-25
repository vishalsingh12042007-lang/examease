import React from 'react';
import { LayoutDashboard, Moon, Utensils, HeartPulse, ShieldAlert } from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

export default function MobileNav({ currentView, setCurrentView }) {
  const { routineAlerts } = useWellness();
  const activeAlertsCount = routineAlerts.filter(a => a.severity !== 'success').length;

  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'meals', label: 'Meals', icon: Utensils },
    { id: 'stress', label: 'Stress', icon: HeartPulse },
    { id: 'breakdowns', label: 'Alerts', icon: ShieldAlert, badge: activeAlertsCount }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative ${
              isActive ? 'text-brand-600 font-bold scale-105' : 'text-slate-500'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
