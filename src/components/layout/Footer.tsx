import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 pt-10 pb-24 lg:pb-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <div className="bg-red-600 px-2.5 py-0.5 font-black text-white text-xs tracking-tight uppercase rounded">
          MARVEL
        </div>
        <span className="font-mono text-xs font-bold text-gray-300 tracking-widest uppercase">
          WATCH HUB
        </span>
      </div>

      <p className="font-medium text-gray-400">
        Your Personal Marvel Watch Hub
      </p>

      <div className="flex items-center justify-center gap-1.5 text-gray-500 font-mono text-[11px]">
        <Shield className="w-3.5 h-3.5 text-red-500" />
        <span>Personal project. Not affiliated with Marvel Studios, Disney, or Disney+.</span>
      </div>

      <p className="text-[10px] text-gray-600">
        All trademarks, character names, and movie titles are the property of their respective copyright holders.
      </p>
    </footer>
  );
};
