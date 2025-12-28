import React from 'react';
import { AnalysisResult } from '../../types';
import { Lightbulb, ArrowUpRight, Zap } from 'lucide-react';

interface SmartSuggestionsProps {
  results: AnalysisResult;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ results }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <Zap className="w-5 h-5 text-yellow-400" />
        <h3 className="font-bold text-lg">Smart Improvements</h3>
        <span className="ml-auto bg-white/20 text-xs px-2 py-1 rounded font-medium">AI Generated</span>
      </div>

      <div className="space-y-4">
        {results.suggestions.map((item, idx) => (
          <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-colors border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-400" />
                {item.title}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                item.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
              }`}>
                {item.priority}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              {item.description}
            </p>
            <button className="text-xs font-bold text-purple-400 flex items-center hover:text-purple-300">
              Apply Suggestion <ArrowUpRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
