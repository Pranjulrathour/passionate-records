import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Instagram, Youtube, ExternalLink } from 'lucide-react';

const FeaturedArtists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('featured-artists-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'artists'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['featured-artists'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
    },
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 seconds
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-passionate-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              FEATURED <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">ARTISTS</span>
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
              FEATURED <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">ARTISTS</span>
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
            FEATURED <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">ARTISTS</span>
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
              className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/artists/${artist.id}`)}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artists/${artist.id}`);
                    }}
                    className="text-passionate-red hover:text-passionate-white text-sm font-syncopate tracking-wider transition-colors duration-300"
                  >
                    VIEW →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Artists Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/artists')}
            className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-3 rounded-xl tracking-wider transition-all duration-300"
          >
            VIEW ALL ARTISTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
