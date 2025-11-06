"use client";

import type { FC } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Footer from '../../components/Footer';

// Image paths
const imgImage1 = "/images/quote-logo.png";
const imgRectangle72 = "/images/header-top-bar.png";
const imgGroup1000004908 = "/images/header-phone-icon.svg";
const imgGroup1000004909 = "/images/header-email-icon.svg";

// Part 1: Hero Section Component
const HeroSection: FC<{ title: string; date: string; imageSrc: string }> = ({ title, date, imageSrc }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[400px] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover z-0"
        quality={100}
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="hero-title"
      >
        <motion.h1
          id="hero-title"
          className="font-barlow-condensed font-semibold capitalize tracking-normal text-white whitespace-nowrap text-4xl md:text-[60px] md:leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.div variants={itemVariants}>
          <time
            dateTime={date}
            className="block mt-6 text-base text-gray-300 md:text-lg"
          >
            {date}
          </time>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Part 2: Content Section
const ContentSection: FC<{ content: string }> = ({ content }) => {
    return (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-lg leading-8 text-black" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {content}
                </p>
            </div>
        </section>
    );
};

// Part 3: Next Post Section
const NextPostSection: FC<{ nextPost: { id: number; title: string; imageSrc: string } | null }> = ({ nextPost }) => {
    if (!nextPost) return null;

    return (
        <section aria-label="Next post" className="w-full bg-white pb-16 sm:pb-20 lg:pb-24">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                 <Link 
                    href={`/blog/${nextPost.id}`}
                    className="group relative flex h-[55vh] min-h-[400px] w-full items-center justify-center overflow-hidden text-white"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-105">
                        <Image
                            src={nextPost.imageSrc}
                            alt={nextPost.title}
                            fill
                            className="object-cover"
                            quality={90}
                        />
                    </div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-lg text-white/90">Next Post</p>
                        <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {nextPost.title}
                        </h2>
                    </div>
                </Link>
            </div>
        </section>
    );
};

// Blog post data
const blogPosts = {
  1: {
    title: 'Sharks Book Publisher to Exhibit at Richmond',
    date: 'September 2, 2025',
    imageSrc: '/images/blog-1.webp',
    content: `We're excited to announce our presence at Richmond! Meet the Sharks Book Publishers team and explore the future of self-publishing, AI-assisted writing, and animated book trailers.

    Visit our booth at Richmond! to experience live demos of our ebook formatting, ghostwriting, and stunning cover design services.

    Join us at Richmond! and learn how our comprehensive publishing solutions can turn your story into a global success.`,
    nextPost: { id: 2, title: 'We Just Helped shane francis Hit the Top 100 on Amazon!', imageSrc: '/images/blog-2.webp' }
  },
  2: {
    title: 'We Just Helped shane francis Hit the Top 100 on Amazon!',
    date: 'September 2, 2025',
    imageSrc: '/images/blog-2.webp',
    content: `See how Sharks Book Publishers helped shane francis rise to Amazon's Top 100. Through expert marketing, strategic distribution, and professional book design, we transformed their manuscript into a bestselling success.

    Our comprehensive approach included targeted Amazon advertising, social media campaigns, and PR outreach that generated buzz and drove sales.

    Learn how our proven strategies can help your book achieve similar success and reach readers worldwide.`,
    nextPost: { id: 3, title: 'How to Write a Bestselling Book Description', imageSrc: '/images/blog-3.webp' }
  },
  3: {
    title: 'How to Write a Bestselling Book Description',
    date: 'August 18, 2025',
    imageSrc: '/images/blog-3.webp',
    content: `Your book description can make or break your sales. Learn how to craft a compelling description that hooks readers and drives conversions.

    A great book description should create intrigue, highlight key benefits, and include a clear call-to-action. We'll show you the proven formula used by bestselling authors.

    Discover the secrets to writing book descriptions that sell, from opening hooks to closing calls-to-action that convert browsers into buyers.`,
    nextPost: { id: 1, title: 'Sharks Book Publisher to Exhibit at Richmond', imageSrc: '/images/blog-1.webp' }
  }
};

// Main component
function BlogDetailContent({ params }: { params: { id: string } }) {
    const postId = parseInt(params.id);
    const post = blogPosts[postId as keyof typeof blogPosts];

    if (!post) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <h1 className="text-2xl">Blog post not found</h1>
            </div>
        );
    }

    const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };

    return (
        <div className="w-full bg-white overflow-x-hidden">
            {/* Hero Section with Image Background */}
            <div className="relative">
                <HeroSection title={post.title} date={post.date} imageSrc={post.imageSrc} />
                
                {/* Top Navigation Bar - Overlay on Hero */}
                <header className="absolute top-0 left-0 w-full z-[99999] px-5 lg:px-20">
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

                    {/* Main Navigation */}
                    <div className="mt-2 lg:mt-6 flex items-center justify-between">
                        <div className="w-[200px] h-[145px] md:w-[220px] md:h-[165px] lg:w-[260px] lg:h-[195px] relative fade-in -ml-1 lg:-ml-1">
                            <Link href="/">
                                <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
                            </Link>
                        </div>
                        <div className="hidden lg:flex w-[1080px] h-[100px] bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-end px-10 gap-8 border-2 border-white">
                            <div className="flex items-center gap-5 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                                <Link href="/" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Home</Link>
                                <Link href="/about" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>About Us</Link>
                                <Link href="/amazon" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Testimonials</Link>
                                <Link href="/shopify" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Books</Link>
                                <Link href="/services" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Services</Link>
                                <Link href="/tiktok" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Authors</Link>
                                <Link href="/walmart" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>News & Events</Link>
                                <Link href="/identity" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Careers</Link>
                                <Link href="/contact" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Contact</Link>
                            </div>
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
                </header>
            </div>

            <main>
                <ContentSection content={post.content} />
                <NextPostSection nextPost={post.nextPost} />
            </main>
            <Footer />
        </div>
    );
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <BlogDetailContent params={{ id }} />;
}

