import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'blue' | 'emerald';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = true,
  size = 'md',
  color = 'cyan',
}) => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    cyan: 'from-accent-cyan to-blue-500',
    blue: 'from-accent-blue to-cyan-400',
    emerald: 'from-accent-emerald to-green-400',
  };

  return (
    <div>
      <div className={`${sizes[size]} bg-dark-700 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-400 mt-2">{progress}% Complete</p>
      )}
    </div>
  );
};
