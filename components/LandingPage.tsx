import React from 'react';
import { View } from '../types';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Lock, CheckCircle, 
  Activity, Users, Hash, Calendar, Layout, Award, TrendingUp, Check
} from 'lucide-react';
import Newsletter from './Newsletter';
import { BLOG_POSTS } from '../blogData';
import AdBanner from './AdBanner';

interface LandingPageProps {
  onNavigate: (view: View, id?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="text-center py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-100 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm mb-8 animate-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">New: 2025 Algorithm Updated</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight animate-in slide-in-from-bottom-6 duration-1000">
            Free Social Media <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Analytics Tools</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 duration-1000">
            Analyze engagement, reach, hashtags, and growth for Instagram, YouTube, TikTok & Facebook. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-1000 delay-100">
            <button 
              onClick={() => onNavigate('auth')}
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-all shadow-xl shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('tools')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-bold rounded-full border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              View All Tools
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-gray-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckCircle className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-slate-700">Sign Up Required</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><ShieldCheck className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-slate-700">Secure & Private</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Zap className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-slate-700">Instant Results</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Globe className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-slate-700">Global Creators</span>
            </div>
          </div>
        </div>
      </section>

      <AdBanner format="leaderboard" />

      {/* 5. HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold text-slate-400">1</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Enter Your Numbers</h3>
              <p className="text-slate-500 text-sm px-4">Input public metrics like followers, views, and likes. No login needed for basic tools.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold text-primary-600">2</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Get Instant Analytics</h3>
              <p className="text-slate-500 text-sm px-4">Our algorithms calculate your engagement, reach potential, and health score instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold text-slate-400">3</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Improve Your Content</h3>
              <p className="text-slate-500 text-sm px-4">Use the insights to optimize your posting schedule and content strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS SECTION */}
      <section className="py-20 px-4 bg-slate-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Choose Your Growth Plan</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Professional analytics accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FREE CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Free</h3>
                <p className="text-slate-500 text-sm mt-1">For hobbyists & beginners</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-500">/forever</span>
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
                    <span className="text-sm">Ads Supported</span>
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
            <div className="rounded-2xl border p-8 shadow-xl transition-all flex flex-col relative overflow-hidden bg-slate-900 border-purple-500/50 group hover:shadow-2xl">
              {/* Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">
                MOST POPULAR
              </div>
              
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" /> Pro
                </h3>
                <p className="text-slate-400 text-sm mt-1">For serious creators</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$49</span>
                  <span className="text-slate-400">/month</span>
                </div>
              </div>

              <div className="flex-grow relative z-10">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-white">
                    <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                    <span className="text-sm">Advanced Analytics & Trends</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                    <span className="text-sm">Platform-wise Breakdown</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                    <span className="text-sm">Export PDF / CSV Reports</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="bg-purple-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-purple-400" /></div>
                    <span className="text-sm font-bold text-purple-300">Ad-Free Experience</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all relative z-10 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
              >
                View Pro Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTH CTA SECTION */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Unlock Advanced Analytics?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who use SocialPulse to treat their content like a business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
               onClick={() => onNavigate('auth')}
               className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl"
             >
               Get Started Free
             </button>
             <button 
               onClick={() => onNavigate('tools')}
               className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
             >
               Explore Tools
             </button>
          </div>
        </div>
      </section>

      {/* 8. BLOG PREVIEW */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Creator Tips</h2>
              <p className="text-slate-500">Latest strategies from our growth experts.</p>
            </div>
            <button onClick={() => onNavigate('blog')} className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:underline">
              Read All Articles <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div 
                key={post.id}
                onClick={() => onNavigate('blog-post', post.id)}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden mb-4 shadow-sm aspect-[3/2]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-xs font-bold text-primary-600 uppercase mb-2">{post.category}</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button onClick={() => onNavigate('blog')} className="text-primary-600 font-bold hover:underline">
              Read All Articles
            </button>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <div className="max-w-5xl mx-auto px-4">
        <Newsletter />
      </div>

    </div>
  );
};

export default LandingPage;