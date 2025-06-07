import React from 'react';
import { Calendar, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const LatestReleases = () => {
  const { data: albums, isLoading } = useQuery({
    queryKey: ['latest-releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('upcoming_albums')
        .select('*')
        .order('release_date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const displayReleases = albums && albums.length > 0 ? albums : [
    {
      id: '1',
      title: 'NEON DREAMS',
      artist_name: 'ALEX THUNDER',
      release_date: '2024-07-15',
      description: 'AN ELECTRIFYING JOURNEY THROUGH SYNTH-WAVE LANDSCAPES.',
      album_art_url: '/placeholder.svg',
      teaser_url: 'https://soundcloud.com/sample'
    },
    {
      id: '2',
      title: 'MIDNIGHT CITY',
      artist_name: 'SIREN',
      release_date: '2024-06-20',
      description: 'A HAUNTING MELODY THAT ECHOES THROUGH THE URBAN NIGHT.',
      album_art_url: '/placeholder.svg',
      teaser_url: 'https://soundcloud.com/sample'
    },
    {
      id: '3',
      title: 'LOST IN SPACE',
      artist_name: 'COSMIC',
      release_date: '2024-05-01',
      description: 'AN INTERGALACTIC ODYSSEY OF SOUND AND EMOTION.',
      album_art_url: '/placeholder.svg',
      teaser_url: 'https://soundcloud.com/sample'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider animate-slide-up">
            LATEST RELEASES
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            DISCOVER THE NEWEST SOUNDS FROM OUR ROSTER OF ARTISTS.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-passionate-gray/40 rounded-xl mb-4"></div>
                <div className="h-6 bg-passionate-gray/40 rounded mb-2"></div>
                <div className="h-4 bg-passionate-gray/40 rounded mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayReleases.map((release) => (
              <div key={release.id} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl overflow-hidden hover:border-passionate-red transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={release.album_art_url}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-passionate-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={release.teaser_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white p-3 rounded-full transition-colors duration-300"
                    >
                      <Play className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                    {release.title.toUpperCase()}
                  </h3>
                  <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                    BY {release.artist_name.toUpperCase()}
                  </p>
                  <div className="flex items-center text-passionate-white/70 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    RELEASING {format(new Date(release.release_date), 'MMM dd, yyyy').toUpperCase()}
                  </div>
                  <p className="text-passionate-white/60 text-sm mb-4 line-clamp-3">
                    {release.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/releases"
            className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow rounded-xl"
          >
            VIEW ALL RELEASES
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
