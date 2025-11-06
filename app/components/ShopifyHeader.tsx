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
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/*
  All image paths are kept exactly as provided by you.
*/
const imgImage37 = "/images/main-bg-sand.png";
const imgImage1 = "/images/quote-logo.png";
const imgRectangle72 = "/images/header-top-bar.png";
const imgGroup1000004908 = "/images/header-phone-icon.svg";
const imgGroup1000004909 = "/images/header-email-icon.svg";
const imgDangerousSharkUnderwater2Copy1 = "/images/shark-underwater-2.png";
const imgChatCircleDots = "/images/chat-icon.svg";
const img91 = "/images/tiktok-logo.png";
const img61 = "/images/amazon-logo.png";
const img72 = "/images/walmart-logo.png";
const img81 = "/images/shopify-logo.png";
const imgTrustpilot = "/images/trust-pilot.jpg";

export default function ShopifyHeader() {
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { videoRef, isInView } = useVideoLazyLoading();

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

  return (
    // Main wrapper that centers and scales the content
    <div className="w-full bg-[#052126] flex justify-center">
      {/* Scalable container with responsive height */}
      <div className="relative w-full max-w-[1920px] h-[50vh] lg:h-auto lg:aspect-[1920/1000] overflow-hidden select-none">
        
        {/* Background Video and Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay={isInView}
            loop 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster="/images/bi-vid.jpeg"
            {...handleVideoEvents}
          >
            <source src="/images/bi-vid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[#052126]/60 z-10" />

        {/* Content Layer - All positions are relative to this container */}
        <div className="relative z-20 w-full h-full">

          {/* Header Container - RESPONSIVE */}
          <header className="absolute top-0 left-0 w-full z-[99999] px-5 lg:px-20">
            {/* Top Bar - Hidden on mobile */}
            <div
              className="h-[64px] w-full bg-cover bg-center rounded-b-2xl
                         hidden lg:flex items-center justify-between px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <p className="text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                🌟 Total Commerce Control
              </p>
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span>(469) 480-7938</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>info@ecomsharkss.com</span>
                </a>
              </div>
            </div>

            {/* Navigation Section - RESPONSIVE */}
            <div className="mt-2 lg:mt-6 flex items-center justify-between">
                <div className="w-[140px] h-[100px] lg:w-[180px] lg:h-[140px] relative fade-in -ml-10 lg:-ml-12">
                    <Image src={imgImage1} alt="Ecom Sharks Logo" fill className="object-contain" />
                </div>
                <div className="hidden lg:flex w-[950px] h-[90px] bg-white/20 backdrop-blur-sm 
                            rounded-2xl items-center justify-end px-10 gap-8 border-2 border-white">
                    <div className="flex items-center gap-6 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        <Link href="/" className="hover:text-[#35c4dd]" style={textShadow}>Home</Link>
                        <Link href="/about" className="hover:text-[#35c4dd]" style={textShadow}>About Us</Link>
                        <Link href="/amazon" className="hover:text-[#35c4dd]" style={textShadow}>Amazon</Link>
                        <Link href="/shopify" className="hover:text-[#35c4dd]" style={textShadow}>Shopify</Link>
                        <Link href="/tiktok" className="hover:text-[#35c4dd]" style={textShadow}>Tiktok</Link>
                        <Link href="/walmart" className="hover:text-[#35c4dd]" style={textShadow}>Walmart</Link>
                        <Link href="/identity" className="hover:text-[#35c4dd]" style={textShadow}>Identity</Link>
                        <Link href="/contact" className="hover:text-[#35c4dd]" style={textShadow}>Contact</Link>
                    </div>
                     <button 
                        className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-1.5 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative"
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
                        <span className="relative z-10">Get Started</span>
                        <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                            <ArrowIcon />
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
                  <div className="w-[100px] h-[75px] relative -ml-8">
                    <Image src={imgImage1} alt="Ecom Sharks Logo" fill className="object-contain" />
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
                  <p className="text-white text-xs font-medium mb-3" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    🌟 Total Commerce Control
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:4694807938" 
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004908} alt="phone" width={16} height={16} />
                      <span>(469) 480-7938</span>
                    </a>
                    <a 
                      href="mailto:info@ecomsharkss.com" 
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-[#35c4dd] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <Image src={imgGroup1000004909} alt="email" width={16} height={16} />
                      <span>info@ecomsharkss.com</span>
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
                      Amazon
                    </Link>
                    <Link 
                      href="/shopify" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Shopify
                    </Link>
                    <Link 
                      href="/tiktok" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      TikTok
                    </Link>
                    <Link 
                      href="/walmart" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Walmart
                    </Link>
                    <Link 
                      href="/identity" 
                      className="block text-white text-base font-medium hover:text-[#35c4dd] transition-colors py-1"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Identity
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
                    className="group w-full flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2 px-4 rounded-full text-base shadow-lg overflow-hidden relative"
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
                    <span className="relative z-10">Get Started</span>
                    <span className="bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center relative z-10">
                      <ArrowIcon />
                    </span>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
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

          {/* Hero Text Content - RESPONSIVE FOR SHOPIFY */}
          <div className="absolute top-1/2 -translate-y-1/2 left-5 w-1/2 lg:top-[300px] lg:left-20 lg:w-[781px] lg:translate-y-0 z-50 slide-in-left">
            <h1 className="text-white text-3xl leading-tight pt-10 lg:text-[94px] lg:leading-[0.921] lg:pt-0" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
              We Always Give The Best Shopify Store Service To You
            </h1>
            <p className="hidden lg:block mt-6 text-white text-[24px] leading-[38px] max-w-[685px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, ...textShadow }}>
              Boost your Digital Presence on Shopify with ECOM SHARKS
            </p>
            <div className="hidden lg:flex items-center gap-6 mt-12">
            <a 
              href="tel:4694807938"
              className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative"
            >
                <span className="relative z-10">Contact Us</span>
                <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                  <ArrowIcon />
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </a>

              <button className="flex items-center justify-between w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
            <div className="hidden lg:block mt-3 ml-2">
              <a href="https://www.trustpilot.com/review/ecomsharkss.com" target="_blank" rel="noopener noreferrer">
                <Image src={imgTrustpilot} alt="Trustpilot" width={80} height={24} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
            </div>
             <div className="mt-8 lg:hidden">
                <a 
                  href="tel:4694807938"
                  className="bg-[#35c4dd] text-[#063f4a] font-semibold py-2.5 px-2 rounded-full text-base w-[160px] flex items-center justify-between shadow-lg"
                >
                    <span className="pl-3">Contact Us</span>
                    <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                       <ArrowIcon />
                    </span>
                </a>
                <div className="mt-4 ml-1">
                  <a href="https://www.trustpilot.com/review/ecomsharkss.com" target="_blank" rel="noopener noreferrer">
                    <Image src={imgTrustpilot} alt="Trustpilot" width={50} height={15} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                  </a>
                </div>
            </div>
          </div>
          
          {/* Visual Elements Layer - RESPONSIVE */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Shark Animation - Responsive */}
            <div 
              className="absolute top-[60%] w-[65%] h-auto lg:top-[55%] lg:w-[52%] lg:h-[60%] animate-shark-complete"
              style={{ 
                left: `${75 - (scrollPosition * (isDesktop ? 0.05 : 0.15))}%`,
                transform: `translateX(${-scrollPosition * (isDesktop ? 0.2 : 0.5)}px)`
              }}
            >
                <Image src={imgDangerousSharkUnderwater2Copy1} alt="Shark" width={1000} height={600} objectFit="contain" className="transform -scale-x-100" />
            </div>

            {/* Mobile Logo Layout */}
            <div className="lg:hidden absolute top-1/2 right-2 -translate-y-1/2 w-[45%] h-[70%]">
                <div className="absolute top-[24%] right-[20%] w-[65%] h-auto z-40 logo-fade-in-shopify">
                    <Image src={img81} alt="Shopify Logo" width={350} height={350} objectFit="contain" />
                </div>
            </div>

            {/* Desktop Logo Layout */}
            <div className="hidden lg:block">
            <div className="absolute top-[44%] right-[20%] w-[16%] h-auto z-40 logo-fade-in-shopify">
                <Image src={img81} alt="Shopify Logo" width={310} height={310} objectFit="contain" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
