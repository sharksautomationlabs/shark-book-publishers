'use client';

import React from 'react';
import { Barlow, Barlow_Condensed } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface Author {
  id: number;
  name: string;
  description: string;
  image: string;
}

const authors: Author[] = [
  {
    id: 1,
    name: 'Daniel Alston',
    description:
      "Children's Book | Published Books: 01\n\nDaniel Alston is known for his engaging and imaginative children's books, bringing stories to life for young readers.",
    image: '/images/author-img/author-1.png',
  },
  {
    id: 2,
    name: 'Ariel H. Parrott',
    description:
      'Fiction & Romance | Published Books: 03\n\nAriel H. Parrott is a passionate fiction and romance author who weaves heartfelt stories filled with emotion, connection, and unforgettable characters.',
    image: '/images/author-img/author-2.png',
  },
  {
    id: 3,
    name: 'Judith Hobson',
    description:
      'Self-Biography | Published Books: 05\n\nJudith Hobson writes self biographies, sharing personal journeys and life experiences through her published works.',
    image: '/images/author-img/author-3.png',
  },
];

export default function AuthorsSection(): React.ReactElement {
  return (
    <section
        className={`relative w-full flex flex-col items-center justify-center bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 text-center ${barlowCondensed.className}`}
    >
      {/* ===== Title ===== */}
      <h2 className="text-[#111] font-semibold mb-3 sm:mb-4 capitalize leading-[1.1] text-[clamp(28px,5vw,75px)]">
        Meet Our Authors
      </h2>

      {/* ===== Description ===== */}
      <p className="text-black leading-[1.5] mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[55%] max-w-[750px] mt-3 sm:mt-4 mb-8 sm:mb-12 md:mb-[5%] text-[clamp(16px,1.5vw,24px)] font-light px-2 sm:px-0">
        From debut storytellers to celebrated literary icons, our authors are the heart of our work and showcase publishing excellence. Explore biographies, releases, and events.
      </p>

      {/* ===== Authors Grid ===== */}
      <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-10 lg:gap-8 w-full">
        {authors.map((author) => (
          <div
            key={author.id}
            className="w-full sm:w-[calc(100%-48px)] md:w-[clamp(300px,31vw,390px)] text-left relative transition-all duration-300 ease-in-out max-w-[390px]"
          >
            {/* ===== Image Background Wrapper ===== */}
            <div className="relative w-full h-[clamp(280px,60vw,520px)] sm:h-[clamp(320px,50vw,520px)] overflow-hidden flex justify-center items-end pt-4 sm:pt-6 md:pt-[30px] rounded-[16px] sm:rounded-[20px] bg-transparent">
              {/* Background Image (static) */}
              <img
                src="/images/author-img/author-bg.png"
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-[1] pointer-events-none"
              />

              {/* Author Image (hover shrink) */}
              <img
                src={author.image}
                alt={author.name}
                className="relative z-[2] w-full h-auto object-contain transform transition-transform duration-300 ease-in-out hover:scale-[0.95] hover:translate-y-[6px] cursor-pointer"
              />
            </div>

            {/* ===== Author Info ===== */}
            <div className="text-left mt-4 sm:mt-5 px-2 sm:px-[10px] md:px-5">
              <h3 className="text-[#063f4a] font-semibold capitalize leading-[1.1] text-[clamp(20px,3vw,40px)]">
                {author.name}
              </h3>
              <p
                className={`whitespace-pre-line mt-2 sm:mt-[10px] font-normal leading-[1.6] text-[clamp(14px,1.2vw,18px)] text-black ${barlow.className}`}
              >
                {author.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

