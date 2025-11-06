import AmazonHeader from '../components/AmazonHeader';
import ServicesIc from '../components/ServicesIc';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Our Services"
        heroSubtitle="Complete Publishing Solutions to Bring Your Book to Life."
      />
      <ServicesIc />
      <Footer />
    </div>
  );
}

