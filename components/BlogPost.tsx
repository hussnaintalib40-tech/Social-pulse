import React, { useEffect } from 'react';
import { BLOG_POSTS } from '../blogData';
import { View } from '../types';
import { ArrowLeft, Calendar, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import AdBanner from './AdBanner';

interface BlogPostProps {
  postId: string;
  onNavigate: (view: View, postId?: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ postId, onNavigate }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Article not found</h2>
        <button onClick={() => onNavigate('blog')} className="mt-4 text-primary-600 hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== postId).slice(0, 3);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Back Button */}
      <button 
        onClick={() => onNavigate('blog')}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </button>

      {/* Header */}
      <header className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <article className="max-w-2xl mx-auto mb-16">
        {post.content.map((block, index) => {
          switch (block.type) {
            case 'h2':
              return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{block.content}</h2>;
            case 'h3':
              return <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-3">{block.content}</h3>;
            case 'p':
              return <p key={index} className="text-lg text-slate-700 leading-relaxed mb-6">{block.content}</p>;
            case 'ul':
              return (
                <ul key={index} className="space-y-3 mb-8 ml-4">
                  {block.items?.map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 text-lg">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2.5 mr-3 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case 'tip':
              return (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-500 shrink-0" />
                    <p className="text-yellow-900 italic font-medium">{block.content}</p>
                  </div>
                </div>
              );
            case 'table':
              return (
                <div key={index} className="overflow-x-auto my-10 border border-gray-200 rounded-xl shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-200">
                        {block.tableHeaders?.map((h, i) => (
                          <th key={i} className="px-6 py-4 font-bold text-slate-900 text-sm uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {block.tableRows?.map((row, rI) => (
                        <tr key={rI} className={rI % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                          {row.map((cell, cI) => (
                            <td key={cI} className={`px-6 py-4 text-slate-700 ${cI === 0 ? 'font-medium' : ''}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            case 'cta':
              return (
                <div key={index} className="bg-slate-900 text-white p-8 rounded-xl my-10 text-center shadow-xl relative overflow-hidden group cursor-pointer" onClick={() => block.toolId && onNavigate(block.toolId)}>
                   <div className="absolute top-0 right-0 p-24 bg-primary-500 opacity-20 rounded-full -mr-10 -mt-10 blur-xl group-hover:opacity-30 transition-opacity"></div>
                   <h3 className="text-xl font-bold mb-4 relative z-10">{block.content || 'Want to optimize your strategy?'}</h3>
                   <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-full transition-all transform group-hover:scale-105 inline-flex items-center relative z-10">
                     {block.buttonText} <ArrowRight className="ml-2 w-5 h-5" />
                   </button>
                </div>
              );
            case 'ad':
              return <div key={index} className="my-8"><AdBanner format="rectangle" /></div>;
            default:
              return null;
          }
        })}
      </article>

      {/* Disclaimer */}
      <div className="max-w-2xl mx-auto border-t border-gray-200 pt-6 mb-16">
        <p className="text-xs text-slate-400 text-center italic">
          Disclaimer: Strategies and estimates mentioned in this article are based on industry averages and may vary by account.
        </p>
      </div>

      {/* Related Articles */}
      <div className="max-w-5xl mx-auto border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 px-4">More for Creators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {relatedPosts.map((p) => (
            <div 
              key={p.id}
              onClick={() => onNavigate('blog-post', p.id)}
              className="cursor-pointer group"
            >
              <div className="rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100 aspect-[3/2]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-xs font-bold text-primary-600 uppercase mb-2">{p.category}</div>
              <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-2">
                {p.title}
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">{p.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <AdBanner format="leaderboard" />
      </div>
    </div>
  );
};

export default BlogPost;
