import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Filter, AlertTriangle, Waves, Zap, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockHazardReports } from '@/lib/mockData';

const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

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
    ? mockHazardReports.slice(0, 6) 
    : mockHazardReports.filter(report => report.type === selectedFilter).slice(0, 6);

  const filters = [
    { key: 'all', label: 'All Hazards', count: mockHazardReports.length },
    { key: 'tsunami', label: 'Tsunami', count: 12 },
    { key: 'storm', label: 'Storm', count: 8 },
    { key: 'flood', label: 'Flood', count: 15 },
    { key: 'pollution', label: 'Pollution', count: 6 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor ocean hazards in your area and stay informed
            </p>
          </div>
          
          <Button variant="floating" size="fab" asChild>
            <Link to="/citizen/submit">
              <Plus className="w-6 h-6" />
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-ocean text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">23</div>
              <p className="text-white/80 text-sm">In your region</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <p className="text-muted-foreground text-sm">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">1.2k</div>
              <p className="text-muted-foreground text-sm">Lives protected</p>
            </CardContent>
          </Card>
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

        {/* Map View */}
        <Card className="mb-8">
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
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map will be loaded here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Shows real-time hazard locations, severity levels, and community reports
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Hazard Reports</CardTitle>
                <CardDescription>Latest community-reported ocean hazards</CardDescription>
              </div>
              <Button variant="outline" size="sm">
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
                  <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 gradient-ocean rounded-lg">
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