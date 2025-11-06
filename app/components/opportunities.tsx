'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { fadeInLeft, fadeInUp, staggerContainer } from '../utils/animations';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets for the section.
const imgSharkUnderwater = "/images/shark-underwater-2.png";
const imgBgVector = "/images/bg-vector-1.svg";
const imgBgMask = "/images/shark-ocean-mask.svg";
const imgClappingHandsIcon = "/images/hands-clapping.svg";
const imgArrowIcon = "/images/arrow-icon-3.svg";
const imgCardMask = "/images/service-mask.svg";

// Data for the two cards to keep the code clean and scalable.
const cardData = [
  {
    title: "Departments:",
    description: "Book Editors, Designers, Marketing, Production, Sales, Finance, HR.",
    backgroundImage: "/images/departments-image.png",
  },
  {
    title: "Opportunities:",
    description: "Full-time roles, internships, and freelance partnerships.",
    backgroundImage: "/images/opportunities-image.png",
  }
];

// Use optimized animation variants
const imageSlideInVariants = fadeInLeft;

// Reusable Card component, now with motion capabilities.
const InfoCard = ({ title, description, backgroundImage }: {
  title: string;
  description: string;
  backgroundImage: string;
}) => (
  <motion.div className="flex flex-col text-center text-white">
    <motion.div
      className="relative w-[140%] h-[300px] lg:h-[450px] -ml-[20%] overflow-hidden"
      style={{
        maskImage: `url('${imgCardMask}')`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      }}
      variants={imageSlideInVariants}
    >
      <Image src={backgroundImage} alt={title} fill className="object-cover rounded-2xl"/>
    </motion.div>
    
    <div className="mt-6 lg:mt-8 w-full">
      <h3
        className="text-3xl lg:text-5xl"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="mt-3 lg:mt-4 text-base lg:text-xl"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {description}
      </p>
    </div>
  </motion.div>
);


export default function Opportunities() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
  
  // MODIFICATION 1: Set triggerOnce to false
  const [ref, inView] = useInView({
    triggerOnce: false, // This allows the animation to trigger every time
    threshold: 0.2,
  });

  // Effect for the existing shark scroll animation
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODIFICATION 2: Add an else condition to reset the animation
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to the 'hidden' state when out of view
    }
  }, [inView, controls]);

  // Use optimized container variants
  const containerVariants = staggerContainer;

  return (
    <section className="relative w-full bg-white">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Wave background - only on desktop */}
        <div className="hidden lg:block absolute inset-0">
          <Image src={imgBgVector} alt="Wavy background shape" fill className="object-cover object-bottom"/>
        </div>
        {/* Video background - on all screens */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              maskImage: `url('${imgBgMask}')`,
              maskSize: '100% 100%',
            }}
          >
            <video 
              ref={videoRef}
              autoPlay={isInView}
              loop 
              muted 
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center blur-md"
              poster="/images/bi-vid.jpeg"
            >
              <source src="/images/bi-vid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-5 lg:px-20 py-16 lg:py-24 xl:py-32 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24 items-start">
        
        {/* Left Column: Main Text & Shark */}
        <div className="relative flex flex-col text-white">
          <div className="relative z-20 pt-16 lg:pt-12 pl-4 lg:pl-8">
            <h1
              className="text-5xl lg:text-8xl xl:text-9xl font-semibold leading-tight lg:leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Careers
            </h1>
            <h2
              className="mt-4 lg:mt-6 text-2xl lg:text-4xl xl:text-5xl font-semibold max-w-md"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              We're always looking for passionate people to join our mission.
            </h2>
            <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
              <button 
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
                className="flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full py-2.5 pl-6 pr-2 w-full lg:w-auto"
              >
                <span className="font-semibold text-base lg:text-lg text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Publish Your Book</span>
                <span className="bg-white rounded-full p-2.5 flex items-center justify-center w-10 h-10">
                  <Image src={imgArrowIcon} alt="arrow icon" width={20} height={20} className="lg:w-6 lg:h-6" />
                </span>
              </button>
              <button className="flex items-center justify-center lg:justify-between gap-3 w-full lg:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-0 lg:pl-5 text-[#063f4a] font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>

            <div
              className="absolute top-135 w-[80%] h-[260px] z-10 animate-shark-complete hidden lg:block"
               style={{
                 left: `${-600 + (scrollPosition * 0.05)}%`,
                 transform: `translateX(${scrollPosition * 0.3}px)`
               }}
            >
              <Image 
                src="/images/shark-underwater-2.png" 
                alt="Shark underwater" 
                width={400}
                height={300}
                className="w-full h-full transform -scale-x-100" 
                priority
              />
            </div>
        </div>

        {/* Right Column: Cards & Banner - ATTACHED REF FOR TRIGGERING */}
        <div ref={ref} className="flex flex-col gap-y-12 lg:gap-y-16 overflow-hidden">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-30 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {cardData.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </motion.div>
          <div className="bg-[#35c4dd] rounded-2xl p-4 lg:p-6 flex items-center gap-3 lg:gap-4 text-[#063f4a]">
            <Image src={imgClappingHandsIcon} alt="Clapping hands icon" width={40} height={40} className="lg:w-12 lg:h-12" />
            <p className="text-lg lg:text-2xl font-medium" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Work in a creative, collaborative environment where every story matters.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}