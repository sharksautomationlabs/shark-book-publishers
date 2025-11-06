// Video lazy loading utilities
import { useEffect, useRef, useState } from 'react';

export const useVideoLazyLoading = () => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Start loading video when in view
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of video is visible
        rootMargin: '50px' // Start loading 50px before video comes into view
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      const currentVideo = videoRef.current;
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, []);

  return { videoRef, isInView };
};

// Optimized video props for better performance
export const getOptimizedVideoProps = (poster: string, src: string) => ({
  loop: true,
  muted: true,
  playsInline: true,
  preload: 'metadata' as const, // Only load metadata initially
  poster,
  className: 'w-full h-full object-cover object-center',
  'data-src': src, // Store source in data attribute for lazy loading
});

// Video loading strategy
export const videoLoadingStrategy = {
  // Load video only when in viewport
  lazy: true,
  // Start loading metadata when video is 50px away from viewport
  rootMargin: '50px',
  // Trigger when 10% of video is visible
  threshold: 0.1,
  // Preload only metadata, not full video
  preload: 'metadata' as const,
};
