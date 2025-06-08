
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Instagram, Youtube, ExternalLink } from 'lucide-react';

const FeaturedArtists = () => {
  const { data: featuredArtists, isLoading } = useQuery({
    queryKey: ['featured-artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-passionate-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              FEATURED <span className="text-passionate-red">ARTISTS</span>
            </h2>
            <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          </div>
          <div className="text-center text-passionate-white">Loading featured artists...</div>
        </div>
      </section>
    );
  }

  if (!featuredArtists || featuredArtists.length === 0) {
    return (
      <section className="py-20 bg-passionate-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              FEATURED <span className="text-passionate-red">ARTISTS</span>
            </h2>
            <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          </div>
          <div className="text-center text-passionate-white/70">
            <p>No featured artists yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-passionate-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider animate-slide-up">
            FEATURED <span className="text-passionate-red">ARTISTS</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto animate-fade-in"></div>
          <p className="text-passionate-white/70 mt-6 max-w-2xl mx-auto animate-fade-in">
            Discover the underground talent that's reshaping the music scene with their unique sound and passionate creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={artist.image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"}
                  alt={artist.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-passionate-black/40 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-passionate-red px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                    {artist.genre || 'FEATURED'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-2 tracking-wider">
                  {artist.stage_name || artist.name}
                </h3>
                
                <p className="text-passionate-red text-sm mb-3 font-syncopate">
                  {artist.location || 'Underground Scene'}
                </p>
                
                <p className="text-passionate-white/70 text-sm mb-4 line-clamp-2">
                  {artist.bio || `${artist.name} brings a unique sound to the underground music scene.`}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {artist.instagram_handle && (
                      <a
                        href={`https://instagram.com/${artist.instagram_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {artist.youtube_handle && (
                      <a
                        href={`https://youtube.com/@${artist.youtube_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <Youtube className="h-4 w-4" />
                      </a>
                    )}
                    {artist.spotify_url && (
                      <a
                        href={artist.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  
                  <button className="text-passionate-red hover:text-passionate-white text-sm font-syncopate tracking-wider transition-colors duration-300">
                    VIEW →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
