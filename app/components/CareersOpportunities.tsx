'use client';

import React from 'react';
import Image from 'next/image';

// Assuming the path to the mask SVG is correct from the original code.
// This SVG is responsible for the custom shape of the images.
const imgCardMask = "/images/service-mask.svg";

// Data for the two cards, updated to match the image content exactly.
const cardData = [
  {
    title: "Departments:",
    description: "Editorial, Design, Marketing, Production, Sales, Rights, Audio, Digital, Finance, HR.",
    // Placeholder for the actual image path.
    backgroundImage: "/images/departments-image.png",
  },
  {
    title: "Opportunities:",
    description: "Full-time roles, internships, and freelance partnerships.",
    // Placeholder for the actual image path.
    backgroundImage: "/images/opportunities-image.png",
  }
];

/**
 * A reusable Card component to display an image with a title and description.
 * The image is shaped by a CSS mask.
 */
const InfoCard = ({ title, description, backgroundImage }: {
  title: string;
  description: string;
  backgroundImage: string;
}) => (
  <div className="flex flex-col items-center text-center">
    {/* Container for the image that will have the mask applied */}
    <div
      className="relative w-full max-w-sm h-64 md:h-72"
      style={{
        maskImage: `url('${imgCardMask}')`,
        maskSize: '100% 100%', // Stretches the mask to fit the container
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    >
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover" // Ensures the image covers the container
      />
    </div>

    {/* Text content below the image */}
    <div className="mt-6 px-2">
      <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Barlow', sans-serif" }}>
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-800" style={{ fontFamily: "'Barlow', sans-serif" }}>
        {description}
      </p>
    </div>
  </div>
);

/**
 * The main section component, refactored to match the provided image.
 */
export default function PassionateStorytellersSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">

        {/* Header: Title, Subtitle, and Button */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black" style={{ fontFamily: "'Barlow', sans-serif" }}>
            We're Looking For Passionate Storytellers.
          </h1>
          <p className="mt-4 text-lg text-gray-700" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Sharks Book Publisher is growing. If you're passionate about empowering authors and believe in the power of a great story, we'd love to hear from you.
          </p>
          <div className="mt-8">
            <button
              className="relative inline-flex items-center justify-center bg-[#25d3e6] hover:bg-[#22c1d1] transition-colors duration-300 rounded-full py-3 pl-8 pr-12 text-black font-bold text-lg shadow-md"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Apply Now
              {/* White circle on the right side of the button */}
              <span className="absolute right-[0.4rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Cards Section: Displays Departments and Opportunities */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 lg:gap-x-16 max-w-5xl mx-auto">
          {cardData.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}