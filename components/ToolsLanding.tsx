import React from 'react';
import { View } from '../types';
import { 
  Activity, DollarSign, TrendingUp, Users, Hash, Calendar, Award, ArrowRight, Lock
} from 'lucide-react';
import AdBanner from './AdBanner';

interface ToolsLandingProps {
  onNavigate: (view: View) => void;
  isPro?: boolean;
  onUpgrade?: () => void;
}

const TOOLS_LIST = [
  {
    id: 'tool-reach',
    name: 'Post Reach Estimator',
    description: 'Estimate how many people will actually see your next post based on platform algorithms.',
    icon: Users,
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    requiresPro: false
  },
  {
    id: 'tool-frequency',
    name: 'Posting Frequency Tool',
    description: 'Find out if you are overposting or underposting for your current growth.',
    icon: Calendar,
    color: 'bg-indigo-600',
    textColor: 'text-indigo-600',
    requiresPro: false
  },
  {
    id: 'tool-hashtag',
    name: 'Hashtag Analyzer',
    description: 'Score your hashtag strategy based on engagement impact.',
    icon: Hash,
    color: 'bg-pink-600',
    textColor: 'text-pink-600',
    requiresPro: true
  },
  {
    id: 'tool-level',
    name: 'Creator Level Checker',
    description: 'Determine your creator tier and get actionable advice to level up.',
    icon: Award,
    color: 'bg-teal-500',
    textColor: 'text-teal-500',
    requiresPro: true
  },
  {
    id: 'tool-engagement',
    name: 'Engagement Rate Calculator',
    description: 'Calculate your true engagement rate and get a health score.',
    icon: Activity,
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    requiresPro: true
  },
  {
    id: 'tool-earnings',
    name: 'Earnings Estimator',
    description: 'Estimate potential revenue from ads and sponsorships.',
    icon: DollarSign,
    color: 'bg-green-600',
    textColor: 'text-green-600',
    requiresPro: true
  },
  {
    id: 'tool-growth',
    name: 'Follower Growth Estimator',
    description: 'Project your follower count over the next 6 months.',
    icon: TrendingUp,
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    requiresPro: true
  },
];

const ToolsLanding: React.FC<ToolsLandingProps> = ({ onNavigate, isPro = false, onUpgrade }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Creator Tools
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Free tools to analyze, plan, and grow your social media presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {TOOLS_LIST.map((tool) => {
          const Icon = tool.icon;
          const isLocked = tool.requiresPro && !isPro;

          return (
            <button
              key={tool.id}
              onClick={() => isLocked && onUpgrade ? onUpgrade() : onNavigate(tool.id as View)}
              className={`group bg-white p-6 rounded-xl border shadow-sm transition-all text-left flex flex-col h-full relative overflow-hidden ${
                isLocked 
                  ? 'border-gray-200 hover:border-purple-300 opacity-90' 
                  : 'border-gray-200 hover:shadow-lg hover:border-primary-200'
              }`}
            >
              {isLocked && (
                <div className="absolute top-3 right-3 z-10">
                   <div className="bg-slate-900 text-white p-1.5 rounded-lg shadow-sm">
                     <Lock className="w-3 h-3" />
                   </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg transition-all ${
                   isLocked ? 'bg-gray-100' : `${tool.color} bg-opacity-10 group-hover:bg-opacity-20`
                }`}>
                  <Icon className={`w-6 h-6 ${isLocked ? 'text-gray-400' : tool.textColor}`} />
                </div>
                {!isLocked && (
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">
                {tool.description}
              </p>
              
              <div className={`w-full py-3 text-center text-sm font-bold rounded-lg transition-all shadow-sm ${
                isLocked
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'text-primary-700 bg-primary-50 group-hover:bg-primary-600 group-hover:text-white'
              }`}>
                {isLocked ? 'Unlock with Pro' : 'Use Tool'}
              </div>
            </button>
          );
        })}
      </div>

      <AdBanner format="leaderboard" isPro={isPro} />
    </div>
  );
};

export default ToolsLanding;