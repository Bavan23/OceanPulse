import React, { useState } from 'react';
import { Hash, TrendingUp, MessageCircle, BarChart3, Twitter, Instagram, Facebook } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockSocialPosts } from '@/lib/mockData';

const AdminSocial: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const platformIcons = {
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      case 'neutral': return 'secondary';
      default: return 'secondary';
    }
  };

  const trendingHashtags = [
    { tag: '#tsunami', mentions: 1247, trend: '+23%' },
    { tag: '#storm', mentions: 892, trend: '+15%' },
    { tag: '#flooding', mentions: 634, trend: '+45%' },
    { tag: '#safety', mentions: 423, trend: '+12%' },
    { tag: '#oceanpulse', mentions: 267, trend: '+89%' },
  ];

  const sentimentData = {
    positive: 15,
    neutral: 62,
    negative: 23
  };

  const keyInsights = [
    {
      title: 'Tsunami Mentions Spike',
      description: 'Social media mentions of tsunami-related keywords increased by 300% in the last 6 hours',
      confidence: 0.94,
      actionable: true
    },
    {
      title: 'Geographic Clustering',
      description: 'Storm-related posts are concentrated in the San Francisco Bay area',
      confidence: 0.87,
      actionable: true
    },
    {
      title: 'False Alarm Detection',
      description: 'AI detected potential misinformation about flooding in Miami Beach',
      confidence: 0.76,
      actionable: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Social Media Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Monitor social media trends and extract hazard-related insights
          </p>
        </div>

        {/* Timeframe Selection */}
        <div className="flex gap-2 mb-8">
          {['1h', '6h', '24h', '7d', '30d'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'ocean' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total Mentions</CardTitle>
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">3,847</div>
              <p className="text-muted-foreground text-sm">+15% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Trending Topics</CardTitle>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">12</div>
              <p className="text-muted-foreground text-sm">Hazard-related</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alert Correlation</CardTitle>
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">87%</div>
              <p className="text-muted-foreground text-sm">Accuracy rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Response Time</CardTitle>
                <Hash className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">8m</div>
              <p className="text-muted-foreground text-sm">Avg detection</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trending Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Trending Hashtags
              </CardTitle>
              <CardDescription>
                Most mentioned hazard-related hashtags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingHashtags.map((hashtag, index) => (
                  <div key={hashtag.tag} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{hashtag.tag}</div>
                        <div className="text-sm text-muted-foreground">{hashtag.mentions} mentions</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-success">
                      {hashtag.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>
                Overall sentiment of hazard-related posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Positive</span>
                    <span className="text-sm text-muted-foreground">{sentimentData.positive}%</span>
                  </div>
                  <Progress value={sentimentData.positive} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Neutral</span>
                    <span className="text-sm text-muted-foreground">{sentimentData.neutral}%</span>
                  </div>
                  <Progress value={sentimentData.neutral} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Negative</span>
                    <span className="text-sm text-muted-foreground">{sentimentData.negative}%</span>
                  </div>
                  <Progress value={sentimentData.negative} className="h-2" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Insight:</strong> Negative sentiment increased by 12% following recent tsunami warnings, 
                  indicating heightened community concern.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI-Generated Insights</CardTitle>
            <CardDescription>
              Machine learning analysis of social media patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {keyInsights.map((insight, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                      {insight.actionable && (
                        <Badge variant="destructive">Action Required</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Social Media Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Relevant Posts</CardTitle>
            <CardDescription>
              Latest social media posts related to ocean hazards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSocialPosts.map((post) => {
                const PlatformIcon = platformIcons[post.platform];
                
                return (
                  <div key={post.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <PlatformIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{post.author}</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {post.platform}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getSentimentColor(post.sentiment)} className="text-xs">
                              {post.sentiment}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(post.relevanceScore * 100)}% relevant
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3">{post.content}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>{post.location}</span>
                            <span>
                              {post.hashtags.map(tag => `#${tag}`).join(' ')}
                            </span>
                          </div>
                          <span>{new Date(post.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSocial;