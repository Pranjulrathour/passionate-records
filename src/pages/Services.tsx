
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Music, Mic, Camera, Users, Headphones, Sparkles, UserCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Music,
      title: "PRODUCTION",
      description: "COMPREHENSIVE MUSIC PRODUCTION AND VIDEO SERVICES FROM RECORDING TO VISUAL STORYTELLING.",
      features: ["PROFESSIONAL RECORDING", "MIXING & MASTERING", "MUSIC VIDEO PRODUCTION", "CINEMATOGRAPHY", "POST-PRODUCTION", "SOUND DESIGN"]
    },
    {
      icon: Mic,
      title: "ARTIST DEVELOPMENT",
      description: "COMPREHENSIVE ARTIST COACHING AND CAREER DEVELOPMENT TO TAKE YOUR MUSIC TO THE NEXT LEVEL.",
      features: ["VOCAL COACHING", "PERFORMANCE TRAINING", "BRAND DEVELOPMENT", "CAREER GUIDANCE"]
    },
    {
      icon: UserCheck,
      title: "ARTIST MANAGEMENT",
      description: "FULL-SERVICE ARTIST MANAGEMENT TO HANDLE YOUR CAREER WHILE YOU FOCUS ON CREATING MUSIC.",
      features: ["CAREER STRATEGY", "BOOKING & SCHEDULING", "CONTRACT NEGOTIATION", "INDUSTRY CONNECTIONS"]
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
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white mb-4 sm:mb-6 tracking-wider animate-slide-up leading-tight">
            OUR
            <span className="bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 block sm:inline mt-2 sm:mt-0"> SERVICES</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-passionate-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-passionate-white/70 max-w-2xl lg:max-w-3xl mx-auto animate-fade-in leading-relaxed">
            COMPREHENSIVE MUSIC SERVICES TO ELEVATE YOUR ARTISTRY AND REACH YOUR FULL POTENTIAL.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-passionate-gray/20 border border-passionate-gray rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-passionate-red transition-all duration-300 group touch-manipulation">
                <div className="text-passionate-red mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
                
                <h3 className="font-syncopate font-bold text-lg sm:text-xl text-passionate-white mb-3 sm:mb-4 tracking-wider leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-passionate-white/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-passionate-white/60 text-xs sm:text-sm flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-passionate-red rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 sm:mt-6">
                  <a
                    href="/contact"
                    className="bg-transparent border border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-4 sm:px-6 py-2 sm:py-3 tracking-wider transition-all duration-300 rounded-lg sm:rounded-xl text-xs sm:text-sm inline-block w-full sm:w-auto text-center touch-manipulation min-h-[44px] flex items-center justify-center"
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
      <section className="py-12 sm:py-16 lg:py-20 bg-passionate-gray/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-syncopate font-bold text-xl sm:text-2xl lg:text-3xl text-passionate-white mb-4 sm:mb-6 tracking-wider leading-tight">
            READY TO TAKE YOUR MUSIC TO THE NEXT LEVEL?
          </h2>
          <p className="text-passionate-white/70 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
            LET'S DISCUSS YOUR PROJECT AND CREATE SOMETHING EXTRAORDINARY TOGETHER.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center max-w-sm mx-auto sm:max-w-none sm:flex-row">
            <a
              href="/contact"
              className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-6 sm:px-8 py-3 sm:py-4 tracking-wider transition-all duration-300 red-glow rounded-lg sm:rounded-xl text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
            >
              CONTACT US
            </a>
            <a
              href="/submit-demo"
              className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-6 sm:px-8 py-3 sm:py-4 tracking-wider transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
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
