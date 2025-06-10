import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/image-upload';
import { createSafeImageProps } from '@/utils/imageUtils';

// Project form state type
type ProjectFormData = {
  title: string;
  description: string;
  project_type: string;
  status: string;
  artist_id: string;
  release_date: string;
  image_url: string;
  teaser_url: string;
};

type FormAction = 
  | { type: 'SET_FIELD'; field: keyof ProjectFormData; value: any }
  | { type: 'SET_ALL'; data: ProjectFormData }
  | { type: 'RESET' };

const formReducer = (state: ProjectFormData, action: FormAction): ProjectFormData => {
  console.log('🔄 Form reducer action:', action.type, action);
  
  switch (action.type) {
    case 'SET_FIELD':
      const updatedState = { ...state, [action.field]: action.value };
      console.log('📋 Form state updated:', updatedState);
      return updatedState;
    case 'SET_ALL':
      console.log('📋 Form state set to:', action.data);
      return action.data;
    case 'RESET':
      const resetState = getInitialFormData();
      console.log('🔄 Form state reset');
      return resetState;
    default:
      return state;
  }
};

const getInitialFormData = (): ProjectFormData => ({
  title: '',
  description: '',
  project_type: '',
  status: 'UPCOMING',
  artist_id: '',
  release_date: '',
  image_url: '',
  teaser_url: ''
});

const ProjectManagement = () => {
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          artists(name)
        `)
        .order('release_date', { ascending: false });
      
      if (error) throw error;
      
      // Debug: Log what we get from the database
      console.log('🎯 Projects fetched from database:', data);
      data?.forEach((project, index) => {
        console.log(`🎵 Project ${index + 1}:`, {
          title: project.title,
          image_url: project.image_url,
          image_url_type: typeof project.image_url,
          image_url_length: project.image_url?.length || 0,
          image_url_preview: project.image_url?.substring(0, 80) + '...'
        });
      });
      
      return data;
    }
  });

  // Fetch artists for dropdown
  const { data: artists } = useQuery({
    queryKey: ['artists-dropdown'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (projectData: ProjectFormData) => {
      console.log('💾 Creating project with data:', projectData);
      console.log('📸 Image URL being saved:', {
        image_url: projectData.image_url,
        type: typeof projectData.image_url,
        length: projectData.image_url?.length || 0,
        isSupabaseURL: projectData.image_url?.includes('supabase.co'),
        preview: projectData.image_url?.substring(0, 100) + '...'
      });
      
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowAddForm(false);
      toast({ title: "Project created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & ProjectFormData) => {
      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
      toast({ title: "Project updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "Project deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const ProjectForm = ({ 
    project, 
    onSave, 
    onCancel 
  }: { 
    project?: any; 
    onSave: (data: ProjectFormData) => void; 
    onCancel: () => void; 
  }) => {
    // Create unique key for this form session
    const formSessionKey = `project-form-${project?.id || 'new'}`;
    
    // Initialize form data - try to restore from localStorage first
    const getInitialData = useCallback(() => {
      // Start with base data (either project data or empty form)
      let baseData: ProjectFormData;
      if (project) {
        baseData = {
          title: project.title || '',
          description: project.description || '',
          project_type: project.project_type || '',
          status: project.status || 'UPCOMING',
          artist_id: project.artist_id || '',
          release_date: project.release_date ? project.release_date.split('T')[0] : '',
          image_url: project.image_url || '',
          teaser_url: project.teaser_url || ''
        };
      } else {
        baseData = getInitialFormData();
      }
      
      // Try to merge with localStorage data (don't override completely)
      const saved = localStorage.getItem(formSessionKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          console.log('🔄 Merging localStorage data with base data');
          console.log('📋 Base data:', baseData);
          console.log('💾 Saved data:', parsed);
          
          // Merge saved data but preserve non-empty image_url from base data
          const merged = {
            ...baseData,
            ...parsed,
            // Don't override image_url if base has one and saved doesn't
            image_url: parsed.image_url || baseData.image_url
          };
          
          console.log('🔗 Merged result:', merged);
          return merged;
        } catch (e) {
          console.warn('Failed to parse saved form data:', e);
        }
      }
      
      return baseData;
    }, [project, formSessionKey]);

    const [formData, dispatch] = useReducer(formReducer, getInitialData());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Save form data to localStorage on every change (but preserve image_url)
    useEffect(() => {
      // Get existing localStorage data to preserve image_url if current form doesn't have one
      const existing = localStorage.getItem(formSessionKey);
      let existingData = {};
      try {
        if (existing) {
          existingData = JSON.parse(existing);
        }
      } catch (e) {
        console.warn('Failed to parse existing localStorage data:', e);
      }
      
      // Merge current form data with existing, but preserve image_url if it exists in either
      const dataToSave = {
        ...formData,
        image_url: formData.image_url || (existingData as any)?.image_url || ''
      };
      
      localStorage.setItem(formSessionKey, JSON.stringify(dataToSave));
      const hasData = !!(formData.title.trim() || formData.description.trim() || formData.project_type.trim() || formData.image_url);
      console.log('💾 Form data saved to localStorage:', hasData);
      console.log('📸 Image URL in saved data:', dataToSave.image_url);
    }, [formData, formSessionKey]);
    
    // Clean up localStorage when component unmounts or form is cancelled
    useEffect(() => {
      return () => {
        // Don't clean up on unmount during normal operation
        // Only clean up when explicitly cancelled or submitted
      };
    }, []);

    // Handle image upload with immediate state update and localStorage sync
    const handleImageUpload = useCallback((imageUrl: string) => {
      console.log('🖼️ Image upload received in form:', imageUrl);
      console.log('📋 Current form data before update:', formData);
      
      // Update form state immediately
      dispatch({ type: 'SET_FIELD', field: 'image_url', value: imageUrl });
      
      // Also update localStorage immediately to prevent data loss
      const currentSaved = localStorage.getItem(formSessionKey);
      let updatedData = { ...formData, image_url: imageUrl };
      
      if (currentSaved) {
        try {
          const parsed = JSON.parse(currentSaved);
          updatedData = { ...parsed, image_url: imageUrl };
        } catch (e) {
          console.warn('Failed to parse current localStorage data:', e);
        }
      }
      
      localStorage.setItem(formSessionKey, JSON.stringify(updatedData));
      console.log('🔄 Image URL updated in form and localStorage:', imageUrl);
    }, [formData, formSessionKey]);

    // Simplified field change handler - localStorage handles persistence
    const handleFieldChange = useCallback((field: keyof ProjectFormData, value: any) => {
      console.log(`📝 Field change: ${field} = ${value}`);
      dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    // Clear form state and localStorage
    const resetFormState = useCallback(() => {
      console.log('🔄 Resetting form state');
      localStorage.removeItem(formSessionKey);
      dispatch({ type: 'RESET' });
    }, [formSessionKey]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate required fields
      if (!formData.title.trim()) {
        toast({
          title: "Missing information",
          description: "Project title is required",
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      
      try {
        onSave(formData);
        // Clear localStorage on successful submission
        localStorage.removeItem(formSessionKey);
        console.log('✅ Form submitted successfully - localStorage cleared');
      } catch (error) {
        console.error("Error saving project:", error);
        toast({
          title: "Error",
          description: "Failed to save project",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    // Handle cancel with proper reset
    const handleCancel = useCallback(() => {
      console.log('🚫 Form cancelled - resetting state');
      resetFormState();
      onCancel();
    }, [resetFormState, onCancel]);

    return (
      <Card className="bg-passionate-gray/20 border-passionate-gray">
        <CardHeader>
          <CardTitle className="text-passionate-white font-syncopate">
            {project ? 'Edit Project' : 'Add New Project'}
          </CardTitle>
          <CardDescription className="text-passionate-white/70">
            {project ? 'Update project information and details' : 'Create a new project or release'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-title" className="text-passionate-white">Project Title *</Label>
                <Input
                  id="project-title"
                  name="projectTitle"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter project title"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <Label htmlFor="project-type" className="text-passionate-white">Project Type</Label>
                <Input
                  id="project-type"
                  name="projectType"
                  value={formData.project_type}
                  onChange={(e) => handleFieldChange('project_type', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="e.g., Album, Single, EP, Music Video"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="project-description" className="text-passionate-white">Project Description</Label>
              <Textarea
                id="project-description"
                name="projectDescription"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={4}
                placeholder="Describe the project, its concept, and what makes it special..."
                autoComplete="off"
              />
            </div>

            {/* Status and Artist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-status" className="text-passionate-white">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleFieldChange('status', value)}
                  name="projectStatus"
                >
                  <SelectTrigger id="project-status" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project-artist" className="text-passionate-white">Artist</Label>
                <Select 
                  value={formData.artist_id} 
                  onValueChange={(value) => handleFieldChange('artist_id', value)}
                  name="projectArtist"
                >
                  <SelectTrigger id="project-artist" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists?.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Release Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-release-date" className="text-passionate-white">Release Date</Label>
                <Input
                  id="project-release-date"
                  name="projectReleaseDate"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => handleFieldChange('release_date', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                />
              </div>
              <div>
                <Label htmlFor="project-teaser-url" className="text-passionate-white">Teaser URL</Label>
                <Input
                  id="project-teaser-url"
                  name="projectTeaserUrl"
                  value={formData.teaser_url}
                  onChange={(e) => handleFieldChange('teaser_url', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="https://youtube.com/watch?v=..."
                  autoComplete="url"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="project-image" className="text-passionate-white">Project Cover/Image</Label>
              <ImageUpload
                value={formData.image_url}
                onChange={handleImageUpload}
                label="Project Cover Art/Image"
                placeholder="Upload project image"
                bucketName="project-images"
                inputId="project-image"
              />
            </div>

            {/* Form Actions */}
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="bg-passionate-red hover:bg-passionate-red/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Project
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outline" 
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-passionate-white" />
        <span className="ml-2 text-passionate-white">Loading projects...</span>
      </div>
    );
  }

  // Main component render
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-syncopate text-passionate-white">Project Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <ProjectForm
          key="add-project-form"
          onSave={(data) => createProjectMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingProject && (
        <ProjectForm
          key={`edit-project-form-${editingProject.id}`}
          project={editingProject}
          onSave={(data) => updateProjectMutation.mutate({ id: editingProject.id, ...data })}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projects?.map((project) => (
          <Card key={project.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    {...createSafeImageProps(project.image_url, project.title, 'project')}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-passionate-white">
                      {project.title}
                    </h3>
                    <p className="text-passionate-white/70">
                      {project.project_type} • {project.artists?.name || 'No Artist'}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.status === 'COMPLETED' ? 'bg-green-600' :
                        project.status === 'IN_PROGRESS' ? 'bg-blue-600' :
                        project.status === 'UPCOMING' ? 'bg-yellow-600' :
                        'bg-gray-600'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      {project.release_date && (
                        <span className="text-passionate-white/50 text-sm">
                          {new Date(project.release_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingProject(project)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => deleteProjectMutation.mutate(project.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
