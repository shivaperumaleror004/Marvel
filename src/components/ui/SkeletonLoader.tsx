import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="relative aspect-[2/3] w-full animate-pulse rounded-xl border border-white/5 bg-slate-900/60 overflow-hidden">
      <div className="absolute top-2.5 left-2.5 h-5 w-16 rounded bg-slate-800" />
      <div className="absolute top-2.5 right-2.5 h-5 w-10 rounded bg-slate-800" />
      <div className="absolute bottom-0 inset-x-0 p-4 space-y-2 bg-slate-950/80">
        <div className="h-4 w-3/4 rounded bg-slate-800" />
        <div className="h-3 w-1/2 rounded bg-slate-800/60" />
        <div className="h-8 w-full rounded bg-slate-800/40 mt-2" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] w-full animate-pulse bg-slate-950 flex items-center p-6 lg:p-16">
      <div className="max-w-2xl space-y-4">
        <div className="h-4 w-24 rounded bg-red-950/60 border border-red-900/40" />
        <div className="h-12 w-3/4 rounded bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-800/60" />
        <div className="h-16 w-full rounded bg-slate-900/80" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-36 rounded-lg bg-red-900/50" />
          <div className="h-12 w-36 rounded-lg bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <MovieCardSkeleton key={idx} />
      ))}
    </div>
  );
};
