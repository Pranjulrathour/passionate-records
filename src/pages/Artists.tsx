
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Music2, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const navigate = useNavigate();
  const { data: artists, isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="pt-24 pb-12 passionate-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-passionate-white font-syncopate text-xl">Loading Artists...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white mb-4 sm:mb-6 tracking-wider animate-slide-up leading-tight">
            OUR
            <span className="block sm:inline bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl mt-2 sm:mt-0 sm:ml-2"> ARTISTS</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-passionate-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-passionate-white/70 max-w-2xl lg:max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Meet the visionaries, rebels, and dreamers who define the sound of tomorrow. Each artist brings their unique passion to our underground collective.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {artists && artists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {artists.map((artist, index) => (
                <div
                  key={artist.id}
                  className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Artist Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={artist.image_url || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTYwIiByPSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIzMDAiIHJ4PSIxMDAiIHJ5PSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc3Nzc3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="}
                      alt={artist.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
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
                        {artist.genre || 'ARTIST'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {artist.is_featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-passionate-white px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-black">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Artist Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-syncopate font-bold text-lg sm:text-xl text-passionate-white mb-2 tracking-wider leading-tight">
                      {artist.stage_name || artist.name}
                    </h3>
                    
                    <p className="text-passionate-red text-xs sm:text-sm mb-3 font-syncopate tracking-wider">
                      {artist.location || 'Underground'}
                    </p>
                    
                    <p className="text-passionate-white/70 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                      {artist.bio || `${artist.name} is a talented artist pushing the boundaries of ${artist.genre?.toLowerCase() || 'music'}.`}
                    </p>

                    {/* Master Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                      <div className="flex items-center space-x-3 sm:space-x-4 justify-center sm:justify-start">
                                            {artist.master_link && (
                      <a
                        href={artist.master_link.startsWith('http://') || artist.master_link.startsWith('https://') 
                          ? artist.master_link 
                          : `https://${artist.master_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 touch-manipulation"
                            aria-label="Visit Artist Page"
                          >
                            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => navigate(`/artists/${artist.id}`)}
                        className="bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-syncopate tracking-wider transition-all duration-300 border border-passionate-red rounded touch-manipulation w-full sm:w-auto"
                      >
                        VIEW PROFILE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="font-syncopate text-2xl text-passionate-white mb-4">No Artists Yet</h3>
              <p className="text-passionate-white/70">Check back soon for new talent!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artists;
