'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Ensure content is visible on mount
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Privacy Policy - ECOM SHARKS</title>
        <meta name="description" content="Privacy Policy for ECOM SHARKS. Learn how we collect, use, and protect your information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="w-full bg-white min-h-screen">
        <Header 
          heroTitle="Privacy Policy"
          heroSubtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
        />
      
      {/* Main Content Section */}
      <section ref={ref} className="w-full bg-white py-16 lg:py-24 relative z-10">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="visible"
            animate={controls}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={textVariants} className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 relative z-20 opacity-100">
              
              {/* Last Updated */}
              <motion.div variants={textVariants} className="mb-8">
                <p className="text-sm text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Last updated: January 15, 2025
                </p>
              </motion.div>

              {/* Introduction */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Introduction
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  ECOM SHARKS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </motion.div>

              {/* Information We Collect */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#063f4a] mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Personal Information
                    </h3>
                    <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      <li>Name and contact information (email, phone number, address)</li>
                      <li>Business information and preferences</li>
                      <li>Communication preferences</li>
                      <li>Any other information you choose to provide</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#063f4a] mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Automatically Collected Information
                    </h3>
                    <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      We may automatically collect certain information about your device and usage patterns, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  How We Use Your Information
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Improve, personalize, and expand our services</li>
                  <li>Understand and analyze how you use our services</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you for customer service and support</li>
                  <li>Send you marketing and promotional communications (with your consent)</li>
                  <li>Process transactions and send related information</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </motion.div>

              {/* Information Sharing */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Information Sharing and Disclosure
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist us in operating our website and conducting our business</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </motion.div>

              {/* Data Security */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Data Security
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </motion.div>

              {/* Your Rights */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Your Rights
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <li>Access and receive a copy of your personal information</li>
                  <li>Rectify inaccurate or incomplete personal information</li>
                  <li>Erase your personal information under certain circumstances</li>
                  <li>Restrict the processing of your personal information</li>
                  <li>Object to the processing of your personal information</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </motion.div>

              {/* Cookies */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>
              </motion.div>

              {/* Third-Party Links */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Third-Party Links
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </motion.div>

              {/* Children's Privacy */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Children's Privacy
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </motion.div>

              {/* Changes to Privacy Policy */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Changes to This Privacy Policy
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={textVariants} className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Contact Us
                </h2>
                <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-[#f8fafc] rounded-lg p-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <p className="text-[#2c2020] mb-2"><strong>Email:</strong> info@ecomsharkss.com</p>
                  <p className="text-[#2c2020] mb-2"><strong>Phone:</strong> (469) 480-7938</p>
                  <p className="text-[#2c2020]"><strong>Address:</strong> 22023 Rustic Canyon Ln, Richmond, TX 77469, USA</p>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      </div>
    </>
  );
}
