import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';

// Color palette for charts
const COLORS = {
  primary: '#007BFF',
  danger: '#FF4C4C',
  warning: '#FFC107',
  success: '#28A745',
  muted: '#6C757D',
};

const CHART_COLORS = [COLORS.primary, COLORS.danger, COLORS.warning, COLORS.success, COLORS.muted];

interface ChartData {
  name?: string;
  reports?: number;
  value?: number;
  responseTime?: number;
  count?: number;
}

interface ChartProps {
  data: ChartData[];
  className?: string;
}

export const HazardTrendChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Area
          type="monotone"
          dataKey="reports"
          stroke={COLORS.primary}
          fillOpacity={1}
          fill="url(#colorPrimary)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const SeverityDistributionChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ResponseTimeChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="responseTime" 
          stroke={COLORS.success} 
          strokeWidth={3}
          dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const HazardTypeChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar dataKey="count" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Mock data generators for demonstration
export const generateHazardTrendData = () => [
  { name: 'Jan', reports: 45 },
  { name: 'Feb', reports: 52 },
  { name: 'Mar', reports: 38 },
  { name: 'Apr', reports: 67 },
  { name: 'May', reports: 73 },
  { name: 'Jun', reports: 89 },
  { name: 'Jul', reports: 95 },
];

export const generateSeverityData = () => [
  { name: 'High', value: 23, color: COLORS.danger },
  { name: 'Medium', value: 45, color: COLORS.warning },
  { name: 'Low', value: 32, color: COLORS.success },
];

export const generateResponseTimeData = () => [
  { name: 'Week 1', responseTime: 15 },
  { name: 'Week 2', responseTime: 12 },
  { name: 'Week 3', responseTime: 18 },
  { name: 'Week 4', responseTime: 10 },
  { name: 'Week 5', responseTime: 8 },
];

export const generateHazardTypeData = () => [
  { name: 'Tsunami', count: 12 },
  { name: 'Storm', count: 8 },
  { name: 'Flood', count: 15 },
  { name: 'Pollution', count: 6 },
];

// Additional chart components for AdminAnalytics
export const RegionalHeatmapChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className} flex items-center justify-center bg-muted rounded-lg`}>
    <p className="text-muted-foreground">Regional Heatmap Chart - Coming Soon</p>
  </div>
);

export const ReportsTrendChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey="reports"
          stroke={COLORS.primary}
          strokeWidth={3}
          dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const UserContributionChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar dataKey="count" fill={COLORS.success} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const EnvironmentalImpactChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={COLORS.success}
          fillOpacity={1}
          fill="url(#colorSuccess)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const AdminOpsChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar dataKey="value" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const ForecastChart: React.FC<ChartProps> = ({ data, className = "" }) => (
  <div className={`w-full h-80 ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={COLORS.muted}
          strokeWidth={3}
          dot={{ fill: COLORS.muted, strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
