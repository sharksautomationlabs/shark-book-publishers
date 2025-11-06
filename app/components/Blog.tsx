"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

type Post = {
  id: number;
  imageSrc: string;
  title: string;
  date: string;
  description: string;
  href: string;
};

const posts: Post[] = [
  {
    id: 1,
    imageSrc: '/images/blog-1.webp',
    title: 'Sharks Book Publisher to Exhibit at Richmond',
    date: 'September 2, 2025',
    description: "We're excited to announce our presence at Richmond! Meet the Sharks Book Publishers team and...",
    href: '#',
  },
  {
    id: 2,
    imageSrc: '/images/blog-2.webp',
    title: 'We Just Helped shane francis Hit the Top 100 on Amazon!',
    date: 'September 2, 2025',
    description: 'See how Sharks Book Publishers helped shane francis rise to Amazon\'s Top 100. Through expert...',
    href: '#',
  },
  {
    id: 3,
    imageSrc: '/images/blog-3.webp',
    title: 'How to Write a Bestselling Book Description',
    date: 'August 18, 2025',
    description: 'Your book description can make or break your sales. Learn how to craft a compelling....',
    href: '#',
  },
];

const NewsAndEventsSection = () => {
  const cardVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8, // Lifts the card up on hover
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="w-full bg-white font-sans">
      {/* Container is now full-width with responsive padding on the sides */}
      <div className="px-6 py-20 sm:px-8 lg:px-10">
        {/* Added a max-width container here for the grid content to prevent it from becoming too wide on large screens */}
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group relative flex flex-col"
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index}
                >
                  <div className="overflow-hidden rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      width={768}
                      height={512}
                      className="h-auto w-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <h3 className="text-[21px] font-semibold leading-tight text-zinc-800">
                      <Link href={`/blog/${post.id}`} className="focus:outline-none">
                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-4 text-[15px] text-gray-500">{post.date}</p>
                    <p className="mt-2 text-[17px] leading-relaxed text-gray-700">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        href={`/blog/${post.id}`}
                        className="relative z-20 inline-flex items-center gap-2 text-[17px] font-medium text-zinc-800"
                        aria-hidden="true"
                      >
                        Read More
                        <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                          <svg 
                            className="h-4 w-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndEventsSection;

