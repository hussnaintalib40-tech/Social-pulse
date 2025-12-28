import React from 'react';

interface AdBannerProps {
  format: 'leaderboard' | 'rectangle' | 'sticky-footer';
  className?: string;
  isPro?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ format, className = '', isPro = false }) => {
  if (isPro) return null;

  if (format === 'sticky-footer') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-50">
        <div className="w-full h-[50px] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 border border-gray-200 border-dashed">
          Mobile Sticky Ad (320x50)
        </div>
      </div>
    );
  }

  const heightClass = format === 'leaderboard' ? 'h-[90px]' : 'h-[250px]';
  
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <div className={`w-full max-w-4xl bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center ${heightClass} relative overflow-hidden group`}>
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">Advertisement</span>
        <div className="text-gray-300 text-sm">Ad Space Available</div>
        
        {/* Decorative pattern to make it look less empty but distinct from content */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
    </div>
  );
};

export default AdBanner;
