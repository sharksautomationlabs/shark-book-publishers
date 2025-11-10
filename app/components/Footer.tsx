'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendContactEmail, ContactFormData } from '../utils/emailjs';
import { spamProtection, detectSuspiciousActivity } from '../utils/spamProtection';

// Image and icon assets for the section
const imgPattern = "/images/pattern-bg.png"; // Light blue water pattern background
const imgArrowIcon = "/images/arrow-icon-2.svg"; // Arrow for the button

// Reusable Icon components for clarity and consistency
const GeneralInquiriesIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const PhoneIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9999 16.5C21.9999 17.0304 21.7892 17.5391 21.4141 17.9142C21.039 18.2893 20.5303 18.5 19.9999 18.5C17.4799 18.5 13.7399 17.55 10.1999 14.1C6.5599 10.56 5.4999 6.82 5.4999 4.3C5.4999 3.76957 5.71062 3.26086 6.08569 2.88579C6.46076 2.51071 6.96947 2.3 7.4999 2.3C8.03033 2.3 8.53904 2.51071 8.91411 2.88579C9.28918 3.26086 9.4999 3.76957 9.4999 4.3C9.4999 5.38 9.9399 6.43 10.2499 6.91C10.5699 7.4 10.3799 8.27 9.9499 8.7L8.8399 9.81C9.6499 11.41 10.9999 12.76 12.5999 13.57L13.7099 12.46C14.1399 12.03 15.0099 11.84 15.4999 12.16C15.9799 12.47 17.0299 12.91 18.1099 12.91C18.6303 12.91 19.139 13.1207 19.5141 13.4958C19.8892 13.8709 20.1099 14.3796 20.1099 14.91C20.1099 15.4404 19.8992 15.9491 19.5241 16.3242C19.149 16.7005 18.7303 17.5 21.9999 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const LocationIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const SocialIcon = ({ path, href }: { path: string; href?: string }) => (
  <a href={href || "#"} className="w-8 h-8 bg-gray-400 hover:bg-[#35c4dd] transition-colors rounded-full flex items-center justify-center">
    <svg className="w-4 h-4 text-[#063f4a]" fill="currentColor" viewBox="0 0 24 24">
      <path d={path}/>
    </svg>
  </a>
);


interface FooterProps {
  customHeading?: string;
  customSubtext?: string;
}

export default function Contact({ customHeading, customSubtext }: FooterProps = {}) {
  const controls = useAnimation();
  
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    message: ''
  });
  
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Spam protection state
  const [honeypotFieldName] = useState('website_url');
  const [honeypotValue, setHoneypotValue] = useState('');
  const [rateLimitStatus, setRateLimitStatus] = useState<{
    allowed: boolean;
    reason?: string;
    waitTime?: number;
  }>({ allowed: true });
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to hidden state when out of view
    }
  }, [controls, inView]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Email is required' });
      return false;
    }
    if (!formData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    if (!privacyPolicyAccepted) {
      setSubmitStatus({ type: 'error', message: 'You must accept the privacy policy to continue' });
      return false;
    }
    if (!consentGiven) {
      setSubmitStatus({ type: 'error', message: 'You must give consent to continue' });
      return false;
    }


    // Check rate limiting
    const rateLimitCheck = spamProtection.canSubmit();
    if (!rateLimitCheck.allowed) {
      setSubmitStatus({ type: 'error', message: rateLimitCheck.reason || 'Submission not allowed at this time' });
      return false;
    }

    // Check honeypot (should be empty)
    if (!spamProtection.validateHoneypot({ [honeypotFieldName]: honeypotValue })) {
      setSubmitStatus({ type: 'error', message: 'Invalid submission detected' });
      return false;
    }

    // Check for suspicious patterns
    if (detectSuspiciousActivity(formData)) {
      setSubmitStatus({ type: 'error', message: 'Suspicious content detected. Please review your message.' });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', formData);
    console.log('Privacy policy accepted:', privacyPolicyAccepted);
    console.log('Consent given:', consentGiven);
    console.log('Honeypot value:', honeypotValue);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, submitting...');
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        // Record successful submission for rate limiting
        spamProtection.recordSubmission();
        
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        // Reset checkboxes
        setPrivacyPolicyAccepted(false);
        setConsentGiven(false);
        // Reset honeypot
        setHoneypotValue('');
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Spring animation variants like Experts section
  const leftVariants: Variants = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const socialLinks = {
    facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    x: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.429 1.44 2.165 3.325 2.165 3.325-.817-.026-1.585-.248-2.25-.616v.05c0 2.28 1.63 4.22 3.79 4.66-.4.11-.82.17-1.25.17-.3 0-.6-.03-.88-.08.6 1.88 2.34 3.24 4.4 3.28-1.62 1.27-3.66 2.03-5.88 2.03-.38 0-.76-.02-1.13-.07 2.1 1.35 4.6 2.15 7.3 2.15 8.7 0 13.4-7.25 13.4-13.45 0-.2 0-.4-.02-.6.92-.66 1.7-1.5 2.32-2.4z",
  };

  return (
    <footer ref={ref} className="relative w-full -pt-8 lg:pt-24 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white" />
        <div 
          className="absolute inset-0 bg-repeat opacity-50"
          style={{ backgroundImage: `url('${imgPattern}')` }}
        />
      </div>

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 lg:px-20 py-12 sm:py-14 md:py-16 lg:py-0"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {(customHeading || customSubtext) && (
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {customHeading && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {customHeading}
              </h2>
            )}
            {customSubtext && (
              <p className="text-sm sm:text-base lg:text-xl text-gray-800 max-w-3xl mx-auto px-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {customSubtext}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10 md:gap-y-12">
          
          {/* Left Column: Text and Contact Info */}
          <motion.div 
            className="pt-6 sm:pt-8 lg:pt-12 text-gray-800"
            variants={leftVariants}
            initial="hidden"
            animate={controls}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contact
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-sm sm:text-base lg:text-xl xl:text-2xl leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Ready to publish your book? Shark Book Publishers is here to support you at every step. Whether you have questions, need expert guidance, or want customized publishing solutions for your manuscript, our team is just a message away. Let's bring your story to life together!
            </p>
            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-12 space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.9999 16.5C21.9999 17.0304 21.7892 17.5391 21.4141 17.9142C21.039 18.2893 20.5303 18.5 19.9999 18.5C17.4799 18.5 13.7399 17.55 10.1999 14.1C6.5599 10.56 5.4999 6.82 5.4999 4.3C5.4999 3.76957 5.71062 3.26086 6.08569 2.88579C6.46076 2.51071 6.96947 2.3 7.4999 2.3C8.03033 2.3 8.53904 2.51071 8.91411 2.88579C9.28918 3.26086 9.4999 3.76957 9.4999 4.3C9.4999 5.38 9.9399 6.43 10.2499 6.91C10.5699 7.4 10.3799 8.27 9.9499 8.7L8.8399 9.81C9.6499 11.41 10.9999 12.76 12.5999 13.57L13.7099 12.46C14.1399 12.03 15.0099 11.84 15.4999 12.16C15.9799 12.47 17.0299 12.91 18.1099 12.91C18.6303 12.91 19.139 13.1207 19.5141 13.4958C19.8892 13.8709 20.1099 14.3796 20.1099 14.91C20.1099 15.4404 19.8992 15.9491 19.5241 16.3242C19.149 16.7005 18.7303 17.5 21.9999 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg">Phone:</h3>
                  <p className="text-sm sm:text-base lg:text-lg">+1 (469) 452-7618</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg">Email:</h3>
                  <p className="text-sm sm:text-base lg:text-lg break-words">contact@sharksbookpublishers.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg">Address:</h3>
                  <p className="text-sm sm:text-base lg:text-lg">22023 Rustic Canyon Ln Richmond, TX 77469, USA.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="bg-[#35c4dd] rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-8 xl:p-12 text-white"
            variants={rightVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {customHeading ? "Let's Get Started" : "Let's Talk About Your Book"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Status Message */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg text-sm font-medium ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium ml-3 sm:ml-4 mb-1">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full h-11 sm:h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium ml-3 sm:ml-4 mb-1">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-11 sm:h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium ml-3 sm:ml-4 mb-1">Phone:</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-11 sm:h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="projectDetails" className="block text-xs sm:text-sm font-medium ml-3 sm:ml-4 mb-1">Select Project Details:</label>
                <select
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="w-full h-11 sm:h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select Project Details</option>
                  <option value="manuscript-review">Manuscript Review</option>
                  <option value="book-editing">Book Editing</option>
                  <option value="cover-design">Cover Design</option>
                  <option value="formatting">Formatting</option>
                  <option value="publishing">Publishing Services</option>
                  <option value="marketing">Marketing & Promotion</option>
                  <option value="full-service">Full Publishing Package</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium ml-3 sm:ml-4 mb-1">Message:</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4} 
                  className="w-full bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
              </div>
              
              {/* Privacy Policy and Consent Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={privacyPolicyAccepted}
                    onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#35c4dd] bg-white border-2 border-white rounded focus:ring-[#35c4dd] focus:ring-2 flex-shrink-0"
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-white/90 leading-relaxed">
                    I have read and agree to the <a href="/privacy-policy" className="text-white underline hover:text-[#d0f7ff] transition-colors">Privacy Policy</a>
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#35c4dd] bg-white border-2 border-white rounded focus:ring-[#35c4dd] focus:ring-2 flex-shrink-0"
                  />
                  <label htmlFor="consent" className="text-sm text-white/90 leading-relaxed">
                    I consent to being contacted by Shark Book Publishers regarding my inquiry and understand that my information will be used in accordance with the privacy policy.
                  </label>
                </div>
              </div>

              {/* Honeypot field - hidden from users */}
              <div style={{ display: 'none' }}>
                <label htmlFor={honeypotFieldName}>Website URL (leave blank):</label>
                <input
                  type="text"
                  id={honeypotFieldName}
                  name={honeypotFieldName}
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>


              {/* Rate limit status */}
              {!rateLimitStatus.allowed && (
                <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 p-3 rounded-lg text-sm">
                  <strong>Rate Limit:</strong> {rateLimitStatus.reason}
                </div>
              )}
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`group flex items-center justify-center gap-3 font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-white text-[#35c4dd] hover:shadow-xl'
                  }`}
                >
                  <span className="relative z-10" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {isSubmitting ? 'Sending...' : 'Get Started'}
                  </span>
                  {!isSubmitting && (
                    <>
                      <span className="bg-[#063f4a] rounded-full p-2.5 relative z-10">
                        <Image src={imgArrowIcon} alt="arrow icon" width={20} height={20} className="lg:w-6 lg:h-6" />
                      </span>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#063f4a] rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
      
      {/* THE FIX: Bottom Footer Bar now has `mt-0` to remove the gap. */}
      <div className="relative z-10 mt-0">
        <div className="bg-[#063f4a] py-4 sm:py-5 lg:py-6">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-20 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 sm:gap-4 lg:gap-6 text-white text-xs sm:text-sm">
            <p className="text-center md:text-left">© 2025 Shark Book Publishers. All Rights Reserved.</p>
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <span className="text-xs sm:text-sm">Follow us:</span>
              <div className="flex items-center gap-2 lg:gap-3">
                <SocialIcon path={socialLinks.facebook} href="https://www.facebook.com/SharksBookPublishers/" />
                <SocialIcon path={socialLinks.linkedin} href="https://www.linkedin.com/company/sharksbookpublishers/posts/?feedView=all" />
                <SocialIcon path={socialLinks.instagram} href="https://www.instagram.com/sharksbookpublishers/" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link href="/news-events" className="hover:text-[#35c4dd] transition-colors">News and Event</Link>
              <span>|</span>
              <a href="#" className="hover:text-[#35c4dd] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}