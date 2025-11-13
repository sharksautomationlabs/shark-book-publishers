'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleVideoEvents } from '../utils/videoUtils';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Hamburger Menu Icon for Mobile
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300">
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
const imgBooks = "/images/books.webp";
const imgBooks1 = "/images/books1.webp";
const img72 = "/images/book-hand.png";
const imgTrustpilot = "/images/trust-pilot.jpg";
const imgBark = "/images/bark1.jpg";

interface HeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
  topNavText?: string;
}

export default function Header({ 
  heroTitle = "Assured Sales & Publishing in 24 Hours or We'll Work For Free!",
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
      <div className="relative w-full max-w-[1920px] h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-auto lg:aspect-[1920/1080] overflow-hidden select-none">
        
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

          <header className="absolute top-0 left-0 w-full z-[99999] px-4 sm:px-6 md:px-8 lg:px-20">
            <div
              className="h-[40px] w-full bg-cover bg-center rounded-b-2xl hidden lg:flex items-center justify-end px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span> (469) 452-7618</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>contact@sharksbookpublishers.com</span>
                </a>
              </div>
            </div>

            <div className="-mt-2 lg:-mt-3 flex items-center justify-between">
                <div className="w-[130px] h-[95px] sm:w-[180px] sm:h-[130px] md:w-[220px] md:h-[165px] lg:w-[260px] lg:h-[195px] relative fade-in -ml-1 lg:-ml-1">
                    <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
                </div>
                <div className="hidden lg:flex w-[850px] h-[95px] bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-end px-9 gap-7 border-2 border-white">
                    <div className="flex items-center gap-5 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        <Link href="/" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Home</Link>
                        <Link href="/about" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>About Us</Link>
                        <Link href="/testimonials" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Testimonials</Link>
                        <Link href="/books" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Books</Link>
                        <Link href="/services" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Services</Link>
                        <Link href="/authors" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Authors</Link>
                        <Link href="/contact" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Contact</Link>
                    </div>
                     <button 
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            if ((window as any).Calendly) {
                              (window as any).Calendly.initPopupWidget({
                                url: 'https://calendly.com/contact-sharksbookpublishers/30min',
                                onEventScheduled: function(e: any) {
                                  window.location.href = '/thank-you';
                                }
                              });
                            } else {
                              // Fallback: open Calendly in new tab if script not loaded
                              window.open('https://calendly.com/contact-sharksbookpublishers/30min', '_blank');
                            }
                          }
                        }}
                        className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
                        style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
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
            <div className={`absolute top-0 right-0 h-full w-[85%] sm:w-[75%] md:w-[65%] max-w-sm bg-[#052126] shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-white/20">
                  <div className="w-[100px] h-[75px] sm:w-[110px] sm:h-[82px] md:w-[120px] md:h-[90px] relative -ml-[8px] sm:-ml-[12px] md:-ml-[16px]">
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
                <div className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border-b border-white/20">
                  <div className="space-y-2">
                    <a 
                      href="tel:4694807938" 
                      className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004908} alt="phone" width={16} height={16} className="sm:w-4 sm:h-4" />
                      <span className="break-all">(469) 452-7618</span>
                    </a>
                    <a 
                      href="mailto:info@ecomsharkss.com" 
                      className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004909} alt="email" width={16} height={16} className="sm:w-4 sm:h-4" />
                      <span className="break-all">contact@sharksbookpublishers.com</span>
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-4 overflow-y-auto">
                  <nav className="space-y-2 sm:space-y-3">
                    <Link 
                      href="/" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      href="/about" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/testimonials" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link 
                      href="/books" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Books
                    </Link>
                    <Link 
                      href="/services" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Services
                    </Link>
                    <Link 
                      href="/authors" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Authors
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block text-white text-sm sm:text-base font-medium hover:text-[#35c4dd] transition-colors py-1.5 sm:py-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-t border-white/20 space-y-2 sm:space-y-3">
                  <button 
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      if (typeof window !== 'undefined') {
                        if ((window as any).Calendly) {
                          (window as any).Calendly.initPopupWidget({
                            url: 'https://calendly.com/contact-sharksbookpublishers/30min',
                            onEventScheduled: function(e: any) {
                              window.location.href = '/thank-you';
                            }
                          });
                        } else {
                          // Fallback: open Calendly in new tab if script not loaded
                          window.open('https://calendly.com/contact-sharksbookpublishers/30min', '_blank');
                        }
                      }
                    }}
                    className="group flex items-center justify-between w-full sm:w-[170px] md:w-[180px] h-[44px] sm:h-[48px] md:h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-base sm:text-lg md:text-xl shadow-lg overflow-hidden relative p-2"
                    style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
                  >
                    <span className="relative z-10 pl-2 sm:pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Get Started</span>
                    <span className="bg-white rounded-full w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                    </span>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                  </button>
                  
                  <button 
                    className="w-full flex items-center justify-between h-[44px] sm:h-[48px] md:h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                        (window as any).Tawk_API.maximize();
                      }
                    }}
                  >
                    <span className="pl-2 sm:pl-3 text-[#063f4a] font-semibold text-sm sm:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Live Chat
                    </span>
                    <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={18} height={18} className="sm:w-[20px] sm:h-[20px] md:w-6 md:h-6" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Two-column layout, Desktop: Original layout */}
          <div className="lg:hidden absolute top-[12%] sm:top-[14%] left-0 right-0 px-4 z-50 mt-[50px]">
            <div className="grid grid-cols-2 gap-2 items-start">
              {/* Left Column: Text */}
              <div className="col-span-1 pt-4 sm:pt-6">
                <h1 className="text-white text-[18px] sm:text-[20px] leading-[1.2] sm:leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
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
                    // Format title in 3 lines: "Assured Sales & Publishing" / "in 24 Hours or We'll Work" / "For Free!"
                    if (heroTitle.includes('Assured Sales & Publishing') && heroTitle.includes('24 Hours') && heroTitle.includes('For Free')) {
                      return <>
                        Assured Sales & Publishing<br />
                        in <span className="text-[#35c4dd] font-bold">24 Hours</span> or We'll Work<br />
                        For <span className="text-[#35c4dd] font-bold">Free</span>!
                      </>;
                    } else if (heroTitle.includes('Assured Sales & Publishing') && heroTitle.includes('24 hours') && heroTitle.includes('For free')) {
                      return <>
                        Assured Sales & Publishing<br />
                        in <span className="text-[#35c4dd] font-bold">24 hours</span> or We'll Work<br />
                        For <span className="text-[#35c4dd] font-bold">free</span>!
                      </>;
                    } else if (heroTitle.includes('24 Hours')) {
                      const before24 = heroTitle.split('24 Hours')[0];
                      const after24 = heroTitle.split('24 Hours')[1];
                      // Check if "Free" is in the remaining text
                      if (after24.includes(' For Free')) {
                        const beforeForFree = after24.split(' For Free')[0];
                        const afterFree = after24.split(' For Free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                      } else if (after24.includes(' For free')) {
                        const beforeForFree = after24.split(' For free')[0];
                        const afterFree = after24.split(' For free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                      } else if (after24.includes('Free')) {
                        const beforeFree = after24.split('Free')[0];
                        const afterFree = after24.split('Free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                      } else if (after24.includes('free')) {
                        const beforeFree = after24.split('free')[0];
                        const afterFree = after24.split('free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                      }
                      return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{after24}</>;
                    } else if (heroTitle.includes('24 hours')) {
                      const before24 = heroTitle.split('24 hours')[0];
                      const after24 = heroTitle.split('24 hours')[1];
                      if (after24.includes(' For Free')) {
                        const beforeForFree = after24.split(' For Free')[0];
                        const afterFree = after24.split(' For Free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                      } else if (after24.includes(' For free')) {
                        const beforeForFree = after24.split(' For free')[0];
                        const afterFree = after24.split(' For free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                      } else if (after24.includes('Free')) {
                        const beforeFree = after24.split('Free')[0];
                        const afterFree = after24.split('Free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                      } else if (after24.includes('free')) {
                        const beforeFree = after24.split('free')[0];
                        const afterFree = after24.split('free')[1];
                        return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                      }
                      return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{after24}</>;
                    } else if (heroTitle.includes(' For Free')) {
                      const parts = heroTitle.split(' For Free');
                      return <>{parts[0]}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{parts[1]}</>;
                    } else if (heroTitle.includes(' For free')) {
                      const parts = heroTitle.split(' For free');
                      return <>{parts[0]}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{parts[1]}</>;
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
                <div className="mt-2 sm:mt-3">
                  <Link 
                    href="/contact"
                    className="group flex items-center justify-between w-full h-[32px] sm:h-[36px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-[11px] sm:text-xs shadow-lg overflow-hidden relative p-1 sm:p-1.5"
                  >
                    <span className="relative z-10 pl-1.5 sm:pl-2 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Publish My Book</span>
                    <span className="bg-white rounded-full w-[14px] sm:w-[16px] h-[14px] sm:h-[16px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-1">
                    </span>
                    <div className="absolute right-1 sm:right-1.5 top-1/2 -translate-y-1/2 w-6 sm:w-7 h-6 sm:h-7 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                  </Link>
                </div>
              </div>
              {/* Right Column: Hand and Book Images */}
              <div className="col-span-1 relative h-full">
                <div className="absolute top-0 right-0 w-full h-[200px]">
                  <div className="absolute top-[12%] right-[45%] w-[35%] h-auto z-50 animate-float">
                    <Image src={imgBooks} alt="Books" width={260} height={260} className="object-contain" />
                  </div>
                  <div className="absolute top-[60%] right-[45%] w-[25%] h-auto z-50 animate-float-delayed">
                    <Image src={imgBooks1} alt="Books" width={110} height={110} className="object-contain" />
                  </div>
                  <div className="absolute top-8 -right-4 w-[90%] h-auto z-40 logo-fade-in-walmart">
                    <Image src={img72} alt="Book Hand" width={620} height={620} objectFit="contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden lg:block absolute top-[220px] xl:top-[240px] left-20 w-[781px] z-50 slide-in-left">
            
            <h1 className="text-white text-[70px] xl:text-[75px] leading-[1.1] pt-0 -mt-[10px]" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
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
                // Format title in 3 lines: "Assured Sales & Publishing" / "in 24 Hours or We'll Work" / "For Free!"
                if (heroTitle.includes('Assured Sales & Publishing') && heroTitle.includes('24 Hours') && heroTitle.includes('For Free')) {
                  return <>
                    Assured Sales & Publishing<br />
                    in <span className="text-[#35c4dd] font-bold">24 Hours</span> or We'll Work<br />
                    For <span className="text-[#35c4dd] font-bold">Free</span>!
                  </>;
                } else if (heroTitle.includes('Assured Sales & Publishing') && heroTitle.includes('24 hours') && heroTitle.includes('For free')) {
                  return <>
                    Assured Sales & Publishing<br />
                    in <span className="text-[#35c4dd] font-bold">24 hours</span> or We'll Work<br />
                    For <span className="text-[#35c4dd] font-bold">free</span>!
                  </>;
                } else if (heroTitle.includes('24 Hours')) {
                  const before24 = heroTitle.split('24 Hours')[0];
                  const after24 = heroTitle.split('24 Hours')[1];
                  // Check if "Free" is in the remaining text
                  if (after24.includes(' For Free')) {
                    const beforeForFree = after24.split(' For Free')[0];
                    const afterFree = after24.split(' For Free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after24.includes(' For free')) {
                    const beforeForFree = after24.split(' For free')[0];
                    const afterFree = after24.split(' For free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  } else if (after24.includes('Free')) {
                    const beforeFree = after24.split('Free')[0];
                    const afterFree = after24.split('Free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after24.includes('free')) {
                    const beforeFree = after24.split('free')[0];
                    const afterFree = after24.split('free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  }
                  return <>{before24}<span className="text-[#35c4dd] font-bold">24 Hours</span>{after24}</>;
                } else if (heroTitle.includes('24 hours')) {
                  const before24 = heroTitle.split('24 hours')[0];
                  const after24 = heroTitle.split('24 hours')[1];
                  if (after24.includes(' For Free')) {
                    const beforeForFree = after24.split(' For Free')[0];
                    const afterFree = after24.split(' For Free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after24.includes(' For free')) {
                    const beforeForFree = after24.split(' For free')[0];
                    const afterFree = after24.split(' For free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeForFree}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  } else if (after24.includes('Free')) {
                    const beforeFree = after24.split('Free')[0];
                    const afterFree = after24.split('Free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">Free</span>{afterFree}</>;
                  } else if (after24.includes('free')) {
                    const beforeFree = after24.split('free')[0];
                    const afterFree = after24.split('free')[1];
                    return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{beforeFree}<span className="text-[#35c4dd] font-bold">free</span>{afterFree}</>;
                  }
                  return <>{before24}<span className="text-[#35c4dd] font-bold">24 hours</span>{after24}</>;
                } else if (heroTitle.includes(' For Free')) {
                  const parts = heroTitle.split(' For Free');
                  return <>{parts[0]}<br /> For <span className="text-[#35c4dd] font-bold">Free</span>{parts[1]}</>;
                } else if (heroTitle.includes(' For free')) {
                  const parts = heroTitle.split(' For free');
                  return <>{parts[0]}<br /> For <span className="text-[#35c4dd] font-bold">free</span>{parts[1]}</>;
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
             <p className="hidden lg:block mt-[25px] text-white text-[16px] xl:text-[18px] leading-[26px] xl:leading-[28px] max-w-[685px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
               Focus on your idea while we take care of writing, editing, design and publishing, all within 24 hours.
             </p>
            <div className="flex items-center gap-4 xl:gap-6 mt-[25px]">
            <Link 
              href="/contact"
              className="group flex items-center justify-between w-[200px] xl:w-[220px] h-[48px] xl:h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-lg xl:text-xl shadow-lg overflow-hidden relative p-2"
            >
                <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Publish My Book</span>
                <span className="bg-white rounded-full w-[22px] xl:w-[24px] h-[22px] xl:h-[24px] flex items-center justify-center relative z-10">
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </Link>
              <button 
                className="flex items-center justify-between w-[160px] xl:w-[170px] h-[48px] xl:h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.maximize();
                  }
                }}
              >
                  <span className="pl-4 xl:pl-5 text-[#063f4a] font-bold text-lg xl:text-xl" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[36px] xl:w-[40px] h-[36px] xl:h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={22} height={22} className="xl:w-6 xl:h-6" />
                  </div>
              </button>
            </div>
          </div>
          
          <div className="absolute inset-0 z-30 pointer-events-none overflow-visible">
            <div 
              className="absolute top-[60%] w-[50%] h-auto lg:top-[70%] lg:w-[40%] lg:h-[45%] animate-shark-complete"
              style={sharkAnimationStyle}
            >
                <Image src={imgDangerousSharkUnderwater2Copy1} alt="Shark" width={1000} height={600} objectFit="contain" />
            </div>

            <div className="hidden lg:block">
                <div className="absolute top-[32%] right-[30%] w-[11%] h-auto z-50 animate-float">
                    <Image src={imgBooks} alt="Books" width={260} height={260} className="object-contain" />
                </div>
                <div className="absolute top-[38%] right-[38%] w-[8%] h-auto z-50 animate-float-delayed">
                    <Image src={imgBooks1} alt="Books" width={110} height={110} className="object-contain" />
                </div>
                <div className="absolute top-[25%] -right-13 w-[44%] h-auto z-40 logo-fade-in-walmart">
                    <Image src={img72} alt="Book Hand" width={620} height={620} objectFit="contain" />
                </div>
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