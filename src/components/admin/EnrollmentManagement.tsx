import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnrollmentManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artist_enrollments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('artist_enrollments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enrollments'] });
      toast({ title: "Status updated successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'approved' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  if (isLoading) {
    return <div className="text-passionate-white">Loading enrollments...</div>;
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-syncopate text-passionate-white">Artist Enrollment Management</h2>
      </div>

      <div className="grid gap-4">
        {enrollments?.map((enrollment) => (
          <Card key={enrollment.id} className="bg-passionate-gray/20 border-passionate-gray">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-passionate-white text-lg sm:text-xl">
                  {enrollment.full_name} {enrollment.stage_name && `(${enrollment.stage_name})`}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(enrollment.status || 'pending')}
                  {getStatusBadge(enrollment.status || 'pending')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-passionate-white/70 text-sm">Email</p>
                  <p className="text-passionate-white break-all">{enrollment.email}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Phone</p>
                  <p className="text-passionate-white">{enrollment.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Genre</p>
                  <p className="text-passionate-white">{enrollment.genre || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-passionate-white/70 text-sm">Expertise</p>
                  <p className="text-passionate-white">{enrollment.expertise || 'Not specified'}</p>
                </div>
              </div>

              {enrollment.message && (
                <div>
                  <p className="text-passionate-white/70 text-sm">Message</p>
                  <p className="text-passionate-white break-words">{enrollment.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollment.master_link && (
                  <div>
                    <p className="text-passionate-white/70 text-sm">Main Link</p>
                    <a 
                      href={enrollment.master_link.startsWith('http://') || enrollment.master_link.startsWith('https://') 
                        ? enrollment.master_link 
                        : `https://${enrollment.master_link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-passionate-red hover:underline break-all"
                    >
                      View Profile
                    </a>
                  </div>
                )}
                {enrollment.instagram_handle && (
                  <div>
                    <p className="text-passionate-white/70 text-sm">Instagram</p>
                    <a 
                      href={`https://instagram.com/${enrollment.instagram_handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-passionate-red hover:underline break-all"
                    >
                      {enrollment.instagram_handle}
                    </a>
                  </div>
                )}
                {enrollment.youtube_handle && (
                  <div>
                    <p className="text-passionate-white/70 text-sm">YouTube</p>
                    <a 
                      href={`https://youtube.com/@${enrollment.youtube_handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-passionate-red hover:underline break-all"
                    >
                      {enrollment.youtube_handle}
                    </a>
                  </div>
                )}
                {enrollment.spotify_url && (
                  <div>
                    <p className="text-passionate-white/70 text-sm">Spotify</p>
                    <a 
                      href={enrollment.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-passionate-red hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>

              {enrollment.portfolio_url && (
                <div>
                  <p className="text-passionate-white/70 text-sm">Portfolio</p>
                  <a 
                    href={enrollment.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-passionate-red hover:underline break-all"
                  >
                    View Portfolio
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-passionate-gray">
                <p className="text-passionate-white/70 text-sm">Update Status:</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                  <Select
                    value={enrollment.status || 'pending'}
                    onValueChange={(status) => updateStatusMutation.mutate({ id: enrollment.id, status })}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-passionate-gray/30 border-passionate-gray text-passionate-white min-h-[44px] touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-passionate-white/50 text-xs text-center sm:text-left">
                    Applied: {new Date(enrollment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentManagement;
