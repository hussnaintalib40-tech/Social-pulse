import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { View, PlatformId } from '../../types';
import { PLATFORMS } from '../../constants';
import AdBanner from '../AdBanner';

interface ToolLayoutProps {
  title: string;
  description: string;
  onBack: () => void;
  children: (platform: PlatformId) => React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, onBack, children }) => {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('youtube');

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Mini Platform Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isActive = activePlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{platform.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool Content */}
      <div className="max-w-2xl mx-auto">
        {children(activePlatform)}
      </div>

      <div className="mt-12">
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
};

export default ToolLayout;