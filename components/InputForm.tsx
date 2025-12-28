import React, { useState } from 'react';
import { InputData, PlatformId } from '../types';
import { PLATFORMS } from '../constants';
import { Info } from 'lucide-react';

interface InputFormProps {
  platformId: PlatformId;
  onSubmit: (data: InputData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ platformId, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    followers: '',
    avgViews: '',
    avgLikes: '',
    avgComments: '',
    postingFrequency: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow numbers only
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      followers: Number(formData.followers) || 0,
      avgViews: Number(formData.avgViews) || 0,
      avgLikes: Number(formData.avgLikes) || 0,
      avgComments: Number(formData.avgComments) || 0,
      postingFrequency: Number(formData.postingFrequency) || 0,
    });
  };

  const platformName = PLATFORMS.find(p => p.id === platformId)?.name;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Followers */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              Followers / Subscribers
              <div className="relative group/tooltip">
                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded hidden group-hover/tooltip:block z-10">
                  Total count of people following your account.
                </div>
              </div>
            </label>
            <input
              type="text"
              name="followers"
              value={formData.followers}
              onChange={handleChange}
              placeholder="e.g. 5000"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          {/* Average Views */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Average Views (Last 10 Posts)</label>
            <input
              type="text"
              name="avgViews"
              value={formData.avgViews}
              onChange={handleChange}
              placeholder="e.g. 1200"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          {/* Posting Frequency */}
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              Posts Per Month
              <div className="relative group/tooltip">
                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded hidden group-hover/tooltip:block z-10">
                  How many times do you upload in 30 days?
                </div>
              </div>
            </label>
            <input
              type="text"
              name="postingFrequency"
              value={formData.postingFrequency}
              onChange={handleChange}
              placeholder="e.g. 12"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          {/* Average Likes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Average Likes</label>
            <input
              type="text"
              name="avgLikes"
              value={formData.avgLikes}
              onChange={handleChange}
              placeholder="e.g. 150"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          {/* Average Comments */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Average Comments</label>
            <input
              type="text"
              name="avgComments"
              value={formData.avgComments}
              onChange={handleChange}
              placeholder="e.g. 25"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            `Analyze ${platformName} Stats`
          )}
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-4">
          Data is processed locally in your browser.
        </p>
      </form>
    </div>
  );
};

export default InputForm;
