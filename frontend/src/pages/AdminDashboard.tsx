import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Map, MessageSquare, Brain, TrendingUp, AlertTriangle, Users, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockHazardReports, mockAIInsights } from '@/lib/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const stats = {
    totalReports: 156,
    activeAlerts: 23,
    resolvedIncidents: 89,
    responseTime: '12 min',
    aiAccuracy: 87,
    socialMentions: 1247
  };

  const recentHighPriorityReports = mockHazardReports
    .filter(report => report.severity === 'high')
    .slice(0, 3);

  const recentAIInsights = mockAIInsights.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name} - Monitor and analyze ocean hazards across the region
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-ocean text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Alerts</CardTitle>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{stats.activeAlerts}</div>
              <p className="text-white/80 text-sm">Requiring attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total Reports</CardTitle>
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalReports}</div>
              <p className="text-muted-foreground text-sm">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Response Time</CardTitle>
                <Activity className="w-5 h-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">{stats.responseTime}</div>
              <p className="text-muted-foreground text-sm">Average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">AI Accuracy</CardTitle>
                <Brain className="w-5 h-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">{stats.aiAccuracy}%</div>
              <Progress value={stats.aiAccuracy} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button variant="ocean" className="h-auto p-4" asChild>
            <Link to="/admin/reports">
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>View Reports</span>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4" asChild>
            <Link to="/admin/dashboard">
              <div className="flex flex-col items-center gap-2">
                <Map className="w-6 h-6" />
                <span>Map View</span>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4" asChild>
            <Link to="/admin/social">
              <div className="flex flex-col items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Social Media</span>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4">
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>Analytics</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* High Priority Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-danger" />
                High Priority Alerts
              </CardTitle>
              <CardDescription>
                Reports requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHighPriorityReports.map((report) => (
                  <div key={report.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <div className="p-2 bg-danger/10 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-danger" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm capitalize">{report.type}</h4>
                        <Badge variant="destructive">High</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.location.address}</span>
                        <span>{new Date(report.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Machine learning analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAIInsights.map((insight) => (
                  <div key={insight.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {Math.round(insight.confidence * 100)}%
                        </span>
                        {insight.actionRequired && (
                          <Badge variant="destructive" className="text-xs">Action Required</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {new Date(insight.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Map Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              Regional Hazard Overview
            </CardTitle>
            <CardDescription>
              Interactive map showing hotspots, IMD storm tracks, and risk zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-medium">Interactive Admin Map</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Comprehensive view with hazard clusters, severity heatmaps, IMD weather tracking, 
                  social media sentiment overlays, and AI-identified risk zones
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-danger rounded-full"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;