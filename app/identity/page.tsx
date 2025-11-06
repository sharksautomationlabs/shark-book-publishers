import AmazonHeader from '../components/AmazonHeader';
import CareersOpportunities from '../components/CareersOpportunities';
import Footer from '../components/Footer';

export default function CareersPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Careers"
        heroSubtitle="Join Us on Our Mission."
      />
      <CareersOpportunities />
      <Footer />
    </div>
  );
}
