import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Tag, User, Music, Play, ExternalLink, Clock, TrendingUp, Star } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          artists (id, name, stage_name, bio)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-passionate-white font-syncopate text-xl">Loading Project...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-passionate-red font-syncopate text-xl">Error loading project.</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-passionate-white font-syncopate text-xl">Project not found.</div>
        </div>
        <Footer />
      </div>
    );
  }

  const artist = project.artists;

  return (
    <div className="min-h-screen bg-passionate-black text-passionate-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-syncopate font-bold text-4xl sm:text-5xl md:text-6xl text-passionate-white tracking-wider">{project.title}</h1>
            {artist && (
              <p className="font-syncopate text-xl sm:text-2xl text-passionate-red mt-2">by {artist.stage_name || artist.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column (Image & Actions) */}
            <div className="lg:col-span-1 space-y-6">
              <img src={project.image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop'} alt={project.title} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
              <div className="flex flex-wrap gap-4">
                {project.teaser_url && (
                  <a href={project.teaser_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-passionate-red hover:bg-passionate-red/80 text-white font-syncopate font-bold px-6 py-3 rounded-lg tracking-wider transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Preview</span>
                  </a>
                )}
                <button className="flex-1 bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-white font-syncopate font-bold px-6 py-3 rounded-lg tracking-wider transition-all duration-300 flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Favorite</span>
                </button>
              </div>
            </div>

            {/* Right Column (Details) */}
            <div className="lg:col-span-2">
              <div className="bg-passionate-gray/10 p-6 sm:p-8 rounded-2xl">
                <h2 className="font-syncopate font-bold text-2xl sm:text-3xl mb-6">Project Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Music className="h-6 w-6 text-passionate-red flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-syncopate text-lg font-bold">Description</h3>
                      <p className="text-passionate-white/80">{project.description || 'No description available.'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-passionate-gray/20">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-6 w-6 text-passionate-red flex-shrink-0" />
                      <div>
                        <h3 className="font-syncopate text-lg font-bold">Release Date</h3>
                        <p className="text-passionate-white/80">{project.release_date ? new Date(project.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <TrendingUp className="h-6 w-6 text-passionate-red flex-shrink-0" />
                      <div>
                        <h3 className="font-syncopate text-lg font-bold">Status</h3>
                        <p className="text-passionate-white/80">{project.status?.replace('_', ' ') || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Tag className="h-6 w-6 text-passionate-red flex-shrink-0" />
                      <div>
                        <h3 className="font-syncopate text-lg font-bold">Project Type</h3>
                        <p className="text-passionate-white/80">{project.project_type || 'N/A'}</p>
                      </div>
                    </div>
                    {artist && (
                      <div className="flex items-center space-x-4">
                        <User className="h-6 w-6 text-passionate-red flex-shrink-0" />
                        <div>
                          <h3 className="font-syncopate text-lg font-bold">Artist</h3>
                          <p className="text-passionate-white/80">{artist.stage_name || artist.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
