'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Image assets
const imgBackground = "/images/shark-ocean-main.png";
const imgBlueWaveShape = "/images/service-bg-vector.svg";
const imgMaskShape = "/images/service-mask.svg";
const imgArrowIcon = "/images/arrow-icon.svg";
const imgChatIcon = "/images/chat-icon.svg";

// Service data with TikTok-specific content
const servicesData = [
  {
    id: 1,
    title: "Expertise in Inventory Management",
    description: "Our inventory management services ensure your products are always in stock and ready to meet customer demand.",
    icon: "/images/tiktok-logo.png",
    concept: "TikTok"
  },
  {
    id: 2,
    title: "Order Processing Automation",
    description: "Improve efficiency & attain massive profitability by automating order fulfillment processes & make leaps in competitive world.",
    icon: "/images/tiktok-logo.png",
    concept: "TikTok"
  }
];

// Reusable Button Component
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-center lg:justify-between gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
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
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      Get A Quote
    </span>
    <span className={`bg-white rounded-full flex items-center justify-center relative z-10 ${small ? 'w-10 h-10' : 'w-10 h-10'}`}>
      <Image src={imgArrowIcon} alt="arrow icon" width={small ? 18 : 20} height={small ? 18 : 20} />
    </span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
  </button>
);

export default function TikTokBestServices() {
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
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

  const headerVariants: Variants = {
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

  const leftCardVariants: Variants = {
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

  const rightCardVariants: Variants = {
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
    // This structure correctly creates the wavy top border without breaking page flow.
    <div ref={ref} className="relative w-full bg-white pt-16 lg:pt-32 xl:pt-48">
      
      {/* Background elements are absolutely positioned and fill the parent container. */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute inset-0 z-0">
          <Image src={imgBlueWaveShape} alt="Wavy background shape" fill className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 z-10" 
             style={{
                maskImage: `url('${imgMaskShape}')`,
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'top center',
             }}>
          <div className="relative w-full h-full">
            <video 
              ref={videoRef}
              autoPlay={isInView}
              loop 
              muted 
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover blur-md"
              poster="/images/bi-vid.jpeg"
            >
              <source src="/images/bi-vid.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#052126]/40" />
          </div>
        </div>
      </div>

      {/* Content container flows naturally and dictates the component's height. */}
      <div className="relative z-20 container mx-auto px-5 lg:px-20 pb-16 lg:pb-24 text-white">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h1 
            className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-wide" 
            style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
          >
            We Provide the Best Services for Your Product
          </h1>
          <p 
            className="mt-4 max-w-4xl mx-auto text-base lg:text-lg text-gray-200 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            At ECOM SHARKS, we offer top-tier solutions designed to streamline your TikTok business. Our expert team ensures every aspect operates flawlessly & seamlessly.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-16 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col service-card-flash hover:scale-95 transition-transform duration-300"
              variants={index === 0 ? leftCardVariants : rightCardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 0.95 }}
            >
              {/* Service Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 border border-white/30">
                  <Image 
                    src={service.icon} 
                    alt={service.concept}
                    width={50}
                    height={50}
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-[#35c4dd] text-[#063f4a] text-xs font-bold px-2 py-1 rounded-full shadow-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {service.concept}
                </div>
              </div>
              
              {/* Service Title */}
              <h2 
                className="text-3xl font-bold mb-4" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {service.title}
              </h2>
              {/* Service Description */}
              <p className="text-lg text-gray-200 leading-relaxed flex-grow" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GetQuoteButton />
            <button className="group flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#063f4a] transition-colors duration-300 rounded-full px-8 py-3 text-lg font-semibold" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <Image src={imgChatIcon} alt="chat icon" width={20} height={20} />
              <span>Live Chat</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
