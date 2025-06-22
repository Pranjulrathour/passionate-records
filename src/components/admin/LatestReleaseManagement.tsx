import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X, Loader2, Music, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/image-upload';
import { createSafeImageProps } from '@/utils/imageUtils';

// Latest Release form state type
type LatestReleaseFormData = {
  title: string;
  artist_name: string;
  artist_id: string;
  description: string;
  genre: string;
  release_type: string;
  release_date: string;
  cover_art_url: string;
  audio_preview_url: string;
  master_link: string;
  is_featured: boolean;
  display_order: number;
  status: string;
};

type FormAction = 
  | { type: 'SET_FIELD'; field: keyof LatestReleaseFormData; value: any }
  | { type: 'SET_ALL'; data: LatestReleaseFormData }
  | { type: 'RESET' };

const formReducer = (state: LatestReleaseFormData, action: FormAction): LatestReleaseFormData => {
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

const getInitialFormData = (): LatestReleaseFormData => ({
  title: '',
  artist_name: '',
  artist_id: '',
  description: '',
  genre: 'HIP_HOP',
  release_type: 'SINGLE',
  release_date: '',
  cover_art_url: '',
  audio_preview_url: '',
  master_link: '',
  is_featured: true,
  display_order: 0,
  status: 'ACTIVE'
});

// Genre options
const GENRE_OPTIONS = [
  'HIP_HOP', 'RAP', 'ELECTRONIC', 'INDIE_POP', 'ALTERNATIVE_ROCK', 
  'TRAP', 'SYNTHWAVE', 'PUNK_ROCK', 'EXPERIMENTAL', 'RNB', 'SOUL', 'OTHER'
];

const LatestReleaseManagement = () => {
  const [editingRelease, setEditingRelease] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch latest releases
  const { data: releases, isLoading } = useQuery({
    queryKey: ['admin-latest-releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('latest_releases')
        .select(`
          *,
          artists(name)
        `)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      // Debug: Log what we get from the database
      console.log('🎯 Latest releases fetched from database:', data);
      data?.forEach((release, index) => {
        console.log(`🎵 Release ${index + 1}:`, {
          title: release.title,
          cover_art_url: release.cover_art_url,
          cover_art_url_type: typeof release.cover_art_url,
          cover_art_url_length: release.cover_art_url?.length || 0,
          cover_art_url_preview: release.cover_art_url?.substring(0, 80) + '...'
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

  // Create release mutation
  const createReleaseMutation = useMutation({
    mutationFn: async (releaseData: LatestReleaseFormData) => {
      console.log('💾 Creating release with data:', releaseData);
      console.log('📸 Cover art URL being saved:', {
        cover_art_url: releaseData.cover_art_url,
        type: typeof releaseData.cover_art_url,
        length: releaseData.cover_art_url?.length || 0,
        isSupabaseURL: releaseData.cover_art_url?.includes('supabase.co'),
        preview: releaseData.cover_art_url?.substring(0, 100) + '...'
      });
      
      const { error } = await supabase
        .from('latest_releases')
        .insert(releaseData);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases-home'] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      // Invalidate individual release pages
      queryClient.invalidateQueries({ queryKey: ['release'] });
      setShowAddForm(false);
      toast({ title: "Release created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Update release mutation
  const updateReleaseMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & LatestReleaseFormData) => {
      const { error } = await supabase
        .from('latest_releases')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases-home'] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      // Invalidate individual release pages
      queryClient.invalidateQueries({ queryKey: ['release'] });
      setEditingRelease(null);
      toast({ title: "Release updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Delete release mutation
  const deleteReleaseMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('latest_releases')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases-home'] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      // Invalidate individual release pages
      queryClient.invalidateQueries({ queryKey: ['release'] });
      toast({ title: "Release deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Update display order mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from('latest_releases')
        .update({ display_order: newOrder })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      queryClient.invalidateQueries({ queryKey: ['latest-releases-home'] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
    }
  });

  const LatestReleaseForm = ({ 
    release, 
    onSave, 
    onCancel 
  }: { 
    release?: any; 
    onSave: (data: LatestReleaseFormData) => void; 
    onCancel: () => void; 
  }) => {
    // Create unique key for this form session
    const formSessionKey = `latest-release-form-${release?.id || 'new'}`;
    
    // Initialize form data - try to restore from localStorage first
    const getInitialData = useCallback(() => {
      // Start with base data (either release data or empty form)
      let baseData: LatestReleaseFormData;
      if (release) {
        baseData = {
          title: release.title || '',
          artist_name: release.artist_name || '',
          artist_id: release.artist_id || '',
          description: release.description || '',
          genre: release.genre || 'HIP_HOP',
          release_type: release.release_type || 'SINGLE',
          release_date: release.release_date ? release.release_date.split('T')[0] : '',
          cover_art_url: release.cover_art_url || '',
          audio_preview_url: release.audio_preview_url || '',
          master_link: release.master_link || '',
          is_featured: release.is_featured ?? true,
          display_order: release.display_order || 0,
          status: release.status || 'ACTIVE'
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
          
          // Merge saved data but preserve non-empty cover_art_url from base data
          const merged = {
            ...baseData,
            ...parsed,
            // Don't override cover_art_url if base has one and saved doesn't
            cover_art_url: parsed.cover_art_url || baseData.cover_art_url
          };
          
          console.log('🔗 Merged result:', merged);
          return merged;
        } catch (e) {
          console.warn('Failed to parse saved form data:', e);
        }
      }
      
      return baseData;
    }, [release, formSessionKey]);

    const [formData, dispatch] = useReducer(formReducer, getInitialData());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Save form data to localStorage on every change (but preserve cover_art_url)
    useEffect(() => {
      // Get existing localStorage data to preserve cover_art_url if current form doesn't have one
      const existing = localStorage.getItem(formSessionKey);
      let existingData = {};
      try {
        if (existing) {
          existingData = JSON.parse(existing);
        }
      } catch (e) {
        console.warn('Failed to parse existing localStorage data:', e);
      }
      
      // Merge current form data with existing, but preserve cover_art_url if it exists in either
      const dataToSave = {
        ...formData,
        cover_art_url: formData.cover_art_url || (existingData as any)?.cover_art_url || ''
      };
      
      localStorage.setItem(formSessionKey, JSON.stringify(dataToSave));
      const hasData = !!(formData.title.trim() || formData.description.trim() || formData.artist_name.trim() || formData.cover_art_url);
      console.log('💾 Form data saved to localStorage:', hasData);
      console.log('📸 Cover art URL in saved data:', dataToSave.cover_art_url);
    }, [formData, formSessionKey]);

    // Handle image upload with immediate state update and localStorage sync
    const handleImageUpload = useCallback((imageUrl: string) => {
      console.log('🖼️ Image upload received in form:', imageUrl);
      console.log('📋 Current form data before update:', formData);
      
      // Update form state immediately
      dispatch({ type: 'SET_FIELD', field: 'cover_art_url', value: imageUrl });
      
      // Also update localStorage immediately to prevent data loss
      const currentSaved = localStorage.getItem(formSessionKey);
      let updatedData = { ...formData, cover_art_url: imageUrl };
      
      if (currentSaved) {
        try {
          const parsed = JSON.parse(currentSaved);
          updatedData = { ...parsed, cover_art_url: imageUrl };
        } catch (e) {
          console.warn('Failed to parse current localStorage data:', e);
        }
      }
      
      localStorage.setItem(formSessionKey, JSON.stringify(updatedData));
      console.log('🔄 Cover art URL updated in form and localStorage:', imageUrl);
    }, [formData, formSessionKey]);

    // Simplified field change handler - localStorage handles persistence
    const handleFieldChange = useCallback((field: keyof LatestReleaseFormData, value: any) => {
      console.log(`📝 Field change: ${field} = ${value}`);
      dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    // Handle streaming link changes
    // Streaming links functionality removed - now using single master_link field

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
      if (!formData.title.trim() || !formData.artist_name.trim()) {
        toast({
          title: "Missing information",
          description: "Title and artist name are required",
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
        console.error("Error saving release:", error);
        toast({
          title: "Error",
          description: "Failed to save release",
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
            {release ? 'Edit Release' : 'Add New Release'}
          </CardTitle>
          <CardDescription className="text-passionate-white/70">
            {release ? 'Update release information and details' : 'Add a new featured release to showcase'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="release-title" className="text-passionate-white">Release Title *</Label>
                <Input
                  id="release-title"
                  name="releaseTitle"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter release title"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <Label htmlFor="release-artist-name" className="text-passionate-white">Artist Name *</Label>
                <Input
                  id="release-artist-name"
                  name="releaseArtistName"
                  value={formData.artist_name}
                  onChange={(e) => handleFieldChange('artist_name', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  placeholder="Enter artist name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="release-description" className="text-passionate-white">Description</Label>
              <Textarea
                id="release-description"
                name="releaseDescription"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                rows={4}
                placeholder="Describe the release, its style, and what makes it special..."
                autoComplete="off"
              />
            </div>

            {/* Genre, Type, and Release Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="release-genre" className="text-passionate-white">Genre</Label>
                <Select 
                  value={formData.genre} 
                  onValueChange={(value) => handleFieldChange('genre', value)}
                  name="releaseGenre"
                >
                  <SelectTrigger id="release-genre" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent aria-label="Select a genre">
                    {GENRE_OPTIONS.map((genre) => (
                      <SelectItem key={genre} value={genre} aria-label={genre.replace('_', ' ')}>
                        {genre.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="release-type" className="text-passionate-white">Release Type</Label>
                <Select 
                  value={formData.release_type} 
                  onValueChange={(value) => handleFieldChange('release_type', value)}
                  name="releaseType"
                >
                  <SelectTrigger id="release-type" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent aria-label="Select a release type">
                    <SelectItem value="SINGLE" aria-label="Single">Single</SelectItem>
                    <SelectItem value="EP" aria-label="EP">EP</SelectItem>
                    <SelectItem value="ALBUM" aria-label="Album">Album</SelectItem>
                    <SelectItem value="MIXTAPE" aria-label="Mixtape">Mixtape</SelectItem>
                    <SelectItem value="COMPILATION" aria-label="Compilation">Compilation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="release-date" className="text-passionate-white">Release Date</Label>
                <Input
                  id="release-date"
                  name="releaseDate"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => handleFieldChange('release_date', e.target.value)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                />
              </div>
            </div>

            {/* Artist and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="release-artist" className="text-passionate-white">Associated Artist</Label>
                <Select 
                  value={formData.artist_id || 'none'} 
                  onValueChange={(value) => handleFieldChange('artist_id', value === 'none' ? '' : value)}
                  name="releaseArtist"
                >
                  <SelectTrigger id="release-artist" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue placeholder="Select an artist (optional)" />
                  </SelectTrigger>
                  <SelectContent aria-label="Select an artist">
                    <SelectItem value="none" aria-label="No artist selected">No artist selected</SelectItem>
                    {artists?.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id} aria-label={artist.name}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="release-status" className="text-passionate-white">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleFieldChange('status', value)}
                  name="releaseStatus"
                >
                  <SelectTrigger id="release-status" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent aria-label="Select a status">
                    <SelectItem value="ACTIVE" aria-label="Active">Active</SelectItem>
                    <SelectItem value="DRAFT" aria-label="Draft">Draft</SelectItem>
                    <SelectItem value="ARCHIVED" aria-label="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cover Art Upload */}
            <div>
              <Label htmlFor="release-cover-art" className="text-passionate-white">Cover Art</Label>
              <ImageUpload
                value={formData.cover_art_url}
                onChange={handleImageUpload}
                label="Release Cover Art"
                placeholder="Upload cover art"
                bucketName="release-assets"
                inputId="release-cover-art"
              />
            </div>

            {/* Audio Preview URL */}
            <div>
              <Label htmlFor="release-audio-preview" className="text-passionate-white">Audio Preview URL</Label>
              <Input
                id="release-audio-preview"
                name="releaseAudioPreview"
                value={formData.audio_preview_url}
                onChange={(e) => handleFieldChange('audio_preview_url', e.target.value)}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://example.com/preview.mp3"
                autoComplete="url"
              />
            </div>

            {/* Master Link */}
            <div>
              <Label htmlFor="master-link" className="text-passionate-white flex items-center">
                <Music className="h-4 w-4 mr-2 text-passionate-red" />
                Master Link
              </Label>
              <Input
                id="master-link"
                name="masterLink"
                value={formData.master_link}
                onChange={(e) => handleFieldChange('master_link', e.target.value)}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://linktr.ee/release or main streaming platform URL"
                autoComplete="url"
              />
              <p className="text-passionate-white/50 text-xs mt-1">
                Add the main link for this release (Linktree, Spotify, Apple Music, etc.)
              </p>
            </div>

            {/* Featured and Display Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is-featured"
                  checked={formData.is_featured}
                  onChange={(e) => handleFieldChange('is_featured', e.target.checked)}
                  className="rounded border-passionate-gray"
                  aria-describedby="is-featured-label"
                />
                <Label htmlFor="is-featured" id="is-featured-label" className="text-passionate-white">Featured Release</Label>
              </div>
              <div>
                <Label htmlFor="display-order" className="text-passionate-white">Display Order</Label>
                <Input
                  id="display-order"
                  name="displayOrder"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleFieldChange('display_order', parseInt(e.target.value) || 0)}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  min="0"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="submit" 
                className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white w-full sm:w-auto min-h-[44px] touch-manipulation"
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
                    Save Release
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outline" 
                disabled={isSubmitting}
                className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 w-full sm:w-auto min-h-[44px] touch-manipulation"
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
        <span className="ml-2 text-passionate-white">Loading latest releases...</span>
      </div>
    );
  }

  // Main component render
  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-syncopate text-passionate-white">Release Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white w-full sm:w-auto min-h-[44px] touch-manipulation"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Release
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <CardTitle className="text-passionate-white">Add New Release</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <LatestReleaseForm
              onSave={(data) => createReleaseMutation.mutate(data)}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {releases?.map((release) => (
          <Card key={release.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-passionate-white text-lg truncate" title={release.title}>
                    {release.title}
                  </CardTitle>
                  <CardDescription className="text-passionate-white/70 truncate" title={release.artist_name}>
                    {release.artist_name}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                                         onClick={() => moveUp(release.id, release.display_order)}
                     disabled={updateReleaseMutation.isPending}
                     className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 min-h-[40px] touch-manipulation"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                                         onClick={() => moveDown(release.id, release.display_order)}
                     disabled={updateReleaseMutation.isPending}
                     className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 min-h-[40px] touch-manipulation"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingRelease(release)}
                    className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 min-h-[40px] touch-manipulation"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteReleaseMutation.mutate(release.id)}
                    className="border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white min-h-[40px] touch-manipulation"
                    disabled={deleteReleaseMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {release.cover_art_url && (
                <div className="flex justify-center">
                  <img
                    {...createSafeImageProps(release.cover_art_url, 'Release cover art')}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div>
                  <p className="text-passionate-white/70 text-sm">Genre</p>
                  <p className="text-passionate-white">{release.genre}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Type</p>
                  <p className="text-passionate-white">{release.release_type}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Release Date</p>
                  <p className="text-passionate-white">
                    {release.release_date ? new Date(release.release_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Featured</p>
                  <p className="text-passionate-white">{release.is_featured ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Order</p>
                  <p className="text-passionate-white">{release.display_order}</p>
                </div>
                {release.master_link && (
                  <div className="pt-2">
                    <p className="text-passionate-white/70 text-sm mb-2">Master Link</p>
                    <a
                      href={release.master_link.startsWith('http://') || release.master_link.startsWith('https://') 
                        ? release.master_link 
                        : `https://${release.master_link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-passionate-red hover:text-passionate-red/80 text-sm"
                    >
                      <Music className="h-4 w-4" />
                      Listen Now
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Form */}
      {editingRelease && (
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <CardTitle className="text-passionate-white">Edit Release</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setEditingRelease(null)}
                className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <LatestReleaseForm
              release={editingRelease}
              onSave={(data) => updateReleaseMutation.mutate({ id: editingRelease.id, ...data })}
              onCancel={() => setEditingRelease(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LatestReleaseManagement; 