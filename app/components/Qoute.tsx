'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/*
  Image assets are mapped from the original code for this specific component.
*/
const imgPattern011 = "/images/testimonials-pattern-bg.png"; 
const imgShark21 = "/images/quote-shark.png"; 
const imgImage1 = "/images/quote-logo.png"; 
const imgRectangle34624302 = "/images/quote-bg-rectangle.svg"; 
const imgGroup1321315061 = "/images/header-phone-icon.svg";

export default function QuoteSection() {
  const textShadow = { textShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' };
  const [scrollPosition, setScrollPosition] = useState(0);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        staggerChildren: 0.1,
        delayChildren: 0.05,
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
        stiffness: 100,
        damping: 15,
        mass: 0.8,
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
        stiffness: 100,
        damping: 15,
        mass: 0.8,
      },
    },
  };

  return (
    // Main wrapper that centers and scales the content
    <div ref={ref} className="w-full bg-white flex justify-center">
      
       {/* Responsive container */}
       <div className="relative w-full max-w-[1920px] h-auto pt-0 pb-2 lg:min-h-[800px] lg:py-0 overflow-hidden select-none">
        
        {/* --- PRESERVED DIVS (UNCHANGED AS REQUESTED) --- */}
        <motion.div 
          className="absolute h-full w-full"
          variants={rightVariants}
          initial="hidden"
          animate={controls}
        >
            <div className="absolute flex h-[800px] items-center justify-center top-[60px] translate-x-[-50%] w-[1920px]" style={{ left: "calc(50% - 36.5px)" }}>
                <div className="flex-none scale-y-[-100%]">
                    <div className="h-[800px] relative w-[1920px]">
                    <Image 
                      alt="background shape" 
                      width={1920}
                      height={800}
                      className="block max-w-none size-full" 
                      src={imgRectangle34624302}
                      priority
                    />
                    </div>
                </div>
            </div>
            <div className="absolute bg-[0%_-0.06%] bg-no-repeat bg-size-[100%_88.77%] h-[1000px] left-[-43px] opacity-20 top-px w-[2382px]" style={{ backgroundImage: `url('${imgPattern011}')` }} />
            <div className="absolute h-[800px] left-0 overflow-clip top-0 w-[1920px]">
                <div 
                  className="absolute flex h-[961.316px] items-center justify-center -top-167 w-[1324.938px] animate-shark-complete transition-all duration-1000 ease-out"
                  style={{ 
                    left: `${99 - (scrollPosition * 0.01)}%`,
                    top: `${-162 + (scrollPosition * 0.002)}px`,
                    transform: `translateX(${scrollPosition * 0.1}px)`
                  }}
                >
                    <div className="flex-none rotate-[198.874deg] scale-y-[-100%]">
                    <div className="bg-center bg-cover bg-no-repeat h-[608.353px] w-[1192.26px]" style={{ backgroundImage: `url('${imgShark21}')` }} />
                    </div>
                </div>
            </div>
        </motion.div>
        {/* --- END OF PRESERVED DIVS --- */}

        {/* Content Layer - Responsive positioning */}
        <motion.div 
          className="relative lg:absolute top-0 lg:top-[50%] lg:-translate-y-1/2 left-0 lg:left-20 z-20 text-white px-5 lg:px-0"
          variants={leftVariants}
          initial="hidden"
          animate={controls}
        >
            <div className="w-[180px] h-[130px] lg:w-[240px] lg:h-[180px] relative mt-16 lg:mt-12">
             <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" />
           </div>

           <h1 className="mt-6 lg:mt-8 text-3xl lg:text-[70px] font-semibold leading-tight lg:leading-[0.921] max-w-4xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
             Publish your Book with<br />
             Sharks Book Publisher
           </h1>

           <p className="mt-6 lg:mt-8 text-xl lg:text-[30px] font-medium max-w-2xl leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
             Ready to Turn Your Manuscript Into a Masterpiece?
           </p>

          <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
             <button 
               className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
               onClick={() => {
                 if (typeof window !== 'undefined' && (window as any).Calendly) {
                   (window as any).Calendly.initPopupWidget({
                     url: 'https://calendly.com/contact-sharksbookpublishers/30min',
                     onEventScheduled: function(e: any) {
                       // Redirect to thank you page when appointment is scheduled
                       window.location.href = '/thank-you';
                     }
                   });
                 }
               }}
             >
                <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Free Call</span>
                <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
            </button>
          </div>

          <div className="mt-8 lg:mt-12 flex items-center gap-4 lg:gap-6">
            <div className="w-[60px] h-[60px] lg:w-[83px] lg:h-[83px] relative">
              <Image src={imgGroup1321315061} alt="Phone Icon" fill className="object-contain" />
            </div>
            <p className="text-xl lg:text-[45px] font-semibold tracking-[2px] lg:tracking-[4.2px]" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
              (469) 452-7618
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}