import React from 'react';
import { BLOG_POSTS } from '../blogData';
import { View } from '../types';
import AdBanner from './AdBanner';
import Newsletter from './Newsletter';
import { Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react';

interface BlogLandingProps {
  onNavigate: (view: View, postId?: string) => void;
}

const BlogLanding: React.FC<BlogLandingProps> = ({ onNavigate }) => {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Creator Growth <span className="text-primary-600">Hub</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Daily tips, deep-dive analytics guides, and strategies to help you scale your social media presence.
        </p>
      </div>

      {/* Featured Article */}
      <div 
        onClick={() => onNavigate('blog-post', featuredPost.id)}
        className="group relative w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16 cursor-pointer hover:shadow-xl transition-all duration-300"
      >
        <div className="md:flex h-full">
          <div className="md:w-3/5 h-64 md:h-auto overflow-hidden relative">
             <div className="absolute top-4 left-4 z-10">
               <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wider flex items-center gap-1">
                 <TrendingUp className="w-3 h-3" /> Featured
               </span>
             </div>
             <img 
               src={featuredPost.image} 
               alt={featuredPost.title} 
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
             />
          </div>
          <div className="md:w-2/5 p-8 flex flex-col justify-center bg-white relative">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-primary-600">
              <span className="bg-primary-50 px-2 py-1 rounded">{featuredPost.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center text-sm text-slate-400 gap-4 mt-auto">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
        <div className="h-px bg-gray-200 flex-grow ml-6 hidden sm:block"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {otherPosts.map((post) => (
          <div 
            key={post.id}
            onClick={() => onNavigate('blog-post', post.id)}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="h-52 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                 <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                   <Clock className="w-3 h-3" /> {post.readTime}
                 </span>
                 <span className="text-primary-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                   Read <ArrowRight className="w-4 h-4 ml-1" />
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Newsletter />
      <AdBanner format="leaderboard" />
    </div>
  );
};

export default BlogLanding;
