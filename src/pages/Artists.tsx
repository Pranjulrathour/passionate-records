
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Music2, Instagram, Youtube } from 'lucide-react';

const Artists = () => {
  // Mock data - in production this would come from Supabase
  const artists = [
    {
      id: 1,
      name: "ARJUN BEATS",
      genre: "TRAP / HIP-HOP",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      description: "Mumbai's trap king with over 2M Spotify streams. Known for his hard-hitting beats and emotional lyrics.",
      instagram: "@arjunbeats",
      youtube: "ArjunBeatsOfficial",
      location: "Mumbai, India"
    },
    {
      id: 2,
      name: "MAYA VOICE",
      genre: "INDIE POP",
      image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop",
      description: "Soulful indie pop sensation from Bangalore with a voice that touches hearts and moves souls.",
      instagram: "@mayavoicemusic",
      youtube: "MayaVoiceOfficial",
      location: "Bangalore, India"
    },
    {
      id: 3,
      name: "DELHI DREAMS",
      genre: "ALTERNATIVE ROCK",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description: "Underground rock collective changing the game with their raw energy and powerful messages.",
      instagram: "@delhidreamsband",
      youtube: "DelhiDreamsRock",
      location: "Delhi, India"
    },
    {
      id: 4,
      name: "COSMIC KAVI",
      genre: "EXPERIMENTAL",
      image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=400&fit=crop",
      description: "Boundary-pushing artist blending traditional Indian sounds with modern electronic production.",
      instagram: "@cosmickavi",
      youtube: "CosmicKaviMusic",
      location: "Chennai, India"
    },
    {
      id: 5,
      name: "NEON NIGHTS",
      genre: "SYNTHWAVE",
      image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=400&fit=crop",
      description: "Retro-futuristic synthwave collective bringing 80s nostalgia to the modern underground scene.",
      instagram: "@neonnightsmusic",
      youtube: "NeonNightsOfficial",
      location: "Pune, India"
    },
    {
      id: 6,
      name: "REBEL ROSE",
      genre: "PUNK ROCK",
      image: "https://images.unsplash.com/photo-1586090100513-0a9c1b1e2787?w=400&h=400&fit=crop",
      description: "Fierce punk rock artist with an attitude that challenges the status quo and inspires revolution.",
      instagram: "@rebelrosemusic",
      youtube: "RebelRoseRock",
      location: "Kolkata, India"
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
            <span className="text-passionate-red"> ARTISTS</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Meet the visionaries, rebels, and dreamers who define the sound of tomorrow. Each artist brings their unique passion to our underground collective.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <div
                key={artist.id}
                className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Artist Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-passionate-black/20 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-passionate-red/90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Music2 className="h-8 w-8 text-passionate-white" />
                    </div>
                  </div>

                  {/* Genre Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-passionate-red px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                      {artist.genre}
                    </span>
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                    {artist.name}
                  </h3>
                  
                  <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                    {artist.location}
                  </p>
                  
                  <p className="text-passionate-white/70 mb-4 leading-relaxed">
                    {artist.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <a
                        href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://youtube.com/@${artist.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                    </div>
                    
                    <button className="bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white px-4 py-2 text-sm font-syncopate tracking-wider transition-all duration-300 border border-passionate-red">
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artists;
