import AmazonHeader from '../components/AmazonHeader';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

export default function NewsEventsPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="News & Events"
        heroSubtitle="The Latest From the Publishing World & Sharks Book Publisher."
      />
      <Blog />

      <Footer />
    </div>
  );
}
