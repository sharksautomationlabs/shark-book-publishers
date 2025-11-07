'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';
const imgChatCircleDots = "/images/chat-icon.svg";
/*
  Image assets are mapped from the original code for this specific component.
*/
const imgVector8 = "/images/service-bg-vector.svg";
const imgRealisticSharkOcean2 = "/images/service-mask.svg";

// Reusable ChatIcon for the button
const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const servicesData = [
  {
    title: 'New Releases',
    description: 'Fresh voices and anticipated titles, available now.',
    image: '/images/services1.png',
  },
  {
    title: 'Bestsellers',
    description: "Stories readers can't stop talking about.",
    image: '/images/services2.png',
  },
  {
    title: 'Coming Soon',
    description: "Be the first to discover tomorrow's favorites",
    image: '/images/services3.png',
  },
  {
    title: 'eBook & Audiobook Deals',
    description: 'Take your library wherever you go.',
    image: '/images/services4.png',
  },
];

export default function Services() {
  const textShadow = { textShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' };
  const { videoRef, isInView } = useVideoLazyLoading();

  return (
    // Main wrapper that centers and scales the content
    <div className="w-full bg-white flex justify-center">
      {/* Scalable container with responsive height */}
      <div className="relative w-full max-w-[1920px] h-auto py-16 lg:aspect-[1920/1080] lg:py-0 overflow-hidden select-none">
        
        {/* Background Layer 1: The Wavy Blue Shape */}
        <div className="absolute inset-0 z-0">
          <Image src={imgVector8} alt="Wavy background shape" fill className="object-cover" />
        </div>

        {/* Background Layer 2: The Masked Video */}
        <div className="absolute inset-0 z-10" 
             style={{
                maskImage: `url('${imgRealisticSharkOcean2}')`,
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
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

        {/* Content Layer */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-white pt-12 lg:pt-20 px-5 lg:px-0">
          <h1 className="text-4xl lg:text-[94px] font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
            Services
          </h1>
          
          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-6 w-full max-w-[1400px] mt-8 lg:mt-16 mx-5 lg:mx-20">
            {servicesData.map((service, index) => (
              // CARD SIZE INCREASED
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl px-4 lg:px-6 py-4 lg:py-5 border-2 border-white h-[320px] lg:h-[380px] flex flex-col items-center text-center overflow-hidden service-card-flash group transition-none">
                <h2 className="text-lg lg:text-[28px] font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {service.title}
                </h2>
                <p className="mt-2 text-sm lg:text-[16px] leading-5 lg:leading-[24px] max-w-[200px] lg:max-w-[250px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {service.description}
                </p>
                {/* Service Image */}
                <div className="relative mt-auto w-full h-[240px] lg:h-[260px] flex items-center justify-center">
                  <div className={`relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-90 ${index === 3 ? 'translate-y-10 lg:translate-y-12' : 'translate-y-6 lg:translate-y-8'}`}>
                    <Image src={service.image} alt={`${service.title} Service`} fill className="object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
           {/* CTA Buttons */}
           <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mt-8 lg:mt-16">
            <Link 
              href="/books"
              className="group flex items-center justify-between w-[220px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
            >
                <span className="relative z-10 pl-3 whitespace-nowrap" style={{ fontFamily: "'Barlow', sans-serif" }}>Order Your Book</span>
                <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
            </Link>
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
        </div>
      </div>
    </div>
  );
}