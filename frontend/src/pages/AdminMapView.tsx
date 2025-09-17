import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  Layers, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff,
  Bell,
  Users,
  MapPin,
  TrendingUp,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { InteractiveMap } from '@/components/ui/interactive-map';
import { mockHazardReports } from '@/components/ui/interactive-map';

// Extended hazard report interface for admin features
interface AdminHazardReport {
  id: string;
  type: 'tsunami' | 'storm' | 'flood' | 'pollution' | 'wildlife' | 'sensor';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'approved' | 'rejected' | 'resolved';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  timestamp: string;
  reportedBy: string;
  reporterType: 'citizen' | 'official' | 'sensor' | 'iot';
  media: string[];
  verificationScore: number;
  responseTeam?: string;
  notes?: string;
  sensorData?: {
    temperature?: number;
    waveHeight?: number;
    windSpeed?: number;
    waterQuality?: string;
  };
}

// Mock data for admin map view
const mockAdminReports: AdminHazardReport[] = [
  {
    id: '1',
    type: 'tsunami',
    severity: 'critical',
    status: 'pending',
    location: { lat: 12.9716, lng: 77.5946, address: 'Marina Beach, Chennai' },
    description: 'Large waves approaching shore, immediate evacuation recommended',
    timestamp: '2024-01-15T10:30:00Z',
    reportedBy: 'Coastal Guard Station',
    reporterType: 'official',
    media: ['wave1.jpg', 'wave2.jpg'],
    verificationScore: 95,
    sensorData: {
      waveHeight: 3.2,
      windSpeed: 45,
      temperature: 28
    }
  },
  {
    id: '2',
    type: 'pollution',
    severity: 'high',
    status: 'verified',
    location: { lat: 12.9200, lng: 77.6100, address: 'Bangalore City Center' },
    description: 'Oil spill detected in water body, affecting marine life',
    timestamp: '2024-01-15T11:00:00Z',
    reportedBy: 'Environmental Agency',
    reporterType: 'official',
    media: ['spill1.jpg'],
    verificationScore: 88,
    responseTeam: 'Cleanup Team Alpha',
    sensorData: {
      waterQuality: 'Poor',
      temperature: 26
    }
  },
  {
    id: '3',
    type: 'wildlife',
    severity: 'medium',
    status: 'approved',
    location: { lat: 12.9500, lng: 77.5800, address: 'Koramangala, Bangalore' },
    description: 'Unusual marine animal behavior observed near shore',
    timestamp: '2024-01-15T11:15:00Z',
    reportedBy: 'Marine Biologist',
    reporterType: 'official',
    media: ['wildlife1.jpg', 'wildlife2.jpg'],
    verificationScore: 75,
    notes: 'Confirmed as seasonal migration pattern'
  },
  {
    id: '4',
    type: 'sensor',
    severity: 'low',
    status: 'resolved',
    location: { lat: 12.9000, lng: 77.6200, address: 'IoT Buoy Station 7' },
    description: 'Automated sensor alert: Water temperature anomaly',
    timestamp: '2024-01-15T11:30:00Z',
    reportedBy: 'IoT Sensor Network',
    reporterType: 'sensor',
    media: [],
    verificationScore: 100,
    responseTeam: 'Tech Support',
    sensorData: {
      temperature: 32,
      waveHeight: 0.8,
      windSpeed: 12,
      waterQuality: 'Good'
    }
  }
];

const AdminMapView: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<AdminHazardReport | null>(null);
  const [filteredReports, setFilteredReports] = useState<AdminHazardReport[]>(mockAdminReports);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    reporterType: 'all'
  });
  const [mapLayers, setMapLayers] = useState({
    satellite: false,
    terrain: false,
    weather: true,
    currents: true,
    heatmap: false
  });
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter reports based on active filters
  useEffect(() => {
    let filtered = mockAdminReports;
    
    if (activeFilters.type !== 'all') {
      filtered = filtered.filter(report => report.type === activeFilters.type);
    }
    if (activeFilters.severity !== 'all') {
      filtered = filtered.filter(report => report.severity === activeFilters.severity);
    }
    if (activeFilters.status !== 'all') {
      filtered = filtered.filter(report => report.status === activeFilters.status);
    }
    if (activeFilters.reporterType !== 'all') {
      filtered = filtered.filter(report => report.reporterType === activeFilters.reporterType);
    }
    
    setFilteredReports(filtered);
  }, [activeFilters]);

  const handleReportAction = (reportId: string, action: string) => {
    const report = mockAdminReports.find(r => r.id === reportId);
    if (report) {
      switch (action) {
        case 'verify':
          report.status = 'verified';
          toast({ title: "Report Verified", description: "Report has been verified" });
          break;
        case 'approve':
          report.status = 'approved';
          toast({ title: "Report Approved", description: "Report has been approved" });
          break;
        case 'reject':
          report.status = 'rejected';
          toast({ title: "Report Rejected", description: "Report has been rejected" });
          break;
        case 'resolve':
          report.status = 'resolved';
          toast({ title: "Report Resolved", description: "Report has been marked as resolved" });
          break;
        case 'notify':
          toast({ title: "Notification Sent", description: "Push notification sent to affected area" });
          break;
      }
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({ title: "Data Refreshed", description: "Latest data has been loaded" });
    }, 1500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500';
      case 'verified': return 'bg-blue-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Map Area */}
        <div className="flex-1 relative">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <Card className="p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/admin/dashboard">
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="font-semibold">Map View</h1>
                  <p className="text-xs text-muted-foreground">Real-time hazard monitoring</p>
                </div>
              </div>
            </Card>

            {/* Filter Controls */}
            <Card className="p-3 w-64">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Filters</Label>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Select value={activeFilters.type} onValueChange={(value) => setActiveFilters(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Hazard Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="tsunami">Tsunami</SelectItem>
                      <SelectItem value="storm">Storm</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="pollution">Pollution</SelectItem>
                      <SelectItem value="wildlife">Wildlife</SelectItem>
                      <SelectItem value="sensor">Sensor Data</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={activeFilters.severity} onValueChange={(value) => setActiveFilters(prev => ({ ...prev, severity: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={activeFilters.status} onValueChange={(value) => setActiveFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Layer Controls */}
            <Card className="p-3 w-64">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Map Layers</Label>
                  <Button variant="ghost" size="sm">
                    <Layers className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Weather Overlay</Label>
                    <Switch 
                      checked={mapLayers.weather} 
                      onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, weather: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Ocean Currents</Label>
                    <Switch 
                      checked={mapLayers.currents} 
                      onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, currents: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Heatmap</Label>
                    <Switch 
                      checked={mapLayers.heatmap} 
                      onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, heatmap: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Satellite View</Label>
                    <Switch 
                      checked={mapLayers.satellite} 
                      onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, satellite: checked }))}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Map */}
          <InteractiveMap 
            reports={filteredReports}
            center={[12.9716, 77.5946]}
            zoom={8}
            showHeatmap={mapLayers.heatmap}
            className="w-full h-full"
          />

          {/* Analytics Overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Analytics</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Active Reports</div>
                    <div className="font-semibold">{filteredReports.filter(r => r.status !== 'resolved').length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Critical Alerts</div>
                    <div className="font-semibold text-red-600">{filteredReports.filter(r => r.severity === 'critical').length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Response Teams</div>
                    <div className="font-semibold">{new Set(filteredReports.map(r => r.responseTeam).filter(Boolean)).size}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg Response</div>
                    <div className="font-semibold">12min</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Side Panel */}
        {showSidePanel && selectedReport && (
          <div className="w-96 border-l border-border bg-background">
            <Card className="h-full rounded-none border-0">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Report Details</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowSidePanel(false)}>
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Report Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(selectedReport.severity)}`} />
                    <span className="font-semibold capitalize">{selectedReport.type}</span>
                    <Badge variant="outline" className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                </div>

                {/* Location Info */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Location</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {selectedReport.location.address}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedReport.location.lat.toFixed(4)}, {selectedReport.location.lng.toFixed(4)}
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Reporter</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {selectedReport.reportedBy}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {selectedReport.reporterType} • {new Date(selectedReport.timestamp).toLocaleString()}
                  </div>
                </div>

                {/* Sensor Data */}
                {selectedReport.sensorData && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sensor Data</Label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {selectedReport.sensorData.temperature && (
                        <div>
                          <div className="text-muted-foreground">Temperature</div>
                          <div className="font-semibold">{selectedReport.sensorData.temperature}°C</div>
                        </div>
                      )}
                      {selectedReport.sensorData.waveHeight && (
                        <div>
                          <div className="text-muted-foreground">Wave Height</div>
                          <div className="font-semibold">{selectedReport.sensorData.waveHeight}m</div>
                        </div>
                      )}
                      {selectedReport.sensorData.windSpeed && (
                        <div>
                          <div className="text-muted-foreground">Wind Speed</div>
                          <div className="font-semibold">{selectedReport.sensorData.windSpeed} km/h</div>
                        </div>
                      )}
                      {selectedReport.sensorData.waterQuality && (
                        <div>
                          <div className="text-muted-foreground">Water Quality</div>
                          <div className="font-semibold">{selectedReport.sensorData.waterQuality}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Verification Score */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Verification Score</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${selectedReport.verificationScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{selectedReport.verificationScore}%</span>
                  </div>
                </div>

                {/* Response Team */}
                {selectedReport.responseTeam && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Response Team</Label>
                    <div className="text-sm">{selectedReport.responseTeam}</div>
                  </div>
                )}

                {/* Notes */}
                {selectedReport.notes && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Notes</Label>
                    <div className="text-sm text-muted-foreground">{selectedReport.notes}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Actions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReportAction(selectedReport.id, 'verify')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReportAction(selectedReport.id, 'approve')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReportAction(selectedReport.id, 'reject')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReportAction(selectedReport.id, 'resolve')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ocean"
                    className="w-full"
                    onClick={() => handleReportAction(selectedReport.id, 'notify')}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMapView;
