import React from 'react';
import { Lock } from 'lucide-react';

interface ProLockWrapperProps {
  isPro: boolean;
  children: React.ReactNode;
  title?: string;
  onUpgrade?: () => void;
}

const ProLockWrapper: React.FC<ProLockWrapperProps> = ({ isPro, children, title = "Advanced Analytics", onUpgrade }) => {
  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
      {/* Blurred Content */}
      <div className="filter blur-md opacity-50 pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-[2px] transition-all hover:bg-white/30">
        <div className="bg-slate-900 p-4 rounded-full mb-4 shadow-xl">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Unlock {title}</h3>
        <p className="text-slate-600 text-center max-w-sm mb-6">
          Get deep insights, platform breakdowns, and personalized growth tips with Pro.
        </p>
        {onUpgrade && (
          <button 
            onClick={onUpgrade}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
};

export default ProLockWrapper;
