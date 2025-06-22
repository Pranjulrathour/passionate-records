
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Music, Mic, Camera, Users, Headphones, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Music,
      title: "MUSIC PRODUCTION",
      description: "PROFESSIONAL RECORDING, MIXING, AND MASTERING SERVICES WITH STATE-OF-THE-ART EQUIPMENT.",
      features: ["PROFESSIONAL RECORDING", "MIXING & MASTERING", "ARRANGEMENT", "SOUND DESIGN"]
    },
    {
      icon: Mic,
      title: "ARTIST DEVELOPMENT",
      description: "COMPREHENSIVE ARTIST COACHING AND CAREER DEVELOPMENT TO TAKE YOUR MUSIC TO THE NEXT LEVEL.",
      features: ["VOCAL COACHING", "PERFORMANCE TRAINING", "BRAND DEVELOPMENT", "CAREER GUIDANCE"]
    },
    {
      icon: Camera,
      title: "MUSIC VIDEOS",
      description: "CREATIVE MUSIC VIDEO PRODUCTION FROM CONCEPT TO FINAL CUT WITH CINEMATIC QUALITY.",
      features: ["CONCEPT DEVELOPMENT", "CINEMATOGRAPHY", "POST-PRODUCTION", "VISUAL EFFECTS"]
    },
    {
      icon: Users,
      title: "MARKETING & PROMOTION",
      description: "STRATEGIC MARKETING CAMPAIGNS TO BUILD YOUR FANBASE AND INCREASE YOUR REACH.",
      features: ["SOCIAL MEDIA STRATEGY", "PLAYLIST PLACEMENT", "PR CAMPAIGNS", "DIGITAL MARKETING"]
    },
    {
      icon: Headphones,
      title: "DISTRIBUTION",
      description: "GET YOUR MUSIC ON ALL MAJOR STREAMING PLATFORMS AND DIGITAL STORES WORLDWIDE.",
      features: ["STREAMING PLATFORMS", "DIGITAL STORES", "SYNC LICENSING", "ROYALTY COLLECTION"]
    },
    {
      icon: Sparkles,
      title: "EXCLUSIVE SERVICES",
      description: "PREMIUM SERVICES FOR OUR SIGNED ARTISTS INCLUDING STYLING, PHOTOGRAPHY, AND MORE.",
      features: ["PROFESSIONAL STYLING", "PHOTOGRAPHY", "EXCLUSIVE EVENTS", "VIP SUPPORT"]
    }
  ];

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            OUR
            <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl"> SERVICES</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            COMPREHENSIVE MUSIC SERVICES TO ELEVATE YOUR ARTISTRY AND REACH YOUR FULL POTENTIAL.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-8 hover:border-passionate-red transition-all duration-300 group">
                <div className="text-passionate-red mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-12 w-12" />
                </div>
                
                <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-4 tracking-wider">
                  {service.title}
                </h3>
                
                <p className="text-passionate-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-passionate-white/60 text-sm flex items-center">
                      <div className="w-2 h-2 bg-passionate-red rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <a
                    href="/contact"
                    className="bg-transparent border border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-6 py-3 tracking-wider transition-all duration-300 rounded-xl text-sm inline-block"
                  >
                    GET STARTED
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-passionate-gray/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-6 tracking-wider">
            READY TO TAKE YOUR MUSIC TO THE NEXT LEVEL?
          </h2>
          <p className="text-passionate-white/70 text-lg mb-8 leading-relaxed">
            LET'S DISCUSS YOUR PROJECT AND CREATE SOMETHING EXTRAORDINARY TOGETHER.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow rounded-xl"
            >
              CONTACT US
            </a>
            <a
              href="/submit-demo"
              className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 rounded-xl"
            >
              SUBMIT DEMO
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
