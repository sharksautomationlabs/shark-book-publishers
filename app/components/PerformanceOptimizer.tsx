'use client';

import { useEffect } from 'react';
import { preloadCriticalResources, optimizeVideoLoading, addResourceHints } from '../utils/performance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  useEffect(() => {
    // Initialize performance optimizations
    preloadCriticalResources();
    optimizeVideoLoading();
    addResourceHints();
    
    // Optimize scroll performance
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Throttled scroll handling
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', optimizeScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', optimizeScroll);
    };
  }, []);

  return <>{children}</>;
}
