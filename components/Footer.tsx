import React, { useState } from 'react';
import { LayoutDashboard, Github, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
  isPro?: boolean;
  onTogglePro?: () => void;
}

interface FooterLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ onClick, children }) => (
  <button 
    onClick={onClick} 
    className="text-slate-400 hover:text-primary-400 transition-colors text-sm hover:underline text-left block w-full md:w-auto py-1"
  >
    {children}
  </button>
);

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, children, isOpen, onToggle }) => (
  <div className="border-b border-slate-800 md:border-none last:border-none">
    <button 
      className="flex items-center justify-between w-full md:w-auto py-4 md:py-0 text-left group"
      onClick={onToggle}
    >
      <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs group-hover:text-white transition-colors">{title}</h3>
      <ChevronDown className={`w-4 h-4 text-slate-500 md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`
      overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 md:mt-4 md:overflow-visible
      ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 md:max-h-none'}
    `}>
      <div className="flex flex-col gap-2 items-start pl-2 md:pl-0 border-l-2 border-slate-800 md:border-none">
        {children}
      </div>
    </div>
  </div>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Main Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 mb-12">
           
           {/* Column 1: Tools */}
           <div className="md:border-r md:border-slate-800 md:pr-8">
             <FooterColumn 
                title="Tools" 
                isOpen={openSection === 'tools'} 
                onToggle={() => toggleSection('tools')}
             >
                 <FooterLink onClick={() => onNavigate('tool-reach')}>Post Reach Estimator</FooterLink>
                 <FooterLink onClick={() => onNavigate('tool-hashtag')}>Hashtag Analyzer</FooterLink>
                 <FooterLink onClick={() => onNavigate('tool-frequency')}>Posting Frequency Tool</FooterLink>
                 <FooterLink onClick={() => onNavigate('tool-level')}>Creator Level Checker</FooterLink>
                 <FooterLink onClick={() => onNavigate('tool-engagement')}>Engagement Rate Calculator</FooterLink>
                 <FooterLink onClick={() => onNavigate('tool-growth')}>Growth Estimator</FooterLink>
             </FooterColumn>
           </div>

           {/* Column 2: Resources */}
           <div className="md:border-r md:border-slate-800 md:px-8">
             <FooterColumn 
                title="Resources" 
                isOpen={openSection === 'resources'} 
                onToggle={() => toggleSection('resources')}
             >
                 <FooterLink onClick={() => onNavigate('blog')}>Blog</FooterLink>
                 <FooterLink onClick={() => onNavigate('blog')}>Social Media Growth Tips</FooterLink>
                 <FooterLink onClick={() => onNavigate('blog')}>Instagram Growth Guide</FooterLink>
                 <FooterLink onClick={() => onNavigate('blog')}>YouTube Growth Guide</FooterLink>
                 <FooterLink onClick={() => onNavigate('blog')}>TikTok Growth Guide</FooterLink>
                 <FooterLink onClick={() => onNavigate('pricing')}>Free Tools vs Pro Features</FooterLink>
             </FooterColumn>
           </div>

           {/* Column 3: Legal */}
           <div className="md:pl-8">
             <FooterColumn 
                title="Legal" 
                isOpen={openSection === 'legal'} 
                onToggle={() => toggleSection('legal')}
             >
                 <FooterLink onClick={() => onNavigate('privacy')}>Privacy Policy</FooterLink>
                 <FooterLink onClick={() => onNavigate('terms')}>Terms & Conditions</FooterLink>
                 <FooterLink onClick={() => onNavigate('terms')}>Disclaimer</FooterLink>
                 <FooterLink onClick={() => onNavigate('privacy')}>Cookie Policy</FooterLink>
                 <FooterLink onClick={() => onNavigate('contact')}>Contact Us</FooterLink>
             </FooterColumn>
           </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                 <LayoutDashboard className="w-5 h-5 text-primary-500" />
                 <span className="font-bold text-lg tracking-tight">
                   SocialPulse<span className="text-primary-400">Lite</span>
                 </span>
              </div>
              <span className="text-slate-700 hidden md:inline">|</span>
              <p className="text-xs text-slate-500">&copy; {currentYear} SocialPulse Analytics.</p>
           </div>

           <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Built for content creators</p>

           <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-1"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-1"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors p-1"><Linkedin className="w-5 h-5" /></a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;