import AmazonHeader from '../components/AmazonHeader';
import AuthorsSection from '../components/AuthorsSection';
import Footer from '../components/Footer';

export default function AuthorsPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Published Authors"
        heroSubtitle="Our Authors Are Making Waves."
      />
      <AuthorsSection />
      <Footer />
    </div>
  );
}
