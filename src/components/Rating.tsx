import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  count,
  size = 'md',
}) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating)
                ? 'fill-accent-cyan text-accent-cyan'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-400">
        {rating.toFixed(1)} {count && `(${count})`}
      </span>
    </div>
  );
};
