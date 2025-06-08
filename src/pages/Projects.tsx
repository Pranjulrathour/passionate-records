
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Play, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          artists (
            name,
            stage_name
          )
        `)
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
            <div className="text-passionate-white font-syncopate text-xl">Loading Projects...</div>
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
            OUR
            <span className="text-passionate-red"> PROJECTS</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Explore our latest musical endeavors, from groundbreaking albums to innovative collaborations that push the boundaries of underground music.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-passionate-black/20 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                    
                    {/* Play Button Overlay */}
                    {project.teaser_url && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.teaser_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-passionate-red/90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                        >
                          <Play className="h-8 w-8 text-passionate-white fill-passionate-white" />
                        </a>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white ${
                        project.status === 'COMPLETED' ? 'bg-green-600' :
                        project.status === 'IN_PROGRESS' ? 'bg-passionate-red' :
                        project.status === 'CANCELLED' ? 'bg-gray-600' :
                        'bg-passionate-red/70'
                      }`}>
                        {project.status?.replace('_', ' ') || 'PROJECT'}
                      </span>
                    </div>

                    {/* Project Type */}
                    {project.project_type && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-passionate-black/70 px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                          {project.project_type}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                      {project.title}
                    </h3>
                    
                    {project.artists && (
                      <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                        by {project.artists.stage_name || project.artists.name}
                      </p>
                    )}
                    
                    <p className="text-passionate-white/70 mb-4 leading-relaxed line-clamp-3">
                      {project.description || `${project.title} represents the cutting edge of underground music production.`}
                    </p>

                    {/* Release Date */}
                    {project.release_date && (
                      <div className="flex items-center mb-4 text-passionate-white/50">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          Release: {new Date(project.release_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {project.teaser_url && (
                          <a
                            href={project.teaser_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      
                      <button className="bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white px-4 py-2 text-sm font-syncopate tracking-wider transition-all duration-300 border border-passionate-red">
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="font-syncopate text-2xl text-passionate-white mb-4">No Projects Yet</h3>
              <p className="text-passionate-white/70">Exciting projects are in development. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
