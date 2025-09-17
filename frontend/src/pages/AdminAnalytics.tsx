import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SeverityDistributionChart, ResponseTimeChart, HazardTypeChart, RegionalHeatmapChart, ReportsTrendChart, UserContributionChart, EnvironmentalImpactChart, AdminOpsChart, ForecastChart } from '@/components/ui/charts';
import { mockHazardReports, mockAIInsights } from '@/lib/mockData';
import { mockUserContributions, mockEnvironmentalImpact, mockEnvironmentalImpactSummary, mockAdminOps, mockAdminOpsSummary } from '@/lib/mockChartData';

const AdminAnalytics: React.FC = () => {
  // Example mock/stat calculations
  const totalReports = mockHazardReports.length;
  const unresolvedHazards = mockHazardReports.filter(r => r.status !== 'resolved').length;
  const activeRegions = [...new Set(mockHazardReports.map(r => r.location.address))].length;
  const responseRate = Math.round((mockHazardReports.filter(r => r.status === 'verified').length / totalReports) * 100);

  // Data transformation functions
  const getReportsTrendData = () => {
    const reportsByDate = mockHazardReports.reduce((acc, report) => {
      const date = new Date(report.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(reportsByDate).map(([name, reports]) => ({ name, reports }));
  };

  const getHazardTypeData = () => {
    const types = mockHazardReports.reduce((acc, report) => {
      acc[report.type] = (acc[report.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(types).map(([name, count]) => ({ name, count }));
  };

  const getSeverityData = () => {
    const severities = mockHazardReports.reduce((acc, report) => {
      acc[report.severity] = (acc[report.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(severities).map(([name, value]) => ({ name, value }));
  };

  const getResponseTimeData = () => {
    // Mock response times based on status
    const responseTimes = mockHazardReports.map((report, index) => ({
      name: `Report ${index + 1}`,
      responseTime: report.status === 'resolved' ? Math.floor(Math.random() * 30) + 5 : 0
    }));
    return responseTimes.slice(0, 10); // Take first 10 for chart
  };

  const getForecastData = () => {
    return mockAIInsights.map((insight, index) => ({
      name: insight.title.substring(0, 20) + '...',
      value: insight.confidence * 100
    }));
  };

  const getRegionalData = () => {
    const regions = mockHazardReports.reduce((acc, report) => {
      const region = report.location.address.split(',')[0] || 'Unknown'; // Get city/state
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(regions).map(([name, count]) => ({ name, count }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 mobile-padding">
        <h1 className="text-responsive-xl font-bold mb-2">Analytics Overview</h1>
        <p className="text-muted-foreground mb-8">High-level insights for decision-making and resource allocation.</p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalReports}</div>
              <CardDescription>Submitted by users & sensors</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeRegions}</div>
              <CardDescription>Regions with recent hazards</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Unresolved Hazards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{unresolvedHazards}</div>
              <CardDescription>Pending action</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Verification Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{responseRate}%</div>
              <Progress value={responseRate} className="mt-2" />
              <CardDescription>Verified by admins</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Trends & Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Reports Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ReportsTrendChart data={getReportsTrendData()} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hazard Types</CardTitle>
            </CardHeader>
            <CardContent>
              <HazardTypeChart data={getHazardTypeData()} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <RegionalHeatmapChart data={getRegionalData()} />
            </CardContent>
          </Card>
        </div>

        {/* Severity Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Severity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <SeverityDistributionChart data={getSeverityData()} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponseTimeChart data={getResponseTimeData()} />
            </CardContent>
          </Card>
        </div>

        {/* User Contribution Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <UserContributionChart data={mockUserContributions} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Regions/Reporters</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Implement a top contributors list or chart */}
              <ul>
                {mockUserContributions.slice(0, 5).map((u) => (
                  <li key={u.id} className="mb-2 flex justify-between">
                    <span>{u.region || u.name}</span>
                    <Badge>{u.count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <EnvironmentalImpactChart data={mockEnvironmentalImpact} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Marine Debris Reported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEnvironmentalImpactSummary.debrisVolume} kg</div>
              <CardDescription>Estimated volume collected/reported</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Admin / Ops Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ops Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminOpsChart data={mockAdminOps} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Verification Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminOpsSummary.avgVerificationTime} min</div>
              <CardDescription>Compared to target</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Forecasts / AI Insights */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Forecasts & AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastChart data={getForecastData()} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
