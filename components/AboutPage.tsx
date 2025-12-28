import React from 'react';
import { View } from '../types';
import { 
  ShieldCheck, Zap, TrendingUp, Mail, ArrowRight, Lock 
} from 'lucide-react';
import AdBanner from './AdBanner';

interface AboutPageProps {
  onNavigate: (view: View) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-24 px-4 mb-16 -mt-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-600 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Data for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Creator Generation</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SocialPulse Lite bridges the gap between guesswork and growth. We build privacy-first analytics tools that help you turn content into a career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-6">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Democratizing Social Intelligence
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              For too long, professional-grade analytics were locked behind expensive enterprise subscriptions or required you to hand over your social media passwords to third-party apps.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe every creator—whether you have 100 followers or 1 million—deserves access to data that helps them grow. That's why we built SocialPulse Lite: to provide instant, estimate-based insights without the barriers.
            </p>
            <div className="flex gap-4">
               <div className="flex flex-col">
                 <span className="text-3xl font-black text-slate-900">10k+</span>
                 <span className="text-sm text-slate-500">Creators</span>
               </div>
               <div className="w-px bg-gray-200 h-12"></div>
               <div className="flex flex-col">
                 <span className="text-3xl font-black text-slate-900">1M+</span>
                 <span className="text-sm text-slate-500">Posts Analyzed</span>
               </div>
               <div className="w-px bg-gray-200 h-12"></div>
               <div className="flex flex-col">
                 <span className="text-3xl font-black text-slate-900">0</span>
                 <span className="text-sm text-slate-500">Passwords Stored</span>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-purple-100 rounded-2xl transform rotate-3"></div>
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" 
               alt="Team analyzing data" 
               className="relative rounded-2xl shadow-xl border-4 border-white object-cover h-full min-h-[400px]"
             />
          </div>
        </div>

        {/* Core Values / Features */}
        <div className="mb-24">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Why Creators Choose Us</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                 <ShieldCheck className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
               <p className="text-slate-600 leading-relaxed">
                 Our free tools run entirely in your browser. We don't ask for OAuth permissions, passwords, or API tokens. Your data stays yours.
               </p>
             </div>

             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                 <Zap className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Instant & Accessible</h3>
               <p className="text-slate-600 leading-relaxed">
                 No lengthy onboarding. No credit card required for basics. Just enter your public metrics and get instant, actionable analysis.
               </p>
             </div>

             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                 <TrendingUp className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Growth Oriented</h3>
               <p className="text-slate-600 leading-relaxed">
                 We don't just show numbers; we show opportunities. Our AI-driven insights help you understand *what* to do next to scale.
               </p>
             </div>
           </div>
        </div>

        <AdBanner format="leaderboard" />

        {/* The Hybrid Model Explanation */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-16 mb-24 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Free Forever vs. Pro Power</h2>
           <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
             We operate on a freemium model because we believe basic financial literacy for creators should be free. Our Pro plan ($49/mo) exists for those who are ready to treat their channel as a serious business, funding the development of free tools for everyone else.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
               onClick={() => onNavigate('dashboard')}
               className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
             >
               Use Free Tools
             </button>
             <button 
               onClick={() => onNavigate('pricing')}
               className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
             >
               Explore Pro Features
             </button>
           </div>
        </div>

        {/* Contact / Support */}
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-16">
          <div className="inline-block p-3 bg-primary-50 rounded-full text-primary-600 mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions? We're Here.</h2>
          <p className="text-slate-500 mb-8">
            Whether you're a brand looking for partnerships or a creator with a feature request, our team reads every email.
          </p>
          <a 
            href="mailto:hello@socialpulselite.com" 
            className="text-lg font-bold text-primary-600 hover:text-primary-700 hover:underline"
          >
            hello@socialpulselite.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;