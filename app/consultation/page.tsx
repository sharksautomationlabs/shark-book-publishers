'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';
import EcommerceAutomationExperts from '../components/EcommerceAutomationExperts';
import CallProcess from '../components/CallProcess';
import StrategyCall from '../components/StrategyCall';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import CTAFooter from '../components/CTAFooter';
import Footer from '../components/Footer';
import ThankYouHeader from '../components/ThankYouHeader';

export default function EcommerceAutomationPage() {
  const { videoRef, isInView } = useVideoLazyLoading();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  // Custom testimonials for this page
  const customTestimonials = [
    {
      id: "john-smith",
      name: "John Smith",
      subtitle: "Published Author",
      review: "I was skeptical at first, but Sharks Book Publishers delivered exactly what they promised. My book was published professionally and the process was seamless. It's a game-changer!",
      rating: 5,
      postDate: "Dec 15, 2024",
      replyDate: "Dec 16, 2024",
      profileImage: "/images/Dummy-profile/Alex-Chen.png"
    },
    {
      id: "sarah-lee",
      name: "Sarah Lee",
      subtitle: "First-Time Author",
      review: "The publishing process was smooth and professional! I've been able to share my story with readers worldwide. The team handled everything from editing to distribution. Couldn't be happier with the results.",
      rating: 5,
      postDate: "Nov 28, 2024",
      replyDate: "Nov 29, 2024",
      profileImage: "/images/Dummy-profile/Amanda-Foster.png"
    },
    {
      id: "michael-rodriguez-ecom",
      name: "Michael Rodriguez",
      subtitle: "Bestselling Author",
      review: "Sharks Book Publishers transformed my manuscript into a beautiful published book. The editing, cover design, and formatting were all top-notch. Best publishing experience I've ever had!",
      rating: 5,
      postDate: "Jan 8, 2025",
      replyDate: "Jan 9, 2025",
      profileImage: "/images/Dummy-profile/Michael-Chen.png"
    }
  ];

  return (
    <div className="w-full bg-white">
      <ThankYouHeader
        heroTitle="Professional Book Publishing Services with Guaranteed Results"
        heroSubtitle="Transform your manuscript into a published book in 24 hours—or we work for free. Our expert team handles everything from editing to distribution, so you can share your story with the world."
      />

      {/* Video Section */}
      <div ref={ref} className="py-16 lg:py-24">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
              {/* Background Video */}
              <div className="absolute inset-0 z-0">
                <video 
                  ref={videoRef}
                  autoPlay={isInView}
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  poster="/images/bi-vid.jpeg"
                >
                  <source src="/images/bi-vid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#052126]/70" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8">
                <div className="relative w-full bg-white rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/sagB-Znju4w"
                    title="See Exactly How Our Authors Are Getting Their Books Published"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <EcommerceAutomationExperts 
        title="About Us"
        subtitle="We've helped authors and writers just like you publish their books and share their stories with the world. Our proven publishing system handles everything from editing and cover design to formatting and distribution, so you can focus on what matters most—your writing."
      />
      <CallProcess />
      <StrategyCall />
      <Testimonials testimonials={customTestimonials} />
      <CTASection />
      <CTAFooter />
      <Footer />
    </div>
  );
}
