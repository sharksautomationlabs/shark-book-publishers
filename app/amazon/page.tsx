'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { User } from 'lucide-react';
import AmazonHeader from '../components/AmazonHeader';
import Footer from '../components/Footer';
import { allTestimonials } from '../components/testimonials-data';

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          // Full star
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
              <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="currentColor"/>
            </svg>
          );
        } else if (i === fullStars && hasHalfStar) {
          // Half star
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
              <defs>
                <linearGradient id={`half-star-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#14b8a6"/>
                  <stop offset="50%" stopColor="#d1d5db"/>
                </linearGradient>
              </defs>
              <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill={`url(#half-star-${i})`}/>
            </svg>
          );
        } else {
          // Empty star
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
              <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="currentColor"/>
            </svg>
          );
        }
      })}
    </div>
  );
};

function TestimonialsContent() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');

  useEffect(() => {
    if (selectedId) {
      setTimeout(() => {
        const element = document.getElementById(`testimonial-${selectedId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedId]);

  return (
    <section className="w-full bg-gray-50 py-12 lg:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl lg:text-6xl font-extrabold mb-4 text-black"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            What Our Clients Say
          </h1>
          <p className="text-gray-600 text-lg">
            Real reviews from real authors — your success is our best story.
          </p>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              id={`testimonial-${testimonial.id}`}
              onClick={() => {
                const element = document.getElementById(`testimonial-${testimonial.id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`bg-white rounded-xl p-6 text-left shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedId === testimonial.id ? 'border-2 border-[#35c4dd]' : 'border border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200 border-2 border-[#35c4dd]">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black" style={{ fontFamily: "'Barlow', sans-serif" }}>{testimonial.name}</h3>
                    <div className="mt-1">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{testimonial.postDate}</span>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {testimonial.review}
              </p>
              <div className="border-t border-gray-300 pt-4 mt-4">
                <p className="text-xs text-gray-500">Replied on {testimonial.replyDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Client Testimonials"
        heroSubtitle="Real stories from authors who've transformed their dreams into published books with us."
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
