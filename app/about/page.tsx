import AmazonHeader from '../components/AmazonHeader';
import Experts from '../components/Experts';
import Mission from '../components/Mission';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Our Story"
        heroSubtitle="We're on a Mission to Empower Authors."
      />
      <Experts 
        title="From a Writer's Dream to a Publisher's Mission"
        subtitle="Shark Book Publisher was founded by a team of industry veterans who saw how difficult and expensive it was for new authors to get published. We wanted to create a company that combined the professionalism of traditional publishing with the freedom and control of self-publishing. Our mission is to democratize the publishing industry, one book at a time."
        badgeText="About Us"
        showCheckpoints={false}
        sharkPositionRight={true}
      />
      <Mission />
      <Footer />
    </div>
  );
}
