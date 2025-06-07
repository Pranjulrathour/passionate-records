
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Play, ExternalLink, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Project {
  id: string;
  title: string;
  description?: string;
  project_type?: string;
  status: string;
  image_url?: string;
  teaser_url?: string;
  release_date?: string;
  artist_id?: string;
  artists?: {
    name: string;
    stage_name?: string;
  };
}

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
        .order('release_date', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-passionate-red/20 text-passionate-red';
      case 'IN_PROGRESS': return 'bg-yellow-500/20 text-yellow-500';
      case 'COMPLETED': return 'bg-green-500/20 text-green-500';
      case 'CANCELLED': return 'bg-gray-500/20 text-gray-500';
      default: return 'bg-passionate-red/20 text-passionate-red';
    }
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            UPCOMING
            <span className="text-passionate-red"> PROJECTS</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            WITNESS THE CREATION OF MUSICAL MAGIC. FROM ALBUMS TO COLLABORATIONS.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-passionate-gray/40 rounded-xl mb-4"></div>
                  <div className="h-6 bg-passionate-gray/40 rounded mb-2"></div>
                  <div className="h-4 bg-passionate-gray/40 rounded mb-4"></div>
                </div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl overflow-hidden hover:border-passionate-red transition-all duration-300 group">
                  {project.image_url && (
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.teaser_url && (
                        <div className="absolute inset-0 bg-passionate-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={project.teaser_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white p-3 rounded-full transition-colors duration-300"
                          >
                            <Play className="h-6 w-6" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-syncopate tracking-wider ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      {project.project_type && (
                        <span className="text-passionate-white/60 text-xs font-syncopate tracking-wider">
                          {project.project_type.toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                      {project.title.toUpperCase()}
                    </h3>
                    
                    {project.artists && (
                      <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                        BY {(project.artists.stage_name || project.artists.name).toUpperCase()}
                      </p>
                    )}
                    
                    {project.release_date && (
                      <div className="flex items-center text-passionate-white/70 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        RELEASING {format(new Date(project.release_date), 'MMM dd, yyyy').toUpperCase()}
                      </div>
                    )}
                    
                    {project.description && (
                      <p className="text-passionate-white/60 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    
                    {project.teaser_url && (
                      <a
                        href={project.teaser_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-4 py-2 tracking-wider transition-all duration-300 rounded-xl text-xs flex items-center space-x-2 w-fit"
                      >
                        <span>PREVIEW</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Clock className="h-16 w-16 text-passionate-red mx-auto mb-6" />
              <h3 className="font-syncopate font-bold text-2xl text-passionate-white mb-4 tracking-wider">
                NO PROJECTS ANNOUNCED YET
              </h3>
              <p className="text-passionate-white/70 max-w-md mx-auto">
                WE'RE COOKING UP SOMETHING SPECIAL. STAY TUNED FOR EXCITING PROJECT ANNOUNCEMENTS!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
