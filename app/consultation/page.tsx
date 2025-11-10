import EcommerceAutomationExperts from '../components/EcommerceAutomationExperts';
import CallProcess from '../components/CallProcess';
import StrategyCall from '../components/StrategyCall';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import CTAFooter from '../components/CTAFooter';
import Footer from '../components/Footer';
import ThankYouHeader from '../components/ThankYouHeader';

export default function EcommerceAutomationPage() {
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
