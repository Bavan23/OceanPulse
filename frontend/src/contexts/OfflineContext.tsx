import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface PendingReport {
  id: string;
  type: string;
  severity: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  timestamp: string;
  reportedBy: string;
}

interface OfflineContextType {
  isOnline: boolean;
  pendingReports: PendingReport[];
  addPendingReport: (report: Omit<PendingReport, 'id'>) => void;
  clearPendingReports: () => void;
  syncPendingReports: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>([]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending reports from localStorage
    const stored = localStorage.getItem('oceanpulse_pending_reports');
    if (stored) {
      try {
        setPendingReports(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse pending reports:', error);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const clearPendingReports = useCallback(() => {
    setPendingReports([]);
    localStorage.removeItem('oceanpulse_pending_reports');
  }, []);

  const syncPendingReports = useCallback(async () => {
    if (pendingReports.length === 0) return;

    try {
      // TODO: Implement actual API sync
      console.log('Syncing pending reports:', pendingReports);

      // Simulate API calls
      for (const report of pendingReports) {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Synced report:', report.id);
      }

      clearPendingReports();
    } catch (error: unknown) {
      console.error('Failed to sync pending reports:', error);
    }
  }, [pendingReports, clearPendingReports]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && pendingReports.length > 0) {
      syncPendingReports();
    }
  }, [isOnline, pendingReports.length, syncPendingReports]);

  const addPendingReport = (report: Omit<PendingReport, 'id'>) => {
    const updatedReports = [...pendingReports, { ...report, id: Date.now().toString() }];
    setPendingReports(updatedReports);
    localStorage.setItem('oceanpulse_pending_reports', JSON.stringify(updatedReports));
  };

  const value: OfflineContextType = {
    isOnline,
    pendingReports,
    addPendingReport,
    clearPendingReports,
    syncPendingReports,
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};