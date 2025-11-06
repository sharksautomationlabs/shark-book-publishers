'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets for the section.
const imgArrowIcon = "/images/arrow-icon-2.svg";

// Reusable button icons
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Data array holds all unique content for each card.
const careerData = [
  {
    title: "Announcements",
    description: "New Titles, Bestseller Achievements, And Award Nominations.",
    personImage: "/images/Asset1.png",
  },
  {
    title: "Career",
    description: "We're Always Looking For Passionate People To Join Our Mission.",
    personImage: "/images/Asset2.png",
  },
  {
    title: "Blog",
    description: "Insights Into Amazon, Shopify, Walmart, Tiktok And Behind-The-Comerce Stories.",
    personImage: "/images/Asset3.png",
  },
  {
    title: "News",
    description: "Latest Updates, Industry Insights, And Company News.",
    personImage: "/images/Asset4.png",
  },
];

// Reusable Card Component - Updated with motion and hover animations
const CareerCard = ({ title, description, personImage, variants }: {
  title: string;
  description: string;
  personImage: string;
  variants: Variants;
}) => (
  <motion.div 
    className="relative w-full rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[400px]"
    variants={variants}
    whileHover="hover" // Use the "hover" key from our variants
    initial="initial"
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    
    {/* Animated Background Image */}
    <motion.div
      className="absolute inset-0 z-0"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.1 }, // Zoom in on hover
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Image 
        src={personImage} 
        alt={`${title} background`} 
        fill 
        objectFit="cover" 
      />
    </motion.div>

    {/* Animated Text and Button Content */}
    {/* MODIFICATION: The container itself is now animated on hover */}
    <motion.div 
      className="absolute inset-0 z-30 p-6 lg:p-8 flex flex-col justify-end" // Changed to justify-end
      variants={{
        initial: { y: 0 },
        hover: { y: -20 }, // Move up on hover
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* MODIFICATION: Removed pt-32, using justify-end on parent */}
      <div> 
        <h2 
          className="text-3xl lg:text-4xl xl:text-5xl font-medium text-white drop-shadow-lg"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {title}
        </h2>
        <p 
          className="mt-2 text-base lg:text-lg text-white drop-shadow-md max-w-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {description}
        </p>
      </div>
      
      {/* MODIFICATION: Adjusted margin-top for better spacing */}
      <div className="mt-6 lg:mt-8 -ml-2 lg:-ml-4">
        <button 
          className="group flex items-center justify-center gap-3 bg-white text-[#35c4dd] font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto"
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
            className="relative z-10"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Get Started
          </span>
          <span className="bg-[#063f4a] rounded-full p-2.5 relative z-10">
            <ArrowIcon />
          </span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#063f4a] rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
        </button>
      </div>
    </motion.div>
  </motion.div>
);


export default function Careers() {
  const controls = useAnimation();
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

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
  const cardVariants: Variants = {
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

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-5 lg:px-20">
        
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={cardVariants}
          initial="hidden"
          animate={controls}
        >
          <h1 
            className="text-4xl lg:text-7xl xl:text-8xl font-medium text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Career
          </h1>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {careerData.map((card, index) => (
            <CareerCard key={index} {...card} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}