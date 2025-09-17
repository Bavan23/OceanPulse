import React, { Suspense, lazy } from 'react';
import { Skeleton } from './skeleton';

// Lazy load heavy components
export const LazyInteractiveMap = lazy(() => 
  import('./interactive-map').then(module => ({ default: module.InteractiveMap }))
);

export const LazyCharts = lazy(() => 
  import('./charts').then(module => ({ 
    default: () => (
      <div className="space-y-6">
        <module.HazardTrendChart data={module.generateHazardTrendData()} />
        <module.SeverityDistributionChart data={module.generateSeverityData()} />
        <module.ResponseTimeChart data={module.generateResponseTimeData()} />
        <module.HazardTypeChart data={module.generateHazardTypeData()} />
      </div>
    )
  }))
);

// Loading wrapper component
export const LazyWrapper: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = <Skeleton className="w-full h-96" /> 
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};
