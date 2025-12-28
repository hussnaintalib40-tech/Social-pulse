import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { View, PlatformId } from '../../types';
import { Activity, ThumbsUp, MessageCircle, Share2, Users } from 'lucide-react';

interface EngagementToolProps {
  onBack: () => void;
}

const EngagementTool: React.FC<EngagementToolProps> = ({ onBack }) => {
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [followers, setFollowers] = useState('');
  const [result, setResult] = useState<{ rate: number; grade: string } | null>(null);

  const calculate = (platform: PlatformId) => {
    const l = Number(likes) || 0;
    const c = Number(comments) || 0;
    const s = Number(shares) || 0;
    const f = Number(followers) || 1;

    const totalEngagement = l + c + s;
    const rate = (totalEngagement / f) * 100;
    
    // Simple grading logic based on general benchmarks
    let grade = 'Average';
    const benchmark = platform === 'tiktok' ? 5 : (platform === 'youtube' ? 4 : 2);
    
    if (rate > benchmark * 1.5) grade = 'High';
    if (rate < benchmark * 0.5) grade = 'Low';

    setResult({ rate, grade });
  };

  return (
    <ToolLayout
      title="Engagement Rate Calculator"
      description="Find out how engaged your audience really is. Enter the stats from a recent post or your channel averages."
      onBack={onBack}
    >
      {(platform) => (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Likes</label>
                <div className="relative">
                  <ThumbsUp className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Comments</label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Shares (Optional)</label>
                <div className="relative">
                  <Share2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Total Followers/Views</label>
                 <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Use 'Views' for TikTok/Reels/Shorts</p>
              </div>
            </div>
            
            <button
              onClick={() => calculate(platform)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Calculate Engagement
            </button>
          </div>

          {result && (
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl animate-in zoom-in-95 duration-300 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-4">
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-slate-400 font-medium mb-1">Your Engagement Rate</h3>
              <div className="text-5xl font-black mb-4 text-white">
                {result.rate.toFixed(2)}%
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium">
                Rating: 
                <span className={`
                  ${result.grade === 'High' ? 'text-green-400' : ''}
                  ${result.grade === 'Average' ? 'text-yellow-400' : ''}
                  ${result.grade === 'Low' ? 'text-red-400' : ''}
                `}>
                  {result.grade}
                </span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-slate-400">
                <p>
                  {result.grade === 'High' && "Great job! Your audience is highly active."}
                  {result.grade === 'Average' && "Solid performance. Try adding more Call-to-Actions."}
                  {result.grade === 'Low' && "Engagement is lower than average. Experiment with new content formats."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

export default EngagementTool;
