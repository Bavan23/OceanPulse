// Mock data for demo purposes

export interface HazardReport {
  id: string;
  type: 'tsunami' | 'storm' | 'flood' | 'pollution' | 'other';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  reportedBy: string;
  status: 'pending' | 'verified' | 'resolved';
  media?: string[];
  aiConfidence?: number;
  socialMentions?: number;
}

export const mockHazardReports: HazardReport[] = [
  {
    id: '1',
    type: 'tsunami',
    severity: 'high',
    title: 'Potential Tsunami Warning',
    description: 'Large waves observed approaching the coastline. Emergency services have been notified.',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco Bay, CA'
    },
    timestamp: '2024-01-15T09:30:00Z',
    reportedBy: 'Sarah M.',
    status: 'verified',
    aiConfidence: 0.89,
    socialMentions: 45
  },
  {
    id: '2',
    type: 'storm',
    severity: 'medium',
    title: 'Severe Weather Conditions',
    description: 'Strong winds and high waves making water activities dangerous.',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'New York Harbor, NY'
    },
    timestamp: '2024-01-15T08:15:00Z',
    reportedBy: 'Mike D.',
    status: 'pending',
    aiConfidence: 0.73,
    socialMentions: 23
  },
  {
    id: '3',
    type: 'flood',
    severity: 'high',
    title: 'Coastal Flooding Alert',
    description: 'Rising water levels causing flooding in low-lying coastal areas.',
    location: {
      lat: 25.7617,
      lng: -80.1918,
      address: 'Miami Beach, FL'
    },
    timestamp: '2024-01-15T07:45:00Z',
    reportedBy: 'Lisa R.',
    status: 'verified',
    aiConfidence: 0.92,
    socialMentions: 67
  },
  {
    id: '4',
    type: 'pollution',
    severity: 'medium',
    title: 'Oil Spill Spotted',
    description: 'Dark substance visible on water surface, possible oil contamination.',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Santa Monica, CA'
    },
    timestamp: '2024-01-15T06:30:00Z',
    reportedBy: 'John K.',
    status: 'pending',
    aiConfidence: 0.67,
    socialMentions: 12
  },
  {
    id: '5',
    type: 'storm',
    severity: 'low',
    title: 'Rough Seas Advisory',
    description: 'Choppy conditions reported by local fishermen.',
    location: {
      lat: 47.6062,
      lng: -122.3321,
      address: 'Seattle Harbor, WA'
    },
    timestamp: '2024-01-15T05:20:00Z',
    reportedBy: 'Emma T.',
    status: 'resolved',
    aiConfidence: 0.55,
    socialMentions: 8
  },
  {
    id: '6',
    type: 'tsunami',
    severity: 'low',
    title: 'Minor Wave Activity',
    description: 'Unusual wave patterns observed, monitoring situation.',
    location: {
      lat: 21.3099,
      lng: -157.8581,
      address: 'Honolulu, HI'
    },
    timestamp: '2024-01-15T04:10:00Z',
    reportedBy: 'David L.',
    status: 'pending',
    aiConfidence: 0.41,
    socialMentions: 5
  }
];

export interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook';
  content: string;
  author: string;
  timestamp: string;
  location?: string;
  hashtags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  relevanceScore: number;
}

export const mockSocialPosts: SocialMediaPost[] = [
  {
    id: '1',
    platform: 'twitter',
    content: 'Massive waves hitting the pier right now! Stay away from the water #tsunami #safety',
    author: '@beachwalker23',
    timestamp: '2024-01-15T09:45:00Z',
    location: 'San Francisco, CA',
    hashtags: ['tsunami', 'safety', 'waves'],
    sentiment: 'negative',
    relevanceScore: 0.94
  },
  {
    id: '2',
    platform: 'instagram',
    content: 'Storm clouds gathering over the bay. Looks like we\'re in for some rough weather',
    author: '@stormchaser_ny',
    timestamp: '2024-01-15T08:30:00Z',
    location: 'New York, NY',
    hashtags: ['storm', 'weather', 'bay'],
    sentiment: 'neutral',
    relevanceScore: 0.78
  },
  {
    id: '3',
    platform: 'facebook',
    content: 'Beach access road is flooded again. When will the city fix this drainage issue?',
    author: 'Miami Local News',
    timestamp: '2024-01-15T07:20:00Z',
    location: 'Miami, FL',
    hashtags: ['flooding', 'infrastructure'],
    sentiment: 'negative',
    relevanceScore: 0.85
  }
];

export interface AIInsight {
  id: string;
  type: 'severity_update' | 'trend_analysis' | 'risk_prediction' | 'social_correlation';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  relatedReports: string[];
  actionRequired?: boolean;
}

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'severity_update',
    title: 'Tsunami Alert Severity Increased',
    description: 'AI analysis of seismic data and social media mentions suggests higher risk than initially reported.',
    confidence: 0.91,
    timestamp: '2024-01-15T09:35:00Z',
    relatedReports: ['1'],
    actionRequired: true
  },
  {
    id: '2',
    type: 'trend_analysis',
    title: 'Coastal Flooding Pattern Detected',
    description: 'Multiple flood reports in similar coastal areas suggest systematic vulnerability.',
    confidence: 0.76,
    timestamp: '2024-01-15T08:20:00Z',
    relatedReports: ['3', '6'],
    actionRequired: false
  },
  {
    id: '3',
    type: 'social_correlation',
    title: 'Social Media Storm Mentions Spike',
    description: '300% increase in storm-related posts correlates with weather service warnings.',
    confidence: 0.83,
    timestamp: '2024-01-15T07:45:00Z',
    relatedReports: ['2'],
    actionRequired: false
  }
];

// API Placeholder Functions
export const apiPlaceholders = {
  // Hazard Reports
  async fetchHazardReports(filters?: any): Promise<HazardReport[]> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockHazardReports;
  },

  async submitHazardReport(report: Partial<HazardReport>): Promise<HazardReport> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newReport: HazardReport = {
      id: Date.now().toString(),
      type: report.type || 'other',
      severity: report.severity || 'medium',
      title: report.title || 'Hazard Report',
      description: report.description || '',
      location: report.location || { lat: 0, lng: 0, address: 'Unknown' },
      timestamp: new Date().toISOString(),
      reportedBy: 'Current User',
      status: 'pending',
      aiConfidence: Math.random() * 0.4 + 0.6 // 0.6-1.0
    };
    return newReport;
  },

  // Social Media
  async fetchSocialPosts(keywords?: string[]): Promise<SocialMediaPost[]> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockSocialPosts;
  },

  // AI Insights
  async fetchAIInsights(): Promise<AIInsight[]> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    return mockAIInsights;
  },

  // Analytics
  async fetchAnalytics(timeRange: string) {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      totalReports: 156,
      activeAlerts: 23,
      resolvedIncidents: 89,
      averageResponseTime: '12 minutes',
      hotspots: [
        { location: 'San Francisco Bay', incidents: 34 },
        { location: 'Miami Beach', incidents: 28 },
        { location: 'New York Harbor', incidents: 19 }
      ]
    };
  }
};