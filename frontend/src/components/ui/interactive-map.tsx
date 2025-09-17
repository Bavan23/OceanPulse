import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different hazard types
const createCustomIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const hazardTypeColors = {
  tsunami: '#FF4C4C',
  storm: '#FFC107',
  flood: '#17A2B8',
  pollution: '#6F42C1',
  other: '#6C757D',
};

interface HazardReport {
  id: string;
  type: keyof typeof hazardTypeColors;
  severity: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  timestamp: string;
  reportedBy: string;
}

interface InteractiveMapProps {
  reports?: HazardReport[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  showHeatmap?: boolean;
}

const MapController: React.FC<{ reports: HazardReport[] }> = ({ reports }) => {
  const map = useMap();
  
  useEffect(() => {
    if (reports.length > 0) {
      const bounds = L.latLngBounds(
        reports.map(report => [report.location.lat, report.location.lng])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [reports, map]);

  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  reports = [],
  center = [12.9716, 77.5946], // Default to Bangalore
  zoom = 10,
  className = "",
  showHeatmap = false,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`w-full h-96 bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/40 rounded animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">Loading Map...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Interactive hazard map with real-time data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController reports={reports} />
        
        {reports.map((report) => {
          const icon = createCustomIcon(hazardTypeColors[report.type]);
          const severityRadius = report.severity === 'high' ? 1000 : report.severity === 'medium' ? 500 : 200;
          
          return (
            <React.Fragment key={report.id}>
              <Marker
                position={[report.location.lat, report.location.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: hazardTypeColors[report.type] }}
                      />
                      <span className="font-semibold capitalize">{report.type}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.severity === 'high' ? 'bg-red-100 text-red-800' :
                        report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {report.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <div className="text-xs text-gray-500">
                      <p>📍 {report.location.address}</p>
                      <p>👤 {report.reportedBy}</p>
                      <p>🕒 {new Date(report.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
              
              {showHeatmap && (
                <Circle
                  center={[report.location.lat, report.location.lng]}
                  radius={severityRadius}
                  pathOptions={{
                    fillColor: hazardTypeColors[report.type],
                    fillOpacity: report.severity === 'high' ? 0.3 : report.severity === 'medium' ? 0.2 : 0.1,
                    color: hazardTypeColors[report.type],
                    weight: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

// Mock data for demonstration
export const mockHazardReports: HazardReport[] = [
  {
    id: '1',
    type: 'tsunami',
    severity: 'high',
    location: { lat: 12.9716, lng: 77.5946, address: 'Marina Beach, Chennai' },
    description: 'Large waves approaching shore, immediate evacuation recommended',
    timestamp: '2024-01-15T10:30:00Z',
    reportedBy: 'Coastal Guard Station',
  },
  {
    id: '2',
    type: 'storm',
    severity: 'medium',
    location: { lat: 12.9200, lng: 77.6100, address: 'Bangalore City Center' },
    description: 'Heavy rainfall and strong winds expected',
    timestamp: '2024-01-15T11:00:00Z',
    reportedBy: 'Weather Station',
  },
  {
    id: '3',
    type: 'flood',
    severity: 'high',
    location: { lat: 12.9500, lng: 77.5800, address: 'Koramangala, Bangalore' },
    description: 'Water level rising rapidly in residential areas',
    timestamp: '2024-01-15T11:15:00Z',
    reportedBy: 'Local Resident',
  },
  {
    id: '4',
    type: 'pollution',
    severity: 'low',
    location: { lat: 12.9000, lng: 77.6200, address: 'Industrial Area, Bangalore' },
    description: 'Oil spill detected in water body',
    timestamp: '2024-01-15T11:30:00Z',
    reportedBy: 'Environmental Agency',
  },
];