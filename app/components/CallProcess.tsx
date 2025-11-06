'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

const imgChatCircleDots = "/images/chat-icon.svg";
const imgArrowIcon = "/images/arrow-icon.svg";

// Call process steps data
const callProcessSteps = [
  {
    title: "Your Situation",
    description: "We'll review your background and goals to understand how our system can best serve you."
  },
  {
    title: "Our System", 
    description: "We'll walk you through a live demonstration of our automated store system, so you can see it in action."
  },
  {
    title: "Your Path",
    description: "We'll map out a personalized strategy to help you achieve a guaranteed return in just 90 days."
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

export default function CallProcess() {
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
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

  return (
    <div ref={ref} className="relative w-full bg-white pt-16 lg:pt-32 xl:pt-48 min-h-[800px] lg:min-h-[1000px]">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay={isInView}
          loop 
          muted 
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center blur-md"
          poster="/images/bi-vid.jpeg"
        >
          <source src="/images/bi-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#052126]/40" />
      </div>

      <div className="relative z-20 container mx-auto px-5 lg:px-20 pb-16 lg:pb-24 text-white">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants}>
            <div className="inline-flex items-center gap-2 lg:gap-3 bg-white/20 backdrop-blur-sm text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-full mb-6 lg:mb-8">
              <span className="font-medium text-sm lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Call Process</span>
            </div>
            
            <h1 
              className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight" 
              style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
            >
              What Happens on the Call?
            </h1>
            
            <p 
              className="mt-4 max-w-4xl mx-auto text-base lg:text-lg text-gray-200 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              We've helped investors and entrepreneurs just like you launch profitable, hands-off e-commerce stores. Not a sales pitch — a strategy session with actionable steps.
            </p>
          </motion.div>

          {/* Process Steps Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16 max-w-7xl mx-auto"
          >
            {callProcessSteps.map((step, index) => (
              <motion.div 
                key={step.title} 
                variants={cardVariants}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105 service-card-flash"
              >
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#35c4dd] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Step Title */}
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {step.title}
                </h2>

                {/* Step Description */}
                <p className="text-gray-200 text-sm lg:text-base leading-relaxed flex-grow" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {step.description}
                </p>

                {/* CTA Button */}
                <div className="mt-6">
                  <GetQuoteButton small />
                </div>
              </motion.div>
            ))}
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
