import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Search, 
  ExternalLink,
  Mail,
  Music,
  Calendar,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createSafeDownloadBlob } from '@/utils/securityUtils';

const DemoSubmissionManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['demo-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('demo_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 5000, // Real-time updates every 5 seconds
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('demo_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-submissions'] });
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
      case 'under_review':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { variant: 'default' as const, color: 'bg-green-600' },
      rejected: { variant: 'destructive' as const, color: 'bg-red-600' },
      under_review: { variant: 'secondary' as const, color: 'bg-blue-600' },
      pending: { variant: 'secondary' as const, color: 'bg-yellow-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const exportToCSV = () => {
    if (!submissions || submissions.length === 0) {
      toast({ title: "No data to export", variant: "destructive" });
      return;
    }

    console.log('📊 Starting secure CSV export...');

    const headers = [
      'Submission Date',
      'Artist Name',
      'Email',
      'Genre',
      'Demo Link',
      'Status',
      'Message',
      'Last Updated'
    ];

    const csvData = submissions.map(sub => [
      new Date(sub.created_at).toLocaleDateString(),
      sub.artist_name || '',
      sub.email || '',
      sub.genre || '',
      sub.demo_link || '',
      sub.status || 'pending',
      sub.message || '',
      sub.updated_at ? new Date(sub.updated_at).toLocaleDateString() : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    try {
      // Use secure download utility
      createSafeDownloadBlob(
        csvContent,
        `demo-submissions-${new Date().toISOString().split('T')[0]}.csv`,
        'text/csv;charset=utf-8;'
      );
      
      toast({ title: "Data exported successfully!" });
      
    } catch (error) {
      console.error('❌ CSV export failed:', error);
      toast({ 
        title: "Export failed", 
        description: "There was an error exporting the data",
        variant: "destructive" 
      });
    }
  };

  // Filter submissions based on search and filters
  const filteredSubmissions = submissions?.filter(submission => {
    const matchesSearch = !searchTerm || 
      submission.artist_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.genre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || submission.genre === genreFilter;
    
    return matchesSearch && matchesStatus && matchesGenre;
  }) || [];

  const stats = {
    total: submissions?.length || 0,
    pending: submissions?.filter(s => s.status === 'pending').length || 0,
    approved: submissions?.filter(s => s.status === 'approved').length || 0,
    rejected: submissions?.filter(s => s.status === 'rejected').length || 0,
    under_review: submissions?.filter(s => s.status === 'under_review').length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-passionate-white">Loading demo submissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-syncopate text-passionate-white">Demo Submissions</h2>
        <Button
          onClick={exportToCSV}
          className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white w-full sm:w-auto min-h-[44px] touch-manipulation"
          disabled={!submissions || submissions.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-passionate-white">{stats.total}</div>
              <div className="text-passionate-white/70 text-xs sm:text-sm">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <div className="text-passionate-white/70 text-xs sm:text-sm">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-500">{stats.under_review}</div>
              <div className="text-passionate-white/70 text-xs sm:text-sm">Under Review</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-passionate-gray/20 border-passionate-gray">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-500">{stats.approved}</div>
              <div className="text-passionate-white/70 text-xs sm:text-sm">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-passionate-gray/20 border-passionate-gray col-span-2 sm:col-span-3 lg:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-500">{stats.rejected}</div>
              <div className="text-passionate-white/70 text-xs sm:text-sm">Rejected</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-passionate-gray/20 border-passionate-gray">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch sm:items-center">
            <div className="flex items-center space-x-2 min-w-0 flex-1 sm:flex-none">
              <Search className="h-4 w-4 text-passionate-white/70 flex-shrink-0" />
              <Input
                placeholder="Search by artist, email, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-passionate-gray/30 border-passionate-gray text-passionate-white min-h-[44px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-passionate-white/70 flex-shrink-0" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-passionate-gray/30 border-passionate-gray text-passionate-white min-h-[44px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Music className="h-4 w-4 text-passionate-white/70 flex-shrink-0" />
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-passionate-gray/30 border-passionate-gray text-passionate-white min-h-[44px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="HIP-HOP / RAP">Hip-Hop / Rap</SelectItem>
                  <SelectItem value="INDIE POP">Indie Pop</SelectItem>
                  <SelectItem value="ALTERNATIVE ROCK">Alternative Rock</SelectItem>
                  <SelectItem value="ELECTRONIC">Electronic</SelectItem>
                  <SelectItem value="TRAP">Trap</SelectItem>
                  <SelectItem value="SYNTHWAVE">Synthwave</SelectItem>
                  <SelectItem value="PUNK ROCK">Punk Rock</SelectItem>
                  <SelectItem value="EXPERIMENTAL">Experimental</SelectItem>
                  <SelectItem value="R&B / SOUL">R&B / Soul</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-passionate-white/70 text-sm text-center sm:text-left">
              Showing {filteredSubmissions.length} of {submissions?.length || 0} submissions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card className="bg-passionate-gray/20 border-passionate-gray">
        <CardHeader>
          <CardTitle className="text-passionate-white">Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-passionate-gray">
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Date</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Artist</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Email</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Genre</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Demo</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Status</th>
                  <th className="text-left py-3 px-4 text-passionate-white/70 font-medium whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-passionate-gray/30 hover:bg-passionate-gray/10">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-passionate-white/70">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm whitespace-nowrap">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-passionate-white font-medium max-w-[120px] truncate" title={submission.artist_name}>
                        {submission.artist_name}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 max-w-[150px]">
                        <Mail className="h-4 w-4 text-passionate-white/70 flex-shrink-0" />
                        <a 
                          href={`mailto:${submission.email}`}
                          className="text-passionate-red hover:underline truncate"
                          title={submission.email}
                        >
                          {submission.email}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-passionate-white/70 max-w-[100px] truncate" title={submission.genre}>
                        {submission.genre}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={submission.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-passionate-red hover:underline whitespace-nowrap"
                      >
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        <span>Listen</span>
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 whitespace-nowrap">
                        {getStatusIcon(submission.status || 'pending')}
                        {getStatusBadge(submission.status || 'pending')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Select
                        value={submission.status || 'pending'}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: submission.id, status })}
                      >
                        <SelectTrigger className="w-32 bg-passionate-gray/30 border-passionate-gray text-passionate-white min-h-[44px] touch-manipulation whitespace-nowrap">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="under_review">Under Review</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8 text-passionate-white/70">
                No submissions found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoSubmissionManagement; 