import { Link } from 'react-router-dom';
import { Play, ArrowRight, Music, Headphones, Mic, Volume2, Zap, Star, Users, Calendar, Award } from 'lucide-react';
import Aurora from './Aurora';
import CircularGallery from './CircularGallery';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const rotatingTexts = [
    "DISCOVER YOUR SOUND",
    "CREATE YOUR LEGACY", 
    "UNLEASH YOUR PASSION",
    "FIND YOUR VOICE"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-passionate-black overflow-hidden">
      {/* Advanced Background System */}
      <div className="absolute inset-0 z-0">
        {/* Primary Aurora */}
        <Aurora 
          colorStops={["#000000", "#FF0000", "#330000", "#FF0000", "#000000"]}
          amplitude={1.2}
          blend={0.8}
          speed={0.4}
        />
        
        {/* Secondary Aurora - Perpendicular Movement */}
        <div className="absolute inset-0 opacity-60">
          <Aurora 
            colorStops={["#FF0000", "#000000", "#FF0000"]}
            amplitude={0.8}
            blend={0.6}
            speed={0.7}
          />
        </div>
      </div>

      {/* Dynamic Mesh Gradient */}
      <div className="absolute inset-0 z-5">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, #FF0000 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Large Floating Circles */}
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-passionate-red/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 border border-passionate-red/10 rounded-full animate-pulse"></div>
        
        {/* Floating Music Icons with Advanced Animation */}
        <div className="absolute top-1/4 left-1/4 text-passionate-red/15 animate-float-complex">
          <Music size={140} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-passionate-red/10 animate-float-reverse" style={{animationDelay: '2s'}}>
          <Headphones size={100} />
        </div>
        <div className="absolute bottom-1/3 left-1/6 text-passionate-red/12 animate-float-diagonal" style={{animationDelay: '4s'}}>
          <Mic size={120} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-passionate-red/8 animate-bounce-slow" style={{animationDelay: '1s'}}>
          <Volume2 size={110} />
        </div>

        {/* Particle System */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-passionate-red rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content with Advanced Layout */}
      <div className="container mx-auto px-6 text-center relative z-20 pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Premium Status Badge */}
          <div className="inline-flex items-center space-x-3 bg-passionate-red/10 backdrop-blur-xl border border-passionate-red/30 rounded-full px-8 py-4 mb-12 animate-fade-in shadow-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-passionate-red rounded-full animate-pulse"></div>
              <span className="text-passionate-white/90 text-sm font-syncopate tracking-wider">LIVE NOW</span>
            </div>
            <div className="w-px h-4 bg-passionate-red/30"></div>
            <span className="text-passionate-white/80 text-sm font-medium">🎵 Underground Revolution</span>
            <Zap className="w-5 h-5 text-passionate-red animate-pulse" />
          </div>

          {/* Revolutionary Main Heading */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-passionate-white mb-6 leading-[0.85] tracking-tight">
              <span className="block bg-gradient-to-r from-passionate-white via-passionate-white to-passionate-red bg-clip-text text-transparent mb-4">
                IGNITE THE
              </span>
              <span className="bg-passionate-red text-passionate-white px-6 py-3 rounded-2xl font-syncopate relative inline-block transform hover:scale-105 transition-all duration-300 shadow-2xl">
                UNDERGROUND
                <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-passionate-red via-passionate-red/50 to-transparent rounded-full"></div>
                <div className="absolute inset-0 bg-passionate-red/20 rounded-2xl blur-xl"></div>
              </span>
            </h1>
          </div>

          {/* Dynamic Rotating Subtitle */}
          <div className="mb-8 h-20 flex items-center justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-passionate-white/90 font-syncopate tracking-wider transition-all duration-1000 transform">
              {rotatingTexts[currentTextIndex]}
            </h2>
          </div>

          {/* Enhanced Description with Floating Elements */}
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-lg sm:text-xl lg:text-2xl text-passionate-white/80 mb-4 max-w-4xl mx-auto leading-relaxed">
              Where <span className="bg-passionate-red text-passionate-white px-3 py-1 rounded-lg font-semibold">passion meets innovation</span> in music creation
            </p>
            <p className="text-md sm:text-lg text-passionate-white/60 max-w-3xl mx-auto">
              Join thousands of visionary artists revolutionizing the underground music scene
            </p>
          </div>

          {/* Advanced CTA Section with Glassmorphism */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Link
              to="/submit-demo"
              className="group relative px-12 py-6 bg-passionate-red text-passionate-white font-bold text-lg rounded-2xl hover:bg-passionate-red/90 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center space-x-4">
                <Play className="w-7 h-7 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-syncopate tracking-wider">START YOUR JOURNEY</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-passionate-red/0 via-passionate-white/10 to-passionate-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-2xl bg-passionate-red/30 blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10"></div>
            </Link>
            
            <Link
              to="/explore"
              className="group flex items-center space-x-3 px-10 py-5 border-2 border-passionate-white/40 text-passionate-white hover:border-passionate-red hover:bg-passionate-red/10 rounded-2xl transition-all duration-500 backdrop-blur-xl bg-passionate-black/20"
            >
              <Music className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-syncopate font-semibold tracking-wider">EXPLORE MUSIC</span>
            </Link>
          </div>

          {/* Premium Stats Grid with Advanced Design */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-slide-up" style={{animationDelay: '0.8s'}}>
            {[
              { icon: Users, value: "50K+", label: "Active Artists", color: "from-passionate-red to-red-600" },
              { icon: Music, value: "1M+", label: "Songs Created", color: "from-passionate-red to-pink-600" },
              { icon: Calendar, value: "150+", label: "Countries", color: "from-passionate-red to-orange-600" },
              { icon: Award, value: "24/7", label: "Support", color: "from-passionate-red to-red-700" }
            ].map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="bg-passionate-gray/10 backdrop-blur-xl border border-passionate-gray/20 hover:border-passionate-red/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
                  <div className="w-12 h-12 mx-auto mb-4 bg-passionate-red/20 rounded-xl flex items-center justify-center group-hover:bg-passionate-red/30 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-passionate-red" />
                  </div>
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-passionate-white/70 text-sm font-syncopate tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Action Panels */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{animationDelay: '1s'}}>
            {[
              { 
                title: "Submit Demo", 
                desc: "Share your sound", 
                icon: Mic, 
                link: "/submit-demo",
                accent: "bg-passionate-red/20 border-passionate-red/30"
              },
              { 
                title: "Join Artists", 
                desc: "Become part of us", 
                icon: Users, 
                link: "/artists",
                accent: "bg-passionate-red/10 border-passionate-red/20"
              },
              { 
                title: "Live Events", 
                desc: "Experience the energy", 
                icon: Calendar, 
                link: "/events",
                accent: "bg-passionate-red/15 border-passionate-red/25"
              }
            ].map((panel, index) => (
              <Link
                key={index}
                to={panel.link}
                className={`group ${panel.accent} backdrop-blur-xl border rounded-2xl p-6 hover:bg-passionate-red/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl`}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 bg-passionate-red/30 rounded-xl flex items-center justify-center group-hover:bg-passionate-red/50 transition-all duration-300">
                    <panel.icon className="w-5 h-5 text-passionate-white" />
                  </div>
                  <div>
                    <h3 className="text-passionate-white font-syncopate font-bold tracking-wider">{panel.title}</h3>
                    <p className="text-passionate-white/60 text-sm">{panel.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-passionate-red group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Enhanced Featured Artists Section */}
        <div className="relative w-full animate-slide-up" style={{animationDelay: '1.2s'}}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-syncopate font-bold text-passionate-white mb-4 tracking-wider">
              FEATURED <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">ARTISTS</span>
            </h3>
            <p className="text-passionate-white/60">Discover the voices shaping tomorrow's sound</p>
          </div>
          <div style={{ height: '600px', position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-passionate-black via-passionate-black/80 to-transparent z-30"></div>
      
      {/* Floating Cursor Effect */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-passionate-red/30 pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </section>
  );
};

export default Hero;
