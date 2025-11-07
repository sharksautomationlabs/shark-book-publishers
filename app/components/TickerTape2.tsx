'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

// Trust logos from the trust folder (1-9)
const trustLogos = [
  '/images/trust/1.png',
  '/images/trust/2.png',
  '/images/trust/3.png',
  '/images/trust/4.png',
  '/images/trust/5.png',
  '/images/trust/6.png',
  '/images/trust/7.png',
  '/images/trust/8.png',
  '/images/trust/9.png',
];

export default function TickerTape2() {
  // Duplicate the logos array to create seamless infinite scroll
  const duplicatedLogos = [...trustLogos, ...trustLogos];

  return (
    <div className="w-full bg-[#35c4dd] py-0 overflow-x-hidden overflow-y-hidden border-y border-gray-200" style={{ height: 'fit-content', maxHeight: '140px' }}>
      <Marquee
        speed={50}
        gradient={true}
        gradientColor="rgb(53, 196, 221)"
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
            <div className="relative w-[180px] h-[120px] lg:w-[220px] lg:h-[150px] overflow-hidden">
              <Image
                src={logo}
                alt={`Trust logo ${index + 1}`}
                fill
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

