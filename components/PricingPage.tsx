import React from 'react';
import { View } from '../types';
import { 
  Check, Zap, BarChart2, Layers, FileText, Lightbulb, 
  ShieldCheck, CreditCard, Heart, HelpCircle, ArrowRight
} from 'lucide-react';
import AdBanner from './AdBanner';

interface PricingPageProps {
  onNavigate: (view: View) => void;
  onUpgrade?: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onUpgrade }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-12">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Simple, Transparent <span className="text-primary-600">Pricing</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Start free. Upgrade only if you need more power to scale your audience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4">
        
        {/* FREE CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col relative">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Free</h3>
            <p className="text-slate-500 text-sm mt-1">For hobbyists & beginners</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-slate-500">/forever</span>
            </div>
            <div className="mt-4 inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Always Free
            </div>
          </div>

          <div className="flex-grow">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Basic Engagement Analytics</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Limited Growth Estimates</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">On-screen Results Only</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Check className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-sm">Ads Supported Experience</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => onNavigate('tools')}
            className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
          >
            Use Free Tools
          </button>
        </div>

        {/* PRO CARD */}
        <div className="rounded-2xl border p-8 shadow-xl transition-all flex flex-col relative overflow-hidden transform md:-translate-y-4 bg-slate-900 border-purple-500/50 hover:shadow-2xl">
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">
            MOST POPULAR
          </div>
          
          {/* Background FX */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="mb-6 relative z-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Pro
            </h3>
            <p className="text-slate-400 text-sm mt-1">For serious creators scaling up</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$49</span>
              <span className="text-slate-400">/month</span>
            </div>
            <div className="mt-4 text-purple-200 text-xs">
              Billed monthly. Cancel anytime.
            </div>
          </div>

          <div className="flex-grow relative z-10">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm">Advanced Analytics Breakdown</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm">Platform-wise Insights</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm">Monthly Growth Reports</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm">Export PDF / CSV</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm">Smart Improvement Tips</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                <span className="text-sm font-bold text-purple-300">Ad-Free Experience</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={onUpgrade}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all relative z-10 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>

      <AdBanner format="leaderboard" />

      {/* Trust Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-24 px-4">
        <div className="flex flex-col items-center">
          <div className="bg-green-50 p-4 rounded-full mb-4">
             <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">No Hidden Fees</h4>
          <p className="text-sm text-slate-500">What you see is what you pay. Transparent monthly billing.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
             <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Secure Payments</h4>
          <p className="text-sm text-slate-500">Encrypted transactions via Stripe. We never store your card details.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-purple-50 p-4 rounded-full mb-4">
             <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Built for Creators</h4>
          <p className="text-sm text-slate-500">Designed specifically for the needs of influencers and brands.</p>
        </div>
      </div>

      {/* Pro Features UI Breakdown */}
      <div className="bg-white border-y border-gray-100 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What You Get in Pro</h2>
            <div className="h-1 w-20 bg-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors group">
              <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Advanced Metrics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Go beyond basic counts. See detailed engagement rates, historical trends, and virality scores.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors group">
              <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Platform Breakdown</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Separate insights for YouTube, Instagram, TikTok & Facebook to tailor your strategy for each app.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors group">
              <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Export Reports</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Download professional PDF or CSV reports to share with brands, agencies, or your team.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors group">
              <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Smart Suggestions</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Get AI-driven actionable tips on when to post, what hashtags to use, and how to improve content.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={onUpgrade}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-all inline-flex items-center gap-2"
            >
              Unlock Pro Features <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-500 mt-4">Free tools remain available forever.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              Is Free really free?
            </h3>
            <p className="text-slate-600 text-sm">
              Yes! Our basic calculators and estimators are 100% free to use. We show non-intrusive ads to keep the servers running.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              Can I upgrade later?
            </h3>
            <p className="text-slate-600 text-sm">
              Absolutely. You can start with the free version and upgrade to Pro whenever you feel ready to take your analytics to the next level.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              Do you store my data?
            </h3>
            <p className="text-slate-600 text-sm">
              For free tools, all calculations happen in your browser. For Pro users, we save your historical reports securely so you can track progress over time. We never sell your data.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PricingPage;