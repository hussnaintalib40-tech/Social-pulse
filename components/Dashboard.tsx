import React, { useState, useRef } from 'react';
import { Wrench, FileText, Info as InfoIcon } from 'lucide-react';
import { PLATFORMS } from '../constants';
import { PlatformId, InputData, AnalysisResult } from '../types';
import { calculateAnalysis } from '../utils/calculations';
import InputForm from './InputForm';
import ResultsSection from './ResultsSection';

interface DashboardProps {
  onNavigateToTools: () => void;
  isPro?: boolean;
  onUpgrade?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToTools, isPro = false, onUpgrade }) => {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('youtube');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalysis = (data: InputData) => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate processing delay for UX
    setTimeout(() => {
      const result = calculateAnalysis(data, activePlatform);
      setResults(result);
      setIsAnalyzing(false);
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  const handlePlatformChange = (id: PlatformId) => {
    setActivePlatform(id);
    setResults(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Performance</span> Instantly
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          Get quick insights on engagement, growth potential, and estimated earnings. 
          <br className="hidden md:block"/>
          <span className="font-medium text-slate-900">No API connection needed.</span>
        </p>
      </div>

      {/* Platform Selector */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isActive = activePlatform === platform.id;
            
            return (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform.id)}
                className={`
                  relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200
                  ${isActive 
                    ? 'border-primary-500 bg-primary-50 shadow-md transform scale-105' 
                    : 'border-white bg-white shadow-sm hover:border-gray-200 hover:shadow-md'
                  }
                `}
              >
                <div className={`p-2 rounded-full mb-2 ${isActive ? 'bg-white' : 'bg-gray-100'} transition-colors`}>
                  <Icon className={`w-6 h-6 ${platform.color}`} />
                </div>
                <span className={`font-semibold text-sm ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {platform.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SELECTED
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Form */}
      <div className="mb-16">
        <InputForm 
          platformId={activePlatform} 
          onSubmit={handleAnalysis} 
          isLoading={isAnalyzing} 
        />
      </div>

      {/* Results Section */}
      {results && (
        <div ref={resultsRef} className="pb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>
          <ResultsSection 
            results={results} 
            platform={activePlatform} 
            isPro={isPro}
            onUpgrade={onUpgrade}
          />
        </div>
      )}

      {/* Value Props */}
      {!results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-gray-100">
          <div className="text-center p-6 cursor-pointer hover:bg-slate-50 rounded-xl transition-colors" onClick={onNavigateToTools}>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Instant Tools</h3>
            <p className="text-sm text-slate-500">
              Try our standalone calculators for specific metrics like engagement and earnings.
            </p>
          </div>
          <div className="text-center p-6">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Data Privacy</h3>
            <p className="text-sm text-slate-500">
              We don't store your input data. Everything calculates locally in your browser.
            </p>
          </div>
          <div className="text-center p-6">
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <InfoIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Creator Benchmarks</h3>
            <p className="text-sm text-slate-500">
              Compare your growth against industry averages to stay ahead of the curve.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;