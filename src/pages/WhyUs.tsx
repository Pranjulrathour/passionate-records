
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, Users, Music, Star, Award, Mic } from 'lucide-react';

const WhyUs = () => {
  const reasons = [
    {
      icon: Heart,
      title: "PASSION-DRIVEN APPROACH",
      description: "WE DON'T JUST MAKE MUSIC - WE LIVE AND BREATHE IT. EVERY PROJECT IS INFUSED WITH GENUINE PASSION AND DEDICATION TO ARTISTIC EXCELLENCE."
    },
    {
      icon: Users,
      title: "ARTIST-FIRST PHILOSOPHY",
      description: "YOUR VISION IS OUR MISSION. WE PRIORITIZE ARTIST DEVELOPMENT AND CREATIVE FREEDOM OVER QUICK PROFITS AND INDUSTRY TRENDS."
    },
    {
      icon: Music,
      title: "CUTTING-EDGE PRODUCTION",
      description: "STATE-OF-THE-ART EQUIPMENT AND INDUSTRY-LEADING TECHNIQUES ENSURE YOUR MUSIC SOUNDS PROFESSIONAL AND COMPETITIVE."
    },
    {
      icon: Star,
      title: "PERSONALIZED ATTENTION",
      description: "NO ARTIST IS JUST A NUMBER. WE PROVIDE PERSONALIZED MENTORSHIP AND SUPPORT TAILORED TO YOUR UNIQUE ARTISTIC JOURNEY."
    },
    {
      icon: Award,
      title: "PROVEN TRACK RECORD",
      description: "OUR PORTFOLIO SPEAKS FOR ITSELF. WE'VE HELPED NUMEROUS ARTISTS ACHIEVE THEIR DREAMS AND BUILD SUCCESSFUL CAREERS."
    },
    {
      icon: Mic,
      title: "COMPLETE ECOSYSTEM",
      description: "FROM PRODUCTION TO PROMOTION, DISTRIBUTION TO DEVELOPMENT - WE OFFER A COMPLETE MUSIC INDUSTRY ECOSYSTEM UNDER ONE ROOF."
    }
  ];

  const stats = [
    { number: "50+", label: "ARTISTS DEVELOPED" },
    { number: "100+", label: "TRACKS PRODUCED" },
    { number: "1M+", label: "STREAMS GENERATED" },
    { number: "5+", label: "YEARS EXPERIENCE" }
  ];

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            WHY CHOOSE
            <span className="text-passionate-red"> PASSIONATE RECORDS?</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            WE'RE NOT JUST ANOTHER RECORD LABEL. WE'RE A FAMILY OF PASSIONATE ARTISTS DEDICATED TO CREATING AUTHENTIC, POWERFUL MUSIC.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-passionate-gray/20 border border-passionate-gray p-12 rounded-2xl">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-6 tracking-wider">
              OUR MISSION
            </h2>
            <p className="text-passionate-white/80 text-lg leading-relaxed mb-6">
              TO EMPOWER INDEPENDENT ARTISTS WITH THE TOOLS, RESOURCES, AND PLATFORM THEY NEED TO SHARE THEIR AUTHENTIC VOICE WITH THE WORLD. WE BELIEVE THAT MUSIC IS MORE THAN ENTERTAINMENT - IT'S A POWERFUL FORCE THAT CONNECTS SOULS AND TRANSFORMS LIVES.
            </p>
            <div className="w-16 h-1 bg-passionate-red mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-20 bg-passionate-gray/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              WHAT SETS US APART
            </h2>
            <p className="text-passionate-white/70 text-lg max-w-3xl mx-auto">
              DISCOVER WHY ARTISTS CHOOSE PASSIONATE RECORDS AS THEIR CREATIVE PARTNER AND CAREER CATALYST.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-8 hover:border-passionate-red transition-all duration-300 group text-center">
                <div className="text-passionate-red mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <reason.icon className="h-12 w-12" />
                </div>
                
                <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-4 tracking-wider">
                  {reason.title}
                </h3>
                
                <p className="text-passionate-white/70 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              OUR IMPACT
            </h2>
            <p className="text-passionate-white/70 text-lg">
              NUMBERS THAT SHOWCASE OUR COMMITMENT TO ARTISTIC EXCELLENCE.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-8 hover:border-passionate-red transition-all duration-300">
                  <div className="text-4xl font-syncopate font-bold text-passionate-red mb-2 tracking-wider">
                    {stat.number}
                  </div>
                  <div className="text-passionate-white/70 font-syncopate text-sm tracking-wider">
                    {stat.label}
                  </div>
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
            READY TO JOIN THE FAMILY?
          </h2>
          <p className="text-passionate-white/70 text-lg mb-8 leading-relaxed">
            TAKE THE FIRST STEP TOWARDS TRANSFORMING YOUR MUSICAL DREAMS INTO REALITY.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/artist-enrollment"
              className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow rounded-xl"
            >
              APPLY NOW
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 rounded-xl"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyUs;
