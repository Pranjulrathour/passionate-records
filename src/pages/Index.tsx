
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedArtists from '../components/FeaturedArtists';
import LatestReleases from '../components/LatestReleases';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      <Hero />
      <FeaturedArtists />
      <LatestReleases />
      <Footer />
    </div>
  );
};

export default Index;
