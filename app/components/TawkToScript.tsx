'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function TawkToScript() {
  useEffect(() => {
    // Add custom styles for Tawk.to widget
    const style = document.createElement('style');
    style.textContent = `
      /* Tawk.to Widget Size and Alignment */
      #tawkchat-container,
      #tawkchat-container iframe {
        transform: scale(0.85) !important;
        transform-origin: bottom right !important;
      }
      
      #tawkchat-container {
        bottom: 20px !important;
        right: 20px !important;
      }
      
      /* Tawk.to Minimized Button */
      #tawkchat-minified-wrapper {
        transform: scale(0.85) !important;
        transform-origin: bottom right !important;
        bottom: 20px !important;
        right: 20px !important;
      }
      
      /* Tawk.to Chat Window */
      #tawkchat-container .tawk-chat-container {
        transform: scale(0.85) !important;
        transform-origin: bottom right !important;
      }
    `;
    document.head.appendChild(style);

    // Suppress Tawk.to i18next errors
    if (typeof window !== 'undefined') {
      const originalError = window.console.error;
      window.console.error = function(...args: any[]) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('i18next')) {
          return; // Suppress i18next errors
        }
        originalError.apply(console, args);
      };
    }

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <Script
      id="tawk-to-script"
      strategy="lazyOnload"
      onError={(e) => {
        console.warn('Tawk.to script failed to load:', e);
      }}
      onLoad={() => {
        // Wait for Tawk.to to fully initialize
        if (typeof window !== 'undefined' && (window as any).Tawk_API) {
          try {
            // Suppress i18next errors by wrapping Tawk_API methods
            const Tawk_API = (window as any).Tawk_API;
            if (Tawk_API && typeof Tawk_API.onLoad === 'function') {
              Tawk_API.onLoad = function() {
                try {
                  // Original onLoad logic
                } catch (e) {
                  // Suppress errors
                }
              };
            }
          } catch (e) {
            // Suppress initialization errors
          }
        }
      }}
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var Tawk_API = Tawk_API || {};
              var Tawk_LoadStart = new Date();
              
              // Suppress i18next errors globally
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e.message && e.message.includes('i18next')) {
                    e.preventDefault();
                    return false;
                  }
                }, true);
              }
              
              (function() {
                var s1 = document.createElement('script');
                var s0 = document.getElementsByTagName('script')[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/68c879bff929da1929585a38/1j57hn5b4';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s1.onerror = function() {
                  console.warn('Tawk.to script failed to load');
                };
                s0.parentNode.insertBefore(s1, s0);
              })();
            } catch(e) {
              console.warn('Tawk.to initialization error:', e);
            }
          })();
        `,
      }}
    />
  );
}

