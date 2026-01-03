"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Handle different types of performance entries
          const entryAny = entry as any; // Type assertion for flexibility
          
          if (entryAny.value !== undefined) {
            console.log(`${entry.name}: ${entryAny.value}ms`);
          } else if (entry.duration !== undefined) {
            console.log(`${entry.name}: ${entry.duration}ms`);
          } else {
            console.log(`${entry.name}: ${entry.startTime}ms`);
          }
        });
      });

      // Observe paint and navigation timing with error handling
      try {
        observer.observe({ entryTypes: ['paint', 'navigation'] });
        
        // Try to observe LCP separately as it might not be supported
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch {
          console.log('LCP monitoring not supported');
        }
      } catch (error) {
        console.log('Performance monitoring not fully supported in this browser');
      }

      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  return null; // This component doesn't render anything
}