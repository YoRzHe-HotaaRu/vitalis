import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  color: string;
  icon?: React.ReactNode;
  label: string;
  value: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  radius, 
  stroke, 
  progress, 
  color,
  icon,
  label,
  value
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 transition-all duration-500"
        >
           {/* Background Ring */}
           <circle
            stroke="var(--muted)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Ring */}
          <circle
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="square" // Brutalist style
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-foreground">
          {icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-mono text-xs uppercase text-muted-foreground tracking-wider">{label}</div>
        <div className="font-bold font-sans text-lg">{value}</div>
      </div>
    </div>
  );
};
