import React from 'react';
import { Check, X, Lock, Zap, FileText, TrendingUp, Shield } from 'lucide-react';

interface ProUpgradeSectionProps {
  onUpgrade?: () => void;
}

const ProUpgradeSection: React.FC<ProUpgradeSectionProps> = ({ onUpgrade }) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Pro Analytics</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Get deeper insights, detailed reports, and personalized growth strategies to scale faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        
        {/* Free Plan */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col relative z-0">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Basic</h3>
            <p className="text-slate-500 text-sm mt-1">For hobbyists starting out</p>
            <div className="mt-4 text-3xl font-bold text-slate-900">Free</div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-slate-700">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span>Unlimited Basic Estimations</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span>Engagement Rate Calculator</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span>Local Browser Processing</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <X className="w-5 h-5 shrink-0" />
              <span>Detailed Growth Report</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <X className="w-5 h-5 shrink-0" />
              <span>PDF / CSV Export</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <X className="w-5 h-5 shrink-0" />
              <span>Ad-Free Experience</span>
            </li>
          </ul>

          <button className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl border p-8 shadow-2xl flex flex-col relative overflow-hidden transform md:-translate-y-4 z-10 bg-slate-900 border-purple-500/30">
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
            MOST POPULAR
          </div>

          <div className="mb-6 relative">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Pro
            </h3>
            <p className="text-slate-400 text-sm mt-1">For serious creators scaling up</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">$49</span>
              <span className="text-slate-400">/month</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-grow relative">
            <li className="flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
              <span>Everything in Basic</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 p-1 rounded-full"><TrendingUp className="w-3 h-3 text-purple-400" /></div>
              <span>Advanced Growth Suggestions</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 p-1 rounded-full"><FileText className="w-3 h-3 text-purple-400" /></div>
              <span>Download PDF Reports</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 p-1 rounded-full"><Lock className="w-3 h-3 text-purple-400" /></div>
              <span>Deep Niche Analysis</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 p-1 rounded-full"><Shield className="w-3 h-3 text-purple-400" /></div>
              <span>Ad-Free Dashboard</span>
            </li>
          </ul>

          <button 
            onClick={onUpgrade}
            className="w-full py-4 rounded-xl font-bold relative overflow-hidden group transition-all bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
               <>Upgrade to Pro <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Beta</span></>
            </span>
          </button>
          
          <p className="text-center text-xs text-slate-500 mt-4">
            Join the waitlist for early access.
          </p>
        </div>

      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-slate-400">
          No subscription required for basic tools. Pro features are optional.
        </p>
      </div>
    </div>
  );
};

export default ProUpgradeSection;