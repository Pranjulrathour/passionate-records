import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/image-upload';

const ProjectManagement = () => {
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
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

  const { data: artists } = useQuery({
    queryKey: ['artists-for-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name, stage_name')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: any) => {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowAddForm(false);
      toast({ title: "Project created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
      toast({ title: "Project updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

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
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "Project deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const ProjectForm = ({ project, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(project || {
      title: '',
      description: '',
      project_type: '',
      status: 'UPCOMING',
      artist_id: '',
      release_date: '',
      image_url: '',
      teaser_url: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card className="bg-passionate-gray/20 border-passionate-gray mb-6">
        <CardHeader>
          <CardTitle className="text-passionate-white font-syncopate">
            {project ? 'Edit Project' : 'Add New Project'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-passionate-white">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-passionate-white">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project_type" className="text-passionate-white">Project Type</Label>
                <Input
                  id="project_type"
                  value={formData.project_type || ''}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="e.g., Album, Single, EP"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-passionate-white">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="artist_id" className="text-passionate-white">Artist</Label>
                <Select 
                  value={formData.artist_id || ''} 
                  onValueChange={(value) => setFormData({ ...formData, artist_id: value || null })}
                >
                  <SelectTrigger className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No artist assigned</SelectItem>
                    {artists?.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name} {artist.stage_name && `(${artist.stage_name})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="release_date" className="text-passionate-white">Release Date</Label>
                <Input
                  id="release_date"
                  type="date"
                  value={formData.release_date || ''}
                  onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                />
              </div>
            </div>

            <ImageUpload
              value={formData.image_url || ''}
              onChange={(value) => setFormData({ ...formData, image_url: value })}
              label="Project Image"
              placeholder="Upload project cover image"
              bucketName="artist-images"
            />

            <div>
              <Label htmlFor="teaser_url" className="text-passionate-white">Teaser URL</Label>
              <Input
                id="teaser_url"
                value={formData.teaser_url || ''}
                onChange={(e) => setFormData({ ...formData, teaser_url: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="bg-passionate-red hover:bg-passionate-red/80">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" onClick={onCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <div className="text-passionate-white">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-syncopate text-passionate-white">Project Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {showAddForm && (
        <ProjectForm
          onSave={(data: any) => createProjectMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSave={(data: any) => updateProjectMutation.mutate({ id: editingProject.id, ...data })}
          onCancel={() => setEditingProject(null)}
        />
      )}

      <div className="grid gap-4">
        {projects?.map((project) => (
          <Card key={project.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-passionate-white">{project.title}</h3>
                  <p className="text-passionate-white/70">
                    {project.artists?.name} {project.artists?.stage_name && `(${project.artists.stage_name})`}
                  </p>
                  <p className="text-passionate-white/50">
                    {project.project_type} • {project.status}
                    {project.release_date && ` • Release: ${new Date(project.release_date).toLocaleDateString()}`}
                  </p>
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
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
