
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, ExternalLink, Calendar, Music2, Headphones } from 'lucide-react';

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
          <div className="bg-passionate-gray/20 border border-passionate-gray p-12 rounded-2xl animate-fade-in">
            <Music2 className="h-16 w-16 text-passionate-red mx-auto mb-6" />
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-4 tracking-wider">
              NEW MUSIC DROPPING SOON
            </h2>
            <p className="text-passionate-white/70 text-lg mb-8 leading-relaxed">
              We're currently working with our talented roster of underground artists to bring you the freshest sounds. 
              Our debut releases featuring electronic, hip-hop, and experimental tracks will drop soon. 
              Subscribe to stay updated on release dates and exclusive previews.
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Headphones className="h-8 w-8 text-passionate-red mx-auto mb-3" />
                <h3 className="font-syncopate font-bold text-passionate-white text-sm mb-2 tracking-wider">
                  HIGH QUALITY AUDIO
                </h3>
                <p className="text-passionate-white/60 text-sm">
                  All releases in lossless quality
                </p>
              </div>
              <div className="text-center">
                <Play className="h-8 w-8 text-passionate-red mx-auto mb-3" />
                <h3 className="font-syncopate font-bold text-passionate-white text-sm mb-2 tracking-wider">
                  EXCLUSIVE CONTENT
                </h3>
                <p className="text-passionate-white/60 text-sm">
                  Behind-the-scenes and artist interviews
                </p>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 text-passionate-red mx-auto mb-3" />
                <h3 className="font-syncopate font-bold text-passionate-white text-sm mb-2 tracking-wider">
                  REGULAR DROPS
                </h3>
                <p className="text-passionate-white/60 text-sm">
                  New releases every month
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/submit-demo"
                className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow rounded-xl"
              >
                SUBMIT YOUR DEMO
              </a>
              <a
                href="/artists"
                className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 rounded-xl"
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
