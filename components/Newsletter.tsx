import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true);
        setEmail('');
      }, 500);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden my-12">
      <div className="relative z-10">
        {subscribed ? (
          <div className="animate-in fade-in duration-500 py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
            <p className="text-slate-400">Keep an eye on your inbox for the latest creator tips.</p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <Mail className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Get Weekly Creator Growth Tips</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
              Free tips for Instagram, YouTube, TikTok & Facebook creators. Algorithm updates, tool guides, and more.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-slate-400" 
              />
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-500 px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap shadow-lg shadow-primary-900/20"
              >
                Subscribe
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">✓ Growth hacks</span>
              <span className="flex items-center gap-1">✓ Algorithm news</span>
              <span className="flex items-center gap-1">✓ No spam</span>
            </div>
            <p className="text-xs text-slate-600 mt-4">Unsubscribe anytime.</p>
          </>
        )}
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Newsletter;
