
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Music, Headphones, Mic, Volume2, Zap } from 'lucide-react';
import Aurora from './Aurora';
import CircularGallery from './CircularGallery';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-passionate-black overflow-hidden">
      {/* Enhanced Aurora Background - Centered Gradient Effect */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#000000", "#FF0000", "#000000"]}
          amplitude={0.8}
          blend={0.7}
          speed={0.3}
        />
      </div>
      
      {/* Secondary Aurora Layer - Radial Glow */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Aurora 
          colorStops={["#FF0000", "#330000", "#FF0000"]}
          amplitude={0.5}
          blend={0.4}
          speed={0.6}
        />
      </div>

      {/* Radial Gradient Overlay for Center Focus */}
      <div className="absolute inset-0 z-5 bg-gradient-radial from-transparent via-passionate-red/5 to-passionate-black/30"></div>

      {/* Floating Music Icons Background */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-passionate-red/10 animate-float">
          <Music size={120} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-passionate-red/5 animate-float" style={{animationDelay: '2s'}}>
          <Headphones size={80} />
        </div>
        <div className="absolute bottom-1/3 left-1/6 text-passionate-red/8 animate-float" style={{animationDelay: '4s'}}>
          <Mic size={100} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-passionate-red/6 animate-float" style={{animationDelay: '1s'}}>
          <Volume2 size={90} />
        </div>
      </div>

      {/* Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-passionate-black/20 via-transparent to-passionate-black/40"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10 pt-20 pb-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center space-x-2 bg-passionate-red/10 backdrop-blur-sm border border-passionate-red/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-passionate-red rounded-full animate-pulse"></div>
            <span className="text-passionate-white/90 text-sm font-medium">🎵 Now Live: AI-Powered Music Discovery</span>
            <Zap className="w-4 h-4 text-passionate-red" />
          </div>

          {/* Main Heading with Enhanced Typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-passionate-white mb-6 leading-[0.9] tracking-tight animate-slide-up">
            <span className="block bg-gradient-to-r from-passionate-white via-passionate-white to-passionate-red bg-clip-text text-transparent">
              Discover
            </span>
            <span className="block text-passionate-red font-syncopate relative">
              Your Sound
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-passionate-red to-transparent"></div>
            </span>
          </h1>

          {/* Dynamic Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-passionate-white/80 mb-3 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Where <span className="text-passionate-red font-semibold">passion meets innovation</span> in music creation
          </p>
          <p className="text-md sm:text-lg text-passionate-white/60 mb-10 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Join thousands of artists revolutionizing music discovery and collaboration
          </p>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Link
              to="/submit-demo"
              className="group relative px-10 py-5 bg-passionate-red text-passionate-white font-bold text-lg rounded-full hover:bg-passionate-red/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg red-glow"
            >
              <div className="flex items-center space-x-3">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 rounded-full bg-passionate-red/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </Link>
            
            <Link
              to="/explore"
              className="group flex items-center space-x-2 px-8 py-4 border-2 border-passionate-white/30 text-passionate-white hover:border-passionate-white hover:bg-passionate-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Music className="w-5 h-5" />
              <span className="font-semibold">Explore Music</span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-passionate-red mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-passionate-white/70 text-sm">Active Artists</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-passionate-red mb-2 group-hover:scale-110 transition-transform">1M+</div>
              <div className="text-passionate-white/70 text-sm">Songs Uploaded</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-passionate-red mb-2 group-hover:scale-110 transition-transform">150+</div>
              <div className="text-passionate-white/70 text-sm">Countries</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-passionate-red mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-passionate-white/70 text-sm">Support</div>
            </div>
          </div>

        </div>
        
        {/* Featured Artists Circular Gallery - Full Width */}
        <div className="relative w-full animate-slide-up" style={{animationDelay: '1s'}}>
          <div style={{ height: '600px', position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-passionate-black to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
