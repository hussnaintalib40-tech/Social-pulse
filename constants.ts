import { Youtube, Instagram, Facebook, Video } from 'lucide-react';
import { PlatformConfig } from './types';

export const PLATFORMS: PlatformConfig[] = [
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube, 
    color: 'text-red-600',
    bgStart: 'from-red-500',
    bgEnd: 'to-red-600'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'text-pink-600',
    bgStart: 'from-pink-500',
    bgEnd: 'to-purple-600'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: Video, 
    color: 'text-black',
    bgStart: 'from-slate-800',
    bgEnd: 'to-black'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: Facebook, 
    color: 'text-blue-600',
    bgStart: 'from-blue-500',
    bgEnd: 'to-blue-700'
  },
];

export const INITIAL_INPUT = {
  followers: '',
  avgViews: '',
  avgLikes: '',
  avgComments: '',
  postingFrequency: '',
};
