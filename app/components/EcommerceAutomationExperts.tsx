'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { handleVideoEvents } from '../utils/videoUtils';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';


// SVG Icons from the provided ExpertsSection code
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


interface EcommerceAutomationExpertsProps {
  title?: string;
  subtitle?: string;
}

export default function EcommerceAutomationExperts({ 
  title = "Meet the Experts Behind ECOM SHARKSS Success",
  subtitle = "Our dedicated team stands at the forefront of Amazon's fulfillment programs and beyond. We don't just help businesses grow—we empower them to scale and thrive!"
}: EcommerceAutomationExpertsProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
  
  // MODIFICATION 1: Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODIFICATION 2: Animate in when inView is true, and animate out when false
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to hidden state when out of view
    }
  }, [controls, inView]);
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // MODIFICATION 3: Change transition to a smoother spring animation
  const leftVariants: Variants = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  return (
    <div ref={ref} className="w-full bg-white flex justify-center">
      <div className="relative w-full max-w-[1920px] h-auto py-16 md:py-48 md:min-h-[800px] lg:py-8 xl:aspect-[1920/1080] xl:py-0 overflow-hidden select-none
                      flex items-center px-5 lg:px-20">
        
        <motion.div 
          className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          
          <motion.div className="lg:col-span-6 z-10" variants={leftVariants}>
            <div className="inline-flex items-center gap-2 lg:gap-3 bg-[#d0f7ff] text-[#2c2420] px-3 lg:px-4 py-2 lg:py-2.5 rounded-full mb-6 lg:mb-8">
              <span className="text-lg lg:text-xl">💬</span>
              <span className="font-medium text-sm lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Welcome Message</span>
            </div>

            <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2020] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {title}
            </h1>

            <p className="mt-6 lg:mt-8 text-base lg:text-[24px] text-[#333333] max-w-3xl leading-6 lg:leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {subtitle}
            </p>

            <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <button 
                className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({
                      url: 'https://calendly.com/ecomsharkss-info/30min',
                      onEventScheduled: function(e: any) {
                        // Redirect to thank you page when appointment is scheduled
                        window.location.href = '/thank-you';
                      }
                    });
                  }
                }}
              >
                <span className="relative z-10">Book Now</span>
                <span className="bg-white rounded-full p-2.5 relative z-10">
                  <ArrowIcon />
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>
            </div>
          </motion.div>
          
          <motion.div className="relative lg:absolute right-0 lg:right-0 top-0 lg:top-0 w-full lg:w-[45%] h-[400px] lg:h-[90%] lg:col-span-6 mt-8 lg:mt-0" variants={rightVariants}>
            <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-[20px] lg:rounded-[40px] overflow-hidden">
                    <video 
                      ref={videoRef}
                      autoPlay={isInView}
                      loop 
                      muted 
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="/images/logos-underwater.png"
                      {...handleVideoEvents}
                    >
                      <source src="/images/under-water-logos.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[#052126] opacity-40"></div>
                </div>
{/* 
                <img src="/images/walmart-logo.png" alt="Walmart Logo" className="absolute w-[20%] lg:w-[25%] top-[2%] right-[25%] transform rotate-[12.5deg]" />
                <img src="/images/amazon-logo.png" alt="Amazon Logo" className="absolute w-[22%] lg:w-[28%] top-[10%] left-[5%] transform -rotate-[8.3deg]" />
                <img src="/images/shopify-logo.png" alt="Shopify Logo" className="absolute w-[24%] lg:w-[30%] top-[5%] right-[2%] transform rotate-[12.2deg]" />
                <img src="/images/tiktok-logo.png" alt="TikTok Logo" className="absolute w-[22%] lg:w-[28%] bottom-[25%] left-1/2 -translate-x-1/2 transform -rotate-[13deg] z-[5]" /> */}
            </div>
          </motion.div>

        </motion.div>

        <div 
          className="absolute -bottom-[5%] lg:-bottom-[20%] w-[70%] lg:w-[40%] z-20 animate-shark-complete"
          style={{ 
            left: `${-2 + (scrollPosition * 0.07)}%`,
            transform: `translateX(${scrollPosition * 0.2}px)`
          }}
        >
            <Image 
              src="/images/shark-underwater.png" 
              alt="Shark underwater" 
              width={400}
              height={300}
              className="w-full h-full transform -scale-x-100" 
              priority
            />
        </div>
      </div>
    </div>
  );
}
