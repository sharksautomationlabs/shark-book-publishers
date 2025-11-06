'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets for the Owners/CTA section.
const imgPattern = "/images/pattern-bg.png";
const imgLeftHand = "/images/owner-hand-gesture.png";
const imgRightHand = "/images/owner-hand-writing.png";
const imgBooks = "/images/books.webp";
const imgBooks1 = "/images/books1.webp";
const imgBgShape = "/images/bg-rectangle-2.svg"; 
const imgPhoneIcon = "/images/header-phone-icon.svg"; 
const imgArrowIcon = "/images/arrow-icon-4.svg";

export default function Owners() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Set initial mobile state
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animate in when inView is true, and animate out when false
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

  // Spring animation variants like Experts section
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
    // Main wrapper to center the 1920px canvas.
    <div ref={ref} className="w-full bg-white flex justify-center">
      
      {/* 1920px container with overflow hidden to prevent scrollbars. */}
      <div className="relative w-full max-w-[1920px] overflow-hidden">
        
        {/* Layer 1: Background Shape & Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Flipped background shape to place white cutout at the TOP right */}
          <div className="w-full h-full transform scale-y-[-1]">
            <Image 
              src={imgBgShape} 
              alt="Teal background shape" 
              fill 
              objectFit="cover" 
              objectPosition="center"
            />
          </div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url('${imgPattern}')` }}
          />
        </div>

        {/* Layer 2: Decorative Images (Hands, Logo) */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          variants={rightVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Hand */}
          <motion.div 
            className="absolute bottom-0 -left-22 w-[200px] h-[206px] lg:w-[400px] lg:h-[412px]"
            initial={{ x: -300, rotate: -30, opacity: 0 }}
            animate={{ 
              x: 0,
              rotate: 12, 
              opacity: 1,
              transition: { 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.5
              }
            }}
            whileInView={{ 
              x: 0,
              rotate: 12, 
              opacity: 1,
              transition: { 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.5
              }
            }}
          >
            <Image src={imgLeftHand} alt="OK hand gesture" fill objectFit="contain" />
          </motion.div>
          {/* Hand is smaller, repositioned, and rotated diagonally. */}
            {/* Books images with floating motion */}
            <div className="absolute top-[8%] right-[30%] w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] animate-float">
               <Image src={imgBooks} alt="Books" fill className="object-contain" />
            </div>
            <div className="absolute top-[65%] right-[25%] w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] animate-float-delayed">
               <Image src={imgBooks1} alt="Books" fill className="object-contain" />
            </div>
          <motion.div 
            className="absolute -top-16 -right-20 w-[300px] h-[275px] lg:w-[600px] lg:h-[550px]"
            initial={{ x: 300, rotate: 0, opacity: 0 }}
            animate={{ 
              x: 0,
              rotate: 12, 
              opacity: 1,
              transition: { 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.8
              }
            }}
            whileInView={{ 
              x: 0,
              rotate: 12, 
              opacity: 1,
              transition: { 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.8
              }
            }}
          >
            <Image src={imgRightHand} alt="Hand writing" fill objectFit="contain" />
          </motion.div>
        </motion.div>

        {/* Layer 3: Content */}
        <motion.div 
          className="relative z-20 container mx-auto px-5 lg:px-20 py-16 lg:py-0"
          variants={leftVariants}
          initial="hidden"
          animate={controls}
        >
          {/* THE FIX: A 12-column grid allows for very fine control. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px] items-center">
            
            {/* This invisible spacer now only takes up 2 of 12 columns, pushing the content slightly left. */}
            <div className="hidden lg:block lg:col-span-2"></div> 
            
            {/* The content now occupies a larger span, starting further to the left. */}
            <div className="lg:col-span-7 text-white">
              <div className="max-w-[600px]">
                <h1 
                  className="text-4xl lg:text-7xl xl:text-8xl font-semibold leading-tight lg:leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  For Writers
                </h1>
                <p 
                  className="mt-4 lg:mt-6 text-base lg:text-xl xl:text-2xl leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  We welcome submissions that align with our editorial vision. Visit our Author Submissions page to learn about guidelines, timelines, and how we work with new voices.
                </p>
              </div>
              <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-x-12 lg:gap-y-6">
                {/* Phone Number */}
                <div className="flex items-center gap-3 lg:gap-4">
                  <Image src={imgPhoneIcon} alt="Phone" width={48} height={48} className="lg:w-16 lg:h-16" />
                  <span 
                    className="text-2xl lg:text-4xl xl:text-5xl font-semibold tracking-wider"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    +1 (469) 452-7618
                  </span>
                </div>
                {/* Get a Quote Button */}
                <button 
                  className="group flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full py-2.5 pl-6 pr-2 shadow-lg overflow-hidden relative w-full lg:w-auto"
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
                  <span 
                    className="font-semibold text-base lg:text-lg text-[#063f4a] relative z-10"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Free Call
                  </span>
                  <span className="bg-white rounded-full p-2.5 flex items-center justify-center w-10 h-10 relative z-10">
                    <Image src={imgArrowIcon} alt="arrow icon" width={20} height={20} className="lg:w-6 lg:h-6" />
                  </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}