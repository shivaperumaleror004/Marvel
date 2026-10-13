import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Tv } from 'lucide-react';
import { Series } from '../../types';
import { SeriesCard } from '../ui/SeriesCard';

interface SeriesCarouselProps {
  title: string;
  series: Series[];
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
}

export const SeriesCarousel: React.FC<SeriesCarouselProps> = ({
  title,
  series,
  onSelectSeries,
  onWatchSeries
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-red-600 rounded-full shadow-[0_0_8px_#E62429]" />
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
            {title}
          </h2>
          <span className="text-xs font-mono text-gray-400">({series.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl border border-white/10 bg-slate-900/80 text-gray-300 hover:text-white hover:border-red-600/50 transition-colors active:scale-95"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl border border-white/10 bg-slate-900/80 text-gray-300 hover:text-white hover:border-red-600/50 transition-colors active:scale-95"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth scrollbar-none"
      >
        {series.map(item => (
          <div key={item.id} className="w-48 sm:w-56 flex-shrink-0">
            <SeriesCard
              series={item}
              onSelect={onSelectSeries}
              onWatch={onWatchSeries}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
