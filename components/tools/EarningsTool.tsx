import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { View, PlatformId } from '../../types';
import { DollarSign, Eye, Repeat } from 'lucide-react';

interface EarningsToolProps {
  onBack: () => void;
}

const EarningsTool: React.FC<EarningsToolProps> = ({ onBack }) => {
  const [views, setViews] = useState('');
  const [posts, setPosts] = useState('');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const calculate = (platform: PlatformId) => {
    const v = Number(views) || 0;
    const p = Number(posts) || 0;
    
    // Simplified CPM logic matching global constants
    let cpmLow = 0.5;
    let cpmHigh = 2.0;
    if (platform === 'youtube') { cpmLow = 2.0; cpmHigh = 8.0; }
    if (platform === 'tiktok') { cpmLow = 0.02; cpmHigh = 0.04; }

    const monthlyViews = v * p;
    const min = (monthlyViews / 1000) * cpmLow;
    const max = (monthlyViews / 1000) * cpmHigh;

    setResult({ min, max });
  };

  return (
    <ToolLayout
      title="Earnings Estimator"
      description="Estimate your potential monthly ad revenue based on your views and posting schedule."
      onBack={onBack}
    >
      {(platform) => (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Average Views Per Post</label>
                <div className="relative">
                  <Eye className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. 10000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Posts Per Month</label>
                <div className="relative">
                  <Repeat className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={posts}
                    onChange={(e) => setPosts(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. 8"
                  />
                </div>
              </div>
             </div>

            <button
              onClick={() => calculate(platform)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-200"
            >
              Estimate Earnings
            </button>
          </div>

          {result && (
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-100 animate-in slide-in-from-bottom-2">
              <div className="text-center">
                 <h3 className="text-slate-500 font-medium mb-2 uppercase tracking-wide text-xs">Estimated Monthly Revenue</h3>
                 <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl font-black text-slate-900 mb-2">
                   <span className="text-green-500">$</span>
                   {result.min.toFixed(0)} 
                   <span className="text-gray-300 text-3xl font-light">-</span> 
                   <span className="text-green-500">$</span>
                   {result.max.toFixed(0)}
                 </div>
                 <p className="text-xs text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-full">
                   Based on average CPM for {platform}
                 </p>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-sm border-t border-gray-100 pt-6">
                <div>
                   <div className="font-bold text-slate-900">${(result.min / 4).toFixed(0)}</div>
                   <div className="text-xs text-slate-500">Weekly (Min)</div>
                </div>
                <div>
                   <div className="font-bold text-slate-900">${(result.max * 12).toLocaleString()}</div>
                   <div className="text-xs text-slate-500">Yearly (Max)</div>
                </div>
                <div>
                   <div className="font-bold text-slate-900">~{posts}</div>
                   <div className="text-xs text-slate-500">Posts Req.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

export default EarningsTool;
