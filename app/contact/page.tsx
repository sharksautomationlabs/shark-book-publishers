import AmazonHeader from '../components/AmazonHeader';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Get Published"
        heroSubtitle="Your Journey Starts Here."
      />
      <Footer 
        customHeading="Ready to Start Your Publishing Journey?"
        customSubtext="We're here to answer all your questions. Fill out the form below or reach out directly, and a member of our team will get back to you shortly."
      />
    </div>
  );
}
