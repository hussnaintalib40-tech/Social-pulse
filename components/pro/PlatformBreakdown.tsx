import React from 'react';
import { AnalysisResult } from '../../types';
import { Youtube, Instagram, Facebook, Video, Clock, TrendingUp } from 'lucide-react';

interface PlatformBreakdownProps {
  results: AnalysisResult;
}

const PlatformBreakdown: React.FC<PlatformBreakdownProps> = ({ results }) => {
  const getIcon = (id: string) => {
    switch(id) {
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      case 'tiktok': return Video;
      case 'facebook': return Facebook;
      default: return Video;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {results.platformBreakdown.map((platform) => {
        const Icon = getIcon(platform.id);
        return (
          <div key={platform.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900">{platform.name}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Potential Score
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${platform.score}%` }}></div>
                </div>
                <div className="text-right text-xs font-bold text-indigo-600 mt-1">{platform.score.toFixed(0)}/100</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <div className="text-slate-400 text-xs mb-1">Eng. Rate</div>
                  <div className="font-bold text-slate-900">{platform.engagement}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <div className="text-slate-400 text-xs mb-1 flex items-center justify-center gap-1">
                     <Clock className="w-3 h-3" /> Best Time
                  </div>
                  <div className="font-bold text-slate-900">{platform.bestTime}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlatformBreakdown;
