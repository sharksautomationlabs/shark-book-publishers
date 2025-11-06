'use client';

import React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { setupCalendlyRedirect, getCalendlyConfig } from '../utils/calendlyRedirect';

export default function CTASection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    // Setup global Calendly redirect handler
    setupCalendlyRedirect();
  }, []);

  // Initialize Calendly widget when component mounts and is in view
  React.useEffect(() => {
    if (isClient && inView) {
      const initCalendly = () => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          const widgetElement = document.querySelector('.calendly-inline-widget');
          if (widgetElement && !widgetElement.hasChildNodes()) {
            (window as any).Calendly.initInlineWidget({
              url: 'https://calendly.com/ecomsharkss-info/30min',
              parentElement: widgetElement,
              prefill: {},
              utm: {},
              ...getCalendlyConfig()
            });
          }
        }
      };

      // Try to initialize after a short delay
      const timeoutId = setTimeout(initCalendly, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isClient, inView]);

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);


  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div ref={ref} className="relative w-full bg-gradient-to-b from-[#f8fafc] to-white py-16 lg:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#35c4dd]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#063f4a]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-5 lg:px-20">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={textVariants}>
            <h2 
              className="text-3xl lg:text-5xl font-bold text-[#063f4a] mb-6" 
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to Launch Your Passive Income Asset?
            </h2>
            
            <p 
              className="text-lg lg:text-xl text-[#2c2420] leading-relaxed mb-8"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              During your free strategy call, we'll show you exactly how our system works and map out your path to a guaranteed return.
            </p>
            
            {/* Calendly Widget */}
            {isClient ? (
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/ecomsharkss-info/30min"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            ) : (
              <div className="flex items-center justify-center" style={{ minWidth: '320px', height: '700px' }}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#35c4dd] mx-auto mb-4"></div>
                  <p className="text-[#063f4a] font-medium">Loading scheduling widget...</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
