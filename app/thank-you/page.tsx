'use client';

import React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';
import ThankYouHeader from '../components/ThankYouHeader';

export default function ThanksPage() {
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const footerControls = useAnimation();
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Ensure videos stay visible once animated in
  React.useEffect(() => {
    if (inView) {
      controls.set('visible');
    }
  }, [controls, inView]);

  React.useEffect(() => {
    if (footerInView) {
      footerControls.start('visible');
    }
  }, [footerControls, footerInView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
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

  const videoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-full bg-white">
      <ThankYouHeader 
        heroTitle="You're In! Let's Get Ready for Your Call"
        heroSubtitle="Congratulations! Your call is booked. This is the first step toward building your hands-off e-commerce business. Before we talk, I have two quick videos below that will answer all of your questions and make our call as productive as possible."
      />

      {/* Videos Section */}
      <div ref={ref} className="py-16 lg:py-24">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* First Video */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="mb-16 lg:mb-20"
            >
              <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                  <video 
                    ref={videoRef}
                    autoPlay={isInView}
                    loop 
                    muted 
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    poster="/images/bi-vid.jpeg"
                  >
                    <source src="/images/bi-vid.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[#052126]/70" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8">
                  <h2 
                    className="text-2xl lg:text-3xl font-bold text-white mb-4" 
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Watch This First: How to Get the Most Out of Our Call.
                  </h2>
                  
                  <p 
                    className="text-base lg:text-lg text-gray-200 mb-6 leading-relaxed" 
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    This video will walk you through what to expect on the call and what you need to prepare, so we can get right to the details and not waste a single minute.
                  </p>
                  
                  <div className="relative w-full bg-white rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/PkzqxZQwK_E?si=VStYF-HeP5wcyBUB"
                      title="How to Get the Most Out of Our Call"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second Video */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                  <video 
                    ref={videoRef}
                    autoPlay={isInView}
                    loop 
                    muted 
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    poster="/images/bi-vid.jpeg"
                  >
                    <source src="/images/bi-vid.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[#052126]/70" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8">
                  <h2 
                    className="text-2xl lg:text-3xl font-bold text-white mb-4" 
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Watch This Next: See Exactly How Our Clients Are Hitting $4,000 a Month.
                  </h2>
                  
                  <p 
                    className="text-base lg:text-lg text-gray-200 mb-6 leading-relaxed" 
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    This video will walk you through what to expect on the call and what you need to prepare, so we can get right to the details and not waste a single minute.
                  </p>
                  
                  <div className="relative w-full bg-white rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/3kE6P9VgPuc?si=gsdM9QvEVxgrUo3S"
                      title="See Exactly How Our Clients Are Hitting $4,000 a Month"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div ref={footerRef} className="bg-gradient-to-b from-white to-[#f8fafc] py-16 lg:py-24">
        <div className="container mx-auto px-5 lg:px-20 text-center">
          <motion.div
            initial="hidden"
            animate={footerControls}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={textVariants}>
              <h2 
                className="text-2xl lg:text-4xl font-bold text-[#063f4a] mb-6" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Ready to Transform Your Business?
              </h2>
              
              <p 
                className="text-lg lg:text-xl text-[#2c2420] leading-relaxed" 
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                We're excited to speak with you and help you build your hands-off e-commerce business. See you on the call!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}