'use client';

import Image from 'next/image';
import Link from 'next/link';
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
const imgBooks = "/images/books.webp";
const imgBooks1 = "/images/books1.webp";
const img72 = "/images/book-hand.png";
const imgTrustpilot = "/images/trust-pilot.jpg";
const imgBark = "/images/bark1.jpg";
const imgChatCircleDots = "/images/chat-icon.svg";

interface ThankYouHeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function ThankYouHeader({ 
  heroTitle = "You're In! Let's Get Ready for Your Call",
  heroSubtitle = "Congratulations! Your call is booked. This is the first step toward publishing your book and sharing your story with the world. Before we talk, I have two quick videos below that will answer all of your questions and make our call as productive as possible."
}: ThankYouHeaderProps) {
  const { videoRef, isInView } = useVideoLazyLoading();
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };


  return (
    // MODIFIED: Removed top margin from mobile
    <div className="w-full bg-[#052126] flex justify-center">
      <div className="relative w-full max-w-[1920px] h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-auto lg:aspect-[1920/1160] overflow-hidden select-none">
        
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
              className="h-[48px] w-full bg-cover bg-center rounded-b-2xl hidden lg:flex items-center justify-end px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span> +1 (469) 452-7618</span>
                </a>
                <a href="mailto:contact@sharksbookpublishers.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>contact@sharksbookpublishers.com</span>
                </a>
              </div>
            </div>

            <div className="mt-1 sm:mt-2 md:mt-4 lg:mt-6 flex items-center justify-between">
                <div className="w-[130px] h-[95px] sm:w-[180px] sm:h-[130px] md:w-[220px] md:h-[165px] lg:w-[260px] lg:h-[195px] relative fade-in -ml-1 lg:-ml-1">
                    <Image src={imgImage1} alt="Ecom Sharks Logo" fill className="object-contain" priority />
                </div>
            </div>
          </header>


          {/* Mobile: Two-column layout, Desktop: Original layout */}
          <div className="lg:hidden absolute top-[20%] left-0 right-0 px-4 z-50">
            <div className="grid grid-cols-2 gap-2 items-start">
              {/* Left Column: Text */}
              <div className="col-span-1 pt-8">
                <h1 className="text-white text-xl leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
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
                  ) : (
                    heroTitle
                  )}
                </h1>
                <div className="mt-3">
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).Calendly) {
                        (window as any).Calendly.initPopupWidget({
                          url: 'https://calendly.com/contact-sharksbookpublishers/30min',
                          onEventScheduled: function(e: any) {
                            window.location.href = '/thank-you';
                          }
                        });
                      }
                    }}
                    className="group flex items-center justify-between w-full h-[36px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xs shadow-lg overflow-hidden relative p-1.5"
                  >
                    <span className="relative z-10 pl-2 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Book Now</span>
                    <span className="bg-white rounded-full w-[16px] h-[16px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-1">
                    </span>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                  </button>
                  <div className="flex items-center gap-1.5 mt-2">
                    <a href="https://www.trustpilot.com/review/sharksbookpublishers.com" target="_blank" rel="noopener noreferrer">
                      <Image src={imgTrustpilot} alt="Trustpilot" width={40} height={12} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://www.bark.com/en/us/company/sharks-book-publishers-/bvbAb3/?review_source=share_link" target="_blank" rel="noopener noreferrer">
                      <Image src={imgBark} alt="Bark" width={28} height={8} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                    </a>
                  </div>
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
          <div className="hidden lg:block absolute top-[300px] left-20 w-[781px] z-50 slide-in-left">
            
            <h1 className="text-white text-[94px] leading-[0.921] pt-0" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
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
              ) : (
                heroTitle
              )}
            </h1>
             <p className="mt-8 text-white text-[24px] leading-[38px] max-w-[685px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, ...textShadow }}>
               {heroSubtitle}
             </p>
             <p className="mt-6 text-white text-[18px] leading-[28px] max-w-[685px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
               Ready to publish your book? Book a meeting with one of our senior publishing consultants today.
             </p>
            <div className="flex items-center gap-6 mt-12">
            <button 
              className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({
                    url: 'https://calendly.com/contact-sharksbookpublishers/30min',
                    onEventScheduled: function(e: any) {
                      // Redirect to thank you page when appointment is scheduled
                      window.location.href = '/thank-you';
                    }
                  });
                }
              }}
              style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
            >
                <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Book Now</span>
                <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>
              <button 
                className="flex items-center justify-between w-[170px] h-[52px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.maximize();
                  }
                }}
              >
                  <span className="pl-5 text-[#063f4a] font-bold text-xl" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[40px] h-[40px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={24} height={24} />
                  </div>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3 ml-2">
              <a href="https://www.trustpilot.com/review/sharksbookpublishers.com" target="_blank" rel="noopener noreferrer">
                <Image src={imgTrustpilot} alt="Trustpilot" width={80} height={24} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://www.bark.com/en/us/company/sharks-book-publishers-/bvbAb3/?review_source=share_link" target="_blank" rel="noopener noreferrer">
                <Image src={imgBark} alt="Bark" width={50} height={15} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
          
           <div className="absolute inset-0 z-30 pointer-events-none overflow-visible">
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
    </div>
  );
}
