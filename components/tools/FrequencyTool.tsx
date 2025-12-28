import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { Calendar, TrendingUp, HelpCircle } from 'lucide-react';

interface FrequencyToolProps {
  onBack: () => void;
}

const FrequencyTool: React.FC<FrequencyToolProps> = ({ onBack }) => {
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [trend, setTrend] = useState<'Up' | 'Stable' | 'Down'>('Stable');
  
  const [result, setResult] = useState<{ status: string; recommendation: string; range: string } | null>(null);

  const calculate = () => {
    const posts = Number(postsPerWeek) || 0;
    
    let status = 'Optimal';
    let recommendation = 'You have found a good rhythm. Keep consistent quality.';
    let range = '3-5 posts/week';

    if (trend === 'Down' && posts > 5) {
      status = 'Overposting';
      recommendation = 'Your audience might be experiencing fatigue. Try reducing frequency and focusing on higher quality.';
      range = '3-4 posts/week';
    } else if (trend === 'Up' && posts < 3) {
      status = 'Underposting';
      recommendation = 'You have momentum! Try increasing your frequency slightly to capitalize on growth.';
      range = '4-6 posts/week';
    } else if (posts === 0) {
      status = 'Inactive';
      recommendation = 'Consistency is key. Start small to build a habit.';
      range = '1-2 posts/week';
    }

    setResult({ status, recommendation, range });
  };

  return (
    <ToolLayout
      title="Posting Frequency Analyzer"
      description="Discover if you are posting too much, too little, or just right for your current growth trend."
      onBack={onBack}
    >
      {() => (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Posts Per Week</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={postsPerWeek}
                    onChange={(e) => setPostsPerWeek(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Engagement Trend</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Up', 'Stable', 'Down'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTrend(t as any)}
                      className={`py-3 rounded-lg text-sm font-bold border-2 transition-all ${
                        trend === t 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-100 bg-white text-slate-500 hover:border-gray-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
              Analyze Schedule
            </button>
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-xl text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-24 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                 
                 <div className="relative z-10">
                   <div className="text-indigo-300 font-bold uppercase text-xs tracking-widest mb-2">Status</div>
                   <div className="text-4xl font-black mb-4">{result.status}</div>
                   
                   <div className="inline-block bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                     <span className="text-indigo-200 text-xs uppercase font-bold mr-2">Recommended</span>
                     <span className="font-bold">{result.range}</span>
                   </div>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-4">
                 <div className="bg-green-100 p-2 h-fit rounded-full text-green-600">
                   <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 mb-1">Our Advice</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{result.recommendation}</p>
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

export default FrequencyTool;
