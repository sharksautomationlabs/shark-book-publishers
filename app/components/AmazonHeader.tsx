'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleVideoEvents } from '../utils/videoUtils';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Hamburger Menu Icon for Mobile
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
        {isOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
            <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
    </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/*
  All image paths are kept exactly as provided by you.
*/
const imgImage1 = "/images/quote-logo.png";
const imgRectangle72 = "/images/header-top-bar.png";
const imgGroup1000004908 = "/images/header-phone-icon.svg";
const imgGroup1000004909 = "/images/header-email-icon.svg";
const imgDangerousSharkUnderwater2Copy1 = "/images/shark-underwater-2.png";
const imgChatCircleDots = "/images/chat-icon.svg";

interface HeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
  topNavText?: string;
}

export default function AmazonHeader({ 
  heroTitle = "Guaranteed Sales & Publishing in 72 Hours or We'll Work For Free!",
  heroSubtitle = "Keep scrolling—your path to financial freedom is just ahead. By the time you've explored 25% of this page, you'll discover the hidden gem that could change your life.",
  topNavText = "Professional Book Publishing Services"
}: HeaderProps) {
  const { videoRef, isInView } = useVideoLazyLoading();
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileNavOpen]);

  // Shark scroll speed is now faster on mobile
  const scrollMultiplierLeft = isDesktop ? 0.05 : 0.15;
  const scrollMultiplierTransform = isDesktop ? 0.2 : 0.5;

  const sharkAnimationStyle = {
    left: `${75 - (scrollPosition * scrollMultiplierLeft)}%`,
    transform: `translateX(${-scrollPosition * scrollMultiplierTransform}px)`
  };

  return (
    // MODIFIED: Removed top margin from mobile
    <div className="w-full bg-[#052126] flex justify-center">
      <div className="relative w-full max-w-[1920px] h-[45vh] lg:h-[82vh] overflow-hidden select-none">
        
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay={isInView}
            loop 
            muted 
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
            poster="/images/bi-vid.jpeg"
            {...handleVideoEvents}
          >
            <source src="/images/bi-vid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[#052126]/60 z-10" />

        <div className="relative z-20 w-full h-full">

          <header className="absolute top-0 left-0 w-full z-[99999] px-5 lg:px-20">
            <div
              className="h-[48px] w-full bg-cover bg-center rounded-b-2xl hidden lg:flex items-center justify-end px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span> +1 (469) 452-7618</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>contact@sharksbookpublishers.com</span>
                </a>
              </div>
            </div>

            <div className="mt-2 lg:mt-6 flex items-center justify-between">
                <div className="w-[200px] h-[145px] md:w-[220px] md:h-[165px] lg:w-[260px] lg:h-[195px] relative fade-in -ml-1 lg:-ml-1">
                    <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
                </div>
                <div className="hidden lg:flex w-[1080px] h-[100px] bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-end px-10 gap-8 border-2 border-white">
                    <div className="flex items-center gap-5 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        <Link href="/" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Home</Link>
                        <Link href="/about" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>About Us</Link>
                        <Link href="/amazon" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Testimonials</Link>
                        <Link href="/shopify" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Books</Link>
                        <Link href="/services" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Services</Link>
                        <Link href="/tiktok" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Authors</Link>
                        <Link href="/walmart" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>News & Events</Link>
                        <Link href="/identity" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Careers</Link>
                        <Link href="/contact" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Contact</Link>
                    </div>
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
                </div>
                <div className="lg:hidden">
                    <button 
                      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                      className="p-2"
                    >
                      <HamburgerIcon isOpen={isMobileNavOpen} />
                    </button>
                </div>
            </div>
          </header>

          {/* Mobile Navigation Panel */}
          <div className={`lg:hidden fixed inset-0 z-[999999] transition-all duration-300 ease-in-out ${
            isMobileNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileNavOpen(false)}
            />
            
            {/* Navigation Panel */}
            <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#052126] shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <div className="w-[110px] h-[82px] relative -ml-8">
                    <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
                  </div>
                  <button 
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-2 text-white hover:text-[#35c4dd] transition-colors"
                  >
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>

                {/* Top Bar Items */}
                <div className="px-6 py-3 border-b border-white/20">
                  <div className="space-y-2">
                    <a 
                      href="tel:4694807938" 
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004908} alt="phone" width={16} height={16} />
                      <span>+1 (469) 452-7618</span>
                    </a>
                    <a 
                      href="mailto:info@ecomsharkss.com" 
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004909} alt="email" width={16} height={16} />
                      <span>contact@sharksbookpublishers.com</span>
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-4">
                  <nav className="space-y-3">
                    <Link 
                      href="/" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      href="/about" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/amazon" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link 
                      href="/shopify" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Books
                    </Link>
                    <Link 
                      href="/services" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Services
                    </Link>
                    <Link 
                      href="/tiktok" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Authors
                    </Link>
                    <Link 
                      href="/walmart" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      News & Events
                    </Link>
                    <Link 
                      href="/identity" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Careers
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 border-t border-white/20 space-y-3">
                  <button 
                    className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
                    onClick={() => {
                      setIsMobileNavOpen(false);
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
                  
                  <button 
                    className="w-full flex items-center justify-between bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <span className="pl-3 text-[#063f4a] font-semibold text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Live Chat
                    </span>
                    <div className="w-[40px] h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={24} height={24} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-5 w-1/2 lg:top-[300px] lg:left-20 lg:w-[781px] lg:translate-y-0 z-50 slide-in-left">
            
            <h1 className="text-white text-3xl leading-tight pt-10 lg:text-[94px] lg:leading-[0.921] lg:pt-0" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
              {heroTitle.includes('$4,000') ? (
                <>
                  {heroTitle.split('$4,000')[0]}
                  <span className="text-[#35c4dd] font-bold">$4,000</span>
                  {heroTitle.split('$4,000')[1].includes('30') ? (
                    <>
                      {heroTitle.split('$4,000')[1].split('30')[0]}
                      <span className="text-[#35c4dd] font-bold">30</span>
                      {heroTitle.split('$4,000')[1].split('30')[1]}
                    </>
                  ) : (
                    heroTitle.split('$4,000')[1]
                  )}
                </>
              ) : (() => {
                // Handle "72 Hours" first
                if (heroTitle.includes('72 Hours')) {
                  const before72 = heroTitle.split('72 Hours')[0];
                  const after72 = heroTitle.split('72 Hours')[1];
                  // Check if "Free" is in the remaining text
                  if (after72.includes('Free')) {
                    const beforeFree = after72.split('Free')[0];
                    const afterFree = after72.split('Free')[1];
                    return <>{before72}<span className="text-[#35c4dd] font-bold">72 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after72.includes('free')) {
                    const beforeFree = after72.split('free')[0];
                    const afterFree = after72.split('free')[1];
                    return <>{before72}<span className="text-[#35c4dd] font-bold">72 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  }
                  return <>{before72}<span className="text-[#35c4dd] font-bold">72 Hours</span>{after72}</>;
                } else if (heroTitle.includes('72 hours')) {
                  const before72 = heroTitle.split('72 hours')[0];
                  const after72 = heroTitle.split('72 hours')[1];
                  if (after72.includes('Free')) {
                    const beforeFree = after72.split('Free')[0];
                    const afterFree = after72.split('Free')[1];
                    return <>{before72}<span className="text-[#35c4dd] font-bold">72 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after72.includes('free')) {
                    const beforeFree = after72.split('free')[0];
                    const afterFree = after72.split('free')[1];
                    return <>{before72}<span className="text-[#35c4dd] font-bold">72 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  }
                  return <>{before72}<span className="text-[#35c4dd] font-bold">72 hours</span>{after72}</>;
                } else if (heroTitle.includes('Free')) {
                  const parts = heroTitle.split('Free');
                  return <>{parts[0]}<span className="text-[#35c4dd] font-bold">Free</span>{parts[1]}</>;
                } else if (heroTitle.includes('free')) {
                  const parts = heroTitle.split('free');
                  return <>{parts[0]}<span className="text-[#35c4dd] font-bold">free</span>{parts[1]}</>;
                }
                return heroTitle;
              })()}
            </h1>
             <p className="hidden lg:block mt-8 text-white text-[28px] leading-[38px] max-w-[685px] font-light" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
               {heroSubtitle}
             </p>
          </div>
          
          <div className="absolute inset-0 z-30 pointer-events-none overflow-visible">
            <div 
              className="absolute top-[45%] w-[50%] h-auto lg:top-[55%] lg:w-[40%] lg:h-[45%] animate-shark-complete"
              style={sharkAnimationStyle}
            >
                <Image src={imgDangerousSharkUnderwater2Copy1} alt="Shark" width={1000} height={600} objectFit="contain" />
            </div>

          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
