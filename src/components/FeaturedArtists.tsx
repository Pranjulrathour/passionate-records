
import { Music2, Instagram, Youtube } from 'lucide-react';

const FeaturedArtists = () => {
  // Mock data - in production this would come from Supabase
  const artists = [
    {
      id: 1,
      name: "ARJUN BEATS",
      genre: "TRAP / HIP-HOP",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      description: "Mumbai's trap king with over 2M Spotify streams",
      instagram: "@arjunbeats",
      youtube: "ArjunBeatsOfficial"
    },
    {
      id: 2,
      name: "MAYA VOICE",
      genre: "INDIE POP",
      image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop",
      description: "Soulful indie pop sensation from Bangalore",
      instagram: "@mayavoicemusic",
      youtube: "MayaVoiceOfficial"
    },
    {
      id: 3,
      name: "DELHI DREAMS",
      genre: "ALTERNATIVE ROCK",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description: "Underground rock collective changing the game",
      instagram: "@delhidreamsband",
      youtube: "DelhiDreamsRock"
    }
  ];

  return (
    <section className="py-20 bg-passionate-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-syncopate font-bold text-4xl sm:text-5xl text-passionate-white mb-4 tracking-wider">
            FEATURED
            <span className="text-passionate-red"> ARTISTS</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-2xl mx-auto">
            Meet the visionaries redefining India's music landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
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
              </div>

              {/* Artist Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-syncopate tracking-wider text-passionate-red">
                    {artist.genre}
                  </span>
                </div>
                
                <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-3 tracking-wider">
                  {artist.name}
                </h3>
                
                <p className="text-passionate-white/70 mb-4 leading-relaxed">
                  {artist.description}
                </p>

                {/* Social Links */}
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
              </div>
            </div>
          ))}
        </div>

        {/* View All Artists Button */}
        <div className="text-center mt-12 animate-fade-in">
          <a
            href="/artists"
            className="inline-flex items-center space-x-3 bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow"
          >
            <span>VIEW ALL ARTISTS</span>
            <Music2 className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
