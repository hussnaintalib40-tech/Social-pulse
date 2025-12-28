import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { View, PlatformId } from '../../types';
import { TrendingUp, Users } from 'lucide-react';

interface GrowthToolProps {
  onBack: () => void;
}

const GrowthTool: React.FC<GrowthToolProps> = ({ onBack }) => {
  const [currentFollowers, setCurrentFollowers] = useState('');
  const [growthRate, setGrowthRate] = useState('5'); // Default 5%
  const [projections, setProjections] = useState<{ d30: number; d90: number; d180: number } | null>(null);

  const calculate = () => {
    const start = Number(currentFollowers) || 0;
    const rate = (Number(growthRate) || 0) / 100;
    
    // Compound monthly growth
    const m1 = start * (1 + rate);
    const m3 = start * Math.pow(1 + rate, 3);
    const m6 = start * Math.pow(1 + rate, 6);

    setProjections({
      d30: Math.floor(m1),
      d90: Math.floor(m3),
      d180: Math.floor(m6)
    });
  };

  return (
    <ToolLayout
      title="Follower Growth Estimator"
      description="See where your channel could be in the future based on monthly growth consistency."
      onBack={onBack}
    >
      {() => (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Followers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={currentFollowers}
                    onChange={(e) => setCurrentFollowers(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Monthly Growth Rate (%)</label>
                 <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={growthRate} 
                      onChange={(e) => setGrowthRate(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="font-bold text-lg text-purple-600 w-12">{growthRate}%</span>
                 </div>
                 <p className="text-xs text-slate-400 mt-1">Average beginner growth is often 5-10% per month.</p>
              </div>
             </div>

            <button
              onClick={calculate}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-200"
            >
              Project Growth
            </button>
          </div>

          {projections && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase mb-1">1 Month</div>
                 <div className="text-2xl font-bold text-slate-900">{projections.d30.toLocaleString()}</div>
                 <div className="text-xs text-green-600 font-medium">+{((projections.d30 - Number(currentFollowers))).toLocaleString()} new</div>
               </div>
               <div className="bg-white p-4 rounded-xl border-2 border-purple-100 shadow-sm text-center transform scale-105 z-10">
                 <div className="text-xs font-bold text-purple-600 uppercase mb-1">3 Months</div>
                 <div className="text-3xl font-bold text-slate-900">{projections.d90.toLocaleString()}</div>
                 <div className="text-xs text-green-600 font-medium">+{((projections.d90 - Number(currentFollowers))).toLocaleString()} new</div>
               </div>
               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase mb-1">6 Months</div>
                 <div className="text-2xl font-bold text-slate-900">{projections.d180.toLocaleString()}</div>
                 <div className="text-xs text-green-600 font-medium">+{((projections.d180 - Number(currentFollowers))).toLocaleString()} new</div>
               </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

export default GrowthTool;
