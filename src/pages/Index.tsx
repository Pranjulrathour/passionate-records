import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, Download, TrendingUp, Users, Music, Calendar, ArrowRight, ExternalLink, Star, Headphones } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const queryClient = useQueryClient();

  // Set up real-time subscriptions for home page data
  useEffect(() => {
    // Artists real-time subscription
    const artistsChannel = supabase
      .channel('home-artists-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'artists'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['featured-artists-home'] });
      })
      .subscribe();

    // Releases real-time subscription
    const releasesChannel = supabase
      .channel('home-releases-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'latest_releases'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['latest-releases-home'] });
      })
      .subscribe();

    // Events real-time subscription
    const eventsChannel = supabase
      .channel('home-events-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'events'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['upcoming-events-home'] });
        queryClient.invalidateQueries({ queryKey: ['stats'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(artistsChannel);
      supabase.removeChannel(releasesChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, [queryClient]);

  // Fetch featured and recent artists for home page
  const { data: featuredArtists } = useQuery({
    queryKey: ['featured-artists-home'],
    queryFn: async () => {
      // First, get featured artists
      const { data: featured, error: featuredError } = await supabase
        .from('artists')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      
      if (featuredError) throw featuredError;
      
      // If we have fewer than 4 featured artists, supplement with recent ones
      if (!featured || featured.length < 4) {
        const { data: recent, error: recentError } = await supabase
          .from('artists')
          .select('*')
          .eq('is_featured', false)
          .order('created_at', { ascending: false })
          .limit(4 - (featured?.length || 0));
        
        if (recentError) throw recentError;
        
        // Combine featured and recent artists
        const combined = [...(featured || []), ...(recent || [])];
        return combined.slice(0, 4);
      }
      
      return featured.slice(0, 4);
    }
  });

  const { data: latestReleases } = useQuery({
    queryKey: ['latest-releases-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('latest_releases')
        .select('*')
        .eq('status', 'ACTIVE')
        .order('display_order', { ascending: true })
        .limit(6);
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 seconds
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcoming-events-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [artistsRes, releasesRes, eventsRes] = await Promise.all([
        supabase.from('artists').select('id', { count: 'exact', head: true }),
        supabase.from('latest_releases').select('id', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
        supabase.from('events').select('id', { count: 'exact', head: true })
      ]);
      
      return {
        artists: artistsRes.count || 0,
        releases: releasesRes.count || 0,
        events: eventsRes.count || 0
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestReleases && latestReleases.length > 0) {
        setCurrentTrack((prev) => (prev + 1) % latestReleases.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [latestReleases]);

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Hero Section - Ultra Modern */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 passionate-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-passionate-red/10 via-transparent to-passionate-red/5"></div>
          
          {/* Floating Elements - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute top-1/4 left-1/4 w-32 h-32 bg-passionate-red/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-48 h-48 bg-passionate-red/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="hidden sm:block absolute top-1/2 left-1/3 w-24 h-24 bg-passionate-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Hero Content */}
          <div className="mb-8 sm:mb-12 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-passionate-red/10 backdrop-blur-sm border border-passionate-red/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
              <div className="w-2 h-2 bg-passionate-red rounded-full animate-pulse"></div>
              <span className="text-passionate-white font-syncopate text-xs sm:text-sm tracking-wider">LIVE FROM THE UNDERGROUND</span>
            </div>
            
            <h1 className="font-syncopate font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-passionate-white mb-6 sm:mb-8 tracking-wider leading-none">
              PASSIONATE
              <span className="block text-transparent bg-gradient-to-r from-passionate-red via-passionate-white to-passionate-red bg-clip-text text-shadow-red">
                RECORDS
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-passionate-white/80 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              WHERE UNDERGROUND MEETS INNOVATION. DISCOVER THE FUTURE OF MUSIC WITH OUR COLLECTIVE OF 
              <span className="bg-passionate-red text-passionate-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-syncopate text-sm sm:text-base lg:text-xl"> PASSIONATE ARTISTS</span>.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 animate-fade-in max-w-sm mx-auto sm:max-w-none sm:flex-row" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => navigate('/releases')}
              className="group bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl tracking-wider transition-all duration-300 red-glow hover:scale-105 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center touch-manipulation min-h-[44px]"
            >
              <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
              <span className="text-sm sm:text-base">EXPLORE MUSIC</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => navigate('/artists')}
              className="group bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center touch-manipulation min-h-[44px]"
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">MEET ARTISTS</span>
            </button>
            
            <button
              onClick={() => navigate('/submit-demo')}
              className="group bg-passionate-white/10 backdrop-blur-sm border border-passionate-white/20 text-passionate-white hover:bg-passionate-white hover:text-passionate-black font-syncopate font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center touch-manipulation min-h-[44px]"
            >
              <Download className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">SUBMIT DEMO</span>
            </button>
          </div>
          
          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-syncopate font-bold text-passionate-red mb-1 sm:mb-2">{stats?.artists || 0}+</div>
              <div className="text-xs sm:text-sm text-passionate-white/60 font-syncopate tracking-wider">ARTISTS</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-syncopate font-bold text-passionate-red mb-1 sm:mb-2">{stats?.releases || 0}+</div>
              <div className="text-xs sm:text-sm text-passionate-white/60 font-syncopate tracking-wider">RELEASES</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-syncopate font-bold text-passionate-red mb-1 sm:mb-2">{stats?.events || 0}+</div>
              <div className="text-xs sm:text-sm text-passionate-white/60 font-syncopate tracking-wider">EVENTS</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-passionate-white/30 rounded-full flex justify-center" aria-label="Scroll down">
            <div className="w-1 h-2 sm:h-3 bg-passionate-red rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section - Modern Grid */}
      {featuredArtists && featuredArtists.length > 0 && (
        <section className="py-20 sm:py-24 lg:py-32 bg-passionate-black relative">
          <div className="absolute inset-0 bg-gradient-to-b from-passionate-gray/5 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-0.5 bg-passionate-red"></div>
                <span className="text-passionate-red font-syncopate text-xs sm:text-sm tracking-widest">FEATURED</span>
                <div className="w-8 sm:w-12 h-0.5 bg-passionate-red"></div>
              </div>
              
              <h2 className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white mb-4 sm:mb-6 tracking-wider leading-tight">
                OUR <span className="bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">ARTISTS</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-passionate-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
                Meet the visionaries reshaping the underground music scene. Featuring our top artists and latest additions to the collective.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredArtists.map((artist, index) => (
                <div
                  key={artist.id}
                  className="group relative bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-3xl overflow-hidden transition-all duration-700 hover:transform hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => navigate(`/artists/${artist.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={artist.image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop"}
                      alt={artist.name}
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black via-transparent to-transparent"></div>
                    
                    {/* Floating Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button 
                        className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-3 sm:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 touch-manipulation"
                        aria-label={`Play ${artist.name} music`}
                        onClick={() => navigate(`/artists/${artist.id}`)}
                      >
                        <Play className="h-6 w-6 sm:h-8 sm:w-8 text-passionate-white fill-current" />
                      </button>
                    </div>
                    
                    {/* Genre Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-passionate-black/60 backdrop-blur-sm border border-passionate-red/30 px-3 py-2 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {artist.genre || 'ARTIST'}
                      </span>
                    </div>
                    
                    {/* Featured/New Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`${
                        artist.is_featured 
                          ? 'bg-passionate-red/80 border-passionate-red' 
                          : 'bg-passionate-white/80 border-passionate-white text-passionate-black'
                      } backdrop-blur-sm border px-2 py-1 rounded-full text-xs font-syncopate tracking-wider`}>
                        {artist.is_featured ? 'FEATURED' : 'NEW'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="font-syncopate font-bold text-lg sm:text-xl text-passionate-white mb-2 tracking-wider group-hover:text-passionate-red transition-colors duration-300">
                      {artist.stage_name || artist.name}
                    </h3>
                    
                    <p className="text-passionate-red text-sm mb-4 font-syncopate tracking-wider">
                      {artist.location || 'Underground Scene'}
                    </p>

                    <button className="w-full bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white py-2.5 sm:py-3 rounded-xl font-syncopate text-xs sm:text-sm tracking-wider transition-all duration-300 border border-passionate-red touch-manipulation min-h-[44px]">
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <button
                onClick={() => navigate('/artists')}
                className="group bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-2 sm:space-x-3 mx-auto touch-manipulation min-h-[44px]"
              >
                <span className="text-sm sm:text-base">DISCOVER ALL ARTISTS</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Latest Releases Section - Interactive Player */}
      {latestReleases && latestReleases.length > 0 && (
        <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-passionate-gray/10 to-passionate-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-0.5 bg-passionate-red"></div>
                <span className="text-passionate-red font-syncopate text-xs sm:text-sm tracking-widest">FRESH DROPS</span>
                <div className="w-8 sm:w-12 h-0.5 bg-passionate-red"></div>
              </div>
              
              <h2 className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white mb-4 sm:mb-6 tracking-wider leading-tight">
                LATEST <span className="bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">RELEASES</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-passionate-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
                Experience the raw energy and passion of our latest musical creations from the underground collective.
              </p>
            </div>

            {/* Featured Release Player */}
            {latestReleases[currentTrack] && (
              <div className="bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-passionate-red/5 to-transparent"></div>
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                  <div className="relative group">
                    <img
                      src={latestReleases[currentTrack].cover_art_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop"}
                      alt={latestReleases[currentTrack].title}
                      className="w-full aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-6 hover:scale-110 transition-all duration-300 red-glow"
                      >
                        <Play className="h-12 w-12 text-passionate-white fill-current" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-passionate-red font-syncopate text-sm tracking-widest mb-2">NOW PLAYING</div>
                      <h3 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
                        {latestReleases[currentTrack].title}
                      </h3>
                      <p className="text-2xl text-passionate-red font-syncopate tracking-wider">
                        {latestReleases[currentTrack].artist_name}
                      </p>
                    </div>
                    
                    <p className="text-passionate-white/80 text-lg leading-relaxed">
                      {latestReleases[currentTrack].description || 'Experience the latest sound from our underground collective.'}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate(`/releases/${latestReleases[currentTrack].id}`)}
                        className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 flex items-center space-x-3"
                      >
                        <Headphones className="h-5 w-5" />
                        <span>LISTEN NOW</span>
                      </button>
                      
                      {latestReleases[currentTrack].audio_preview_url && (
                        <a
                          href={latestReleases[currentTrack].audio_preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 flex items-center space-x-3"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span>PREVIEW</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Releases Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestReleases.slice(0, 6).map((release, index) => (
                <div
                  key={release.id}
                  className="group bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/releases/${release.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={release.cover_art_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"}
                      alt={release.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-passionate-red/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {release.genre?.replace('_', ' ') || 'RELEASE'}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-3">
                        <Play className="h-5 w-5 text-passionate-white fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-2 tracking-wider group-hover:text-passionate-red transition-colors duration-300">
                      {release.title}
                    </h3>
                    
                    <p className="text-passionate-red text-sm mb-4 font-syncopate tracking-wider">
                      {release.artist_name}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-passionate-white/60 text-xs font-syncopate tracking-wider">
                        {release.release_date ? new Date(release.release_date).toLocaleDateString() : 'TBA'}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-passionate-red fill-current" />
                        <span className="text-passionate-white/60 text-xs">NEW</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => navigate('/releases')}
                className="group bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-12 py-4 rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto"
              >
                <Music className="h-5 w-5" />
                <span>EXPLORE ALL RELEASES</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-32 bg-passionate-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-0.5 bg-passionate-red"></div>
                <span className="text-passionate-red font-syncopate text-sm tracking-widest">LIVE EXPERIENCES</span>
                <div className="w-12 h-0.5 bg-passionate-red"></div>
              </div>
              
              <h2 className="font-syncopate font-bold text-5xl lg:text-6xl text-passionate-white mb-6 tracking-wider">
                UPCOMING <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">EVENTS</span>
              </h2>
              
              <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto">
                Join us for exclusive live performances, album launches, and underground music experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-3xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop"}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-6 left-6">
                      <span className="bg-passionate-red/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {event.event_type || 'EVENT'}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 text-passionate-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-passionate-red" />
                        <span className="text-sm font-syncopate tracking-wider">
                          {new Date(event.date_time).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">
                        {event.venue}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-4 tracking-wider group-hover:text-passionate-red transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <button className="w-full bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white py-3 rounded-xl font-syncopate text-sm tracking-wider transition-all duration-300 border border-passionate-red">
                      VIEW EVENT
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => navigate('/events')}
                className="group bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-12 py-4 rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto"
              >
                <Calendar className="h-5 w-5" />
                <span>VIEW ALL EVENTS</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 passionate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-passionate-red/20 via-transparent to-passionate-red/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-syncopate font-bold text-5xl lg:text-6xl text-passionate-white mb-8 tracking-wider">
              JOIN THE <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">UNDERGROUND</span>
            </h2>
            
            <p className="text-xl text-passionate-white/80 mb-12 leading-relaxed">
              Ready to be part of something bigger? Submit your demo, connect with our artists, 
              or experience our events. The underground is calling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/submit-demo')}
                className="group bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-12 py-5 rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-3 justify-center"
              >
                <Download className="h-6 w-6" />
                <span>SUBMIT DEMO</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => navigate('/contact')}
                className="group bg-transparent border-2 border-passionate-white text-passionate-white hover:bg-passionate-white hover:text-passionate-black font-syncopate font-bold px-12 py-5 rounded-2xl tracking-wider transition-all duration-300 hover:scale-105 flex items-center space-x-3 justify-center"
              >
                <span>GET IN TOUCH</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
