
import { Play, ExternalLink } from 'lucide-react';

const LatestReleases = () => {
  // Mock data - in production this would come from Supabase
  const releases = [
    {
      id: 1,
      title: "MIDNIGHT HUSTLE",
      artist: "ARJUN BEATS",
      coverArt: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop",
      releaseDate: "2024-01-15",
      genre: "TRAP",
      spotifyUrl: "https://open.spotify.com/track/example1",
      youtubeUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: 2,
      title: "NEON DREAMS",
      artist: "MAYA VOICE",
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      releaseDate: "2024-01-10",
      genre: "INDIE POP",
      spotifyUrl: "https://open.spotify.com/track/example2",
      youtubeUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: 3,
      title: "UNDERGROUND ANTHEM",
      artist: "DELHI DREAMS",
      coverArt: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      releaseDate: "2024-01-05",
      genre: "ROCK",
      spotifyUrl: "https://open.spotify.com/track/example3",
      youtubeUrl: "https://youtube.com/watch?v=example3"
    }
  ];

  return (
    <section className="py-20 bg-passionate-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-syncopate font-bold text-4xl sm:text-5xl text-passionate-white mb-4 tracking-wider">
            LATEST
            <span className="text-passionate-red"> RELEASES</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-2xl mx-auto">
            Fresh sounds from our underground collective
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <div
              key={release.id}
              className="group bg-passionate-black border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Cover Art */}
              <div className="relative overflow-hidden">
                <img
                  src={release.coverArt}
                  alt={release.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-passionate-black/20 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-passionate-red/90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="h-8 w-8 text-passionate-white" />
                  </div>
                </div>

                {/* Genre Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-passionate-red px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                    {release.genre}
                  </span>
                </div>
              </div>

              {/* Release Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs text-passionate-red font-syncopate tracking-wider">
                    {new Date(release.releaseDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-1 tracking-wider">
                  {release.title}
                </h3>
                
                <p className="text-passionate-white/70 mb-4">
                  by {release.artist}
                </p>

                {/* Platform Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>SPOTIFY</span>
                  </a>
                  <a
                    href={release.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>YOUTUBE</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Releases Button */}
        <div className="text-center mt-12 animate-fade-in">
          <a
            href="/releases"
            className="inline-flex items-center space-x-3 bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow"
          >
            <span>VIEW ALL RELEASES</span>
            <Play className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
