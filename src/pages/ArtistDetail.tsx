import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Instagram, 
  Youtube, 
  Music, 
  ExternalLink,
  Star,
  Calendar,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: artist, isLoading, error } = useQuery({
    queryKey: ['artist', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: projects } = useQuery({
    queryKey: ['artist-projects', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('artist_id', id)
        .order('created_at', { ascending: false });
      
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
          <div className="text-passionate-white text-xl">Loading artist...</div>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="text-passionate-red text-xl">Artist not found</div>
            <Button onClick={() => navigate('/artists')} variant="outline">
              Back to Artists
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatGenre = (genre: string) => {
    return genre.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="relative py-16 bg-gradient-to-b from-passionate-black to-passionate-gray/20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                onClick={() => navigate('/artists')}
                variant="ghost"
                className="mb-8 text-passionate-white hover:text-passionate-red"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Artists
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
                    src={artist.image_url || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTYwIiByPSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIzMDAiIHJ4PSIxMDAiIHJ5PSI2MCIgZmlsbD0iIzQ0NDQ0NCIvPjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc3Nzc3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="}
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                  />
                  {artist.is_featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-passionate-red text-passionate-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
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
                    {artist.name}
                  </h1>
                  {artist.stage_name && (
                    <p className="text-xl text-passionate-red font-medium mb-4">
                      "{artist.stage_name}"
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {artist.genre && (
                      <Badge variant="secondary" className="bg-passionate-red/20 text-passionate-red border-passionate-red/30">
                        <Music className="h-3 w-3 mr-1" />
                        {formatGenre(artist.genre)}
                      </Badge>
                    )}
                    {artist.location && (
                      <Badge variant="outline" className="border-passionate-white/30 text-passionate-white">
                        <MapPin className="h-3 w-3 mr-1" />
                        {artist.location}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-passionate-white/30 text-passionate-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined {new Date(artist.created_at).getFullYear()}
                    </Badge>
                  </div>

                  {artist.bio && (
                    <p className="text-passionate-white/80 text-lg leading-relaxed mb-8">
                      {artist.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-4">
                    {artist.spotify_url && (
                      <a
                        href={artist.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                      >
                        <Headphones className="h-4 w-4" />
                        <span>Spotify</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {artist.instagram_handle && (
                      <a
                        href={`https://instagram.com/${artist.instagram_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        <span>@{artist.instagram_handle}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {artist.youtube_handle && (
                      <a
                        href={`https://youtube.com/@${artist.youtube_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <Youtube className="h-4 w-4" />
                        <span>@{artist.youtube_handle}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <motion.h2
                className="text-3xl font-syncopate text-passionate-white mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Projects & Releases
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="bg-passionate-gray/20 border-passionate-gray hover:bg-passionate-gray/30 transition-colors">
                      <CardContent className="p-6">
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <h3 className="text-xl font-bold text-passionate-white mb-2">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-passionate-white/70 mb-4 text-sm">
                            {project.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          {project.status && (
                            <Badge 
                              variant={project.status === 'COMPLETED' ? 'default' : 'secondary'}
                              className={project.status === 'COMPLETED' ? 'bg-green-600' : 'bg-yellow-600'}
                            >
                              {project.status.replace('_', ' ')}
                            </Badge>
                          )}
                          {project.release_date && (
                            <span className="text-passionate-white/60 text-sm">
                              {new Date(project.release_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {project.teaser_url && (
                          <a
                            href={project.teaser_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-passionate-red hover:underline mt-4"
                          >
                            <Music className="h-4 w-4" />
                            <span>Listen</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-passionate-gray/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-2xl font-syncopate text-passionate-white mb-6">
                Discover More Artists
              </h3>
              <Button
                onClick={() => navigate('/artists')}
                className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white px-8 py-3"
              >
                Explore All Artists
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistDetail; 