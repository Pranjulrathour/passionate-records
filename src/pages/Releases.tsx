
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, ExternalLink, Calendar, Music2, Headphones } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Releases = () => {
  const navigate = useNavigate();
  
  const { data: releases, isLoading } = useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('upcoming_albums')
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
            <div className="text-passionate-white font-syncopate text-xl">Loading Releases...</div>
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
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            LATEST
            <span className="text-passionate-red"> RELEASES</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            FRESH SOUNDS FROM OUR UNDERGROUND COLLECTIVE. EXPERIENCE THE PASSION, FEEL THE BEAT.
          </p>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {releases && releases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {releases.map((release, index) => (
                <div
                  key={release.id}
                  className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/releases/${release.id}`)}
                >
                  {/* Album Art */}
                  <div className="relative overflow-hidden">
                    <img
                      src={release.album_art_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"}
                      alt={release.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-passionate-black/20 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-passionate-red/90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-8 w-8 text-passionate-white fill-current" />
                      </div>
                    </div>

                    {/* Genre Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-passionate-red px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                        {release.genre?.replace('_', ' ') || 'MUSIC'}
                      </span>
                    </div>

                    {/* Release Status */}
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

                  {/* Release Info */}
                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                      {release.title}
                    </h3>
                    
                    <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                      {release.artist_name}
                    </p>
                    
                    <p className="text-passionate-white/70 mb-4 leading-relaxed line-clamp-3">
                      {release.description || `${release.title} by ${release.artist_name} - A new release from Passionate Records.`}
                    </p>

                    {/* Release Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-passionate-white/60">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {release.release_date 
                            ? new Date(release.release_date).toLocaleDateString() 
                            : 'TBA'
                          }
                        </span>
                      </div>
                      
                      {release.teaser_url && (
                        <a
                          href={release.teaser_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-passionate-red hover:text-passionate-white transition-colors duration-300"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-12 rounded-2xl animate-fade-in">
                <Music2 className="h-16 w-16 text-passionate-red mx-auto mb-6" />
                <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-4 tracking-wider">
                  NEW MUSIC DROPPING SOON
                </h2>
                <p className="text-passionate-white/70 text-lg mb-8 leading-relaxed">
                  WE'RE CURRENTLY WORKING WITH OUR TALENTED ROSTER OF UNDERGROUND ARTISTS TO BRING YOU THE FRESHEST SOUNDS.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/submit-demo"
                    className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow rounded-xl"
                  >
                    SUBMIT YOUR DEMO
                  </a>
                  <a
                    href="/artists"
                    className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 rounded-xl"
                  >
                    MEET OUR ARTISTS
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Releases;
