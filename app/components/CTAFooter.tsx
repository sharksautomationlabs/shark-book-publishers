'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { setupCalendlyRedirect, getCalendlyConfig } from '../utils/calendlyRedirect';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Image and icon assets for the section
const imgPattern = "/images/pattern-bg.png"; // Light blue water pattern background
const imgShark = "/images/shark-underwater.png"; // Shark image
const imgArrowIcon = "/images/arrow-icon-2.svg"; // Arrow for the button

export default function CTAFooter() {
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  React.useEffect(() => {
    // Setup global Calendly redirect handler
    setupCalendlyRedirect();
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#f8fafc] to-white pt-12 lg:pt-20 pb-8 lg:pb-12 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay={isInView}
          loop 
          muted 
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster="/images/bi-vid.jpeg"
        >
          <source src="/images/bi-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#052126]/60" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div 
            className="text-white mb-8 lg:mb-12"
            variants={leftVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Ready for a Guaranteed Return?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Book your free, no-obligation strategy call with one of our experts.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="flex justify-center"
            variants={rightVariants}
            initial="hidden"
            animate={controls}
          >
            <button 
              className="group flex items-center justify-center lg:justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative gap-3 h-14 w-full lg:w-84 pl-6 pr-1.5"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({
                    url: 'https://calendly.com/ecomsharkss-info/30min',
                    ...getCalendlyConfig()
                  });
                }
              }}
            >
              <span 
                className="font-semibold text-[#063f4a] relative z-10 text-xl"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Book Your Free Strategy Call
              </span>
              <span className="bg-white rounded-full flex items-center justify-center relative z-10 w-10 h-10">
                <Image src={imgArrowIcon} alt="arrow icon" width={20} height={20} />
              </span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
