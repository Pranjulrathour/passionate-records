
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
import { Plus, Edit, Trash2, Save, X, Instagram, Youtube, Music } from 'lucide-react';
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
      queryClient.invalidateQueries({ queryKey: ['artists'] });
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
      queryClient.invalidateQueries({ queryKey: ['artists'] });
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
      queryClient.invalidateQueries({ queryKey: ['artists'] });
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
          <CardDescription className="text-passionate-white/70">
            {artist ? 'Update artist information and social media links' : 'Create a new artist profile with complete social media integration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-passionate-white">Real Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  required
                  placeholder="Enter artist's real name"
                />
              </div>
              <div>
                <Label htmlFor="stage_name" className="text-passionate-white">Stage Name</Label>
                <Input
                  id="stage_name"
                  value={formData.stage_name || ''}
                  onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter stage name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-passionate-white">Artist Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={4}
                placeholder="Tell us about the artist's background, style, and journey..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="genre" className="text-passionate-white">Music Genre *</Label>
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
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image_url" className="text-passionate-white">Profile Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://example.com/artist-photo.jpg"
              />
            </div>

            {/* Social Media Integration Section */}
            <div className="space-y-4">
              <h4 className="text-passionate-white font-syncopate text-lg">Social Media Integration</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="instagram_handle" className="text-passionate-white flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                    Instagram Handle
                  </Label>
                  <Input
                    id="instagram_handle"
                    value={formData.instagram_handle || ''}
                    onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="@username (include the @ symbol)"
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Format: @username - This will create a direct link to their Instagram profile
                  </p>
                </div>

                <div>
                  <Label htmlFor="youtube_handle" className="text-passionate-white flex items-center">
                    <Youtube className="h-4 w-4 mr-2 text-red-500" />
                    YouTube Channel Handle
                  </Label>
                  <Input
                    id="youtube_handle"
                    value={formData.youtube_handle || ''}
                    onChange={(e) => setFormData({ ...formData, youtube_handle: e.target.value })}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="@channelname or channel name"
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Format: @channelname or just the channel name - This will link to their YouTube channel
                  </p>
                </div>

                <div>
                  <Label htmlFor="spotify_url" className="text-passionate-white flex items-center">
                    <Music className="h-4 w-4 mr-2 text-green-500" />
                    Spotify Artist Profile URL
                  </Label>
                  <Input
                    id="spotify_url"
                    value={formData.spotify_url || ''}
                    onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="https://open.spotify.com/artist/..."
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Full Spotify artist profile URL - This will link directly to their Spotify page
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-passionate-red/10 rounded-lg border border-passionate-red/30">
              <Switch
                id="is_featured"
                checked={formData.is_featured || false}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <div>
                <Label htmlFor="is_featured" className="text-passionate-white font-medium">Featured Artist</Label>
                <p className="text-passionate-white/70 text-sm">
                  Featured artists appear on the homepage and get priority placement
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="bg-passionate-red hover:bg-passionate-red/80">
                <Save className="h-4 w-4 mr-2" />
                Save Artist
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
                    <div className="flex items-center space-x-3 mt-2">
                      {artist.instagram_handle && (
                        <a
                          href={`https://instagram.com/${artist.instagram_handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:text-pink-400"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {artist.youtube_handle && (
                        <a
                          href={`https://youtube.com/@${artist.youtube_handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400"
                        >
                          <Youtube className="h-4 w-4" />
                        </a>
                      )}
                      {artist.spotify_url && (
                        <a
                          href={artist.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-400"
                        >
                          <Music className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {artist.is_featured && (
                      <span className="inline-block px-2 py-1 text-xs bg-passionate-red text-passionate-white rounded mt-2">
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
