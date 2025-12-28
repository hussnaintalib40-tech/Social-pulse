import React from 'react';
import { AnalysisResult } from '../../types';
import { Target, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface DeepNicheAnalysisProps {
  results: AnalysisResult;
}

const DeepNicheAnalysis: React.FC<DeepNicheAnalysisProps> = ({ results }) => {
  const { deepAnalysis } = results;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Niche Score Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Niche Performance</h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900">{deepAnalysis.nicheScore}</span>
            <span className="text-slate-400 font-medium mb-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${deepAnalysis.nicheScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500">
            You are outperforming {deepAnalysis.nicheScore > 50 ? '65%' : '30%'} of creators in your niche.
          </p>
        </div>

        {/* Content Type Performance */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-900">Content Type ROI</h3>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deepAnalysis.contentTypes} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" width={90} tick={{fontSize: 10}} interval={0} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ fontSize: '12px' }} />
                <Bar dataKey="engagement" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottlenecks & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-2 mb-4 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold">Growth Bottlenecks</h3>
          </div>
          <ul className="space-y-3">
            {deepAnalysis.bottlenecks.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                <span className="text-sm font-medium text-slate-700">{item.issue}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                  item.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {item.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <div className="flex items-center gap-2 mb-4 text-green-800">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-bold">Opportunities</h3>
          </div>
          <ul className="space-y-3">
            {deepAnalysis.growthAreas.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeepNicheAnalysis;
