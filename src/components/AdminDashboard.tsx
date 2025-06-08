
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Music, Calendar, FileText, LogOut, Loader2, AlertCircle } from 'lucide-react';
import ArtistManagement from '@/components/admin/ArtistManagement';
import EventManagement from '@/components/admin/EventManagement';
import EnrollmentManagement from '@/components/admin/EnrollmentManagement';
import ProjectManagement from '@/components/admin/ProjectManagement';

const AdminDashboard = () => {
  const { profile, signOut, isAdmin, loading, user, profileError } = useAuth();
  const queryClient = useQueryClient();

  // Set up real-time subscriptions for admin data
  useEffect(() => {
    if (!isAdmin) return;

    console.log('Setting up real-time subscriptions for admin dashboard');

    // Subscribe to artists changes
    const artistsChannel = supabase
      .channel('artists-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'artists'
      }, () => {
        console.log('Artists table changed, invalidating queries');
        queryClient.invalidateQueries({ queryKey: ['artists'] });
        queryClient.invalidateQueries({ queryKey: ['featured-artists'] });
      })
      .subscribe();

    // Subscribe to projects changes
    const projectsChannel = supabase
      .channel('projects-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, () => {
        console.log('Projects table changed, invalidating queries');
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        queryClient.invalidateQueries({ queryKey: ['latest-releases'] });
      })
      .subscribe();

    // Subscribe to events changes
    const eventsChannel = supabase
      .channel('events-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'events'
      }, () => {
        console.log('Events table changed, invalidating queries');
        queryClient.invalidateQueries({ queryKey: ['events'] });
      })
      .subscribe();

    // Subscribe to enrollments changes
    const enrollmentsChannel = supabase
      .channel('enrollments-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'artist_enrollments'
      }, () => {
        console.log('Enrollments table changed, invalidating queries');
        queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      })
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(artistsChannel);
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(enrollmentsChannel);
    };
  }, [isAdmin, queryClient]);

  if (loading) {
    return (
      <div className="min-h-screen bg-passionate-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 text-passionate-red animate-spin" />
          <div className="text-passionate-white font-syncopate text-xl">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-passionate-black flex items-center justify-center">
        <Card className="bg-passionate-gray/20 border-passionate-gray max-w-md">
          <CardHeader>
            <CardTitle className="text-passionate-white font-syncopate flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-passionate-red" />
              Profile Error
            </CardTitle>
            <CardDescription className="text-passionate-white/70">
              There was an error loading your profile. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-passionate-white/60 mb-4">
              <p>Error: {profileError.message}</p>
              <p>User: {user?.email}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-passionate-red hover:bg-passionate-red-dark"
              >
                Refresh Page
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-passionate-black flex items-center justify-center">
        <Card className="bg-passionate-gray/20 border-passionate-gray max-w-md">
          <CardHeader>
            <CardTitle className="text-passionate-white font-syncopate">Authentication Required</CardTitle>
            <CardDescription className="text-passionate-white/70">
              Please sign in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="w-full bg-passionate-red hover:bg-passionate-red-dark"
            >
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-passionate-black flex items-center justify-center">
        <Card className="bg-passionate-gray/20 border-passionate-gray max-w-md">
          <CardHeader>
            <CardTitle className="text-passionate-white font-syncopate">Access Denied</CardTitle>
            <CardDescription className="text-passionate-white/70">
              You don't have admin privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-passionate-white/60 mb-4">
              <p>User: {user.email}</p>
              <p>Role: {profile?.role || 'user'}</p>
              <p>If you should have admin access, please contact the system administrator.</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-passionate-black">
      <div className="border-b border-passionate-gray">
        <div className="flex h-16 items-center px-4 lg:px-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2798045b-acfd-4e92-9275-b9b11607bbb4.png" 
              alt="Passionate Records Logo" 
              className="h-8 w-8"
            />
            <h1 className="text-xl font-syncopate text-passionate-white">
              PASSIONATE RECORDS - ADMIN DASHBOARD
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-passionate-white/70">Welcome, {profile?.full_name || user.email}</span>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="bg-transparent border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="artists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-passionate-gray/20">
            <TabsTrigger value="artists" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <Users className="h-4 w-4 mr-2" />
              Artists
            </TabsTrigger>
            <TabsTrigger value="events" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <Music className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <FileText className="h-4 w-4 mr-2" />
              Enrollments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="artists" className="space-y-6">
            <ArtistManagement />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <EventManagement />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="enrollments" className="space-y-6">
            <EnrollmentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
