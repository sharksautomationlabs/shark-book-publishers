import AmazonHeader from '../components/AmazonHeader';
import BookCategories from '../components/BookCategories';
import Footer from '../components/Footer';

export default function BooksPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader 
        heroTitle="Books"
        heroSubtitle="Discover Stories Published by Sharks Book Publisher."
      />
      <BookCategories />
      <Footer />
    </div>
  );
}

