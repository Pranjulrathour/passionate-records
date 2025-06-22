import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Calendar, 
  Music,
  ExternalLink,
  Play,
  Share2,
  Download,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReleaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Set up real-time subscription for release updates
  useEffect(() => {
    if (!id) return;

    const releaseChannel = supabase
      .channel(`release-${id}-realtime`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'latest_releases',
        filter: `id=eq.${id}`
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['release', id] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(releaseChannel);
    };
  }, [id, queryClient]);

  const { data: release, isLoading, error } = useQuery({
    queryKey: ['release', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('latest_releases')
        .select('*')
        .eq('id', id)
        .eq('status', 'ACTIVE')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-passionate-white text-xl">Loading release...</div>
        </div>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="text-passionate-red text-xl">Release not found</div>
            <Button onClick={() => navigate('/releases')} variant="outline">
              Back to Releases
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatGenre = (genre: string) => {
    return genre.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const isReleased = release.release_date ? new Date(release.release_date) <= new Date() : false;

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-passionate-black to-passionate-gray/20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                onClick={() => navigate('/releases')}
                variant="ghost"
                className="mb-8 text-passionate-white hover:text-passionate-red"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Releases
              </Button>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <img
                    src={release.cover_art_url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'}
                    alt={release.title}
                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={isReleased ? "bg-green-600 text-white" : "bg-passionate-red text-passionate-white"}>
                      {isReleased ? 'Released' : 'Upcoming'}
                    </Badge>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-passionate-black/50 rounded-2xl">
                    <div className="bg-passionate-red rounded-full p-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Play className="h-8 w-8 text-passionate-white fill-current" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <h1 className="text-4xl lg:text-6xl font-black text-passionate-white mb-4 font-syncopate">
                    {release.title}
                  </h1>
                  <p className="text-2xl text-passionate-red font-medium mb-6">
                    by {release.artist_name}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {release.genre && (
                      <Badge variant="secondary" className="bg-passionate-red/20 text-passionate-red border-passionate-red/30">
                        <Music className="h-3 w-3 mr-1" />
                        {formatGenre(release.genre)}
                      </Badge>
                    )}
                    {release.release_date && (
                      <Badge variant="outline" className="border-passionate-white/30 text-passionate-white">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(release.release_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Badge>
                    )}
                  </div>

                  {release.description && (
                    <p className="text-passionate-white/80 text-lg leading-relaxed mb-8">
                      {release.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {release.audio_preview_url && (
                      <a
                        href={release.audio_preview_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-8 py-4 bg-passionate-red text-white rounded-full hover:bg-passionate-red/80 transition-colors font-semibold"
                      >
                        <Play className="h-5 w-5" />
                        <span>{isReleased ? 'Listen Now' : 'Listen to Teaser'}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 px-8 py-4 border-passionate-white/30 text-passionate-white hover:bg-passionate-white/10"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Add to Favorites</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 px-8 py-4 border-passionate-white/30 text-passionate-white hover:bg-passionate-white/10"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Release Information */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Music className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Artist</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">{release.artist_name}</p>
                </CardContent>
              </Card>

              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Release Date</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">
                    {release.release_date 
                      ? new Date(release.release_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : 'To be announced'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Download className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Release Type</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">
                    {release.release_type || 'Single'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Download className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Status</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">
                    {isReleased ? 'Available Now' : 'Coming Soon'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Streaming Platforms */}
        {(isReleased || release.streaming_links) && (
          <section className="py-16 bg-passionate-gray/10">
            <div className="container mx-auto px-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-3xl font-syncopate text-passionate-white mb-8">
                  {isReleased ? 'Listen On Your Favorite Platform' : 'Available On'}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {release.streaming_links?.spotify && (
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                      onClick={() => window.open(release.streaming_links.spotify, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Spotify
                    </Button>
                  )}
                  {release.streaming_links?.apple && (
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
                      onClick={() => window.open(release.streaming_links.apple, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apple Music
                    </Button>
                  )}
                  {release.streaming_links?.youtube && (
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                      onClick={() => window.open(release.streaming_links.youtube, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      YouTube Music
                    </Button>
                  )}
                  {release.streaming_links?.soundcloud && (
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                      onClick={() => window.open(release.streaming_links.soundcloud, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      SoundCloud
                    </Button>
                  )}
                  {release.streaming_links?.bandcamp && (
                    <Button 
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3"
                      onClick={() => window.open(release.streaming_links.bandcamp, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Bandcamp
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-2xl font-syncopate text-passionate-white mb-6">
                Discover More Releases
              </h3>
              <Button
                onClick={() => navigate('/releases')}
                className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white px-8 py-3"
              >
                Explore All Releases
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReleaseDetail; 