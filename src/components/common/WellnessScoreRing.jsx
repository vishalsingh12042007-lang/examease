import React from 'react';
import { getWellnessScoreColor } from '../../utils/formatters';

export default function WellnessScoreRing({ score = 75, size = 180, strokeWidth = 14, showDetails = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const colorInfo = getWellnessScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorInfo.fill}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-800">
            {score}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            out of 100
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border}`}>
            <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: colorInfo.fill }} />
            {colorInfo.label}
          </span>
          <p className="text-xs text-slate-500 mt-1">Daily Wellness Balance</p>
        </div>
      )}
    </div>
  );
}
