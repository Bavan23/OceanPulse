import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface ChartDataPoint {
  date?: string;
  reports?: number;
  name?: string;
  value?: number;
  hour?: string;
  region?: string;
  responseTime?: number;
}

interface ChartProps {
  data: ChartDataPoint[];
  title?: string;
  description?: string;
  className?: string;
}

// Hazard Reports Over Time Chart
export const HazardTrendChart: React.FC<ChartProps> = ({ data, title, description, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || 'Hazard Reports Trend'}</CardTitle>
        <CardDescription>{description || 'Reports over the last 30 days'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="reports" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary) / 0.2)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Severity Distribution Chart
export const SeverityChart: React.FC<ChartProps> = ({ data, title, description, className }) => {
  const COLORS = [
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--danger))'
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || 'Severity Distribution'}</CardTitle>
        <CardDescription>{description || 'Current hazard severity levels'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Response Time Chart
export const ResponseTimeChart: React.FC<ChartProps> = ({ data, title, description, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || 'Response Time Analysis'}</CardTitle>
        <CardDescription>{description || 'Average response time by hour'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="responseTime" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Regional Activity Chart
export const RegionalActivityChart: React.FC<ChartProps> = ({ data, title, description, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title || 'Regional Activity'}</CardTitle>
        <CardDescription>{description || 'Reports by region'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="reports" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Mini Stats Chart
export const MiniStatsChart: React.FC<{ data: ChartDataPoint[]; className?: string }> = ({ data, className }) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={data}>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            fill="hsl(var(--primary) / 0.1)" 
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};