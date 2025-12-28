import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Menu, X, ChevronDown, LogOut, User, CreditCard, Sparkles } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  isPro?: boolean;
  isLoggedIn?: boolean;
  onUpgrade?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, isPro = false, isLoggedIn = false, onUpgrade, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks: { label: string; view: View }[] = [
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Tools', view: 'tools' },
    { label: 'Pricing', view: 'pricing' },
    { label: 'Blog', view: 'blog' },
    { label: 'About', view: 'about' },
  ];

  const handleNav = (view: View) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleNav(isLoggedIn ? 'dashboard' : 'landing')}
          >
            <div className={`text-white p-2 rounded-lg transition-colors shadow-sm ${isPro ? 'bg-slate-900' : 'bg-primary-600 group-hover:bg-primary-700'}`}>
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 leading-none flex items-center gap-1">
                SocialPulse
                {isPro ? (
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-black">PRO</span>
                ) : (
                  <span className="text-primary-600">Lite</span>
                )}
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-0.5 uppercase">
                {isPro ? 'Pro Plan' : 'Free Plan'}
              </span>
            </div>
          </div>

          {/* CENTER: Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  currentView === link.view ? 'text-primary-600 font-bold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* RIGHT: Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-gray-200 hover:bg-slate-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm">
                    JD
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-500 truncate">john.doe@example.com</p>
                    </div>
                    
                    <button 
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>

                    <button 
                      onClick={onUpgrade || (() => handleNav('pricing'))}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-2"
                    >
                      {isPro ? (
                         <><CreditCard className="w-4 h-4" /> Manage Subscription</>
                      ) : (
                         <><Sparkles className="w-4 h-4 text-yellow-500" /> Upgrade to Pro</>
                      )}
                    </button>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button 
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleNav('auth')}
                  className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors px-3 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('auth')}
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all shadow-lg shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-0.5"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            {isLoggedIn && (
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm">
                  JD
               </div>
            )}
             <button 
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
               className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 duration-200 h-screen overflow-y-auto pb-20">
          <div className="px-4 py-6 space-y-4">
            {isLoggedIn && (
               <div className="mb-6 p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 font-bold shadow-sm">
                    JD
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">John Doe</div>
                    <div className="text-xs text-slate-500">{isPro ? 'Pro Plan' : 'Free Plan'}</div>
                  </div>
               </div>
            )}

            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`block w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                  currentView === link.view ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
              {isLoggedIn ? (
                <>
                   {!isPro && (
                      <button
                        onClick={onUpgrade || (() => handleNav('pricing'))}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2 text-lg"
                      >
                        <Sparkles className="w-5 h-5" /> Upgrade to Pro
                      </button>
                   )}
                   <button 
                      onClick={handleLogoutClick}
                      className="w-full bg-gray-100 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors text-lg flex items-center justify-center gap-2"
                   >
                     <LogOut className="w-5 h-5" /> Log Out
                   </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleNav('auth')}
                    className="w-full bg-white border border-gray-200 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors text-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav('auth')}
                    className="w-full bg-primary-600 active:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-md text-lg"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;