'use client';

import Script from 'next/script';

export default function CalendlyScript() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          (window as any).Calendly.initBadgeWidget({ 
            url: 'https://calendly.com/ecomsharkss-info/30min', 
            text: 'Call for free', 
            color: '#35c4dd', 
            textColor: '#ffffff', 
            branding: true 
          }); 
          
          // Global Calendly event handler for redirects
          window.addEventListener('message', function(event) {
            console.log('Calendly message received:', event.data);
            if (event.data.event && event.data.event === 'calendly.event_scheduled') {
              console.log('Calendly event scheduled, redirecting to thank you page...');
              setTimeout(function() {
                window.location.href = '/thank-you';
              }, 1000);
            }
          });
          
          // Alternative approach: Check for Calendly success page
          const originalPushState = history.pushState;
          history.pushState = function(data: any, unused: string, url?: string | URL | null) {
            originalPushState.call(history, data, unused, url);
            if (window.location.href.includes('calendly.com') && window.location.href.includes('scheduled')) {
              console.log('Calendly success page detected, redirecting...');
              setTimeout(function() {
                window.location.href = '/thank-you';
              }, 2000);
            }
          };
        }
      }}
    />
  );
}
