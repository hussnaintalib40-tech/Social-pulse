
export type PlatformId = 'youtube' | 'instagram' | 'tiktok' | 'facebook';

export type UserTier = 'free' | 'pro';

export type PaymentMethod = 'card' | 'paypal';

export type View = 
  | 'landing'
  | 'auth'
  | 'dashboard' 
  | 'tools' 
  | 'tool-engagement' 
  | 'tool-earnings' 
  | 'tool-growth' 
  | 'tool-reach' 
  | 'tool-hashtag' 
  | 'tool-frequency' 
  | 'tool-level'
  | 'blog'
  | 'blog-post'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  icon: any; // Lucide icon component
  color: string;
  bgStart: string;
  bgEnd: string;
}

export interface InputData {
  followers: number;
  avgViews: number;
  avgLikes: number;
  avgComments: number;
  postingFrequency: number; // Posts per month
}

export interface DeepAnalysisData {
  nicheScore: number;
  contentTypes: { type: string; engagement: number }[];
  bottlenecks: { issue: string; severity: 'High' | 'Medium' | 'Low' }[];
  growthAreas: string[];
}

export interface AnalysisResult {
  engagementRate: number;
  estimatedReach: number;
  growthScore: number; // 0-100
  creatorLevel: 'Beginner' | 'Growing' | 'Pro' | 'Superstar';
  earnings: {
    low: number;
    high: number;
    sponsoredLow: number;
    sponsoredHigh: number;
  };
  projectedGrowth: { month: string; followers: number }[];
  engagementComparison: { name: string; value: number }[];
  
  // Pro Features Data
  history: { date: string; engagement: number; reach: number }[];
  platformBreakdown: { id: PlatformId; name: string; score: number; engagement: string; bestTime: string }[];
  suggestions: { title: string; description: string; priority: 'High' | 'Medium' }[];
  deepAnalysis: DeepAnalysisData;
}

export interface BlogBlock {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'tip' | 'cta' | 'ad' | 'table';
  content?: string;
  items?: string[];
  toolId?: View;
  buttonText?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string; // URL or placeholder class
  content: BlogBlock[];
}