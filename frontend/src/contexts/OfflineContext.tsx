import React, { createContext, useContext, useState, useEffect } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  pendingReports: any[];
  addPendingReport: (report: any) => void;
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
  const [pendingReports, setPendingReports] = useState<any[]>([]);

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

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && pendingReports.length > 0) {
      syncPendingReports();
    }
  }, [isOnline]);

  const addPendingReport = (report: any) => {
    const updatedReports = [...pendingReports, { ...report, id: Date.now().toString() }];
    setPendingReports(updatedReports);
    localStorage.setItem('oceanpulse_pending_reports', JSON.stringify(updatedReports));
  };

  const clearPendingReports = () => {
    setPendingReports([]);
    localStorage.removeItem('oceanpulse_pending_reports');
  };

  const syncPendingReports = async () => {
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
    } catch (error) {
      console.error('Failed to sync pending reports:', error);
    }
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