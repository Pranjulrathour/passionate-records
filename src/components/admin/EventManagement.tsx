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

// Event form state type
type EventFormData = {
  title: string;
  description: string;
  venue: string;
  date_time: string;
  event_type: string;
  image_url: string;
  ticket_url: string;
};

type FormAction = 
  | { type: 'SET_FIELD'; field: keyof EventFormData; value: any }
  | { type: 'SET_ALL'; data: EventFormData }
  | { type: 'RESET' };

const formReducer = (state: EventFormData, action: FormAction): EventFormData => {
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

const getInitialFormData = (): EventFormData => ({
  title: '',
  description: '',
  venue: '',
  date_time: '',
  event_type: 'CONCERT',
  image_url: '',
  ticket_url: ''
});

const EventManagement = () => {
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events, isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: false });
      
      if (error) throw error;
      
      // Debug: Log what we get from the database
      console.log('🎯 Events fetched from database:', data);
      data?.forEach((event, index) => {
        console.log(`🎪 Event ${index + 1}:`, {
          title: event.title,
          image_url: event.image_url,
          image_url_type: typeof event.image_url,
          image_url_length: event.image_url?.length || 0,
          image_url_preview: event.image_url?.substring(0, 80) + '...'
        });
      });
      
      return data;
    }
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: EventFormData) => {
      console.log('💾 Creating event with data:', eventData);
      console.log('📸 Image URL being saved:', {
        image_url: eventData.image_url,
        type: typeof eventData.image_url,
        length: eventData.image_url?.length || 0,
        isSupabaseURL: eventData.image_url?.includes('supabase.co'),
        preview: eventData.image_url?.substring(0, 100) + '...'
      });
      
      const { error } = await supabase
        .from('events')
        .insert(eventData);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setShowAddForm(false);
      toast({ title: "Event created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & EventFormData) => {
      const { error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setEditingEvent(null);
      toast({ title: "Event updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: "Event deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const EventForm = ({ 
    event, 
    onSave, 
    onCancel 
  }: { 
    event?: any; 
    onSave: (data: EventFormData) => void; 
    onCancel: () => void; 
  }) => {
    // Create unique key for this form session
    const formSessionKey = `event-form-${event?.id || 'new'}`;
    
    // Initialize form data - try to restore from localStorage first
    const getInitialData = useCallback(() => {
      // Start with base data (either event data or empty form)
      let baseData: EventFormData;
      if (event) {
        baseData = {
          title: event.title || '',
          description: event.description || '',
          venue: event.venue || '',
          date_time: event.date_time || '',
          event_type: event.event_type || 'CONCERT',
          image_url: event.image_url || '',
          ticket_url: event.ticket_url || ''
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
    }, [event, formSessionKey]);

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
      const hasData = !!(formData.title.trim() || formData.description.trim() || formData.venue.trim() || formData.image_url);
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
    const handleFieldChange = useCallback((field: keyof EventFormData, value: any) => {
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
          description: "Event title is required",
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
        console.error("Error saving event:", error);
        toast({
          title: "Error",
          description: "Failed to save event",
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="event-title" className="text-passionate-white">Event Title *</Label>
            <Input
              id="event-title"
              name="eventTitle"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
              placeholder="Enter event title"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-venue" className="text-passionate-white">Venue *</Label>
            <Input
              id="event-venue"
              name="eventVenue"
              value={formData.venue}
              onChange={(e) => handleFieldChange('venue', e.target.value)}
              className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
              placeholder="Enter venue name"
              autoComplete="off"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="event-description" className="text-passionate-white">Event Description</Label>
          <Textarea
            id="event-description"
            name="eventDescription"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
            rows={4}
            placeholder="Describe the event, performers, and what to expect..."
            autoComplete="off"
          />
        </div>

        {/* Date/Time and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="event-datetime" className="text-passionate-white">Date & Time *</Label>
            <Input
              id="event-datetime"
              name="eventDateTime"
              type="datetime-local"
              value={formData.date_time}
              onChange={(e) => handleFieldChange('date_time', e.target.value)}
              className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-type" className="text-passionate-white">Event Type</Label>
            <Select 
              value={formData.event_type} 
              onValueChange={(value) => handleFieldChange('event_type', value)}
              name="eventType"
            >
              <SelectTrigger id="event-type" className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONCERT">Concert</SelectItem>
                <SelectItem value="GIG">Gig</SelectItem>
                <SelectItem value="ALBUM_LAUNCH">Album Launch</SelectItem>
                <SelectItem value="MUSIC_VIDEO_PREMIERE">Music Video Premiere</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="event-image" className="text-passionate-white">Event Image</Label>
          <ImageUpload
            value={formData.image_url}
            onChange={handleImageUpload}
            label="Event Poster/Image"
            placeholder="Upload event image"
            bucketName="event-images"
            inputId="event-image"
          />
        </div>

        {/* Ticket URL */}
        <div>
          <Label htmlFor="event-ticket-url" className="text-passionate-white">Ticket URL</Label>
          <Input
            id="event-ticket-url"
            name="eventTicketUrl"
            value={formData.ticket_url}
            onChange={(e) => handleFieldChange('ticket_url', e.target.value)}
            className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
            placeholder="https://tickets.example.com/event"
            autoComplete="url"
          />
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
                    Save Event
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
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-passionate-white" />
        <span className="ml-2 text-passionate-white">Loading events...</span>
      </div>
    );
  }

  // Main component render
  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-syncopate text-passionate-white">Event Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white w-full sm:w-auto min-h-[44px] touch-manipulation"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <CardTitle className="text-passionate-white">Add New Event</CardTitle>
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
            <EventForm
              onSave={(data) => createEventMutation.mutate(data)}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events?.map((event) => (
          <Card key={event.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-passionate-white text-lg truncate" title={event.title}>
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-passionate-white/70 truncate" title={event.venue}>
                    {event.venue}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEvent(event)}
                    className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 min-h-[40px] touch-manipulation"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEventMutation.mutate(event.id)}
                    className="border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white min-h-[40px] touch-manipulation"
                    disabled={deleteEventMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.image_url && (
                <div className="flex justify-center">
                  <img
                    {...createSafeImageProps(event.image_url, 'Event image')}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div>
                  <p className="text-passionate-white/70 text-sm">Date & Time</p>
                  <p className="text-passionate-white">
                    {new Date(event.date_time).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Type</p>
                  <p className="text-passionate-white">{event.event_type}</p>
                </div>
                {event.ticket_url && (
                  <div className="pt-2">
                    <a
                      href={event.ticket_url.startsWith('http://') || event.ticket_url.startsWith('https://') ? event.ticket_url : `https://${event.ticket_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-passionate-red hover:text-passionate-red/80"
                    >
                      Tickets
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Form */}
      {editingEvent && (
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <CardTitle className="text-passionate-white">Edit Event</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setEditingEvent(null)}
                className="border-passionate-gray text-passionate-white hover:bg-passionate-gray/20 w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <EventForm
              event={editingEvent}
              onSave={(data) => updateEventMutation.mutate({ id: editingEvent.id, ...data })}
              onCancel={() => setEditingEvent(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventManagement;
