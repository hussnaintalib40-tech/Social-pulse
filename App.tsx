import React, { useState, useEffect } from 'react';
import { View, UserTier } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Page Components
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ToolsLanding from './components/ToolsLanding';
import BlogLanding from './components/BlogLanding';
import BlogPost from './components/BlogPost';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import PricingPage from './components/PricingPage';

import EngagementTool from './components/tools/EngagementTool';
import EarningsTool from './components/tools/EarningsTool';
import GrowthTool from './components/tools/GrowthTool';
import HashtagTool from './components/tools/HashtagTool';
import ReachTool from './components/tools/ReachTool';
import FrequencyTool from './components/tools/FrequencyTool';
import LevelTool from './components/tools/LevelTool';

import Header from './components/Header';
import Footer from './components/Footer';
import UpgradeModal from './components/UpgradeModal';

const AppContent: React.FC = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const [currentView, setCurrentView] = useState<View>('landing');
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);

  const isLoggedIn = !!user;
  const userTier: UserTier = profile?.user_tier || 'free';

  useEffect(() => {
    // Geolocation check with fallback
    const checkCountry = async () => {
      // Primary: ipapi.co
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          if (data && data.country_code) {
            setUserCountry(data.country_code);
            return;
          }
        }
      } catch (error) {
        // Primary failed, continue to fallback
      }

      // Fallback: api.country.is
      try {
        const response = await fetch('https://api.country.is');
        if (response.ok) {
          const data = await response.json();
          if (data && data.country) {
            setUserCountry(data.country);
          }
        }
      } catch (error) {
        console.warn('Geo-location detection failed. Defaulting to unrestricted access.');
      }
    };
    
    checkCountry();
  }, []);

  const navigate = (view: View, id?: string) => {
    if (view === 'blog-post' && id) {
      setActiveBlogPostId(id);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    navigate('dashboard');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('landing');
  };

  const handleUpgrade = () => {
    setIsUpgradeModalOpen(true);
  };

  const confirmUpgrade = async () => {
    await updateProfile({ user_tier: 'pro' });
    setIsUpgradeModalOpen(false);
  };

  const isPro = userTier === 'pro';

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'auth':
        return <AuthPage onNavigate={navigate} onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard 
            onNavigateToTools={() => navigate('tools')} 
            isPro={isPro}
            onUpgrade={handleUpgrade}
          />
        );
      case 'tools':
        return (
          <ToolsLanding 
            onNavigate={navigate} 
            isPro={isPro}
            onUpgrade={handleUpgrade}
          />
        );
      case 'pricing':
        return (
          <PricingPage 
            onNavigate={navigate} 
            onUpgrade={handleUpgrade}
          />
        );
      case 'blog':
        return <BlogLanding onNavigate={navigate} />;
      case 'blog-post':
        return <BlogPost postId={activeBlogPostId || ''} onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      
      // Tools
      case 'tool-engagement':
        return <EngagementTool onBack={() => navigate('tools')} />;
      case 'tool-earnings':
        return <EarningsTool onBack={() => navigate('tools')} />;
      case 'tool-growth':
        return <GrowthTool onBack={() => navigate('tools')} />;
      case 'tool-hashtag':
        return <HashtagTool onBack={() => navigate('tools')} />;
      case 'tool-reach':
        return <ReachTool onBack={() => navigate('tools')} />;
      case 'tool-frequency':
        return <FrequencyTool onBack={() => navigate('tools')} />;
      case 'tool-level':
        return <LevelTool onBack={() => navigate('tools')} />;
        
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-100 selection:text-primary-700 flex flex-col">
      
      <Header 
        currentView={currentView} 
        onNavigate={navigate} 
        isPro={isPro} 
        isLoggedIn={isLoggedIn}
        onUpgrade={handleUpgrade}
        onLogout={handleLogout}
      />

      <main className="flex-grow w-full pt-20">
        {renderContent()}
      </main>

      <Footer
        onNavigate={navigate}
        isPro={isPro}
        onTogglePro={() => updateProfile({ user_tier: isPro ? 'free' : 'pro' })}
      />

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        onConfirm={confirmUpgrade} 
        userCountry={userCountry}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;