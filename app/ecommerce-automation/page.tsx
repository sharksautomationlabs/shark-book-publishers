import Header from '../components/ThankYouHeader';
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
      name: "John Smith",
      subtitle: "Successful Investor",
      review: "I was skeptical at first, but Ecom Sharks delivered exactly what they promised. My store is truly hands-off and the returns are amazing. It's a game-changer!",
      rating: 5,
      postDate: "Dec 15, 2024",
      replyDate: "Dec 16, 2024",
      profileImage: "/images/Dummy-profile/Alex-Chen.png"
    },
    {
      name: "Sarah Lee",
      subtitle: "Entrepreneur",
      review: "The passive income is real! I've been able to focus on my main job while my e-commerce store generates profit in the background. Couldn't be happier with the results.",
      rating: 5,
      postDate: "Nov 28, 2024",
      replyDate: "Nov 29, 2024",
      profileImage: "/images/Dummy-profile/Amanda-Foster.png"
    },
    {
      name: "Michael Rodriguez",
      subtitle: "Business Owner",
      review: "Ecom Sharks transformed my business completely. The automation system works flawlessly and I'm seeing consistent profits every month. Best investment I've ever made!",
      rating: 5,
      postDate: "Jan 8, 2025",
      replyDate: "Jan 9, 2025",
      profileImage: "/images/Dummy-profile/Michael-Chen.png"
    }
  ];

  return (
    <div className="w-full bg-white">
      <ThankYouHeader
        heroTitle="The Only E-commerce Investment with a Guaranteed Return"
        heroSubtitle="The Done-For-You System That Gets You to $4,000 in 90 Days—or We Work for Free."
      />
      <EcommerceAutomationExperts 
        title="About Us"
        subtitle="We've helped investors and entrepreneurs just like you launch profitable, hands-off e-commerce stores. Our proven system handles everything from product sourcing to fulfillment, so you can earn truly passive income without the guesswork."
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
