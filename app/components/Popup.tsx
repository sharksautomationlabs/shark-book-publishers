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
    email: '',
    phone: ''
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Prepare form data for emailjs (add empty message since it's required)
      const emailData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: 'Popup form submission'
      };

      const result = await sendContactEmail(emailData);
      
      if (result.success) {
        // Record successful submission for rate limiting
        spamProtection.recordSubmission();
        
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: ''
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
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setShowImagePopup(false)}
    >
      <div 
        className="relative max-w-5xl w-full mx-4 flex items-center justify-center animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowImagePopup(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close popup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#063f4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Image Container - Display the image directly */}
        <div className="relative w-full flex items-center justify-center">
          <img
            src="/images/Popup.png"
            alt="Popup Image"
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            style={{ display: 'block' }}
          />
          
          {/* Form Fields - Positioned on the image, slightly to the right */}
          <form onSubmit={handleSubmit} className="absolute right-[18%] top-[56%] -translate-y-1/2 w-full max-w-[280px] space-y-4">
            {/* Status Message */}
            {submitStatus.type && (
              <div className={`p-3 rounded-lg text-xs font-medium ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/95 backdrop-blur-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/95 backdrop-blur-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-[#35c4dd] focus:outline-none text-[#063f4a] placeholder-gray-400 bg-white/95 backdrop-blur-sm"
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
            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`group flex items-center justify-between w-full h-[52px] bg-[#35c4dd] text-[#063f4a] font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2 ${
                  isSubmitting 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : ''
                }`}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <span className="relative z-10 pl-3 whitespace-nowrap">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </span>
                {!isSubmitting && (
                  <>
                    <span className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center relative z-10 flex-shrink-0 -ml-2">
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

