
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

const EventManagement = () => {
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      const { error } = await supabase
        .from('events')
        .insert([eventData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      setShowAddForm(false);
      toast({ title: "Event created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      setEditingEvent(null);
      toast({ title: "Event updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

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
      toast({ title: "Event deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const EventForm = ({ event, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(event || {
      title: '',
      description: '',
      venue: '',
      date_time: '',
      event_type: 'CONCERT',
      image_url: '',
      ticket_url: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card className="bg-passionate-gray/20 border-passionate-gray">
        <CardHeader>
          <CardTitle className="text-passionate-white font-syncopate">
            {event ? 'Edit Event' : 'Add New Event'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-passionate-white">Event Title</Label>
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
                <Label htmlFor="venue" className="text-passionate-white">Venue</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="event_type" className="text-passionate-white">Event Type</Label>
                <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                  <SelectTrigger className="bg-passionate-gray/30 border-passionate-gray text-passionate-white">
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

            <div>
              <Label htmlFor="date_time" className="text-passionate-white">Date & Time</Label>
              <Input
                id="date_time"
                type="datetime-local"
                value={formData.date_time ? new Date(formData.date_time).toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                required
              />
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

            <div>
              <Label htmlFor="ticket_url" className="text-passionate-white">Ticket URL</Label>
              <Input
                id="ticket_url"
                value={formData.ticket_url || ''}
                onChange={(e) => setFormData({ ...formData, ticket_url: e.target.value })}
                className="bg-passionate-gray/30 border-passionate-gray text-passionate-white"
                placeholder="https://tickets.example.com"
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
    return <div className="text-passionate-white">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-syncopate text-passionate-white">Event Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-passionate-red hover:bg-passionate-red/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {showAddForm && (
        <EventForm
          onSave={(data: any) => createEventMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={(data: any) => updateEventMutation.mutate({ id: editingEvent.id, ...data })}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      <div className="grid gap-4">
        {events?.map((event) => (
          <Card key={event.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-passionate-white">{event.title}</h3>
                  <p className="text-passionate-white/70">
                    {event.venue} • {new Date(event.date_time).toLocaleDateString()} at {new Date(event.date_time).toLocaleTimeString()}
                  </p>
                  <p className="text-passionate-white/50">{event.event_type}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingEvent(event)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => deleteEventMutation.mutate(event.id)}
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

export default EventManagement;
