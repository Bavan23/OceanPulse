import React from 'react';
import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react';
import { useOffline } from '@/contexts/OfflineContext';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className }) => {
  const { isOnline, pendingReports } = useOffline();

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
      isOnline 
        ? "bg-success/10 text-success" 
        : "bg-warning/10 text-warning",
      className
    )}>
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3" />
          <span>Online</span>
          {pendingReports.length > 0 && (
            <div className="flex items-center gap-1">
              <Cloud className="w-3 h-3" />
              <span>Syncing {pendingReports.length}</span>
            </div>
          )}
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Offline</span>
          {pendingReports.length > 0 && (
            <div className="flex items-center gap-1">
              <CloudOff className="w-3 h-3" />
              <span>{pendingReports.length} pending</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};