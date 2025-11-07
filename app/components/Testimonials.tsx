'use client';

import React, { useEffect, useRef, useState } from 'react';
import { User, Play, Pause } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { allTestimonials, Testimonial } from './testimonials-data';

// Star rating component - Made responsive for mobile
const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                    // Full star
                    return (
                        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
                            <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="currentColor"/>
                        </svg>
                    );
                } else if (i === fullStars && hasHalfStar) {
                    // Half star
                    return (
                        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
                            <defs>
                                <linearGradient id={`half-star-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="50%" stopColor="#14b8a6"/>
                                    <stop offset="50%" stopColor="#d1d5db"/>
                                </linearGradient>
                            </defs>
                            <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill={`url(#half-star-${i})`}/>
                        </svg>
                    );
                } else {
                    // Empty star
                    return (
                        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                            <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="currentColor"/>
                        </svg>
                    );
                }
            })}
        </div>
    );
};


interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials: customTestimonials }: TestimonialsProps = {}) {
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  const togglePlay = async () => {
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        // Ensure video is unmuted before playing
        videoPlayerRef.current.muted = false;
        try {
          await videoPlayerRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing video:', error);
          // If autoplay fails, try with muted first then unmute
          videoPlayerRef.current.muted = true;
          await videoPlayerRef.current.play();
          videoPlayerRef.current.muted = false;
          setIsPlaying(true);
        }
      }
    }
  };

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

  // Spring animation variants - header from right, cards from left
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

  const testimonials = customTestimonials || allTestimonials;

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-24 overflow-x-hidden">
      {/* Container to enforce 1920px max-width alignment */}
      <div className="container mx-auto px-5 lg:px-20">
        
        {/* Section Header - Fonts and colors are matched exactly. */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h1 
            className="text-3xl lg:text-6xl font-bold text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Client Testimonials
          </h1>
          <p 
            className="mt-4 text-base lg:text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            From debut storytellers to celebrated literary icons, our authors are the heart of our work. Explore biographies, latest releases, interviews, and upcoming events.
          </p>
        </motion.div>

        {/* Featured Video Testimonial - Judy */}
        <motion.div
          className="mb-12 lg:mb-16"
          variants={cardVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Meet Judith Hobson Text */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 
              className="text-2xl lg:text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Meet Judith Hobson
            </h2>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#35c4dd] to-[#063f4a] p-1">
            <div className="relative w-full aspect-video bg-black rounded-xl lg:rounded-2xl overflow-hidden group">
              <video
                ref={videoPlayerRef}
                className="w-full h-full object-cover"
                loop
                muted={false}
                playsInline
                preload="auto"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={() => {
                  // Ensure video can play with sound
                  if (videoPlayerRef.current) {
                    videoPlayerRef.current.muted = false;
                  }
                }}
              >
                <source src="/images/judy-vid.mp4" type="video/mp4" />
              </video>
              
              {/* Play/Pause Overlay Button */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                } bg-black/30 group-hover:bg-black/20`}
                onClick={togglePlay}
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#35c4dd] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  {isPlaying ? (
                    <Pause className="w-10 h-10 lg:w-12 lg:h-12 text-white ml-1" fill="white" />
                  ) : (
                    <Play className="w-10 h-10 lg:w-12 lg:h-12 text-white ml-1" fill="white" />
                  )}
                </div>
              </div>

              {/* Video Info Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-sm lg:text-base font-semibold text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  🎬 Video Testimonial
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#35c4dd]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#063f4a]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div 
              key={testimonial.id || index}
              className="bg-[#E8F8FA] rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 flex flex-col"
              style={{ fontFamily: "'Barlow', sans-serif" }}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  {/* Profile Icon */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200 border-2 border-[#35c4dd]">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base lg:text-lg text-gray-800" style={{ fontFamily: "'Barlow', sans-serif" }}>{testimonial.name}</h3>
                    <div className="mt-1">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap pl-2">{testimonial.postDate}</p>
              </div>
              
              {/* Review Text - Truncated to 2 lines */}
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed line-clamp-2 mb-4">
                {testimonial.review}
              </p>
              
              {/* Read More Button */}
              <Link 
                href={`/testimonials?id=${testimonial.id || index}`}
                className="mt-auto text-[#35c4dd] font-semibold text-sm lg:text-base transition-colors duration-200"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Button */}
        {testimonials.length > 6 && (
          <motion.div 
            className="text-center mt-10 lg:mt-12"
            variants={headerVariants}
            initial="hidden"
            animate={controls}
          >
            <Link 
              href="/testimonials"
              className="group flex items-center justify-between w-[150px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2 mx-auto"
            >
              <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>See All</span>
              <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
              </span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}