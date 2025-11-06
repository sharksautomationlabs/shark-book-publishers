import emailjs from '@emailjs/browser';

// EmailJS configuration with fallback to hardcoded values
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_uolm7ok';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_70gjs9o';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'bRJBfQs6jrEPpYTqx';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectDetails?: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('EmailJS Debug - Form data:', formData);
    console.log('EmailJS Debug - Environment variables:', {
      SERVICE_ID: EMAILJS_SERVICE_ID,
      TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
    });
    console.log('EmailJS Debug - Raw process.env:', {
      SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    });
    
    // Validate required environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS configuration is missing. Please check your environment variables.');
      console.log('Current values:', {
        SERVICE_ID: EMAILJS_SERVICE_ID,
        TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });
      
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      projectDetails: formData.projectDetails || 'Not specified',
      message: formData.message,
      to_email: 'contact@sharksbookpublishers.com', // Your business email
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    };
  }
};
