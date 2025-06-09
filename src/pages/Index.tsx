
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedArtists from '../components/FeaturedArtists';
import LatestReleases from '../components/LatestReleases';
import UpcomingEvents from '../components/UpcomingEvents';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedArtists />
      <LatestReleases />
      <UpcomingEvents />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
