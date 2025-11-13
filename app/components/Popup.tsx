'use client';

import { useEffect, useRef, useState } from 'react';
import { sendContactEmail, ContactFormData } from '../utils/emailjs';
import { spamProtection } from '../utils/spamProtection';

export default function Popup() {
  const [showImagePopup, setShowImagePopup] = useState(false);
  const popupOpenedRef = useRef(false);
  const initialScrollYRef = useRef<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Spam protection state
  const [honeypotFieldName] = useState('website_url');
  const [honeypotValue, setHoneypotValue] = useState('');

  // Open image popup when user starts scrolling
  useEffect(() => {
    // Set initial scroll position
    if (initialScrollYRef.current === null) {
      initialScrollYRef.current = window.scrollY;
    }

    const handleScroll = () => {
      // Check if user has scrolled (even a small amount)
      const currentScrollY = window.scrollY;
      const hasScrolled = initialScrollYRef.current !== null && 
                         Math.abs(currentScrollY - initialScrollYRef.current) > 10;

      // Open popup only once when user starts scrolling
      if (hasScrolled && !popupOpenedRef.current) {
        popupOpenedRef.current = true;
        setShowImagePopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: 'Phone number is required' });
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

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare form data for emailjs
      const emailData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || 'Popup form submission'
      };

      const result = await sendContactEmail(emailData);
      
      if (result.success) {
        // Record successful submission for rate limiting
        spamProtection.recordSubmission();
        
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
        // Reset honeypot
        setHoneypotValue('');
        
        // Close popup after 2 seconds on success
        setTimeout(() => {
          setShowImagePopup(false);
        }, 2000);
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

  if (!showImagePopup) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn p-2 sm:p-4"
      onClick={() => setShowImagePopup(false)}
    >
      <div 
        className="relative max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl w-full flex items-center justify-center animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container - Display the image directly */}
        <div className="relative w-full flex items-center justify-center">
          {/* Desktop Image - ONLY on desktop (1024px and above) - NEVER on mobile */}
          <img
            src="/images/popup_final.png"
            alt="Desktop Popup Image"
            className="hidden lg:block max-w-full max-h-[98vh] w-auto h-auto object-contain"
          />
          {/* Mobile/Tablet Image - ONLY on mobile/tablet (below 1024px) - NEVER on desktop */}
          <img
            src="/images/mob_popup.png"
            alt="Mobile Popup Image"
            className="block lg:hidden max-w-full max-h-[98vh] w-auto h-auto object-contain"
          />
          
          {/* Close Button - Pixel perfect positioning for mobile and desktop */}
          {/* Mobile/Tablet: Positioned for mob_popup.png */}
          {/* Desktop: Positioned for popup_final.png */}
          <button
            onClick={() => setShowImagePopup(false)}
            className="absolute z-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer
              top-[60px] right-[103px] w-4 h-4
              sm:top-[85px] sm:right-[22px] sm:w-7 sm:h-7
              md:top-[92px] md:right-[28px] md:w-8 md:h-8
              lg:top-[111px] lg:right-[9%] lg:w-8 lg:h-8 lg:-translate-x-[65px]"
            aria-label="Close popup"
          >
            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#063f4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Form Fields - Pixel perfect positioning for mobile, tablet, and desktop */}
          {/* Mobile: Fields positioned in gradient box of mob_popup.png - Pixel Perfect */}
          {/* Desktop: Fields positioned in gradient box of popup_final.png - Pixel Perfect */}
          <form onSubmit={handleSubmit} className="absolute z-10
            left-[48%] top-[calc(52%+10px)] translate-x-[calc(-50%+20px)] w-[30%] max-w-[90px] pt-0.5 space-y-0
            sm:right-[6.5%] sm:top-[31%] sm:w-[37%] sm:max-w-[275px] sm:pt-3.5 sm:space-y-[13px] sm:left-auto sm:translate-x-0
            md:right-[7.5%] md:top-[29%] md:w-[35%] md:max-w-[315px] md:pt-5.5 md:space-y-[13px]
            lg:right-[9%] lg:top-[30%] lg:w-[32%] lg:max-w-[380px] lg:pt-8 lg:space-y-[13px] lg:-translate-x-[70px]">
            {/* Status Message */}
            {submitStatus.type && (
              <div className={`rounded-lg font-medium
                p-0.5 text-[6px]
                sm:p-2 sm:text-[10px]
                md:p-2.5 md:text-xs
                lg:p-3 lg:text-xs
                ${submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Name Field - Required */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border border-gray-300 sm:border-2 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/98 backdrop-blur-sm transition-all duration-200
                  px-1 py-0 text-[9px] leading-tight
                  sm:px-4 sm:py-1 sm:text-sm sm:leading-normal
                  md:px-5 md:py-1.5 md:text-base md:leading-normal
                  lg:px-5 lg:py-1 lg:text-lg lg:leading-normal"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>

            {/* Phone Field - Required */}
            <div className="-mt-[4px] sm:mt-0">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border border-gray-300 sm:border-2 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/98 backdrop-blur-sm transition-all duration-200
                  px-1 py-0 text-[9px] leading-tight
                  sm:px-4 sm:py-1 sm:text-sm sm:leading-normal
                  md:px-5 md:py-1.5 md:text-base md:leading-normal
                  lg:px-5 lg:py-1 lg:text-lg lg:leading-normal"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>

            {/* Email Field - Required */}
            <div className="-mt-[4px] sm:mt-0">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border border-gray-300 sm:border-2 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/98 backdrop-blur-sm transition-all duration-200
                  px-1 py-0 text-[9px] leading-tight
                  sm:px-4 sm:py-1 sm:text-sm sm:leading-normal
                  md:px-5 md:py-1.5 md:text-base md:leading-normal
                  lg:px-5 lg:py-1 lg:text-lg lg:leading-normal"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>

            {/* Message Field - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:block">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 sm:border-2 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/98 backdrop-blur-sm transition-all duration-200 resize-none overflow-y-auto
                  px-1 py-0 text-[9px] max-h-[38px] leading-tight
                  sm:px-4 sm:py-0 sm:text-sm sm:max-h-[78px] sm:leading-normal
                  md:px-5 md:py-0 md:text-base md:max-h-[98px] md:leading-normal
                  lg:px-5 lg:py-0 lg:text-lg lg:max-h-[110px] lg:leading-normal"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>

            {/* Honeypot field - hidden from users */}
            <div style={{ display: 'none' }}>
              <input
                type="text"
                name={honeypotFieldName}
                value={honeypotValue}
                onChange={(e) => setHoneypotValue(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-0 mt-[5px] sm:-mt-2 md:-mt-2 lg:-mt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`group flex items-center justify-center w-full bg-[#35c4dd] text-[#063f4a] font-bold rounded-full shadow-lg overflow-hidden relative transition-all duration-200
                  h-[11px] text-[9px] p-0.5 leading-tight
                  sm:h-[38px] sm:text-sm sm:p-1.5 sm:justify-between sm:leading-normal
                  md:h-[42px] md:text-base md:p-2 md:justify-between md:leading-normal
                  lg:h-[44px] lg:text-xl lg:p-2 lg:justify-between lg:leading-normal ${
                  isSubmitting 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'hover:bg-[#2db3c9] active:scale-[0.98]'
                }`}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <span className="relative z-10 pl-0 sm:pl-4 whitespace-nowrap">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </span>
                {!isSubmitting && (
                  <>
                    <span className="hidden sm:flex bg-white rounded-full w-[22px] h-[22px] md:w-[26px] md:h-[26px] items-center justify-center relative z-10 flex-shrink-0 -ml-2">
                    </span>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

