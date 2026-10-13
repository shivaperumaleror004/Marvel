import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 border border-yellow-500/30 text-yellow-400 font-mono text-xs font-semibold backdrop-blur-md ${className}`}>
      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};
