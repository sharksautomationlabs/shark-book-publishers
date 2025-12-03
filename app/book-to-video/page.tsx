'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; 
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

// Utility for class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// CUSTOM ICONS FOR YOUTUBE REPLICA
// ==========================================
const YTIcons = {
  Menu: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-6 h-6 fill-current text-gray-900"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-6 h-6 fill-current text-gray-600"><path d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-6 h-6 fill-current text-gray-900"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
  ),
  Create: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-6 h-6 fill-current text-gray-900"><path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zM17 6H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path></svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-6 h-6 fill-current text-gray-900"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-6v-3c0-2.68-1.91-4.96-4.51-5.65.23-.92.05-1.92-.51-2.73-.55-.8-1.48-1.21-2.48-1.07-.4.06-.79.2-1.14.42-.51-.35-1.12-.52-1.74-.47-2.6.21-4.62 2.37-4.62 4.98v3.5L3 14v1h18v-1l-2-1z"></path></svg>
  ),
  Like: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-5 h-5 fill-current text-gray-900"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></svg>
  ),
  Dislike: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-5 h-5 fill-current text-gray-900"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94L10.82,13H9.47H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-5 h-5 fill-current text-gray-900"><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
  ),
  More: () => (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="w-5 h-5 fill-current text-gray-900"><path d="M7.5 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm9 0c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm9 0c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path></svg>
  ),
  ShortsLike: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z"></path></svg>
  ),
  ShortsDislike: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94L10.82,13H9.47H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg>
  ),
  ShortsComment: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M4,17.46V4h16v13.46H4z M22,2H2v17.27L5.86,16H22V2z M17,9H7V8h10V9z M17,12H7v-1h10V12z M13,15H7v-1h6V15z"></path></svg>
  ),
  ShortsShare: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-gray-700"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-gray-700"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-gray-800"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
  )
};

// Hamburger Menu Icon for Main Nav
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
    {isOpen ? (
      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

export default function BookToVideoPage() {
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Header Images
  const imgImage1 = "/images/quote-logo.png";
  const imgRectangle72 = "/images/header-top-bar.png";
  const imgGroup1000004908 = "/images/header-phone-icon.svg";
  const imgGroup1000004909 = "/images/header-email-icon.svg";

  // HERO SECTION IMAGES & VIDEO
  const bannerCam = "/book-to-video/book-video-banner-1.png";       
  const bannerYtRight = "/book-to-video/book-video-banner-2.png";   
  const bannerBgVideo = "/images/bi-vid.mp4"; 

  // NEW SECTION IMAGES (CARDS)
  const overlapYtIcon = "/book-to-video/book-video-banner-3.png"; 
  const droneImage = "/book-to-video/second-1.png"; 
  
  // Service Card Icons
  const iconSecond2 = "/book-to-video/second-2.png"; 
  const iconSecond3 = "/book-to-video/second-3.png"; 
  const iconSecond4 = "/book-to-video/second-4.png"; 

  // PROCESS SECTION IMAGES (New Section)
  const processImage1 = "/book-to-video/Third_Section_banner.png"; 

  // YOUTUBE TV SECTION IMAGES (Fourth Section)
  const tvFrameImage = "/book-to-video/fourth_S_TV.png"; 
  const droneTopLeft = "/book-to-video/fourth_S_Dron.png";
  const ytLogoTopRight = "/book-to-video/fourth_S_youtube.png";

  // FIFTH SECTION IMAGES
  const fifthSectionCamera = "/book-to-video/fifth_S_camera.png";
  
  // SLIDER LOGIC (Cards Section)
  const [activeSlide, setActiveSlide] = useState(1); 

  const services = [
    {
      title: "2D Animation",
      desc: "Perfect for explanatory or illustrative content. We use engaging 2D motion graphics to animate key scenes.",
      icon: iconSecond2,
    },
    {
      title: "Cash Cow Video",
      desc: "Perfect for explanatory or illustrative content. We use engaging 2D motion graphics to animate key scenes.",
      icon: iconSecond3,
    },
    {
      title: "Face Content",
      desc: "Perfect for explanatory or illustrative content. We use engaging 2D motion graphics to animate key scenes.",
      icon: iconSecond4,
    },
    {
      title: "Documentary",
      desc: "Deep dive storytelling with archival footage and voiceovers to create compelling documentary-style videos.",
      icon: iconSecond2, 
    }
  ];

  // PROCESS TABS LOGIC
  const [activeProcessTab, setActiveProcessTab] = useState(0);

  const processSteps = [
    {
      id: 0,
      tabTitle: "Consultation & Strategy",
      heading: "Consultation & Strategy",
      desc: "Tell us about your book and your goals. We'll recommend the best video format (Animation, B-Roll, Face Content) and create a content plan tailored for YouTube.",
      image: processImage1
    },
    {
      id: 1,
      tabTitle: "Production & Creation",
      heading: "Production & Creation",
      desc: "Our team of expert editors, animators, and voice artists brings your story to life. We handle scripting, storyboarding, and full-scale production with precision.",
      image: processImage1 
    },
    {
      id: 2,
      tabTitle: "Launch & Promote",
      heading: "Launch & Promote",
      desc: "Once the video is ready, we help you launch it strategically. From SEO-optimized titles to thumbnail design, we ensure your content reaches the right audience.",
      image: processImage1 
    }
  ];

  // TV SECTION LOGIC
  const [activeVideoTab, setActiveVideoTab] = useState('long'); // 'long', 'short', 'thumbnail'
  
  // Dummy data for YouTube Replica
  const [currentVideo, setCurrentVideo] = useState({
    id: 'vid1',
    title: 'How to Turn Your Book into a Bestseller Video | Step by Step Guide',
    channel: 'Shark Book Publishers',
    subscribers: '125K',
    views: '1.2M views',
    date: '2 days ago',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0', 
    desc: 'Turn your book into a visual masterpiece. This video explains the exact process we use to convert manuscripts into high-retention video content for YouTube and Social Media.'
  });

  const playlist = [
    {
      id: 'vid1',
      title: 'How to Turn Your Book into a Bestseller Video',
      channel: 'Shark Book Publishers',
      views: '1.2M views',
      date: '2 days ago',
      thumbnailColor: '#1a1a1a',
      duration: '12:05',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0'
    },
    {
      id: 'vid2',
      title: '2D Animation Process Explained: From Script to Screen',
      channel: 'Shark Book Publishers',
      views: '854K views',
      date: '1 week ago',
      thumbnailColor: '#35c4dd',
      duration: '08:30',
      src: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0'
    },
    {
      id: 'vid3',
      title: 'Cinematic Book Trailers: The Complete Guide',
      channel: 'Shark Book Publishers',
      views: '450K views',
      date: '3 weeks ago',
      thumbnailColor: '#ff4d00',
      duration: '03:45',
      src: 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&rel=0'
    },
    {
      id: 'vid4',
      title: 'Why You Need Cash Cow Videos for Passive Income',
      channel: 'Shark Book Publishers',
      views: '2.1M views',
      date: '1 month ago',
      thumbnailColor: '#2a2a2a',
      duration: '15:20',
      src: 'https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&rel=0'
    }
  ];

  // SHORTS DATA
  const shortsList = [
      {
          id: 's1',
          videoId: '1La4QzGeaaQ',
          src: 'https://www.youtube.com/embed/1La4QzGeaaQ?autoplay=1&mute=1&controls=0&loop=1',
          title: 'The Future of Book Marketing 🚀',
          views: '1.5M',
          likes: '50K',
          comments: '1.2K',
          color: '#35c4dd'
      },
      {
          id: 's2',
          videoId: 'tgbNymZ7vqY',
          src: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0&loop=1',
          title: 'From Manuscript to Movie 🎬',
          views: '800K',
          likes: '24K',
          comments: '500',
          color: '#ff4d00'
      },
      {
          id: 's3',
          videoId: 'hHqW0g7v5LI',
          src: 'https://www.youtube.com/embed/hHqW0g7v5LI?autoplay=1&mute=1&controls=0&loop=1',
          title: 'Best Selling Author Secrets 🤫',
          views: '2.1M',
          likes: '120K',
          comments: '3K',
          color: '#8a00ff'
      }
  ];
  
  const [currentShortIndex, setCurrentShortIndex] = useState(0);

  const handleNextShort = () => {
    setCurrentShortIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handlePrevShort = () => {
    setCurrentShortIndex((prev) => (prev - 1 + shortsList.length) % shortsList.length);
  };

  // THUMBNAIL GALLERY DATA
  const thumbnailList = [
    {
      id: 1,
      image: '/book-to-video/YouTube Thumbnail 1.png',
      title: 'Cinematic Trailer'
    },
    {
      id: 2,
      image: '/book-to-video/thumb-2.png',
      title: 'Author Interview'
    },
    {
      id: 3,
      image: '/book-to-video/thumb-3.jpg',
      title: 'Book Launch'
    },
    {
      id: 4,
      image: '/book-to-video/thumb-4.jpg',
      title: '2D Animation'
    },
    {
      id: 5,
      image: '/book-to-video/thumb-5.jpg',
      title: 'Documentary Style'
    },
    {
      id: 6,
      image: '/book-to-video/thumb-6.jpg',
      title: 'Process Reveal'
    }
  ];

  // STATE FOR THUMBNAIL LIGHTBOX (NEW ADDITION)
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right

  // Window Resize Hook
  const [width, setWidth] = useState(0);
  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Create extended thumbnail list for Scrolling Effect
  const extendedThumbnailList = [];
  const repeatCount = 3; 
  for (let i = 0; i < repeatCount; i++) {
    extendedThumbnailList.push(...thumbnailList.map((thumb, idx) => ({ ...thumb, uniqueId: `${thumb.id}-${i}` })));
  }

  // Lightbox Navigation Functions
  const handleNextImage = useCallback(() => {
    setSlideDirection(1);
    setActiveThumbnailIndex((prev) => (prev + 1) % thumbnailList.length);
  }, [thumbnailList.length]);

  const handlePrevImage = useCallback(() => {
    setSlideDirection(-1);
    setActiveThumbnailIndex((prev) => (prev - 1 + thumbnailList.length) % thumbnailList.length);
  }, [thumbnailList.length]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNextImage, handlePrevImage]);

  // Auto slide effect (Cards)
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  // Prevent body scroll
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
    <div className="w-full bg-white overflow-x-hidden font-sans">
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .card-shape {
          border-top-left-radius: 30px;
          border-top-right-radius: 100px;
          border-bottom-left-radius: 100px;
          border-bottom-right-radius: 30px;
        }
        /* Custom Tab Underline Animation */
        .tab-underline {
            position: relative;
        }
        .tab-underline::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0%;
            height: 3px;
            background-color: #35c4dd; /* Cyan */
            transition: width 0.3s ease;
        }
        .tab-underline.active::after {
            width: 100%;
        }
        /* YOUTUBE REPLICA SCROLLBAR */
        .yt-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .yt-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .yt-scrollbar::-webkit-scrollbar-thumb {
          background: #cfcfcf;
          border-radius: 4px;
        }
        .yt-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0a0a0;
        }
      `}</style>

      {/* =========================================
          1. TOP BAR (Header)
      ========================================= */}
      <div className="w-full bg-transparent flex justify-center absolute top-0 left-0 z-[50]">
        <div className="relative w-full max-w-[1920px]">
          <header className="relative px-5 lg:px-20">
            <div
              className="h-[48px] w-full bg-cover bg-center rounded-b-2xl hidden lg:flex items-center justify-end px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span> +1 (469) 452-7618</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>contact@sharksbookpublishers.com</span>
                </a>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="mt-2 lg:mt-6 flex items-center justify-between">
              <div className="w-[200px] h-[145px] md:w-[220px] md:h-[165px] lg:w-[260px] lg:h-[195px] relative fade-in -ml-1 lg:-ml-1">
                <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
              </div>
              <div className="hidden lg:flex w-[1080px] h-[100px] bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-end px-10 gap-8 border-2 border-white">
                <div className="flex items-center gap-5 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <Link href="/" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Home</Link>
                  <Link href="/about" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>About Us</Link>
                  <Link href="/amazon" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Testimonials</Link>
                  <Link href="/shopify" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Books</Link>
                  <Link href="/services" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Services</Link>
                  <Link href="/tiktok" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Authors</Link>
                  <Link href="/book-to-video" className="hover:text-[#35c4dd] whitespace-nowrap" style={textShadow}>Book to Video</Link>
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
                  <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2"></span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                </button>
              </div>
              <div className="lg:hidden flex-shrink-0">
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
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileNavOpen(false)}
            />
            <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#052126] shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
               <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <div className="w-[110px] h-[82px] relative -ml-8">
                    <Image src={imgImage1} alt="Shark Book Publishers Logo" fill className="object-contain" priority />
                  </div>
                  <button onClick={() => setIsMobileNavOpen(false)} className="p-2 text-white hover:text-[#35c4dd] transition-colors">
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>
                {/* Mobile Menu Links */}
                <div className="flex-1 overflow-y-auto py-6 px-6">
                  <nav className="flex flex-col gap-6 text-white text-lg font-medium">
                    <Link href="/" className="hover:text-[#35c4dd]">Home</Link>
                    <Link href="/about" className="hover:text-[#35c4dd]">About Us</Link>
                    <Link href="/services" className="hover:text-[#35c4dd]">Services</Link>
                    <Link href="/book-to-video" className="text-[#35c4dd]">Book to Video</Link>
                    <Link href="/contact" className="hover:text-[#35c4dd]">Contact</Link>
                  </nav>
                </div>
                <div className="p-6">
                   <button className="w-full h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-lg">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. HERO SECTION
      ========================================= */}
      <section className="relative w-full h-[100vh] min-h-[600px] sm:min-h-[700px] md:min-h-[800px] overflow-hidden bg-transparent">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={bannerBgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#052126]/90 via-[#052126]/60 to-transparent z-10"></div>
        
        <div className="relative z-20 w-full max-w-[1920px] mx-auto h-full px-4 sm:px-5 md:px-10 lg:px-20 flex items-center pt-[120px] sm:pt-[140px] md:pt-[160px] lg:pt-[180px]">
          <div className="w-full h-full flex flex-col lg:flex-row items-center">
            {/* Left Text - Mobile Optimized */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pt-6 sm:pt-8 md:pt-12 lg:pt-0">
              <h1 className="text-white text-[28px] sm:text-[36px] md:text-[42px] lg:text-[65px] xl:text-[75px] leading-[1.1] font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight" style={{ fontFamily: "'Barlow Condensed', 'Oswald', sans-serif" }}>
                Transform Your Book<br />
                into Visual Storytelling
              </h1>
              <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-light mb-5 sm:mb-6 md:mb-8 lg:mb-10 max-w-[600px] leading-relaxed">
                Harness the power of video to bring your stories to life on YouTube, Shorts, and beyond.
              </p>
              <div>
                <button className="bg-[#35c4dd] hover:bg-[#2da9bf] transition-colors text-[#052126] text-sm sm:text-base md:text-lg font-bold py-2 sm:py-2.5 md:py-3 px-5 sm:px-6 md:px-8 rounded-full flex items-center gap-2 sm:gap-3 shadow-[0_4px_14px_rgba(53,196,221,0.4)]">
                  <span>Get A Quote</span>
                  <span className="bg-white w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full block"></span>
                </button>
              </div>
            </div>
            
            {/* Right Images - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-full lg:w-1/2 h-full relative">
              <div className="absolute bottom-0 right-[-120px] xl:right-[-100px] 2xl:right-[-80px] w-[85%] xl:w-[90%] h-[85%] xl:h-[90%] z-20">
                <Image src={bannerCam} alt="Camera Head" fill className="object-contain" style={{ objectPosition: 'right bottom' }} priority />
              </div>
              <div className="absolute bottom-[12%] right-[22%] xl:right-[25%] 2xl:right-[28%] w-[280px] xl:w-[320px] 2xl:w-[360px] h-[210px] xl:h-[240px] 2xl:h-[270px] z-30 animate-pulse-slow">
                <Image src={bannerYtRight} alt="Youtube Icon" fill className="object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Youtube Icon - Mobile Optimized, Stuck to Left Edge */}
      <div className="relative w-full h-0 z-[50]">
        <div className="absolute top-[-8px] sm:top-[-10px] md:top-[-12px] lg:top-[-15px] left-0 sm:left-[-10px] md:left-[-15px] lg:left-[-80px] xl:left-[-100px] w-[80px] h-[60px] sm:w-[100px] sm:h-[70px] md:w-[140px] md:h-[100px] lg:w-[300px] lg:h-[220px] xl:w-[350px] xl:h-[250px] transform -translate-y-1/2">
            <Image 
              src={overlapYtIcon} 
              alt="Video Service Youtube" 
              fill 
              className="object-contain blur-[1px] opacity-90" 
            />
        </div>
      </div>

      {/* =========================================
          3. VIDEO CONVERSION SERVICES SECTION (CARDS)
      ========================================= */}
      <section className="relative w-full bg-white py-20 pb-32 overflow-hidden">
         {/* ... (Existing Cards Code is perfect) ... */}
         <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-8 lg:px-10 relative z-20 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-12 sm:mb-14 md:mb-16 relative max-w-[1400px] mx-auto">
            <div className="text-center w-full">
               <h2 className="text-[#2a2a2a] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[55px] font-bold tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                 Our Video Conversion Services
               </h2>
            </div>
            <div className="absolute right-0 top-0 hidden lg:block w-[150px] h-[100px] lg:w-[220px] lg:h-[140px] animate-float">
               <Image src={droneImage} alt="Drone Cam" fill className="object-contain" />
            </div>
          </div>
          <div className="relative w-full h-[500px] sm:h-[550px] md:h-[580px] lg:h-[600px] flex items-center justify-center perspective-[2000px] px-4 sm:px-6 md:px-8 lg:px-0">
             <AnimatePresence initial={false} mode="popLayout">
                {[-1, 0, 1].map((offset) => {
                    const index = (activeSlide + offset + services.length) % services.length;
                    const service = services[index];
                    const isCenter = offset === 0;
                    let xOffset = 0;
                    if (!isMobile) xOffset = offset * 420; 
                    if (isTablet) xOffset = offset * 350;  
                    if (isMobile && !isCenter) xOffset = 0; 
                    return (
                        <motion.div
                            key={`${service.title}-${index}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8, z: -200, x: xOffset, rotateY: offset * -25 }}
                            animate={{ opacity: isCenter ? 1 : (isMobile ? 0 : 0.6), scale: isCenter ? 1 : 0.85, z: isCenter ? 0 : -100, x: xOffset, rotateY: isCenter ? 0 : offset * -15, zIndex: isCenter ? 10 : 5, filter: isCenter ? 'blur(0px)' : 'blur(1px)' }}
                            exit={{ opacity: 0, scale: 0.5, z: -300, filter: 'blur(10px)', transition: { duration: 0.4 } }}
                            transition={{ type: "spring", stiffness: 180, damping: 24, mass: 1.2 }}
                            className={cn("absolute top-[5%] w-[280px] sm:w-[300px] md:w-[340px] lg:w-[380px] h-[420px] sm:h-[460px] md:h-[500px] lg:h-[520px]", isCenter ? "cursor-default pointer-events-auto" : "pointer-events-none cursor-pointer")}
                            onClick={() => { if (offset !== 0) { setActiveSlide((prev) => (prev + offset + services.length) % services.length); } }}
                        >
                            <div className={cn("relative w-full h-full flex flex-col items-center justify-start p-4 sm:p-5 md:p-6 text-center shadow-2xl overflow-visible card-shape border-4 border-transparent transition-colors duration-500", isCenter ? "bg-gradient-to-b from-[#8a00ff] to-[#ff4800]" : "bg-[#35c4dd]")}>
                                <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] -mt-12 sm:-mt-14 md:-mt-16 flex items-center justify-center mb-2">
                                    <div className={`relative w-[220px] h-[160px] sm:w-[240px] sm:h-[180px] md:w-[260px] md:h-[200px] lg:w-[280px] lg:h-[220px] transition-transform duration-700 ${isCenter ? 'scale-110 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]' : 'scale-95'}`}>
                                        <Image src={service.icon} alt={service.title} fill className="object-contain" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center mt-2">
                                    <h3 className="text-white text-[28px] sm:text-[32px] md:text-[36px] lg:text-[38px] leading-[1] font-bold mb-3 sm:mb-4 uppercase tracking-tighter" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                        {service.title.split(' ').map((word, i) => (<span key={i} className={i === 1 ? "block" : "inline-block mr-2"}>{word}</span>))}
                                    </h3>
                                    <p className="text-white text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-snug px-3 sm:px-4">{service.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
             </AnimatePresence>
          </div>
          <div className="w-full flex justify-center gap-3 mt-8">
            {services.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)} className={cn("h-3 transition-all duration-500 rounded-full", i === activeSlide ? "w-12 bg-[#ff4d00]" : "w-3 bg-gray-300 hover:bg-gray-400")} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          4. STREAMLINED PROCESS SECTION
      ========================================= */}
      <section className="relative w-full bg-gradient-to-b from-[#E0F7FA] to-[#d6f3f7] py-20 lg:py-28 overflow-hidden z-[9999]">
        {/* ... (Existing Process Code is perfect) ... */}
        <div className="absolute top-[-5%] right-0 w-[300px] lg:w-[400px] h-full opacity-20 pointer-events-none z-0 rotate-12">
             <div className="w-full h-full" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`, backgroundSize: '40px 100%' }} />
        </div>
        <AnimatePresence mode="wait">
            <motion.div key={`img-${activeProcessTab}`} className="absolute bottom-0 right-0 w-[50%] lg:w-[45%] h-full min-h-[800px] lg:min-h-[1000px] z-10" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
               <Image src={processSteps[activeProcessTab].image} alt={processSteps[activeProcessTab].heading} fill className="object-contain" style={{ objectPosition: 'right bottom' }} priority />
            </motion.div>
        </AnimatePresence>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 lg:px-12 relative z-10">
           <div className="mb-8 sm:mb-10 md:mb-12">
               <h2 className="text-[#2a2a2a] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[60px] font-bold leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Streamlined Process for Authors</h2>
           </div>
           <div className="flex flex-col md:flex-row gap-6 sm:gap-7 md:gap-8 lg:gap-16 mb-8 sm:mb-9 md:mb-10 pb-2 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30%] h-[1px] bg-gray-300"></div>
              {processSteps.map((step, idx) => (
                  <button key={idx} onClick={() => setActiveProcessTab(idx)} className={`text-base sm:text-[17px] md:text-[18px] lg:text-[22px] font-semibold pb-3 px-2 transition-all duration-300 cursor-pointer ${activeProcessTab === idx ? "text-[#052126] tab-underline active" : "text-gray-400 hover:text-gray-600"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{step.tabTitle}</button>
              ))}
           </div>
           <div className="relative w-full min-h-[250px] sm:min-h-[280px] md:min-h-[300px] lg:min-h-[300px] flex flex-col lg:flex-row">
              <AnimatePresence mode="wait">
                  <motion.div key={`text-${activeProcessTab}`} className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-20 mb-8 sm:mb-9 md:mb-10 lg:mb-0 relative z-10" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                     <span className="inline-block bg-[#AEEFF8] text-[#052126] px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-5 md:mb-6 w-fit">Process</span>
                     <h3 className="text-[#2a2a2a] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[55px] font-bold leading-[1.1] mb-4 sm:mb-5 md:mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{processSteps[activeProcessTab].heading}</h3>
                     <p className="text-gray-600 text-base sm:text-[17px] md:text-lg leading-relaxed">{processSteps[activeProcessTab].desc}</p>
                  </motion.div>
              </AnimatePresence>
           </div>
        </div>
        <div className="relative w-full h-0 z-[10000]">
          <div className="absolute bottom-[-100px] lg:bottom-[-130px] left-1/2 transform -translate-x-1/2 w-[98%] h-[80px] lg:h-[100px] bg-gradient-to-r from-[#9000ff] via-[#ff00a6] to-[#ff4d00] rounded-[200px]"></div>
        </div>
      </section>

      {/* =========================================
          5. NEW "VIDEOS WE CREATED" TV SECTION
      ========================================= */}
      <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden z-[50]">
        
        {/* Decorative Floating Images - Mobile Optimized */}
        <div className="absolute top-[20px] sm:top-[30px] md:top-[40px] lg:top-[50px] left-0 w-[100px] h-[75px] sm:w-[140px] sm:h-[105px] md:w-[180px] md:h-[135px] lg:w-[300px] lg:h-[220px] animate-float z-20">
            <div className="relative w-full h-full">
                <Image src={droneTopLeft} alt="Drone" fill className="object-contain" />
            </div>
        </div>
        <div className="absolute top-[10px] sm:top-[15px] md:top-[20px] lg:top-[20px] -right-[30px] sm:-right-[40px] md:-right-[50px] lg:-right-[80px] xl:-right-[100px] w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] md:w-[130px] md:h-[98px] lg:w-[180px] lg:h-[140px] xl:w-[280px] xl:h-[200px] rotate-12 z-20">
            <div className="relative w-full h-full drop-shadow-2xl">
                <Image src={ytLogoTopRight} alt="Youtube Logo" fill className="object-contain" />
            </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-30">
            
            {/* Header: Title & Tabs */}
            <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 lg:mb-16 px-4">
                <h2 className="text-[#2a2a2a] text-[32px] sm:text-[38px] md:text-[45px] lg:text-[60px] font-bold mb-6 sm:mb-8 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Videos We Created
                </h2>
                
                <div className="flex items-center gap-6 sm:gap-8 md:gap-10 border-b border-gray-200 w-full max-w-[500px] justify-center pb-2">
                     <button onClick={() => setActiveVideoTab('long')} className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${activeVideoTab === 'long' ? 'text-[#35c4dd] border-b-2 border-[#35c4dd]' : 'text-gray-400 hover:text-gray-600'}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Long</button>
                     <button onClick={() => setActiveVideoTab('short')} className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${activeVideoTab === 'short' ? 'text-[#35c4dd] border-b-2 border-[#35c4dd]' : 'text-gray-400 hover:text-gray-600'}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Short</button>
                     <button onClick={() => setActiveVideoTab('thumbnail')} className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${activeVideoTab === 'thumbnail' ? 'text-[#35c4dd] border-b-2 border-[#35c4dd]' : 'text-gray-400 hover:text-gray-600'}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Thumbnail</button>
                </div>
            </div>

            {/* TV Container Area */}
            <div className="relative w-full max-w-[1200px] mx-auto perspective-[1000px]">
                
                {/* 1. The TV Frame Image */}
                <div className="relative w-full aspect-[16/9] z-20 pointer-events-none">
                     <Image src={tvFrameImage} alt="TV Frame" fill className="object-contain scale-105" priority />
                </div>

                {/* 2. The Internal Screen Area - Mobile Optimized */}
                <div 
                  className="absolute bg-white z-40 overflow-hidden rounded-t-[6px] sm:rounded-t-[8px] rounded-b-[12px] sm:rounded-b-[15px] shadow-inner"
                  style={{
                    top: width < 768 ? 'calc(12% - 40px)' : width < 1024 ? 'calc(13% - 60px)' : 'calc(15% - 80px)',
                    left: width < 768 ? 'calc(8% - 15px)' : width < 1024 ? 'calc(9% - 20px)' : 'calc(10% - 30px)',
                    right: width < 768 ? 'calc(8% - 15px)' : width < 1024 ? 'calc(9% - 20px)' : 'calc(10% - 30px)',
                    bottom: width < 768 ? 'calc(15% - 20px)' : width < 1024 ? 'calc(16% - 30px)' : 'calc(18% - 40px)',
                    transform: 'translateX(0)'
                  }}
                >
                    
                    {/* A. YOUTUBE HEADER (Common for all tabs) - Mobile Optimized */}
                    <div className="sticky top-0 z-50 bg-white h-[48px] sm:h-[52px] md:h-[56px] flex items-center justify-between px-2 sm:px-3 md:px-4 shrink-0 shadow-sm">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
                                <YTIcons.Menu />
                            </button>
                            <div className="relative h-5 w-24 sm:h-6 sm:w-28 md:w-32 cursor-pointer flex items-center">
                                 <Image src={imgImage1} alt="Shark Logo" fill className="object-contain object-left" />
                            </div>
                        </div>
                        <div className="flex-1 max-w-[600px] mx-2 sm:mx-3 md:mx-4 hidden md:flex items-center gap-4">
                            <div className="flex w-full">
                                <div className="flex flex-1 items-center border border-gray-300 rounded-l-full px-4 py-0.5 shadow-inner bg-white focus-within:border-blue-500 ml-8">
                                    <input type="text" placeholder="Search" className="w-full py-1.5 text-[16px] outline-none font-normal text-gray-700 placeholder-gray-500" />
                                </div>
                                <button className="bg-[#f8f8f8] border border-l-0 border-gray-300 rounded-r-full px-5 flex items-center justify-center hover:bg-[#f0f0f0]">
                                    <YTIcons.Search />
                                </button>
                            </div>
                            <button className="p-2 bg-[#f9f9f9] rounded-full hover:bg-[#e5e5e5]">
                                <YTIcons.Mic />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full hidden sm:block"><YTIcons.Create /></button>
                            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full hidden sm:block"><YTIcons.Bell /></button>
                            <div className="ml-1 sm:ml-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer">S</div>
                        </div>
                    </div>

                    {/* CONTENT AREA SWITCHER */}
                    <div className="w-full h-[calc(100%-56px)] overflow-hidden bg-white relative">
                        
                        {/* 1. LONG VIDEO TAB - Mobile Optimized */}
                        {activeVideoTab === 'long' && (
                           <div className="w-full h-full flex flex-col lg:flex-row p-3 sm:p-4 md:p-5 lg:p-6 pt-3 sm:pt-4 md:pt-5 lg:pt-6 gap-4 sm:gap-5 md:gap-6 overflow-y-auto yt-scrollbar">
                                <div className="w-full lg:w-[70%]">
                                    <div className="w-full aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-sm mb-3 sm:mb-4">
                                         <iframe width="100%" height="100%" src={currentVideo.src} title="Player" allow="autoplay; encrypted-media" className="border-0"></iframe>
                                    </div>
                                    <h1 className="text-base sm:text-lg md:text-[20px] font-bold text-[#0f0f0f] mb-2 sm:mb-3 leading-6 sm:leading-7">{currentVideo.title}</h1>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                                                <Image src={imgImage1} alt="Avatar" fill className="object-contain p-1" />
                                            </div>
                                            <div className="flex flex-col mr-4">
                                                <p className="font-bold text-[16px] text-[#0f0f0f] leading-5">{currentVideo.channel}</p>
                                                <p className="text-[12px] text-[#606060]">{currentVideo.subscribers} subscribers</p>
                                            </div>
                                            <button className="bg-[#0f0f0f] text-white px-4 py-2 rounded-full text-[14px] font-medium hover:bg-[#272727] transition-colors">Subscribe</button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center bg-[#f2f2f2] rounded-full overflow-hidden h-9">
                                                <button className="flex items-center gap-2 px-4 hover:bg-[#e5e5e5] border-r border-[#d9d9d9] h-full transition-colors"><YTIcons.Like /><span className="text-sm font-medium text-[#0f0f0f]">12K</span></button>
                                                <button className="px-3 hover:bg-[#e5e5e5] h-full transition-colors"><YTIcons.Dislike /></button>
                                            </div>
                                            <button className="flex items-center gap-2 bg-[#f2f2f2] px-4 py-2 rounded-full hover:bg-[#e5e5e5] transition-colors h-9"><YTIcons.Share /><span className="text-sm font-medium text-[#0f0f0f]">Share</span></button>
                                            <button className="flex items-center justify-center bg-[#f2f2f2] w-9 h-9 rounded-full hover:bg-[#e5e5e5] transition-colors rotate-90"><YTIcons.More /></button>
                                        </div>
                                    </div>
                                    <div className="bg-[#f2f2f2] rounded-xl p-3 text-sm text-[#0f0f0f] hover:bg-[#e5e5e5] transition-colors cursor-pointer">
                                        <p className="font-bold mb-1">{currentVideo.views} • {currentVideo.date}</p>
                                        <p className="whitespace-pre-line leading-relaxed">{currentVideo.desc}</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-[30%] flex flex-col gap-3">
                                    <div className="flex gap-2 overflow-x-hidden mb-2">
                                        <span className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">All</span>
                                        <span className="bg-[#f2f2f2] text-[#0f0f0f] px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-[#e5e5e5] cursor-pointer">From Sharks</span>
                                    </div>
                                    {playlist.map((video) => (
                                        <div key={video.id} onClick={() => setCurrentVideo({ ...currentVideo, ...video, desc: currentVideo.desc })} className="flex gap-2 cursor-pointer group">
                                            <div className="relative w-[168px] h-[94px] flex-shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: video.thumbnailColor || '#000000' }}>
                                                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center px-2 opacity-80 group-hover:opacity-100 transition-opacity">{video.title.substring(0, 25)}...</div>
                                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-wide">{video.duration}</span>
                                            </div>
                                            <div className="flex flex-col pr-6">
                                                <h4 className="text-[14px] font-semibold text-[#0f0f0f] line-clamp-2 leading-tight mb-1 group-hover:text-[#0f0f0f] decoration-transparent">{video.title}</h4>
                                                <p className="text-[12px] text-[#606060]">{video.channel}</p>
                                                <p className="text-[12px] text-[#606060]">{video.views} • {video.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                           </div>
                        )}

                        {/* 2. SHORTS VIDEO TAB (Carousel) - Mobile Optimized */}
                        {activeVideoTab === 'short' && (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
                                
                                {/* Arrows - Mobile Optimized, All Screens */}
                                <button 
                                  onClick={handlePrevShort}
                                  className="absolute left-2 sm:left-4 md:left-6 lg:left-8 z-50 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all active:scale-95"
                                >
                                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current text-gray-800">
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                  </svg>
                                </button>
                                <button 
                                  onClick={handleNextShort}
                                  className="absolute right-2 sm:right-4 md:right-6 lg:right-8 z-50 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all active:scale-95"
                                >
                                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current text-gray-800">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                  </svg>
                                </button>

                                {/* Carousel Container */}
                                <div className="relative w-full h-full flex items-center justify-center py-2 sm:py-1">
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {/* PREV CARD - Hidden on Mobile */}
                                        {currentShortIndex > 0 && width >= 768 && (
                                            <motion.div 
                                                className="absolute left-[10%] md:left-[12%] lg:left-[15%] w-[220px] h-[400px] md:w-[250px] md:h-[450px] lg:w-[280px] lg:h-[500px] rounded-2xl opacity-60 blur-[1px] shadow-xl overflow-hidden"
                                                style={{ transform: 'rotateY(15deg) scale(0.9)' }}
                                            >
                                               <Image 
                                                 src={`https://img.youtube.com/vi/${shortsList[currentShortIndex - 1].videoId}/hq720.jpg`} 
                                                 alt="Prev Short" 
                                                 fill 
                                                 className="object-cover" 
                                               />
                                               <div className="w-full h-full bg-black/40 absolute inset-0"></div>
                                            </motion.div>
                                        )}

                                        {/* ACTIVE CARD (CENTER) - Mobile Reels Size */}
                                        <motion.div 
                                            key={shortsList[currentShortIndex].id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                            className="relative z-30 w-[75%] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px] aspect-[9/16] max-h-[85%] sm:max-h-[480px] md:max-h-[540px] lg:max-h-[680px] bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mx-auto"
                                        >
                                            {/* Video Embed */}
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={shortsList[currentShortIndex].src} 
                                                title="Shorts" 
                                                allow="autoplay; encrypted-media" 
                                                className="border-0 object-cover"
                                            ></iframe>

                                            {/* Shorts UI Overlay (Right Side Actions) - Mobile Optimized */}
                                            <div className="absolute right-2 sm:right-3 bottom-20 sm:bottom-24 md:bottom-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 z-40">
                                                <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                                                    <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                                                        <YTIcons.ShortsLike />
                                                    </div>
                                                    <span className="text-white text-[9px] sm:text-xs font-bold">{shortsList[currentShortIndex].likes}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                                                    <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                                                        <YTIcons.ShortsDislike />
                                                    </div>
                                                    <span className="text-white text-[9px] sm:text-xs font-bold">Dislike</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                                                    <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                                                        <YTIcons.ShortsComment />
                                                    </div>
                                                    <span className="text-white text-[9px] sm:text-xs font-bold">{shortsList[currentShortIndex].comments}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                                                    <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                                                        <YTIcons.ShortsShare />
                                                    </div>
                                                    <span className="text-white text-[9px] sm:text-xs font-bold">Share</span>
                                                </div>
                                                <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full cursor-pointer hover:bg-gray-700 transition-colors">
                                                    <YTIcons.More />
                                                </div>
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-800/70 backdrop-blur-sm rounded-lg mt-1 overflow-hidden border-2 border-white/50 cursor-pointer">
                                                    <div className="w-full h-full flex items-center justify-center text-white text-[6px] sm:text-[7px]">SOUND</div>
                                                </div>
                                            </div>

                                            {/* Shorts UI Overlay (Bottom Info) - Mobile Optimized */}
                                            <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 pb-4 sm:pb-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-white font-bold text-xs sm:text-sm">@SharkPublishers</span>
                                                    <button className="bg-white text-black text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-gray-200 transition-colors">Subscribe</button>
                                                </div>
                                                <p className="text-white text-xs sm:text-sm font-medium leading-snug pr-12 sm:pr-16 line-clamp-2">
                                                    {shortsList[currentShortIndex].title} #shorts #books #publishing
                                                </p>
                                            </div>

                                            {/* Mobile Navigation - Swipe Indicators */}
                                            {width < 768 && (
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                                                    {shortsList.map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`h-1 rounded-full transition-all duration-300 ${
                                                                idx === currentShortIndex ? 'w-6 bg-white' : 'w-1 bg-white/50'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>

                                        {/* NEXT CARD (RIGHT) - Hidden on Mobile */}
                                        {currentShortIndex < shortsList.length - 1 && width >= 768 && (
                                            <motion.div 
                                                className="absolute right-[10%] md:right-[12%] lg:right-[15%] w-[220px] h-[400px] md:w-[250px] md:h-[450px] lg:w-[280px] lg:h-[500px] rounded-2xl opacity-60 blur-[1px] shadow-xl overflow-hidden"
                                                style={{ transform: 'rotateY(-15deg) scale(0.9)' }}
                                            >
                                                <Image 
                                                  src={`https://img.youtube.com/vi/${shortsList[currentShortIndex + 1].videoId}/hq720.jpg`} 
                                                  alt="Next Short" 
                                                  fill 
                                                  className="object-cover" 
                                                />
                                                <div className="w-full h-full bg-black/40 absolute inset-0"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                        {/* 3. THUMBNAIL TAB - "Baap Level" Gallery with Lightbox */}
                        {activeVideoTab === 'thumbnail' && (
                            <div className="w-full h-full relative bg-[#f9f9f9]">
                                
                                {/* A. THE GRID VIEW (Scrollable) */}
                                <div className="w-full h-full overflow-y-auto yt-scrollbar p-5 sm:p-6 md:p-8 lg:p-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 w-full">
                                        {extendedThumbnailList.map((thumbnail, idx) => {
                                            const originalIndex = thumbnailList.findIndex(t => t.id === thumbnail.id);
                                            return (
                                                <motion.div
                                                    key={thumbnail.uniqueId}
                                                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                    viewport={{ once: true, margin: "-50px" }}
                                                    transition={{ 
                                                        duration: 0.5, 
                                                        ease: "easeOut",
                                                        delay: (idx % 3) * 0.1 
                                                    }}
                                                    onClick={() => {
                                                        setActiveThumbnailIndex(originalIndex);
                                                        // Only open lightbox on tablet and desktop, not on mobile
                                                        if (width >= 768) {
                                                            setIsLightboxOpen(true);
                                                        }
                                                    }}
                                                    className="group cursor-pointer flex flex-col gap-3"
                                                >
                                                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                                        <Image 
                                                            src={thumbnail.image}
                                                            alt={thumbnail.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                            <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                                                                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start justify-between px-1">
                                                        <h4 className="text-base font-bold text-[#0f0f0f] group-hover:text-[#35c4dd] transition-colors duration-300 line-clamp-1">
                                                            {thumbnail.title}
                                                        </h4>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <div className="w-full text-center py-8 text-gray-400 text-sm animate-pulse">
                                        Scroll for more
                                    </div>
                                </div>

                                {/* B. THE LIGHTBOX OVERLAY ("Cinema Mode") - Only on Tablet/Desktop */}
                                <AnimatePresence>
                                    {isLightboxOpen && width >= 768 && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
                                        >
                                            {/* Close Button - Mobile Optimized */}
                                            <button 
                                                onClick={() => setIsLightboxOpen(false)}
                                                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[110] p-2 sm:p-2.5 md:p-3 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all active:scale-95"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current text-gray-800">
                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                                </svg>
                                            </button>

                                            {/* Main Image Slider Area */}
                                            <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-12">
                                                
                                                {/* Prev Button - Mobile Optimized */}
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                                    className="absolute left-2 sm:left-4 md:left-6 z-[110] p-2 sm:p-2.5 md:p-3 rounded-full bg-white/95 hover:bg-white shadow-lg transition-all active:scale-95"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current text-gray-800">
                                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                                    </svg>
                                                </button>

                                                {/* Image Content */}
                                                <div className="relative w-full h-[60%] sm:h-[70%] md:h-[80%] max-w-[900px] shadow-2xl">
                                                    <AnimatePresence initial={false} mode="wait">
                                                        <motion.div
                                                            key={activeThumbnailIndex}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                            className="absolute inset-0 w-full h-full"
                                                        >
                                                            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                                                <Image 
                                                                    src={thumbnailList[activeThumbnailIndex].image}
                                                                    alt={thumbnailList[activeThumbnailIndex].title}
                                                                    fill
                                                                    className="object-contain"
                                                                    priority
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>

                                                {/* Next Button - Mobile Optimized */}
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                                    className="absolute right-2 sm:right-4 md:right-6 z-[110] p-2 sm:p-2.5 md:p-3 rounded-full bg-white/95 hover:bg-white shadow-lg transition-all active:scale-95"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current text-gray-800">
                                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Bottom Info Bar */}
                                            <div className="absolute bottom-6 w-full text-center">
                                                <motion.div 
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    key={`info-${activeThumbnailIndex}`}
                                                    className="text-white"
                                                >
                                                    <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-wide">
                                                        {thumbnailList[activeThumbnailIndex].title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">
                                                        {activeThumbnailIndex + 1} / {thumbnailList.length}
                                                    </p>
                                                </motion.div>
                                            </div>

                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* =========================================
          5. VISUALIZE YOUR BOOK SECTION
      ========================================= */}
      <section className="relative w-full py-12 lg:py-16 overflow-hidden bg-[#BEF4FE]">
        <div className="relative w-full h-auto min-h-[400px] lg:h-[500px] pb-8 lg:pb-0">
          
          {/* Right Side: Camera Image - Mobile Optimized */}
          <div className="absolute right-0 top-0 h-[220px] sm:h-[250px] md:h-[280px] lg:h-full w-[55%] sm:w-[55%] md:w-[60%] lg:w-[55%] z-20">
            <Image 
              src={fifthSectionCamera}
              alt="Camera Lens"
              fill
              className="object-contain object-right"
              priority
            />
          </div>

          {/* Left Side: Text Content - Mobile Optimized */}
          <div className="absolute left-0 top-[230px] sm:top-[260px] md:top-[290px] lg:top-1/2 lg:-translate-y-1/2 z-10 pl-3 sm:pl-4 md:pl-5 lg:pl-20">
            <div 
              className="px-4 sm:px-5 md:px-6 lg:px-10 py-6 sm:py-7 md:py-8 lg:py-12 rounded-lg sm:rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '12px'
              }}
            >
              <h2 
                className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[56px] font-bold leading-tight"
                style={{ 
                  color: '#000000',
                  fontFamily: "'Barlow Condensed', sans-serif"
                }}
              >
                Visualize Your<br />Book!
              </h2>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          6. TESTIMONIALS SECTION
      ========================================= */}
      <div className="bg-white relative z-20 pt-[60px] lg:pt-[80px]">
        <Testimonials />
      </div>

      {/* =========================================
          7. FOOTER SECTION
      ========================================= */}
      <Footer />
    </div>
  );
}