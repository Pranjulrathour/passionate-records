import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, ExternalLink, Calendar, Music2, Disc, Download, Heart, Share2, Clock, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Releases = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [hoveredRelease, setHoveredRelease] = useState<string | null>(null);
  
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
            <div className="flex items-center justify-center space-x-3">
              <Disc className="h-8 w-8 text-passionate-red animate-spin" />
              <div className="text-passionate-white font-syncopate text-xl">LOADING RELEASES...</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredRelease = releases?.[0];
  const otherReleases = releases?.slice(1) || [];

  const filteredReleases = otherReleases.filter(release => {
    if (filter === 'all') return true;
    if (filter === 'new') return new Date(release.release_date) <= new Date();
    if (filter === 'upcoming') return new Date(release.release_date) > new Date();
    return release.genre?.toLowerCase() === filter;
  });

  const genreFilters = ['all', 'new', 'upcoming', 'electronic', 'hip_hop', 'house', 'techno'];

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Hero Header with Gradient Background */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 passionate-gradient">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-passionate-red/5 via-transparent to-passionate-red/5"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-syncopate font-bold text-6xl sm:text-7xl lg:text-8xl text-passionate-white mb-6 tracking-wider">
              LATEST
              <span className="block text-passionate-red text-shadow-red">RELEASES</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-passionate-red to-transparent mx-auto mb-8"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-passionate-white/80 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in">
            DISCOVER THE FRESHEST SOUNDS FROM OUR UNDERGROUND COLLECTIVE.
            <span className="block text-passionate-red font-syncopate text-sm tracking-widest mt-2">
              EXPERIENCE THE PASSION • FEEL THE BEAT • JOIN THE MOVEMENT
            </span>
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className="text-3xl font-syncopate font-bold text-passionate-red">{releases?.length || 0}</div>
              <div className="text-sm text-passionate-white/60 font-syncopate tracking-wider">TOTAL RELEASES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-syncopate font-bold text-passionate-red">
                {releases?.filter(r => new Date(r.release_date) <= new Date()).length || 0}
              </div>
              <div className="text-sm text-passionate-white/60 font-syncopate tracking-wider">OUT NOW</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-syncopate font-bold text-passionate-red">
                {releases?.filter(r => new Date(r.release_date) > new Date()).length || 0}
              </div>
              <div className="text-sm text-passionate-white/60 font-syncopate tracking-wider">COMING SOON</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Release Hero */}
      {featuredRelease && (
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
                FEATURED <span className="text-passionate-red">RELEASE</span>
              </h2>
              <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Album Art */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={featuredRelease.album_art_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"}
                    alt={featuredRelease.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-6 transform scale-75 group-hover:scale-100 transition-transform duration-300 red-glow">
                      <Play className="h-12 w-12 text-passionate-white fill-current" />
                    </div>
                  </div>
                  
                  {/* Floating Genre Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-passionate-black/60 backdrop-blur-sm border border-passionate-red/50 px-4 py-2 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                      {featuredRelease.genre?.replace('_', ' ') || 'FEATURED'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Release Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-syncopate font-bold text-4xl lg:text-5xl text-passionate-white mb-4 tracking-wider">
                    {featuredRelease.title}
                  </h3>
                  <p className="text-2xl text-passionate-red font-syncopate tracking-wider mb-6">
                    {featuredRelease.artist_name}
                  </p>
                </div>
                
                <p className="text-passionate-white/80 text-lg leading-relaxed">
                  {featuredRelease.description || `${featuredRelease.title} represents the pinnacle of underground music production, showcasing the innovative sound that defines our label.`}
                </p>
                
                {/* Release Details */}
                <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-passionate-gray/30">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-passionate-red" />
                    <div>
                      <div className="text-sm text-passionate-white/60 font-syncopate">RELEASE DATE</div>
                      <div className="text-passionate-white font-syncopate">
                        {featuredRelease.release_date 
                          ? new Date(featuredRelease.release_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : 'TBA'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-passionate-red" />
                    <div>
                      <div className="text-sm text-passionate-white/60 font-syncopate">STATUS</div>
                      <div className="text-passionate-white font-syncopate">
                        {featuredRelease.release_date && new Date(featuredRelease.release_date) <= new Date() ? 'OUT NOW' : 'COMING SOON'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate(`/releases/${featuredRelease.id}`)}
                    className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow"
                  >
                    VIEW DETAILS
                  </button>
                  
                  {featuredRelease.teaser_url && (
                    <a
                      href={featuredRelease.teaser_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300"
                    >
                      LISTEN NOW
                    </a>
                  )}
                  
                  <div className="flex items-center space-x-3 ml-auto">
                    <button 
                      aria-label="Add to favorites"
                      className="p-3 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 border border-passionate-gray hover:border-passionate-red transition-all duration-300"
                    >
                      <Heart className="h-5 w-5 text-passionate-white" />
                    </button>
                    <button 
                      aria-label="Share release"
                      className="p-3 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 border border-passionate-gray hover:border-passionate-red transition-all duration-300"
                    >
                      <Share2 className="h-5 w-5 text-passionate-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="py-8 border-t border-passionate-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {genreFilters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-3 rounded-full font-syncopate text-sm tracking-wider transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-passionate-red text-passionate-white red-glow'
                    : 'bg-passionate-gray/20 text-passionate-white/70 hover:bg-passionate-red/20 hover:text-passionate-white border border-passionate-gray hover:border-passionate-red'
                }`}
              >
                {filterOption.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredReleases && filteredReleases.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredReleases.map((release, index) => (
                <div
                  key={release.id}
                  className="group relative bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up hover:transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredRelease(release.id)}
                  onMouseLeave={() => setHoveredRelease(null)}
                  onClick={() => navigate(`/releases/${release.id}`)}
                >
                  {/* Album Art */}
                  <div className="relative overflow-hidden">
                    <img
                      src={release.album_art_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"}
                      alt={release.title}
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/60 via-transparent to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      hoveredRelease === release.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-6 w-6 text-passionate-white fill-current" />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-syncopate tracking-wider backdrop-blur-sm ${
                        release.release_date && new Date(release.release_date) <= new Date() 
                          ? 'bg-green-600/80 text-white border border-green-400/30' 
                          : 'bg-passionate-red/80 text-white border border-passionate-red/30'
                      }`}>
                        {release.release_date && new Date(release.release_date) <= new Date() ? 'OUT NOW' : 'COMING SOON'}
                      </span>
                    </div>

                    {/* Genre Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-passionate-black/60 backdrop-blur-sm border border-passionate-gray/30 px-3 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {release.genre?.replace('_', ' ') || 'MUSIC'}
                      </span>
                    </div>
                  </div>

                  {/* Release Info */}
                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-2 tracking-wider line-clamp-1 group-hover:text-passionate-red transition-colors duration-300">
                      {release.title}
                    </h3>
                    
                    <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                      {release.artist_name}
                    </p>
                    
                    <p className="text-passionate-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                      {release.description || `${release.title} by ${release.artist_name} - A new release from Passionate Records.`}
                    </p>

                    {/* Release Date & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-passionate-white/60">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-syncopate">
                          {release.release_date 
                            ? new Date(release.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'TBA'
                          }
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {release.teaser_url && (
                          <a
                            href={release.teaser_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button 
                          onClick={(e) => {e.stopPropagation()}}
                          aria-label="Add to favorites"
                          className="p-2 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 text-passionate-white/60 hover:text-passionate-red transition-all duration-300"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 rounded-3xl p-16 animate-fade-in">
                <Music2 className="h-20 w-20 text-passionate-red mx-auto mb-8" />
                <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-6 tracking-wider">
                  NEW MUSIC DROPPING SOON
                </h2>
                <p className="text-passionate-white/70 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                  WE'RE CURRENTLY WORKING WITH OUR TALENTED ROSTER OF UNDERGROUND ARTISTS TO BRING YOU THE FRESHEST SOUNDS.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="/submit-demo"
                    className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-10 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow"
                  >
                    SUBMIT YOUR DEMO
                  </a>
                  <a
                    href="/artists"
                    className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-10 py-4 rounded-xl tracking-wider transition-all duration-300"
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
