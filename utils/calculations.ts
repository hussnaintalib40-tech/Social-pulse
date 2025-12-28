import { InputData, AnalysisResult, PlatformId } from '../types';

export const calculateAnalysis = (data: InputData, platform: PlatformId): AnalysisResult => {
  const { followers, avgViews, avgLikes, avgComments, postingFrequency } = data;

  // 1. Engagement Rate Calculation
  let engagementRate = 0;
  if (followers > 0) {
    engagementRate = ((avgLikes + avgComments) / followers) * 100;
  }

  // 2. Estimated Monthly Reach
  let viralityMultiplier = 1.0;
  if (platform === 'tiktok') viralityMultiplier = 1.4;
  if (platform === 'youtube') viralityMultiplier = 1.1; // Search tail
  
  const estimatedReach = Math.floor(avgViews * postingFrequency * viralityMultiplier);

  // 3. Growth Score (0-100)
  let score = 0;
  
  const engagementBaseline = platform === 'tiktok' ? 5 : (platform === 'youtube' ? 4 : 2); // Benchmarks
  score += Math.min(50, (engagementRate / engagementBaseline) * 30);
  
  const freqBaseline = platform === 'youtube' ? 4 : 15; // 1/week YT, 3-4/week others
  score += Math.min(30, (postingFrequency / freqBaseline) * 30);

  if (followers > 0) {
    const reachRatio = estimatedReach / followers;
    score += Math.min(20, reachRatio * 10);
  }

  // 4. Creator Level
  let creatorLevel: AnalysisResult['creatorLevel'] = 'Beginner';
  if (followers > 10000) creatorLevel = 'Growing';
  if (followers > 100000) creatorLevel = 'Pro';
  if (followers > 1000000) creatorLevel = 'Superstar';

  // 5. Earnings Estimator
  let cpmLow = 0.5;
  let cpmHigh = 2.0;
  
  if (platform === 'youtube') { cpmLow = 2.0; cpmHigh = 8.0; }
  if (platform === 'instagram') { cpmLow = 0.2; cpmHigh = 1.0; }
  if (platform === 'tiktok') { cpmLow = 0.02; cpmHigh = 0.04; }
  
  const monthlyViews = avgViews * postingFrequency;
  const earningsLow = (monthlyViews / 1000) * cpmLow;
  const earningsHigh = (monthlyViews / 1000) * cpmHigh;

  const baseSponsor = (followers * 0.01); 
  const sponsoredLow = baseSponsor * 0.5; 
  const sponsoredHigh = baseSponsor * 1.5;

  // 6. Projections for Chart
  const growthRate = 1 + (engagementRate / 1000) + 0.01;
  const projectedGrowth = [];
  let currentFollowers = followers;
  const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
  
  for (const m of months) {
    currentFollowers = Math.floor(currentFollowers * growthRate);
    projectedGrowth.push({ month: m, followers: currentFollowers });
  }

  // 7. Benchmark for Chart
  const benchmark = platform === 'tiktok' ? 5.5 : (platform === 'youtube' ? 4.2 : 2.5);
  const engagementComparison = [
    { name: 'Your Rate', value: parseFloat(engagementRate.toFixed(2)) },
    { name: 'Industry Avg', value: benchmark },
  ];

  // 8. PRO DATA GENERATION (Mock Data)
  
  // History Trend
  const history = [
    { date: 'Week 1', engagement: engagementRate * 0.8, reach: estimatedReach * 0.7 },
    { date: 'Week 2', engagement: engagementRate * 0.9, reach: estimatedReach * 0.8 },
    { date: 'Week 3', engagement: engagementRate * 0.85, reach: estimatedReach * 0.9 },
    { date: 'Week 4', engagement: engagementRate, reach: estimatedReach },
  ];

  // Platform Breakdown (Simulated correlation)
  const platformBreakdown = [
    { id: 'youtube', name: 'YouTube', score: Math.min(100, score * 1.1), engagement: '4.2%', bestTime: '2 PM' },
    { id: 'instagram', name: 'Instagram', score: Math.min(100, score), engagement: '3.1%', bestTime: '6 PM' },
    { id: 'tiktok', name: 'TikTok', score: Math.min(100, score * 1.2), engagement: '5.8%', bestTime: '8 PM' },
    { id: 'facebook', name: 'Facebook', score: Math.min(100, score * 0.8), engagement: '1.5%', bestTime: '11 AM' },
  ] as AnalysisResult['platformBreakdown'];

  // Smart Suggestions
  const suggestions: AnalysisResult['suggestions'] = [];
  
  if (engagementRate < benchmark) {
    suggestions.push({
      title: 'Optimize Call-to-Actions',
      description: 'Your engagement is below average. Try asking a specific question in every caption to trigger comments.',
      priority: 'High'
    });
  } else {
    suggestions.push({
      title: 'Leverage High Engagement',
      description: 'Your audience is very active. Launch a product or newsletter now while attention is high.',
      priority: 'High'
    });
  }

  if (postingFrequency < 4) {
    suggestions.push({
      title: 'Increase Consistency',
      description: 'Posting frequency is low. Aim for at least 2-3 times per week to trigger algorithm favor.',
      priority: 'Medium'
    });
  }

  suggestions.push({
    title: 'Cross-Platform Repurposing',
    description: `Your ${platform} content style works well. Try reposting top performers to ${platform === 'tiktok' ? 'YouTube Shorts' : 'TikTok'} for free extra reach.`,
    priority: 'Medium'
  });

  // Deep Analysis Data
  const deepAnalysis: AnalysisResult['deepAnalysis'] = {
    nicheScore: Math.round(score * 1.1),
    contentTypes: [
      { type: 'Short Video', engagement: engagementRate * 1.5 },
      { type: 'Carousel/Image', engagement: engagementRate * 0.9 },
      { type: 'Text/Poll', engagement: engagementRate * 0.6 },
    ],
    bottlenecks: [
      { issue: 'Inconsistent Schedule', severity: postingFrequency < 8 ? 'High' : 'Low' },
      { issue: 'Low Comment Ratio', severity: (avgComments / (avgLikes + 1) < 0.05) ? 'High' : 'Medium' },
    ],
    growthAreas: [
      'Experiment with longer captions to increase dwell time.',
      'Reply to comments within the first hour to boost algorithm signal.',
      'Use trending audio to reach non-followers.'
    ]
  };

  return {
    engagementRate: parseFloat(engagementRate.toFixed(2)),
    estimatedReach,
    growthScore: Math.round(score),
    creatorLevel,
    earnings: {
      low: Math.floor(earningsLow),
      high: Math.floor(earningsHigh),
      sponsoredLow: Math.floor(sponsoredLow),
      sponsoredHigh: Math.floor(sponsoredHigh)
    },
    projectedGrowth,
    engagementComparison,
    history,
    platformBreakdown,
    suggestions,
    deepAnalysis
  };
};
