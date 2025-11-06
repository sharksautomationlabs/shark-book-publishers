'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import Image from 'next/image';

// --- 1. TYPES AND DATA ---

type Card = {
  id: number;
  title: string;
  desc: string;
  img: string; // Path to the main transparent PNG image for the card
};

const cards: Card[] = [
  {
    id: 1,
    title: 'Announcements',
    desc: 'New titles, bestseller achievements, and award nominations.',
    img: '/images/news-1.png', // *Replace with your actual TRANSPARENT PNG path*
  },
  {
    id: 2,
    title: 'Events',
    desc: 'Book launches, author signings, literary festivals, and virtual readings.',
    img: '/images/news-2.png', // *Replace with your actual TRANSPARENT PNG path*
  },
  {
    id: 3,
    title: 'Blog',
    desc: 'Insights into writing, publishing trends, and behind-the-scenes stories.',
    img: '/images/news-3.png', // *Replace with your actual TRANSPARENT PNG path*
  },
  {
    id: 4,
    title: 'Newsletter',
    desc: 'New titles, bestseller achievements, and award nominations.',
    img: '/images/news-4.png', // *Replace with your actual TRANSPARENT PNG path*
  },
];

// --- 2. ANIMATION VARIANTS ---

const leftCardVariants = (dir: 'up' | 'down'): Variants => ({
  hidden: { opacity: 0.76, x: -200, transition: { duration: 0.6, ease: 'easeOut' } },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0.76, x: -200, transition: { duration: 0.6, ease: 'easeOut' } },
});

const rightCardVariants = (dir: 'up' | 'down'): Variants => ({
  hidden: { opacity: 0.76, x: 200, transition: { duration: 0.6, ease: 'easeOut' } },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0.76, x: 200, transition: { duration: 0.6, ease: 'easeOut' } },
});

// --- 3. NEWS CARD COMPONENT (MODIFIED) ---

interface NewsCardProps {
  card: Card;
  index: number;
  scrollDirection: 'up' | 'down';
}

const NewsCard: React.FC<NewsCardProps> = ({
  card,
  index,
  scrollDirection,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const wasInView = useInView(ref, { amount: 0, once: false });

  const isLeft = index % 2 === 0; // Card at index 0 and 2
  const variants = isLeft
    ? leftCardVariants(scrollDirection)
    : rightCardVariants(scrollDirection);

  const [animation, setAnimation] = useState<'hidden' | 'show' | 'exit'>('hidden');

  useEffect(() => {
    if (isInView) {
      setAnimation('show');
    } else if (!isInView && scrollDirection === 'up') {
      setAnimation('exit');
    } else if (!wasInView && scrollDirection === 'down') {
      setAnimation('hidden');
    }
  }, [isInView, scrollDirection, wasInView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animation}
      // 1. Box height ko chota kiya (220px)
      // 2. overflow-visible add kiya taake image bahar nikal sake
      className={`relative w-full h-[240px] md:h-[260px] will-change-transform overflow-visible ${index >= 2 ? 'mt-8 md:mt-12' : ''}`}
    >
      {/* A. Main Image (Person/People) */}
      <div className="absolute right-0 bottom-0 w-[70%] md:w-[60%] h-full z-20 pointer-events-none">
        <Image
          src={card.img} // *This MUST be a transparent PNG*
          alt={card.title}
          width={450}
          height={450}
          // 3. Image height ko 140% kiya taake woh upar se bahar nikle (bottom-0 se anchored)
          className="absolute bottom-0 right-0 w-auto h-[185%] md:h-[195%] object-contain"
          priority={index < 2}
        />
      </div>

      {/* B. Blue Background Card (Text, Button, Shark) */}
      {/* Height h-full rahegi, jo parent ke 220px ke barabar hai */}
       <div 
         className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl"
         style={{
           background: 'linear-gradient(135deg, #d0f7ff 0%, #35c4dd 100%)'
         }}
       >
        
        {/* C. Shark Image (Background mein) - Faint kar diya */}
        <Image
          src="/images/shark-underwater.png" // *Replace with your actual shark image path*
          alt="Shark"
          width={300}
          height={300}
          className={`absolute top-0 w-auto h-[70%] object-contain opacity-20 z-0 ${
            isLeft ? 'right-0' : 'left-0'
          }`}
        />

         {/* D. Text aur Button Content */}
         <div className="relative z-10 flex flex-col justify-between w-full md:w-[55%] h-full p-6 md:p-8">
          <div>
            <h3 className="text-[28px] md:text-[32px] font-semibold text-[#0a0a0a] mb-2 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {card.title}
            </h3>
            <p className="text-[16px] md:text-[17px] text-[#0a0a0a] mb-5 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {card.desc}
            </p>
          </div>

          {/* E. Button - Matching Mission Section */}
          <button 
            className="group flex items-center justify-between w-[180px] h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).Calendly) {
                (window as any).Calendly.initPopupWidget({
                  url: 'https://calendly.com/ecomsharkss-info/30min',
                  onEventScheduled: function(e: any) {
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
      </div>
    </motion.div>
  );
};

// --- 4. MAIN EXPORT COMPONENT ---

export default function NewsEvents() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 5) {
        setScrollDir(y > lastY ? 'down' : 'up');
        setLastY(y);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <section className="w-full py-20 md:py-28 bg-white overflow-hidden overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        <h2 className="text-center font-['Barlow_Condensed'] text-[40px] md:text-[48px] font-semibold text-[#0a0a0a] mb-10">
          News & Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 py-10 md:py-12">
          {cards.map((c, i) => (
            <NewsCard
              key={c.id}
              card={c}
              index={i}
              scrollDirection={scrollDir}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

