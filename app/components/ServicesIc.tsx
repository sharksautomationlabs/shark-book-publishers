'use client';

import React from 'react';
import { motion, useAnimation, Variants, AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Interface for typing the service data objects
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Service data
const servicesData: Service[] = [
  {
    id: 1,
    title: "Book Editing",
    description: "Professional proofreading and line editing to perfect your manuscript. Benefit: Eliminate typos and grammar errors that can turn readers away.",
    icon: "/images/service-ic-1.png"
  },
  {
    id: 2,
    title: "Professional Formatting",
    description: "We format your book for both print and ebook, ensuring it looks flawless on any device. Benefit: Give your book a polished, professional look that builds reader trust.",
    icon: "/images/service-ic-2.png"
  },
  {
    id: 3,
    title: "Stunning Cover Design",
    description: "Our designers create a unique, industry-standard book cover that sells your book from the moment a reader sees it. Benefit: Catch a reader's eye and make your book stand out in a crowded market.",
    icon: "/images/service-ic-3.png"
  },
  {
    id: 4,
    title: "Global Distribution",
    description: "We list your book on major platforms like Amazon, Barnes & Noble, Apple Books, and more. Benefit: Reach millions of potential readers worldwide and get discovered.",
    icon: "/images/service-ic-4.png"
  },
  {
    id: 5,
    title: "Strategic Book Marketing",
    description: "Our experts create a tailored marketing plan to build buzz, drive sales, and reach your ideal audience. Benefit: Turn your book into a bestseller and build a profitable writing career.",
    icon: "/images/service-ic-5.png"
  },
  {
    id: 6,
    title: "Ghostwriting Services",
    description: "Have a great idea but not enough time to write it? Our ghostwriters can turn your vision into a finished manuscript. Benefit: Finally get your story told and ready for the world.",
    icon: "/images/service-ic-6.png"
  },
  {
    id: 7,
    title: "Book Animation & Video Trailers",
    description: "Create an engaging, eye-catching video trailer that brings your book to life. Benefit: Capture a reader's attention on social media and generate excitement before launch.",
    icon: "/images/service-ic-7.png"
  }
];

// Extend the Window interface to include Calendly for type safety
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string; onEventScheduled?: (e: any) => void; }) => void;
    };
  }
}

const PublishingSolution: React.FC = () => {
  const controls: AnimationControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const handleGetQuote = (): void => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/ecomsharkss-info/30min',
        onEventScheduled: function(e: any) {
          window.location.href = '/thank-you';
        }
      });
    }
  };

  return (
    <div ref={ref} className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold text-black mb-6 sm:mb-7 md:mb-8 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
            variants={itemVariants}
          >
            Your All-in-One Publishing Solution
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-[20px] text-[#4a4a4a] max-w-4xl mx-auto leading-[1.6] mb-8 sm:mb-10 md:mb-12"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
            variants={itemVariants}
          >
            Don't want to manage a dozen different contractors? We handle everything from start to finish. Our comprehensive package includes editing, cover design, formatting, and distribution, providing a single, stress-free path to publication.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={handleGetQuote}
            className="bg-[#35C4DD] py-[15px] pl-5 pr-[70px] rounded-[60px] relative text-[#063F4A] text-xl font-semibold border-none cursor-pointer transition-all duration-500 mx-auto inline-block hover:shadow-[0_20px_38px_rgba(0,0,0,0.16)] hover:-translate-y-[3px] before:content-[''] before:bg-white before:absolute before:w-5 before:h-5 before:top-1/2 before:-translate-y-1/2 before:right-[15px] before:rounded-[30px] before:transition-all before:duration-500 before:origin-[center_right] hover:before:w-full hover:before:h-full hover:before:rounded-[60px] hover:before:right-0 hover:before:top-1/2 hover:before:-translate-y-1/2"
            style={{ fontFamily: "'Barlow', sans-serif" }}
            variants={itemVariants}
          >
            <span className="left-0 inline-block translate-x-0 transition-[opacity,transform] duration-[0.45s] ease-[cubic-bezier(0.25,1,0.33,1)] relative z-[2] hover:text-[#35C4DD] hover:z-[1]">
              Get My Free Quote
            </span>
          </motion.button>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
          {servicesData.map((service: Service) => (
              <motion.div
                key={service.id}
                className="group flex flex-col items-center text-center cursor-pointer relative bg-[#35c4dd47] py-10 px-8 backdrop-blur-[5px] border border-black rounded-[10px] transition-all duration-[0.6s] box-border hover:bg-[#35c4dd] hover:border-[#35c4dd] hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(53,196,221,0.3)]"
                variants={cardVariants}
              >
                {/* Icon */}
                <div className="mb-7 relative z-10 w-full flex items-center justify-center">
                  <Image 
                    src={service.icon}
                    alt={service.title}
                    width={120}
                    height={120}
                    className="w-[42%] h-auto object-contain animate-floatY"
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl text-black mb-5 relative z-10 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400, lineHeight: '1.3' }}
                >
                  {service.title}
                </h3>

                {/* Description - UPDATED */}
                <p
                  className="text-base md:text-lg text-[#333333] leading-[1.7] relative z-10 px-1 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
                >
                  {service.description}
                </p>
              </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-floatY {
          animation: floatY 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default PublishingSolution;

