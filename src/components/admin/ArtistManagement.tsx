
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ArtistManagement = () => {
  const [editingArtist, setEditingArtist] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: artists, isLoading } = useQuery({
    queryKey: ['admin-artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createArtistMutation = useMutation({
    mutationFn: async (artistData: any) => {
      const { error } = await supabase
        .from('artists')
        .insert([artistData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-artists'] });
      queryClient.invalidateQueries({ queryKey: ['featured-artists'] });
      setShowAddForm(false);
      toast({ title: "Artist created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateArtistMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { error } = await supabase
        .from('artists')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-artists'] });
      queryClient.invalidateQueries({ queryKey: ['featured-artists'] });
      setEditingArtist(null);
      toast({ title: "Artist updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteArtistMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('artists')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-artists'] });
      queryClient.invalidateQueries({ queryKey: ['featured-artists'] });
      toast({ title: "Artist deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const ArtistForm = ({ artist, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(artist || {
      name: '',
      stage_name: '',
      bio: '',
      genre: 'OTHER',
      image_url: '',
      instagram_handle: '',
      youtube_handle: '',
      spotify_url: '',
      location: '',
      is_featured: false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card className="bg-passionate-gray/20 border-passionate-gray">
        <CardHeader>
          <CardTitle className="text-passionate-white font-syncopate">
            {artist ? 'Edit Artist' : 'Add New Artist'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-passionate-white">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stage_name" className="text-passionate-white">Stage Name</Label>
                <Input
                  id="stage_name"
                  value={formData.stage_name || ''}
                  onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-passionate-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="genre" className="text-passionate-white">Genre</Label>
                <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                  <SelectTrigger className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIP_HOP">Hip Hop</SelectItem>
                    <SelectItem value="RAP">Rap</SelectItem>
                    <SelectItem value="ELECTRONIC">Electronic</SelectItem>
                    <SelectItem value="INDIE_POP">Indie Pop</SelectItem>
                    <SelectItem value="ALTERNATIVE_ROCK">Alternative Rock</SelectItem>
                    <SelectItem value="TRAP">Trap</SelectItem>
                    <SelectItem value="SYNTHWAVE">Synthwave</SelectItem>
                    <SelectItem value="PUNK_ROCK">Punk Rock</SelectItem>
                    <SelectItem value="EXPERIMENTAL">Experimental</SelectItem>
                    <SelectItem value="RNB">R&B</SelectItem>
                    <SelectItem value="SOUL">Soul</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location" className="text-passionate-white">Location</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image_url" className="text-passionate-white">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="instagram_handle" className="text-passionate-white">Instagram</Label>
                <Input
                  id="instagram_handle"
                  value={formData.instagram_handle || ''}
                  onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="youtube_handle" className="text-passionate-white">YouTube</Label>
                <Input
                  id="youtube_handle"
                  value={formData.youtube_handle || ''}
                  onChange={(e) => setFormData({ ...formData, youtube_handle: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="@channel"
                />
              </div>
              <div>
                <Label htmlFor="spotify_url" className="text-passionate-white">Spotify URL</Label>
                <Input
                  id="spotify_url"
                  value={formData.spotify_url || ''}
                  onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="https://open.spotify.com/artist/..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured || false}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured" className="text-passionate-white">Featured Artist</Label>
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
    return <div className="text-passionate-white">Loading artists...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-syncopate text-passionate-white">Artist Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Artist
        </Button>
      </div>

      {showAddForm && (
        <ArtistForm
          onSave={(data: any) => createArtistMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingArtist && (
        <ArtistForm
          artist={editingArtist}
          onSave={(data: any) => updateArtistMutation.mutate({ id: editingArtist.id, ...data })}
          onCancel={() => setEditingArtist(null)}
        />
      )}

      <div className="grid gap-4">
        {artists?.map((artist) => (
          <Card key={artist.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {artist.image_url && (
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-passionate-white">
                      {artist.name} {artist.stage_name && `(${artist.stage_name})`}
                    </h3>
                    <p className="text-passionate-white/70">{artist.genre} • {artist.location}</p>
                    {artist.is_featured && (
                      <span className="inline-block px-2 py-1 text-xs bg-passionate-red text-passionate-white rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingArtist(artist)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => deleteArtistMutation.mutate(artist.id)}
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

export default ArtistManagement;
