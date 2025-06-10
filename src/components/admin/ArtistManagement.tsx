import React, { useState, useCallback, useReducer, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, Instagram, Youtube, Music, Loader2, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/image-upload';
import { createSafeImageProps } from '@/utils/imageUtils';

// Artist form state type
type GenreType = 'OTHER' | 'HIP_HOP' | 'RAP' | 'ELECTRONIC' | 'INDIE_POP' | 'ALTERNATIVE_ROCK' | 'TRAP' | 'SYNTHWAVE' | 'PUNK_ROCK' | 'EXPERIMENTAL' | 'RNB' | 'SOUL';

interface ArtistFormData {
  name: string;
  stage_name: string;
  bio: string;
  genre: GenreType;
  image_url: string;
  instagram_handle: string;
  youtube_handle: string;
  spotify_url: string;
  location: string;
  is_featured: boolean;
}

// Form actions
type FormAction = 
  | { type: 'SET_FIELD'; field: keyof ArtistFormData; value: any }
  | { type: 'SET_ALL'; data: ArtistFormData }
  | { type: 'RESET' };

// Form reducer
const formReducer = (state: ArtistFormData, action: FormAction): ArtistFormData => {
  console.log('🔄 Form reducer action:', action.type, action);
  
  switch (action.type) {
    case 'SET_FIELD':
      const newState = { ...state, [action.field]: action.value };
      console.log('📋 Form state updated:', newState);
      return newState;
    case 'SET_ALL':
      console.log('📋 Form state set to:', action.data);
      return action.data;
    case 'RESET':
      console.log('🔄 Form state reset');
      return getInitialFormData();
    default:
      return state;
  }
};

// Get initial form data
const getInitialFormData = (): ArtistFormData => ({
  name: '',
  stage_name: '',
  bio: '',
  genre: 'OTHER' as GenreType,
  image_url: '',
  instagram_handle: '',
  youtube_handle: '',
  spotify_url: '',
  location: '',
  is_featured: false
});

const ArtistManagement = () => {
  const [editingArtist, setEditingArtist] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch artists
  const { data: artists, isLoading } = useQuery({
    queryKey: ['admin-artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Debug: Log what we get from the database
      console.log('🎯 Artists fetched from database:', data);
      data?.forEach((artist, index) => {
        console.log(`🎤 Artist ${index + 1}:`, {
          name: artist.name,
          image_url: artist.image_url,
          image_url_type: typeof artist.image_url,
          image_url_length: artist.image_url?.length || 0,
          image_url_preview: artist.image_url?.substring(0, 80) + '...'
        });
      });
      
      return data;
    }
  });

  // Create artist mutation
  const createArtistMutation = useMutation({
    mutationFn: async (artistData: ArtistFormData) => {
      console.log('💾 Creating artist with data:', artistData);
      console.log('📸 Image URL being saved:', {
        image_url: artistData.image_url,
        type: typeof artistData.image_url,
        length: artistData.image_url?.length || 0,
        isSupabaseURL: artistData.image_url?.includes('supabase.co'),
        preview: artistData.image_url?.substring(0, 100) + '...'
      });
      
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

  // Update artist mutation
  const updateArtistMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & ArtistFormData) => {
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

  // Delete artist mutation
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

  // Artist Form Component
  const ArtistForm = ({ 
    artist, 
    onSave, 
    onCancel 
  }: { 
    artist?: any; 
    onSave: (data: ArtistFormData) => void; 
    onCancel: () => void; 
  }) => {
    // Create unique key for this form session
    const formSessionKey = `artist-form-${artist?.id || 'new'}`;
    
    // Initialize form data - try to restore from localStorage first
    const getInitialData = useCallback(() => {
      // Start with base data (either artist data or empty form)
      let baseData: ArtistFormData;
      if (artist) {
        baseData = {
          name: artist.name || '',
          stage_name: artist.stage_name || '',
          bio: artist.bio || '',
          genre: artist.genre || 'OTHER' as GenreType,
          image_url: artist.image_url || '',
          instagram_handle: artist.instagram_handle || '',
          youtube_handle: artist.youtube_handle || '',
          spotify_url: artist.spotify_url || '',
          location: artist.location || '',
          is_featured: artist.is_featured || false
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
    }, [artist, formSessionKey]);

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
      const hasData = !!(formData.name.trim() || formData.stage_name.trim() || formData.bio.trim() || formData.image_url);
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

    // Protect form data during image upload
    const [isImageUploading, setIsImageUploading] = useState(false);

    // Create a stable reference to form data during image upload
    const formDataRef = useRef(formData);
    useEffect(() => {
      if (!isImageUploading) {
        formDataRef.current = formData;
      }
    }, [formData, isImageUploading]);

    // Simplified field change handler - localStorage handles persistence
    const handleFieldChange = useCallback((field: keyof ArtistFormData, value: any) => {
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
      if (!formData.name.trim()) {
        toast({
          title: "Missing information",
          description: "Artist name is required",
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
        console.error("Error saving artist:", error);
        toast({
          title: "Error",
          description: "Failed to save artist",
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
            {artist ? 'Edit Artist' : 'Add New Artist'}
          </CardTitle>
          <CardDescription className="text-passionate-white/70">
            {artist ? 'Update artist information and social media links' : 'Create a new artist profile with complete social media integration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="artist-name" className="text-passionate-white">Real Name *</Label>
                <Input
                  id="artist-name"
                  name="artistName"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter artist's real name"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="artist-stage-name" className="text-passionate-white">Stage Name</Label>
                <Input
                  id="artist-stage-name"
                  name="artistStageName"
                  value={formData.stage_name}
                  onChange={(e) => handleFieldChange('stage_name', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter stage name"
                  autoComplete="nickname"
                />
              </div>
            </div>

            {/* Biography */}
            <div>
              <Label htmlFor="artist-bio" className="text-passionate-white">Artist Biography</Label>
              <Textarea
                id="artist-bio"
                name="artistBio"
                value={formData.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={4}
                placeholder="Tell us about the artist's background, style, and journey..."
                autoComplete="off"
              />
            </div>

            {/* Genre and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="artist-genre" className="text-passionate-white">Music Genre *</Label>
                <Select 
                  value={formData.genre} 
                  onValueChange={(value) => handleFieldChange('genre', value as GenreType)}
                  name="artistGenre"
                >
                  <SelectTrigger id="artist-genre" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
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
                <Label htmlFor="artist-location" className="text-passionate-white">Location</Label>
                <Input
                  id="artist-location"
                  name="artistLocation"
                  value={formData.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="City, Country"
                  autoComplete="address-level2"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="artist-image" className="text-passionate-white">Profile Image</Label>
              <ImageUpload
                value={formData.image_url}
                onChange={handleImageUpload}
                label="Artist Profile Image"
                placeholder="Upload artist photo"
                bucketName="artist-images"
                inputId="artist-image"
              />
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h4 className="text-passionate-white font-syncopate text-lg">Social Media Integration</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="artist-instagram" className="text-passionate-white flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                    Instagram Handle
                  </Label>
                  <Input
                    id="artist-instagram"
                    name="artistInstagram"
                    value={formData.instagram_handle}
                    onChange={(e) => handleFieldChange('instagram_handle', e.target.value)}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="@username (include the @ symbol)"
                    autoComplete="username"
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Format: @username - This will create a direct link to their Instagram profile
                  </p>
                </div>

                <div>
                  <Label htmlFor="artist-youtube" className="text-passionate-white flex items-center">
                    <Youtube className="h-4 w-4 mr-2 text-red-500" />
                    YouTube Channel Handle
                  </Label>
                  <Input
                    id="artist-youtube"
                    name="artistYoutube"
                    value={formData.youtube_handle}
                    onChange={(e) => handleFieldChange('youtube_handle', e.target.value)}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="@channelname or channel name"
                    autoComplete="username"
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Format: @channelname or just the channel name - This will link to their YouTube channel
                  </p>
                </div>

                <div>
                  <Label htmlFor="artist-spotify" className="text-passionate-white flex items-center">
                    <Music className="h-4 w-4 mr-2 text-green-500" />
                    Spotify Artist Profile URL
                  </Label>
                  <Input
                    id="artist-spotify"
                    name="artistSpotify"
                    value={formData.spotify_url}
                    onChange={(e) => handleFieldChange('spotify_url', e.target.value)}
                    className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                    placeholder="https://open.spotify.com/artist/..."
                    autoComplete="url"
                  />
                  <p className="text-passionate-white/50 text-xs mt-1">
                    Full Spotify artist profile URL - This will link directly to their Spotify page
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Artist Toggle */}
            <div className="flex items-center space-x-2 p-4 bg-passionate-red/10 rounded-lg border border-passionate-red/30">
              <Switch
                id="artist-featured"
                name="artistFeatured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleFieldChange('is_featured', checked)}
              />
              <div>
                <Label htmlFor="artist-featured" className="text-passionate-white font-medium">Featured Artist</Label>
                <p className="text-passionate-white/70 text-sm">
                  Featured artists appear on the homepage and get priority placement
                </p>
              </div>
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
                    Save Artist
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
        <span className="ml-2 text-passionate-white">Loading artists...</span>
      </div>
    );
  }

  // Main component render
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-syncopate text-passionate-white">Artist Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Artist
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <ArtistForm
          key="add-artist-form"
          onSave={(data) => createArtistMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingArtist && (
        <ArtistForm
          key={`edit-artist-form-${editingArtist.id}`}
          artist={editingArtist}
          onSave={(data) => updateArtistMutation.mutate({ id: editingArtist.id, ...data })}
          onCancel={() => setEditingArtist(null)}
        />
      )}

      {/* Artists List */}
      <div className="grid gap-4">
        {artists?.map((artist) => (
          <Card key={artist.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    {...createSafeImageProps(artist.image_url, artist.name, 'artist')}
                    className="w-16 h-16 rounded-full object-cover"
                  />
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
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${artist.name}?`)) {
                        deleteArtistMutation.mutate(artist.id);
                      }
                    }}
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

        {/* Empty state */}
        {!artists || artists.length === 0 ? (
          <Card className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-8 text-center">
              <Music className="h-16 w-16 text-passionate-gray mx-auto mb-4" />
              <h3 className="text-passionate-white text-lg font-semibold mb-2">No Artists Yet</h3>
              <p className="text-passionate-white/70 mb-4">
                Start building your roster by adding your first artist.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-passionate-red hover:bg-passionate-red/80"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Artist
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default ArtistManagement;
