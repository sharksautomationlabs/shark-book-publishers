'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { handleVideoEvents } from '../utils/videoUtils';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

const imgChatCircleDots = "/images/chat-icon.svg";

// SVG Icons from the provided ExpertsSection code
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="white"/>
        <circle cx="8" cy="12" r="1.5" fill="white"/>
        <circle cx="16" cy="12" r="1.5" fill="white"/>
    </svg>
);

const CheckmarkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface ExpertsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showCheckpoints?: boolean;
  sharkPositionRight?: boolean;
}

export default function ExpertsSection({ 
  title = "The Publishing Journey Doesn't Have to Be a Headache.",
  subtitle = "We know the publishing world can be confusing. We've simplified the entire process so you don't have to be a tech expert, a marketer, or a graphic designer to get your book published.",
  badgeText = "Welcome Message",
  showCheckpoints = true,
  sharkPositionRight = false
}: ExpertsProps) {
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
      <div className="relative w-full max-w-[1920px] h-auto py-24 md:py-64 md:min-h-[800px] lg:py-20 xl:py-16 overflow-x-hidden overflow-y-hidden select-none
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
              <span className="font-medium text-sm lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>{badgeText}</span>
            </div>

            <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2020] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {title}
            </h1>

            <p className="mt-6 lg:mt-8 text-base lg:text-[24px] text-[#333333] max-w-3xl leading-6 lg:leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {subtitle}
            </p>

            {showCheckpoints && (
            <div className="mt-8 lg:mt-12 space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-[#2c2020] mb-2 lg:mb-3 flex items-center gap-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <span className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#35c4dd] rounded-full flex items-center justify-center">
                    <CheckmarkIcon />
                  </span>
                  Overwhelmed by the Process?
                </h3>
                <p className="text-base lg:text-lg text-[#333333] leading-relaxed pl-11 lg:pl-[52px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  From manuscript to a published book in your hands, we provide a clear roadmap.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-[#2c2020] mb-2 lg:mb-3 flex items-center gap-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <span className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#35c4dd] rounded-full flex items-center justify-center">
                    <CheckmarkIcon />
                  </span>
                  Worried About Looking Professional?
                </h3>
                <p className="text-base lg:text-lg text-[#333333] leading-relaxed pl-11 lg:pl-[52px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Our team of award-winning designers and editors ensures your book meets industry standards.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-[#2c2020] mb-2 lg:mb-3 flex items-center gap-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <span className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#35c4dd] rounded-full flex items-center justify-center">
                    <CheckmarkIcon />
                  </span>
                  Scared Your Book Won't Sell?
                </h3>
                <p className="text-base lg:text-lg text-[#333333] leading-relaxed pl-11 lg:pl-[52px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We'll put your book on the shelves of all major retailers and provide you with a comprehensive marketing plan.
                </p>
              </div>
            </div>
            )}

            <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <button 
                className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
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
                <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Read More</span>
                <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>
              <button className="flex items-center justify-between w-[170px] h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-bold text-xl" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[40px] h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={24} height={24} />
                  </div>
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
            right: sharkPositionRight 
              ? `${55 - (scrollPosition * 0.07)}%`
              : `${92 - (scrollPosition * 0.07)}%`,
            transform: `translateX(${-scrollPosition * 0.2}px)`
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