import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Play, ExternalLink, Folder, Users, Clock, TrendingUp, Star, Filter, ArrowRight, Music2, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
            <div className="flex items-center justify-center space-x-3">
              <Folder className="h-8 w-8 text-passionate-red animate-pulse" />
              <div className="text-passionate-white font-syncopate text-xl">LOADING PROJECTS...</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredProjects = projects?.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'completed') return project.status === 'COMPLETED';
    if (filter === 'in_progress') return project.status === 'IN_PROGRESS';
    if (filter === 'upcoming') return project.status === 'PLANNED';
    return project.project_type?.toLowerCase() === filter;
  }) || [];

  const statusFilters = ['all', 'completed', 'in_progress', 'upcoming', 'album', 'single', 'ep', 'collaboration'];
  const featuredProject = projects?.[0];
  const otherProjects = filteredProjects.slice(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-600/80 border-green-400/30 text-white';
      case 'IN_PROGRESS': return 'bg-passionate-red/80 border-passionate-red/30 text-white';
      case 'PLANNED': return 'bg-blue-600/80 border-blue-400/30 text-white';
      case 'CANCELLED': return 'bg-gray-600/80 border-gray-400/30 text-white';
      default: return 'bg-passionate-red/80 border-passionate-red/30 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 passionate-gradient">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-bl from-passionate-red/4 via-transparent to-passionate-red/4"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-syncopate font-bold text-6xl sm:text-7xl lg:text-8xl text-passionate-white mb-6 tracking-wider text-center">
              OUR<br/>
              <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl text-shadow-red inline-block">PROJECTS</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-passionate-red to-transparent mx-auto mb-8"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-passionate-white/80 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in">
            EXPLORE OUR LATEST MUSICAL ENDEAVORS AND GROUNDBREAKING COLLABORATIONS.
            <span className="block text-passionate-red font-syncopate text-sm tracking-widest mt-2">
              INNOVATE • CREATE • INSPIRE
            </span>
          </p>
          
          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">{projects?.length || 0}</div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">TOTAL PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">
                {projects?.filter(p => p.status === 'COMPLETED').length || 0}
              </div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">COMPLETED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">
                {projects?.filter(p => p.status === 'IN_PROGRESS').length || 0}
              </div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">IN PROGRESS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">
                {projects?.filter(p => p.project_type === 'COLLABORATION').length || 0}
              </div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">COLLABS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Hero */}
      {featuredProject && (
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
                FEATURED <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">PROJECT</span>
              </h2>
              <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={featuredProject.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop"}
                    alt={featuredProject.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"></div>
                  
                  {/* Play Button */}
                  {featuredProject.teaser_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a
                        href={featuredProject.teaser_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-6 transform scale-75 group-hover:scale-100 transition-transform duration-300 red-glow"
                      >
                        <Play className="h-12 w-12 text-passionate-white fill-current" />
                      </a>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-syncopate tracking-wider backdrop-blur-sm border ${getStatusColor(featuredProject.status)}`}>
                      {featuredProject.status?.replace('_', ' ') || 'PROJECT'}
                    </span>
                  </div>
                  
                  {/* Project Type */}
                  {featuredProject.project_type && (
                    <div className="absolute top-6 right-6">
                      <span className="bg-passionate-black/60 backdrop-blur-sm border border-passionate-gray/30 px-3 py-2 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {featuredProject.project_type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-syncopate font-bold text-4xl lg:text-5xl text-passionate-white mb-4 tracking-wider">
                    {featuredProject.title}
                  </h3>
                  {featuredProject.artists && (
                    <p className="text-2xl text-passionate-red font-syncopate tracking-wider mb-6">
                      by {featuredProject.artists.stage_name || featuredProject.artists.name}
                    </p>
                  )}
                </div>
                
                <p className="text-passionate-white/80 text-lg leading-relaxed">
                  {featuredProject.description || `${featuredProject.title} represents the cutting edge of underground music production, showcasing innovative sounds and creative collaboration.`}
                </p>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-passionate-gray/30">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-passionate-red" />
                    <div>
                      <div className="text-sm text-passionate-white/60 font-syncopate">RELEASE DATE</div>
                      <div className="text-passionate-white font-syncopate">
                        {featuredProject.release_date 
                          ? new Date(featuredProject.release_date).toLocaleDateString('en-US', { 
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
                        {featuredProject.status?.replace('_', ' ') || 'IN DEVELOPMENT'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate(`/projects/${featuredProject.id}`)}
                    className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow"
                  >
                    VIEW DETAILS
                  </button>
                  
                  {featuredProject.teaser_url && (
                    <a
                      href={featuredProject.teaser_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 flex items-center space-x-2"
                    >
                      <Play className="h-5 w-5" />
                      <span>PREVIEW</span>
                    </a>
                  )}
                  
                  <div className="flex items-center space-x-3 ml-auto">
                    <button 
                      aria-label="Add to favorites"
                      className="p-3 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 border border-passionate-gray hover:border-passionate-red transition-all duration-300"
                    >
                      <Star className="h-5 w-5 text-passionate-white" />
                    </button>
                    <button 
                      aria-label="View external link"
                      className="p-3 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 border border-passionate-gray hover:border-passionate-red transition-all duration-300"
                    >
                      <ExternalLink className="h-5 w-5 text-passionate-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 border-t border-passionate-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-passionate-white/60">
              <Filter className="h-5 w-5" />
              <span className="font-syncopate text-sm tracking-wider">FILTER PROJECTS</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {statusFilters.map((filterOption) => (
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

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {otherProjects && otherProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up hover:transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/60 via-transparent to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    {project.teaser_url && (
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <a
                          href={project.teaser_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-passionate-red/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                        >
                          <Play className="h-6 w-6 text-passionate-white fill-current" />
                        </a>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-syncopate tracking-wider backdrop-blur-sm border ${getStatusColor(project.status)}`}>
                        {project.status?.replace('_', ' ') || 'PROJECT'}
                      </span>
                    </div>

                    {/* Project Type */}
                    {project.project_type && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-passionate-black/60 backdrop-blur-sm border border-passionate-gray/30 px-2 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                          {project.project_type}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider group-hover:text-passionate-red transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {project.artists && (
                      <p className="text-passionate-red text-sm mb-3 font-syncopate tracking-wider">
                        by {project.artists.stage_name || project.artists.name}
                      </p>
                    )}
                    
                    <p className="text-passionate-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description || `${project.title} represents the cutting edge of underground music production.`}
                    </p>

                    {/* Release Date */}
                    {project.release_date && (
                      <div className="flex items-center mb-4 text-passionate-white/50">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-xs font-syncopate">
                          Release: {new Date(project.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {project.teaser_url && (
                          <a
                            href={project.teaser_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button 
                          aria-label="Add to favorites"
                          className="p-2 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 text-passionate-white/60 hover:text-passionate-red transition-all duration-300"
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white px-4 py-2 text-sm font-syncopate tracking-wider transition-all duration-300 border border-passionate-red rounded-lg"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 rounded-3xl p-16 animate-fade-in">
                <Zap className="h-20 w-20 text-passionate-red mx-auto mb-8" />
                <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-6 tracking-wider">
                  EXCITING PROJECTS IN DEVELOPMENT
                </h2>
                <p className="text-passionate-white/70 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                  WE'RE CONSTANTLY WORKING ON GROUNDBREAKING MUSICAL ENDEAVORS AND INNOVATIVE COLLABORATIONS.
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

export default Projects;
