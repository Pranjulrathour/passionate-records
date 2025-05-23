
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, ExternalLink, Calendar } from 'lucide-react';

const Releases = () => {
  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            LATEST
            <span className="text-passionate-red"> RELEASES</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Fresh sounds from our underground collective. Experience the passion, feel the beat.
          </p>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-passionate-gray/20 border border-passionate-gray p-12 animate-fade-in">
            <Calendar className="h-16 w-16 text-passionate-red mx-auto mb-6" />
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-4 tracking-wider">
              RELEASES COMING SOON
            </h2>
            <p className="text-passionate-white/70 text-lg mb-8 leading-relaxed">
              We're currently working with our artists to bring you the best underground music. 
              Our first official releases will drop soon. Stay tuned for updates!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/submit-demo"
                className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow"
              >
                SUBMIT YOUR DEMO
              </a>
              <a
                href="/artists"
                className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300"
              >
                MEET OUR ARTISTS
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Releases;
