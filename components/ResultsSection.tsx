import React, { useState } from 'react';
import { AnalysisResult, PlatformId, UserTier } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, Cell
} from 'recharts';
import { TrendingUp, Users, Award, DollarSign, Activity, AlertCircle, Download, FileText, Lock, Loader2, CheckCircle } from 'lucide-react';
import AdBanner from './AdBanner';
import ProLockWrapper from './pro/ProLockWrapper';
import AdvancedAnalytics from './pro/AdvancedAnalytics';
import PlatformBreakdown from './pro/PlatformBreakdown';
import SmartSuggestions from './pro/SmartSuggestions';
import DeepNicheAnalysis from './pro/DeepNicheAnalysis';

interface ResultsSectionProps {
  results: AnalysisResult;
  platform: PlatformId;
  isPro?: boolean;
  onUpgrade?: () => void;
}

const StatCard: React.FC<{ 
  label: string; 
  value: string; 
  subValue?: string;
  icon: React.ElementType; 
  color: string;
  delay?: number;
}> = ({ label, value, subValue, icon: Icon, color, delay = 0 }) => (
  <div 
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 ease-out transform translate-y-0 opacity-100"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {subValue && (
        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
          {subValue}
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{value}</div>
    <div className="text-sm text-slate-500 font-medium">{label}</div>
  </div>
);

const EarningsCard: React.FC<{ results: AnalysisResult }> = ({ results }) => (
  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
    <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
    
    <div className="flex items-center gap-2 mb-6">
      <DollarSign className="w-5 h-5 text-green-400" />
      <h3 className="font-semibold text-lg">Estimated Monthly Earnings</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      <div>
        <p className="text-slate-400 text-sm mb-1">Ad Revenue Potential</p>
        <p className="text-2xl font-bold text-white">
          ${results.earnings.low.toLocaleString()} - ${results.earnings.high.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500 mt-1">Based on est. CPM</p>
      </div>
      <div>
        <p className="text-slate-400 text-sm mb-1">Sponsorship Value</p>
        <p className="text-2xl font-bold text-green-400">
          ${results.earnings.sponsoredLow.toLocaleString()} - ${results.earnings.sponsoredHigh.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500 mt-1">Per sponsored post</p>
      </div>
    </div>
    
    <div className="mt-6 pt-4 border-t border-slate-700">
       <p className="text-xs text-slate-400 flex items-center gap-1">
         <AlertCircle className="w-3 h-3" />
         Estimates only. Actual earnings vary by niche and location.
       </p>
    </div>
  </div>
);

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, platform, isPro = false, onUpgrade }) => {
  const [exportState, setExportState] = useState<{ type: 'pdf' | 'csv' | null; status: 'idle' | 'loading' | 'done' }>({ type: null, status: 'idle' });

  const handleExport = (type: 'pdf' | 'csv') => {
    if (!isPro && onUpgrade) {
      onUpgrade();
      return;
    }
    
    setExportState({ type, status: 'loading' });
    setTimeout(() => {
      setExportState({ type, status: 'done' });
      // Reset after showing done for a bit
      setTimeout(() => setExportState({ type: null, status: 'idle' }), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header with Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Performance Overview</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('csv')}
            disabled={exportState.status === 'loading'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
              isPro 
                ? 'bg-white border-gray-200 hover:bg-gray-50 text-slate-700 hover:shadow-sm' 
                : 'bg-gray-100 border-transparent text-gray-400'
            }`}
          >
            {exportState.type === 'csv' && exportState.status === 'loading' ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : exportState.type === 'csv' && exportState.status === 'done' ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : !isPro ? (
              <Lock className="w-3 h-3" />
            ) : (
              <FileText className="w-3 h-3" />
            )}
            {exportState.type === 'csv' && exportState.status === 'done' ? 'Downloaded' : 'CSV'}
          </button>
          
          <button 
            onClick={() => handleExport('pdf')}
            disabled={exportState.status === 'loading'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
              isPro 
                ? 'bg-slate-900 border-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-100 border-transparent text-gray-400'
            }`}
          >
            {exportState.type === 'pdf' && exportState.status === 'loading' ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : exportState.type === 'pdf' && exportState.status === 'done' ? (
               <CheckCircle className="w-3 h-3 text-green-400" />
            ) : !isPro ? (
              <Lock className="w-3 h-3" />
            ) : (
              <Download className="w-3 h-3" />
            )}
            {exportState.type === 'pdf' && exportState.status === 'done' ? 'Saved' : 'PDF Report'}
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Engagement Rate" 
          value={`${results.engagementRate}%`} 
          icon={Activity} 
          color="bg-blue-600 text-blue-600"
        />
        <StatCard 
          label="Estimated Reach" 
          value={results.estimatedReach.toLocaleString()} 
          icon={Users} 
          color="bg-purple-600 text-purple-600"
        />
        <StatCard 
          label="Growth Score" 
          value={`${results.growthScore}/100`} 
          subValue={results.growthScore > 70 ? 'Excellent' : 'Good'}
          icon={TrendingUp} 
          color="bg-green-600 text-green-600"
        />
        <StatCard 
          label="Creator Level" 
          value={results.creatorLevel} 
          icon={Award} 
          color="bg-orange-500 text-orange-500"
        />
      </div>

      <AdBanner format="rectangle" isPro={isPro} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Earnings & Analysis */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* LOCKED: Earnings Estimator */}
          <ProLockWrapper isPro={isPro} title="Revenue Estimates" onUpgrade={onUpgrade}>
            <EarningsCard results={results} />
          </ProLockWrapper>
          
          {/* FREE: Growth Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">projected Growth (6 Months)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.projectedGrowth}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LOCKED: Advanced Analytics (PRO) */}
          <ProLockWrapper isPro={isPro} title="Advanced Analytics" onUpgrade={onUpgrade}>
            <AdvancedAnalytics results={results} />
          </ProLockWrapper>

          {/* LOCKED: Platform Breakdown (PRO) */}
          <ProLockWrapper isPro={isPro} title="Platform Breakdown" onUpgrade={onUpgrade}>
            <PlatformBreakdown results={results} />
          </ProLockWrapper>

          {/* LOCKED: Deep Niche Analysis (PRO) */}
          <ProLockWrapper isPro={isPro} title="Deep Niche Analysis" onUpgrade={onUpgrade}>
             <DeepNicheAnalysis results={results} />
          </ProLockWrapper>
        </div>

        {/* Right Column: Comparison & Suggestions */}
        <div className="space-y-8">
          
          {/* LOCKED: Engagement vs Industry */}
          <ProLockWrapper isPro={isPro} title="Competitor Benchmarks" onUpgrade={onUpgrade}>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Engagement vs Industry</h3>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.engagementComparison}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis hide />
                    <RechartsTooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={50}>
                       {results.engagementComparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#94a3b8'} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Your Rate
                  </span>
                  <span className="font-bold text-slate-900">{results.engagementRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="flex items-center gap-2 text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                    Avg. {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                  <span className="font-bold text-slate-900">
                    {results.engagementComparison[1].value}%
                  </span>
                </div>
              </div>
            </div>
          </ProLockWrapper>

          {/* LOCKED: Smart Suggestions (PRO) */}
          <ProLockWrapper isPro={isPro} title="AI Growth Tips" onUpgrade={onUpgrade}>
            <SmartSuggestions results={results} />
          </ProLockWrapper>

          {/* LOCKED: Monthly Growth Report Preview */}
          <ProLockWrapper isPro={isPro} title="Monthly Reports" onUpgrade={onUpgrade}>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                 <FileText className="w-5 h-5 text-indigo-500" />
                 <h3 className="font-bold text-slate-900">Monthly Report Ready</h3>
               </div>
               <p className="text-sm text-slate-500 mb-4">Your analysis for October is ready. 12% growth observed.</p>
               <button className="text-indigo-600 text-sm font-bold hover:underline">View Report</button>
             </div>
          </ProLockWrapper>

        </div>
      </div>
    </div>
  );
};

export default ResultsSection;