import Header from './components/Header';
import Services from './components/Services';
import Mission from './components/Mission';
import Quote from './components/Qoute';
import Experts from './components/Experts';
import BookEditing from './components/BookEditing';
import Testimonials from './components/Testimonials';
import AuthorsSection from './components/AuthorsSection';
import Owners from './components/Owners';
// import Careers from './components/careers';
import Opportunities from './components/opportunities';
import AwardWinning from './components/AwardWinning';
import NewsEvents from './components/NewsEvents';
import BookCategories from './components/BookCategories';
// import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* Header includes both header navigation and hero sections as per Figma design */}
      <Header />
      <Experts />
      <BookEditing />
      <AuthorsSection />
      <Testimonials />
      <Mission />
      <Quote />
      <BookCategories />
      <AwardWinning />
      <Owners />
      <Services />
      <NewsEvents />
      <Opportunities />
      <Footer />
      {/* <Careers /> */}
    </div>
  );
}
