'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

// Platform logos from the platform-logos folder (10-26)
const platformLogos = [
  '/images/platform-logos/10.png',
  '/images/platform-logos/11.png',
  '/images/platform-logos/12.png',
  '/images/platform-logos/13.png',
  '/images/platform-logos/14.png',
  '/images/platform-logos/15.png',
  '/images/platform-logos/16.png',
  '/images/platform-logos/17.png',
  '/images/platform-logos/18.png',
  '/images/platform-logos/19.png',
  '/images/platform-logos/20.png',
  '/images/platform-logos/21.png',
  '/images/platform-logos/22.png',
  '/images/platform-logos/23.png',
  '/images/platform-logos/24.png',
  '/images/platform-logos/25.png',
  '/images/platform-logos/26.png',
];

export default function TickerTape() {
  // Duplicate the logos array to create seamless infinite scroll
  const duplicatedLogos = [...platformLogos, ...platformLogos];

  return (
    <div className="w-full bg-white py-0 overflow-x-hidden overflow-y-hidden border-y border-gray-200" style={{ height: 'fit-content', maxHeight: '140px' }}>
      <Marquee
        speed={50}
        gradient={true}
        gradientColor="rgb(255, 255, 255)"
        gradientWidth={100}
        pauseOnHover={false}
        className="flex items-center overflow-y-hidden"
        style={{ overflowY: 'hidden' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex items-center justify-center mx-8 lg:mx-12 h-14 lg:h-20 w-auto group overflow-hidden"
            style={{ height: '100%', maxHeight: '140px' }}
          >
            <div className="relative w-[180px] h-[120px] lg:w-[220px] lg:h-[150px] overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <Image
                src={logo}
                alt={`Platform logo ${index + 1}`}
                fill
                className="object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

