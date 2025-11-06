'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imgChatCircleDots = "/images/chat-icon.svg";
const imgArrowIcon = "/images/arrow-icon.svg";

// Image assets
const imgPatternBg = "/images/pattern-bg.png";
const imgServiceMask = "/images/service-mask.svg";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !hasAnimated) {
      setCount(0); // Start from 0 when in view
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const increment = numericValue / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
          setHasAnimated(true); // Mark as animated
        } else {
          setCount(current);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value, duration, hasAnimated]);

  const formatValue = (num: number) => {
    if (value.includes('$')) {
      return `$${num.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
    }
    if (value.includes('x')) {
      return `${Math.round(num)}x`;
    }
    if (value.includes('%')) {
      return `${Math.round(num)}%`;
    }
    return num.toString();
  };

  return (
    <div 
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
        }
      }}
      className="text-3xl lg:text-4xl font-bold text-white mb-2" 
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {formatValue(count)}
    </div>
  );
};

// Statistics data
const statistics = [
  {
    label: "Total Profit (Last 30 Days)",
    value: "$52,260.9"
  },
  {
    label: "Return on Investment",
    value: "4x"
  },
  {
    label: "Success Rate",
    value: "89%"
  }
];

// Reusable Button Component
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-center lg:justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative gap-3 ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
    onClick={() => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/ecomsharkss-info/30min'
        });

        // Add event listener for Calendly events
        (window as any).addEventListener('message', function(event: any) {
          if (event.data.event && event.data.event === 'calendly.event_scheduled') {
            console.log('Calendly event scheduled, redirecting...');
            window.location.href = '/thank-you';
          }
        });
      }
    }}
  >
    <span 
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-lg' : 'text-xl'}`}
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      Book Now
    </span>
    <span className={`bg-white rounded-full flex items-center justify-center relative z-10 ${small ? 'w-10 h-10' : 'w-10 h-10'}`}>
      <Image src={imgArrowIcon} alt="arrow icon" width={small ? 20 : 20} height={small ? 20 : 20} />
    </span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
  </button>
);

export default function StrategyCall() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

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

  const cardVariants: Variants = {
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

  const statVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div ref={ref} className="relative w-full bg-gradient-to-b from-white to-[#f8fafc] py-16 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#35c4dd]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#063f4a]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-5 lg:px-20">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8 lg:mb-16"
            variants={cardVariants}
          >
            <h1 
              className="text-4xl lg:text-6xl font-bold text-[#063f4a] mb-6" 
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What you'll get in the free strategy call?
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#35c4dd] to-[#063f4a] mx-auto rounded-full"></div>
          </motion.div>

          {/* Description */}
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            variants={cardVariants}
          >
            <p 
              className="text-lg lg:text-xl text-[#2c2420] leading-relaxed max-w-4xl mx-auto"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              In this call, our senior business consultant will guide you step-by-step on how this automation system works and the actionable steps through which we can help accomplish at least $4,000 in sales for you in just 60 days.
            </p>
          </motion.div>

          {/* Statistics Section */}
          <motion.div 
            variants={cardVariants}
            className="mb-12 lg:mb-16"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-8 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Guaranteed High Profits Within the First Month
            </h2>
            
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
               {statistics.map((stat, index) => (
                 <motion.div 
                   key={stat.label}
                   variants={statVariants}
                   className="bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-500 text-center"
                 >
                   {/* Background Pattern - Exact match from founder quote */}
                   <div className="absolute inset-0 opacity-10">
                     <Image src={imgPatternBg} alt="Pattern background" fill className="object-cover" />
                   </div>
                   
                   {/* Content */}
                   <div className="relative z-10">
                     <AnimatedCounter value={stat.value} duration={2000} />
                     <div className="text-sm lg:text-base text-white/80" style={{ fontFamily: "'Barlow', sans-serif" }}>
                       {stat.label}
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </motion.div>
          
          {/* Bottom CTA Buttons */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mt-16 lg:mt-20"
          >
            <GetQuoteButton />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
