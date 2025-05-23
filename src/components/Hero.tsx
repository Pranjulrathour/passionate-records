
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center passionate-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-passionate-red rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-passionate-red rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-passionate-red rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Heading */}
        <div className="animate-slide-up">
          <h1 className="font-syncopate font-bold text-4xl sm:text-6xl lg:text-8xl text-passionate-white mb-6 tracking-wider text-shadow">
            FEEL THE
            <span className="block text-passionate-red animate-glow">BEAT</span>
          </h1>
          
          <h2 className="font-syncopate font-bold text-2xl sm:text-4xl lg:text-5xl text-passionate-white mb-8 tracking-wider text-shadow">
            LIVE THE PASSION
          </h2>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in delay-300">
          <p className="text-lg sm:text-xl lg:text-2xl text-passionate-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            India's premier indie music label. Where underground artists become legends and passion becomes profession.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/artists"
            className="group bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 rounded-none border-2 border-passionate-red hover:border-passionate-red-dark transition-all duration-300 flex items-center space-x-3 red-glow tracking-wider"
          >
            <span>EXPLORE ARTISTS</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/submit-demo"
            className="group bg-transparent hover:bg-passionate-red/10 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-none border-2 border-passionate-white hover:border-passionate-red transition-all duration-300 flex items-center space-x-3 tracking-wider"
          >
            <Play className="h-5 w-5 group-hover:text-passionate-red transition-colors" />
            <span>SUBMIT YOUR DEMO</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-passionate-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-passionate-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
