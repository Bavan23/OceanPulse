import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Filter, AlertTriangle, Waves, Zap, Eye, TrendingUp, Users, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardSkeleton, ReportCardSkeleton } from '@/components/ui/loading-states';
import { InteractiveMap, mockHazardReports } from '@/components/ui/interactive-map';
import { HazardTrendChart, generateHazardTrendData } from '@/components/ui/charts';
import { mockHazardReports as mockData } from '@/lib/mockData';

const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);


  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const hazardTypeIcons = {
    tsunami: Waves,
    storm: Zap,
    flood: AlertTriangle,
    pollution: Eye,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const filteredReports = selectedFilter === 'all' 
    ? mockData.slice(0, 6) 
    : mockData.filter(report => report.type === selectedFilter).slice(0, 6);

  const filters = [
    { key: 'all', label: 'All Hazards', count: mockData.length },
    { key: 'tsunami', label: 'Tsunami', count: mockData.filter(r => r.type === 'tsunami').length },
    { key: 'storm', label: 'Storm', count: mockData.filter(r => r.type === 'storm').length },
    { key: 'flood', label: 'Flood', count: mockData.filter(r => r.type === 'flood').length },
    { key: 'pollution', label: 'Pollution', count: mockData.filter(r => r.type === 'pollution').length },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 mobile-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-responsive-xl font-bold text-foreground">
              Welcome back, {user?.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor ocean hazards in your area and stay informed
            </p>
          </div>
          
          <Button 
            variant="floating" 
            size="fab" 
            asChild
            className="touch-target-large mobile-tap"
          >
            <Link to="/citizen/submit">
              <Plus className="w-6 h-6" />
            </Link>
          </Button>
        </div>

        {/* Quick Stats with Progressive Disclosure */}
        <div className="space-y-6 mb-8">
          {/* Primary Stats - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="gradient-ocean text-white hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Active Alerts
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">23</div>
                <p className="text-white/80 text-sm">In your region</p>
                <div className="mt-2 text-xs text-white/60">Click to view details</div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Your Reports
                  <TrendingUp className="w-5 h-5 text-primary group-hover:animate-bounce" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">7</div>
                <p className="text-muted-foreground text-sm">This month</p>
                <div className="mt-2 text-xs text-muted-foreground">+2 from last month</div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Community Impact
                  <Users className="w-5 h-5 text-success group-hover:animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2 group-hover:scale-105 transition-transform">1.2k</div>
                <p className="text-muted-foreground text-sm">Lives protected</p>
                <div className="mt-2 text-xs text-muted-foreground">Based on your reports</div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats - Collapsible */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full md:w-auto"
              onClick={() => setShowDetailedStats(!showDetailedStats)}
            >
              <Activity className="w-4 h-4 mr-2" />
              {showDetailedStats ? 'Hide' : 'Show'} Detailed Statistics
            </Button>
            
            {showDetailedStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-warning mb-1">12min</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-success mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-primary mb-1">156</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? 'ocean' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.key)}
              className="text-sm"
            >
              {filter.label}
              <Badge 
                variant={selectedFilter === filter.key ? 'secondary' : 'default'}
                className="ml-2 text-xs"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Interactive Map */}
        <Card className="mb-8 mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Hazard Map
            </CardTitle>
            <CardDescription>
              Interactive map showing recent hazard reports in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InteractiveMap 
              reports={mockHazardReports}
              center={[12.9716, 77.5946]}
              zoom={10}
              showHeatmap={true}
              className="mobile-optimized"
            />
          </CardContent>
        </Card>

        {/* Advanced Features Toggle */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
            className="w-full md:w-auto touch-target"
          >
            {showAdvancedFeatures ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Advanced Features
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show Advanced Features
              </>
            )}
          </Button>
        </div>

        {/* Advanced Analytics - Progressive Disclosure */}
        {showAdvancedFeatures && (
          <Card className="mb-8 mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Hazard Trends
              </CardTitle>
              <CardDescription>
                Monthly trend analysis of hazard reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HazardTrendChart data={generateHazardTrendData()} />
            </CardContent>
          </Card>
        )}

        {/* Recent Reports */}
        <Card className="mobile-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Hazard Reports</CardTitle>
                <CardDescription>Latest community-reported ocean hazards</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="touch-target">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => {
                const IconComponent = hazardTypeIcons[report.type as keyof typeof hazardTypeIcons] || AlertTriangle;
                
                return (
                  <Card 
                    key={report.id} 
                    className="mobile-card hover:shadow-lg transition-shadow cursor-pointer mobile-tap"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 gradient-ocean rounded-lg touch-target">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-sm capitalize">{report.type}</CardTitle>
                            <CardDescription className="text-xs">
                              {new Date(report.timestamp).toLocaleString()}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={getSeverityColor(report.severity) as any}>
                          {report.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location.address}
                        </span>
                        <span>{report.reportedBy}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {filteredReports.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hazard reports found for the selected filter</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;