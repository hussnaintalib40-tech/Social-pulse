import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { Award, Zap, Star } from 'lucide-react';

interface LevelToolProps {
  onBack: () => void;
}

const LevelTool: React.FC<LevelToolProps> = ({ onBack }) => {
  const [followers, setFollowers] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  
  const [result, setResult] = useState<{ level: string; tips: string; nextGoal: string } | null>(null);

  const calculate = () => {
    const f = Number(followers) || 0;
    const er = Number(engagementRate) || 0;

    let level = 'Beginner';
    let nextGoal = '10k Followers';
    let tips = 'Focus on consistent posting and finding your niche voice.';

    // Base Levels
    if (f >= 100000) {
      level = 'Pro';
      nextGoal = 'Brand Empire';
      tips = 'Focus on diversification, own products, and team building.';
    } else if (f >= 10000) {
      level = 'Growing';
      nextGoal = '100k Club';
      tips = 'Focus on community building and optimizing for high retention.';
    }

    // Engagement Upgrade
    if (er > 5) {
      if (level === 'Beginner') {
         level = 'Rising Star (Beginner+)';
         tips = 'Your engagement is amazing! You will grow fast. Keep doing what you are doing.';
      } else if (level === 'Growing') {
         level = 'Influencer (Growing+)';
         tips = 'High engagement means you have pricing power for sponsorships.';
      } else if (level === 'Pro') {
         level = 'Superstar (Pro+)';
         tips = 'You are in the top 1% of creators. Time to launch a major business.';
      }
    }

    setResult({ level, tips, nextGoal });
  };

  return (
    <ToolLayout
      title="Creator Level Checker"
      description="Find out where you stand in the creator economy hierarchy and what to focus on next."
      onBack={onBack}
    >
      {() => (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Total Followers</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Engagement Rate (%)</label>
                <div className="relative">
                  <Zap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. 4.5"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-200 active:scale-[0.98]"
            >
              Check My Level
            </button>
          </div>

          {result && (
            <div className="animate-in zoom-in-95 duration-500 space-y-6">
               <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-8 rounded-xl shadow-xl text-center relative">
                 <div className="absolute top-2 right-2">
                   <Star className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-pulse" />
                 </div>
                 <h3 className="text-teal-100 font-bold uppercase text-xs tracking-widest mb-2">Current Level</h3>
                 <div className="text-4xl font-black mb-6 drop-shadow-md">{result.level}</div>
                 
                 <div className="inline-block bg-white/20 px-6 py-2 rounded-full border border-white/30 backdrop-blur-md">
                   <span className="text-xs font-bold uppercase mr-2 text-teal-50">Next Milestone</span>
                   <span className="font-bold">{result.nextGoal}</span>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-xl border-l-4 border-teal-500 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-2">Focus Strategy</h4>
                 <p className="text-slate-600 text-sm leading-relaxed">{result.tips}</p>
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

export default LevelTool;
