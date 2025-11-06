'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imgChatCircleDots = "/images/chat-icon.svg";

/*
  Image assets are mapped from the original code for this specific component.
*/
const imgPattern011 = "/images/pattern-bg.png"; 
const imgWoman = "/images/mission-bg-main.png";
const imgMan = "/images/man.png"; 
const imgShark = "/images/mission-shark-main.png"; 
const imgLuna = "/images/luna.webp";
const imgWalmartLogo = "/images/walmart-logo.png";
const imgAmazonLogo = "/images/amazon-logo.png";
const imgTikTokLogo = "/images/tiktok-logo.png";
const imgPatternMask = "/images/results-mask.svg";
const imgWomanMask = "/images/mission-bg-mask.svg";

// Award Winning Section Images
const imgAwardWinning = "/images/award winning.webp";
const imgComingSoon = "/images/coming-soon.webp";
const imgBookClubPicks = "/images/sharks book club picks.webp";
const imgInternationalEditions = "/images/international editions.webp";
const imgHand1 = "/images/hand.webp";
const imgSharkUnderwater = "/images/shark-underwater.png";

// Reusable button icons
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface AwardWinningProps {
  customTitle?: string;
  customDescription?: string;
  useCustomContent?: boolean;
  logoType?: 'shopify' | 'walmart' | 'amazon' | 'tiktok';
}

export default function AwardWinningSection({ 
  customTitle,
  customDescription,
  useCustomContent = false,
  logoType = 'shopify'
}: AwardWinningProps) {
  const [activeTab, setActiveTab] = useState('awardWinners');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Trigger image animation when tab changes - ensure content appears immediately
  useEffect(() => {
    if (inView) {
      // Force re-animation by briefly going to hidden then visible
      const timer = setTimeout(() => {
        controls.start('hidden');
        setTimeout(() => {
          controls.start('visible');
        }, 50);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [activeTab, inView, controls]);

  const contentData = {
    awardWinners: {
      title: 'Award Winners',
      description: 'At Sharks Book Publishers, we celebrate authors who have made waves in the literary ocean. Our Award Winners section highlights books that have earned critical acclaim, industry recognition, and the love of readers worldwide.\n\nFrom debut voices that surprised the tides to seasoned writers who continue to dominate the current, this showcase is dedicated to stories that rise above and inspire.',
      badge: 'Awards'
    },
    comingSoon: {
      title: 'Coming Soon',
      description: 'The tide never stops moving — and neither does the world of books. Our Coming Soon section is your sneak peek into the next wave of titles preparing to hit the shores.\n\nStay ahead of the curve by discovering upcoming authors and stories before they surface. Here, anticipation meets excitement, and readers can mark their calendars for the next big splash.',
      badge: 'Next Splash'
    },
    bookClubPicks: {
      title: 'Sharks Book Club Picks',
      description: 'Just like sharks hunt only the finest catch, our editorial team curates the Book Club Picks — stories too powerful to ignore.\n\nThese are not just books; they\'re must-reads chosen for their ability to spark conversation, inspire thought, and create ripples across cultures. Dive into our handpicked selections and join a global community of readers who swim in the same current of curiosity and wonder.',
      badge: 'Book Clubs'
    },
    internationalEditions: {
      title: 'International Editions',
      description: 'Great stories know no borders. Through our International Editions, Sharks Book Publishers ensures that powerful voices travel across oceans and languages.\n\nFrom translations to special editions for global markets, we make sure every masterpiece has the chance to be read everywhere, by everyone.',
      badge: 'Our Mission'
    }
  };

  const currentContent = contentData[activeTab as keyof typeof contentData];

  // Get the appropriate image for each tab
  const getTabImage = () => {
    switch(activeTab) {
      case 'awardWinners':
        return imgAwardWinning;
      case 'comingSoon':
        return imgComingSoon;
      case 'bookClubPicks':
        return imgBookClubPicks;
      case 'internationalEditions':
        return imgInternationalEditions;
      default:
        return imgAwardWinning;
    }
  };

  // Animation Variants
  const personWipeUpVariants: Variants = {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const scrollFadeInVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
  };
  
  const tabContentVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <div ref={ref} className="w-full bg-white flex justify-center -mb-16 lg:-mb-24">
        <div className={`relative w-full max-w-[1920px] overflow-hidden select-none ${useCustomContent ? 'min-h-[800px] pt-20 pb-0 lg:pt-20 lg:pb-0' : 'min-h-[900px] lg:min-h-[1200px] pt-16 pb-0 lg:pt-20 lg:pb-0'}`}>
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white opacity-100" />
          <Image 
            src="/images/book-editing/services-bg.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-100" 
            style={{ transform: 'scaleY(-1)' }}
            priority
          />
        </div>

        <div className={`relative z-10 w-full px-5 lg:px-20 ${useCustomContent ? 'h-full flex items-center' : 'h-full'}`}>
          {!useCustomContent && (
            <nav className="relative z-30 w-full flex justify-center pt-3 lg:pt-6">
              <div className="flex items-center gap-8 lg:gap-16 overflow-x-auto border-b-2 border-[#79bfcd] pb-4 lg:pb-6 max-w-fit">
                {Object.keys(contentData).map((tab) => (
                  <div 
                    key={tab}
                    className={`relative ${
                      activeTab === tab ? 'border-b-2 border-[#063f4a] pb-4 lg:pb-6 -mb-4 lg:-mb-6' : 'border-b-2 border-transparent pb-4 lg:pb-6 -mb-4 lg:-mb-6'
                    }`}
                  >
                    <span 
                      onClick={() => setActiveTab(tab)}
                      className={`text-lg lg:text-[32px] transition-colors duration-300 cursor-pointer hover:opacity-80 inline-block ${
                        activeTab === tab ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                      }`} 
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                    >
                      {contentData[tab as keyof typeof contentData].title}
                    </span>
                  </div>
                ))}
              </div>
            </nav>
          )}

          <div className={`relative w-full ${useCustomContent ? 'h-full' : 'h-auto lg:h-auto lg:min-h-[800px]'}`}>
              {/* Left Text Content */}
              <motion.div 
                className={`${useCustomContent ? 'relative w-full lg:w-[585px] z-20' : 'relative lg:absolute top-0 lg:top-[5%] left-0 w-full lg:w-[585px] z-20 md:mb-8 lg:mb-0'}`}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={scrollFadeInVariants}
              >
                {useCustomContent ? (
                  <div>
                    <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2420] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {customTitle}
                    </h1>
                    <p className="mt-6 lg:mt-8 text-base lg:text-[20px] text-[#333333] leading-6 lg:leading-[32px] text-justify whitespace-pre-line" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        {customDescription}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={tabContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className="inline-flex items-center gap-2 bg-[#95e5f3] text-[#2c2420] px-3 lg:px-5 py-2 lg:py-2.5 rounded-full mb-6 lg:mb-8 mt-4 lg:mt-0">
                          <span className="font-medium text-sm lg:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>{currentContent.badge}</span>
                      </div>
                      <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2420] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {currentContent.title}
                      </h1>
                      {'description' in currentContent ? (
                        <p className="mt-6 lg:mt-8 text-base lg:text-[20px] text-[#333333] leading-6 lg:leading-[32px] text-justify whitespace-pre-line" style={{ fontFamily: "'Barlow', sans-serif" }}>
                          {currentContent.description}
                        </p>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                )}
                
                 {/* Buttons */}
                 <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-8 lg:mt-12">
                   <button 
                      className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
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
                       <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Get Started</span>
                       <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                       </span>
                       <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                   </button>
                    <button className="flex items-center justify-between w-[170px] h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                      <span className="pl-5 text-[#063f4a] font-bold text-xl" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                     <div className="w-[40px] h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                         <Image src={imgChatCircleDots} alt="chat icon" width={24} height={24} />
                     </div>
                   </button>
                 </div>
              </motion.div>

              {/* Right Image Collage */}
              <div className={`${useCustomContent ? 'relative lg:absolute right-0 lg:right-[-5%] top-0 w-full lg:w-[60%] h-[400px] lg:h-[100%] z-10 mt-2 lg:mt-0' : 'relative lg:absolute right-0 lg:right-[-10%] top-0 lg:top-[-10%] w-full lg:w-[65%] h-[400px] lg:h-[120%] z-10 mt-2 lg:mt-0'}`}>
                <motion.div 
                  key={activeTab}
                  className="relative w-full h-full" 
                  style={{ maskImage: `url('${imgWomanMask}')`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                  initial="hidden"
                  animate={controls}
                  variants={personWipeUpVariants}
                >
                  {activeTab === 'awardWinners' && (
                    <div className="absolute w-[160%] h-[80%] -top-[4%] right-[5%] z-0 animate-shark-lean">
                        <Image 
                          src={imgSharkUnderwater} 
                          alt="Shark" 
                          fill 
                          className="object-contain transform scale-x-[1]" 
                        />
                    </div>
                  )}
                  <div className="absolute left-0 right-0 bottom-0 z-20 flex items-center justify-center animate-float" style={{ top: '-20%' }}>
                      <div className="relative w-[60%] h-[60%]">
                        <Image 
                          src={getTabImage()} 
                          alt={currentContent.title} 
                          fill
                          className="object-contain" 
                        />
                      </div>
                  </div>
                  <div
                    className="absolute w-[60%] top-[45%] right-[22%] z-10 animate-hand-pivot"
                    style={{
                      transformOrigin: '100% 50%', // right edge as pivot
                    }}
                  >
                    <div className="relative w-full min-h-[300px] lg:min-h-[500px]">
                      <Image 
                        src={imgHand1} 
                        alt="Hand" 
                        fill
                        className="object-contain" 
                        priority
                        sizes="(max-width: 768px) 60vw, 40vw"
                        quality={90}
                        loading="eager"
                      />
                    </div>
                  </div>
                   <style jsx global>{`
                       @keyframes float { 
                         0%, 100% { transform: translateY(0px); } 
                         50% { transform: translateY(15px); } 
                       }
                      @keyframes handPivotBounce {
                        0% { transform: rotate(0deg); }
                        25% { transform: rotate(-3deg); }
                        50% { transform: rotate(0deg); }
                        75% { transform: rotate(3deg); }
                        100% { transform: rotate(0deg); }
                      }
                      .animate-float {
                        animation: float 3s ease-in-out infinite;
                      }
                      .animate-hand-pivot {
                        animation: handPivotBounce 4s linear infinite;
                      }
                  `}</style>
                </motion.div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

