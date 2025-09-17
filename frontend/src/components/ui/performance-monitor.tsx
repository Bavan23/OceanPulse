import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  networkLatency?: number;
}

export const PerformanceMonitor: React.FC<{ 
  componentName: string;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}> = ({ componentName, onMetrics }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    
    // Measure render time
    const measureRender = () => {
      const renderTime = performance.now() - startTime;
      
      // Get memory usage if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memoryUsage = (performance as any).memory?.usedJSHeapSize;
      
      const newMetrics: PerformanceMetrics = {
        loadTime: renderTime,
        renderTime,
        memoryUsage,
      };

      setMetrics(newMetrics);
      onMetrics?.(newMetrics);
    };

    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(measureRender);
  }, [componentName, onMetrics]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded-lg z-50">
      <div className="font-mono">
        <div>{componentName}</div>
        <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
        {metrics.memoryUsage && (
          <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</div>
        )}
      </div>
    </div>
  );
};

// Hook for measuring component performance
export const usePerformanceMetrics = (componentName: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    
    const measurePerformance = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setMetrics(prev => ({
        ...prev,
        renderTime,
      }));
    };

    requestAnimationFrame(measurePerformance);
  }, [componentName]);

  return metrics;
};

// Image optimization component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}> = ({ src, alt, className = "", loading = "lazy", sizes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          Failed to load image
        </div>
      )}
    </div>
  );
};
