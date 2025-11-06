'use client';

import React from 'react';
import Image from 'next/image';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Image assets used in this component.
const imgBlueWaveShape = "/images/service-bg-vector.svg";
const imgMaskShape = "/images/service-mask.svg";

// Default Shopify images
const defaultImageGallery = [
  {
    id: 1,
    imageUrl: "/images/sopify-sale1.png",
  },
  {
    id: 2,
    imageUrl: "/images/shopify-sale2.png",
  },
  {
    id: 3,
    imageUrl: "/images/shopify-sale3.png",
  },
  {
    id: 4,
    imageUrl: "/images/shopify-sale4.png",
  },
  {
    id: 5,
    imageUrl: "/images/shopify-sale5.png",
  },
  {
    id: 6,
    imageUrl: "/images/shopify-sale6.png",
  },
];

interface ImageGalleryProps {
  images?: Array<{id: number; imageUrl: string}>;
}

export default function ImageGallery({ images }: ImageGalleryProps = {}) {
  const imageGallery = images || defaultImageGallery;
  const { videoRef, isInView } = useVideoLazyLoading();
  return (
    // This structure correctly creates the wavy top border without breaking page flow.
    <div className="relative w-full bg-white pt-16 lg:pt-32 xl:pt-48">
      
      {/* Background elements are absolutely positioned and fill the parent container. */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute inset-0 z-0">
          <Image src={imgBlueWaveShape} alt="Wavy background shape" fill className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 z-10" 
             style={{
                maskImage: `url('${imgMaskShape}')`,
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'top center',
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
      </div>

      {/* Content container flows naturally and dictates the component's height. */}
      <div className="relative z-20 container mx-auto px-5 lg:px-20 pb-16 lg:pb-24 text-white">

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8 lg:mt-16 max-w-7xl mx-auto justify-items-center">
          {imageGallery.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-0.5 lg:p-1 flex items-center justify-center service-card-flash w-full lg:w-3/5 h-64 lg:h-[28rem]">
              {/* Image Only - Centered and larger */}
              <div className="w-[99%] h-[99%] flex items-center justify-center">
                <Image 
                  src={item.imageUrl} 
                  alt="Platform logo"
                  width={1300}
                  height={1300}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
