import dynamic from 'next/dynamic';
import React from 'react';

// Loading components for better UX
const LoadingSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`animate-pulse bg-gray-200 ${height} rounded-lg`} />
);

// Lazy load heavy components that are not critical for initial page load
export const DynamicTestimonials = dynamic(
  () => import('../components/Testimonials'),
  { 
    loading: () => <LoadingSkeleton height="h-64" />,
    ssr: false 
  }
);

export const DynamicImageGallery = dynamic(
  () => import('../components/ImageGallery'),
  { 
    loading: () => <LoadingSkeleton height="h-96" />,
    ssr: false 
  }
);

export const DynamicPricing = dynamic(
  () => import('../components/Pricing'),
  { 
    loading: () => <LoadingSkeleton height="h-80" />,
    ssr: false 
  }
);

// Utility function for creating dynamic components with loading states
export const createDynamicComponent = <T extends React.ComponentType<any>>(
  importPath: () => Promise<{ default: T }>,
  loadingHeight: string = 'h-64'
) => {
  return dynamic(importPath, {
    loading: () => <LoadingSkeleton height={loadingHeight} />,
    ssr: false
  });
};

// Example usage for future components:
// export const DynamicNewComponent = createDynamicComponent(
//   () => import('../components/NewComponent'),
//   'h-96'
// );
