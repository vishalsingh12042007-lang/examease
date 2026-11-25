import React from 'react';

export default function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  badgeText,
  badgeColor = 'bg-brand-50 text-brand-700',
  iconColor = 'text-brand-600 bg-brand-50',
  onClick,
  actionText
}) {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-3 rounded-xl ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </h3>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">
              {value}
            </p>
          </div>
        </div>

        {badgeText && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{subtitle}</span>
        {actionText && (
          <span className="text-brand-600 font-semibold hover:underline">
            {actionText} →
          </span>
        )}
      </div>
    </div>
  );
}
