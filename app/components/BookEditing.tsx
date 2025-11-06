'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const imgChatCircleDots = "/images/chat-icon.svg";

const imgPattern = "/images/book-editing/services-bg.png";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Book Editing',
    description: 'Professional proofreading and line editing to make your manuscript shine.',
    image: '/images/book-editing/book-1.webp',
  },
  {
    id: 2,
    title: 'Professional Formatting',
    description: 'We format your book for both print and ebook, ensuring it looks flawless on any device.',
    image: '/images/book-editing/book-2.webp',
  },
  {
    id: 3,
    title: 'Stunning Cover Design',
    description: 'Our designers create a unique, industry-standard book cover that sells your book.',
    image: '/images/book-editing/book-3.webp',
  },
  {
    id: 4,
    title: 'Global Distribution',
    description: 'We list your book on major platforms like Amazon, Barnes & Noble, Apple Books, and more.',
    image: '/images/book-editing/book-4.webp',
  },
  {
    id: 5,
    title: 'Strategic Book Marketing',
    description: 'Wide distribution network ensuring your book reaches readers everywhere.',
    image: '/images/book-editing/book-5.webp',
  },
  {
    id: 6,
    title: 'Ghostwriting Services',
    description: 'Have a great idea but not enough time to write it? Our ghostwriters can turn your vision into reality.',
    image: '/images/book-editing/book-6.webp',
  },
  {
    id: 7,
    title: 'Book Animation & Video Trailers',
    description: 'Create an engaging, eye-catching video trailer that brings your book to life.',
    image: '/images/book-editing/book-7.webp',
  },
];

// Reusable Button Component matching Experts section
const GetQuoteButton = () => (
  <button 
    className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
    onClick={() => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/ecomsharkss-info/30min',
          onEventScheduled: function(e: any) {
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
);

// Live Chat Button matching Header section
const LiveChatButton = () => (
  <button className="flex items-center justify-between w-[170px] h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
    <span className="pl-5 text-[#063f4a] font-bold text-xl" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
    <div className="w-[40px] h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
      <Image src={imgChatCircleDots} alt="chat icon" width={24} height={24} />
    </div>
  </button>
);

export default function BookEditing(): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Main wrapper that centers and scales the content
    <div className="w-full bg-white flex justify-center">
      {/* Scalable container with responsive height */}
      <div className="relative w-full max-w-[1920px] h-auto py-16 lg:aspect-[1920/1080] lg:py-0 overflow-hidden select-none">
        
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white opacity-100" />
          <Image 
            src={imgPattern} 
            alt="Background" 
            fill 
            className="object-cover opacity-100" 
            style={{ transform: 'scaleY(-1)' }}
            priority
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 lg:px-20 py-12 lg:py-20">
          
          {/* Section Title */}
          <h2 
            className="capitalize text-4xl lg:text-[75px] leading-tight lg:leading-[85px] font-semibold text-black mb-8 lg:mb-[60px] text-center"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Services
          </h2>

          {/* Slider Container */}
          <div className="relative w-full max-w-[1400px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {services.map((service, index) => (
                currentSlide === index && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="min-w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-6 lg:p-10"
                  >
                    {/* Left - Book Image */}
                    <motion.div 
                      className="relative w-full lg:w-1/2 flex justify-center items-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div 
                        className="relative w-full max-w-md h-96 flex justify-center items-center"
                        style={{ 
                          animation: `floatStrong 4s ease-in-out infinite`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        <div className="relative w-full h-full min-h-[384px]">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="rounded-xl object-contain"
                            priority={index === 0 || index === 4}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => {
                              console.error('Image failed to load:', service.image);
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Right - Text Content */}
                    <motion.div 
                      className="w-full lg:w-1/2 flex flex-col justify-center gap-6 text-left"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 
                        className="capitalize tracking-normal text-3xl lg:text-[40px] leading-[0.3em] font-semibold text-[#063f4a] mb-4"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="text-[#2c2420] w-full max-w-[540px] text-xl lg:text-[35px] font-light leading-[1.2em] mb-6"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {service.description}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                        <GetQuoteButton />
                        <LiveChatButton />
                      </div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-8 lg:mt-12">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-3 h-3 bg-[#35c4dd] rounded-full'
                    : 'w-3 h-3 border-2 border-[#35c4dd] bg-transparent rounded-full hover:bg-[#35c4dd]/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatStrong {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
