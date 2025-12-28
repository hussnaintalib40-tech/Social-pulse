import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { PlatformId } from '../../types';
import { Hash, Heart, Users, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface HashtagToolProps {
  onBack: () => void;
}

const HashtagTool: React.FC<HashtagToolProps> = ({ onBack }) => {
  const [tagCount, setTagCount] = useState('');
  const [avgLikes, setAvgLikes] = useState('');
  const [followers, setFollowers] = useState('');
  
  const [result, setResult] = useState<{ score: number; status: string; color: string; feedback: string } | null>(null);

  const analyze = () => {
    const count = Number(tagCount) || 0;
    const likes = Number(avgLikes) || 0;
    const f = Number(followers) || 1;

    // Logic: Score = (Likes / Followers) * HashtagCount
    const ratio = likes / f;
    const score = ratio * count;

    let status = 'Average';
    let color = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    let feedback = 'Your hashtag strategy is okay, but could be optimized.';

    if (score < 0.5) {
      status = 'Weak';
      color = 'text-red-600 bg-red-50 border-red-200';
      feedback = 'Your tags might be too broad or irrelevant. Try using more niche tags specific to your content.';
    } else if (score > 1.2) {
      status = 'Strong';
      color = 'text-green-600 bg-green-50 border-green-200';
      feedback = 'Excellent strategy! Your tags are highly relevant and driving good engagement.';
    }

    setResult({ score, status, color, feedback });
  };

  return (
    <ToolLayout
      title="Hashtag Analyzer"
      description="Score your hashtag strategy based on the correlation between tag usage and engagement."
      onBack={onBack}
    >
      {() => (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Number of Hashtags Used</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={tagCount}
                    onChange={(e) => setTagCount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="e.g. 15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Average Likes Per Post</label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={avgLikes}
                    onChange={(e) => setAvgLikes(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="e.g. 250"
                  />
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                    placeholder="e.g. 2000"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={analyze}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-pink-200 active:scale-[0.98]"
            >
              Analyze Strategy
            </button>
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <div className={`p-6 rounded-xl border-2 flex flex-col items-center text-center ${result.color}`}>
                 <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Effectiveness Score</div>
                 <div className="text-5xl font-black mb-2">{result.score.toFixed(2)}</div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 font-bold text-sm">
                   {result.status === 'Strong' ? <CheckCircle className="w-4 h-4" /> : 
                    result.status === 'Weak' ? <AlertCircle className="w-4 h-4" /> : 
                    <AlertTriangle className="w-4 h-4" />}
                   {result.status}
                 </div>
               </div>
               
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-2">Recommendation</h4>
                 <p className="text-slate-600 leading-relaxed">{result.feedback}</p>
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

export default HashtagTool;
