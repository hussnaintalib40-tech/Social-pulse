import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { Users, Eye, Info } from 'lucide-react';
import { PlatformId } from '../../types';

interface ReachToolProps {
  onBack: () => void;
}

const ReachTool: React.FC<ReachToolProps> = ({ onBack }) => {
  const [followers, setFollowers] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [postType, setPostType] = useState('post');
  const [result, setResult] = useState<{ min: number; max: number; status: string; tip: string } | null>(null);

  const calculate = (platform: PlatformId) => {
    const f = Number(followers) || 0;
    const er = Number(engagementRate) || 0;

    // Platform Factors
    let platformFactor = 0.10; // Default (Standard Post)
    
    if (platform === 'instagram') {
      platformFactor = postType === 'reel' ? 0.20 : 0.10;
    } else if (platform === 'tiktok') {
      platformFactor = 0.30;
    } else if (platform === 'youtube') {
      platformFactor = postType === 'short' ? 0.25 : 0.15;
    } else {
      platformFactor = 0.10; // Facebook etc
    }

    const baseReach = f * platformFactor;
    // Modifier: Higher engagement = Higher reach multiplier
    // Normalized around 5% ER (which gives 1.0 multiplier)
    const finalReach = baseReach * (Math.max(1, er) / 5);
    
    // Create a range
    const minReach = Math.floor(finalReach * 0.8);
    const maxReach = Math.floor(finalReach * 1.2);

    let status = 'Average';
    let tip = 'Consistent posting helps stabilize reach.';
    
    if (finalReach > f * 0.4) {
      status = 'High';
      tip = 'Your content is likely hitting the Explore page/For You feed!';
    } else if (finalReach < f * 0.05) {
      status = 'Low';
      tip = 'Focus on hooking viewers in the first 3 seconds to boost retention.';
    }

    setResult({ min: minReach, max: maxReach, status, tip });
  };

  return (
    <ToolLayout
      title="Post Reach Estimator"
      description="Estimate the potential reach of your next post based on platform algorithms and your current metrics."
      onBack={onBack}
    >
      {(platform) => (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6 mb-6">
              
              {/* Post Type Selector (Dynamic based on platform) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Content Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {platform === 'instagram' && (
                    <>
                      <button 
                        onClick={() => setPostType('post')}
                        className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${postType === 'post' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-200 text-slate-600'}`}
                      >
                        Image/Carousel
                      </button>
                      <button 
                        onClick={() => setPostType('reel')}
                        className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${postType === 'reel' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-200 text-slate-600'}`}
                      >
                        Reel (Video)
                      </button>
                    </>
                  )}
                  {platform === 'youtube' && (
                     <>
                      <button 
                        onClick={() => setPostType('video')}
                        className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${postType === 'video' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-200 text-slate-600'}`}
                      >
                        Long Video
                      </button>
                      <button 
                        onClick={() => setPostType('short')}
                        className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${postType === 'short' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-200 text-slate-600'}`}
                      >
                        Short
                      </button>
                    </>
                  )}
                  {platform === 'tiktok' && (
                    <div className="col-span-2 py-2 px-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg text-sm text-center font-medium">
                      TikTok Video
                    </div>
                  )}
                  {platform === 'facebook' && (
                    <div className="col-span-2 py-2 px-4 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg text-sm text-center">
                      Standard Post
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Total Followers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Average Engagement Rate (%)</label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g. 4.5"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">If unsure, use 5% as a baseline.</p>
              </div>
            </div>

            <button
              onClick={() => calculate(platform)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
            >
              Calculate Estimated Reach
            </button>
          </div>

          {result && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                <div className="bg-orange-500 px-6 py-4 flex justify-between items-center text-white">
                  <h3 className="font-bold">Estimated Reach</h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded font-medium">{result.status} Potential</span>
                </div>
                <div className="p-8 text-center">
                  <div className="text-5xl font-black text-slate-900 mb-2">
                    {result.min.toLocaleString()} <span className="text-gray-300 font-light">-</span> {result.max.toLocaleString()}
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Accounts Reached</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Improvement Tip</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">{result.tip}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-xs text-slate-400">These results are estimates based on industry averages.</p>
          </div>
        </div>
      )}
    </ToolLayout>
  );
};

export default ReachTool;
