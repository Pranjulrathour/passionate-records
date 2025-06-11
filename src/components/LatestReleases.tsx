import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Play, Calendar, ExternalLink } from 'lucide-react';

const LatestReleases = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('latest-releases-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'upcoming_albums'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const { data: releases, isLoading } = useQuery({
    queryKey: ['latest-releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('upcoming_albums')
        .select('*')
        .order('release_date', { ascending: false })
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
              LATEST <span className="text-passionate-red">RELEASES</span>
            </h2>
            <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          </div>
          <div className="text-center text-passionate-white">Loading latest releases...</div>
        </div>
      </section>
    );
  }

  if (!releases || releases.length === 0) {
    return (
      <section className="py-20 bg-passionate-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              LATEST <span className="text-passionate-red">RELEASES</span>
            </h2>
            <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          </div>
          <div className="text-center text-passionate-white/70">
            <p>No releases yet. New music coming soon!</p>
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
            LATEST <span className="text-passionate-red">RELEASES</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto animate-fade-in"></div>
          <p className="text-passionate-white/70 mt-6 max-w-2xl mx-auto animate-fade-in">
            Fresh tracks straight from our underground collective. Experience the raw energy and passion of our latest musical creations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <div
              key={release.id}
              className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/releases/${release.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={release.album_art_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"}
                  alt={release.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-passionate-black/40 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                
                {/* Play Button */}
                {release.teaser_url && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={release.teaser_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-passionate-red/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Play className="h-6 w-6 text-passionate-white fill-passionate-white" />
                    </a>
                  </div>
                )}

                {/* Genre Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-passionate-red px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                    {release.genre?.replace('_', ' ') || 'RELEASE'}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-syncopate tracking-wider ${
                    release.release_date && new Date(release.release_date) <= new Date() 
                      ? 'bg-green-600 text-white' 
                      : 'bg-passionate-white text-passionate-black'
                  }`}>
                    {release.release_date && new Date(release.release_date) <= new Date() ? 'OUT NOW' : 'COMING SOON'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-2 tracking-wider">
                  {release.title}
                </h3>
                
                <p className="text-passionate-red text-sm mb-3 font-syncopate">
                  by {release.artist_name}
                </p>
                
                <p className="text-passionate-white/70 text-sm mb-4 line-clamp-2">
                  {release.description || `${release.title} showcases the innovative sound of underground music.`}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {release.release_date && (
                      <div className="flex items-center text-passionate-white/50">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          {new Date(release.release_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {release.teaser_url && (
                      <a
                        href={release.teaser_url}
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
                      navigate(`/releases/${release.id}`);
                    }}
                    className="text-passionate-red hover:text-passionate-white text-sm font-syncopate tracking-wider transition-colors duration-300"
                  >
                    LISTEN →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Releases Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/releases')}
            className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-3 rounded-xl tracking-wider transition-all duration-300"
          >
            VIEW ALL RELEASES
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
