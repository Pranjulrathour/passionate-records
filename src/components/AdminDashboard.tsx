import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Music, Calendar, LogOut, Loader2, AlertCircle, Star } from 'lucide-react';
import ArtistManagement from '@/components/admin/ArtistManagement';
import EventManagement from '@/components/admin/EventManagement';
import ProjectManagement from '@/components/admin/ProjectManagement';
import DemoSubmissionManagement from '@/components/admin/DemoSubmissionManagement';
import LatestReleaseManagement from '@/components/admin/LatestReleaseManagement';

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

    // Subscribe to demo submissions changes
    const demoSubmissionsChannel = supabase
      .channel('demo-submissions-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'demo_submissions'
      }, () => {
        console.log('Demo submissions table changed, invalidating queries');
        queryClient.invalidateQueries({ queryKey: ['demo-submissions'] });
      })
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(artistsChannel);
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(demoSubmissionsChannel);
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
    <div className="min-h-screen bg-passionate-black pb-20 lg:pb-0">
      {/* Header */}
      <div className="border-b border-passionate-gray">
        <div className="flex h-14 sm:h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/assets/VSICS (1).png" 
              alt="Passionate Records Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
            <h1 className="text-sm sm:text-lg lg:text-xl font-syncopate text-passionate-white leading-tight">
              <span className="hidden sm:inline">PASSIONATE RECORDS - </span>ADMIN<span className="hidden sm:inline"> DASHBOARD</span>
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
            <span className="text-passionate-white/70 text-xs sm:text-sm hidden sm:inline">
              Welcome, {profile?.full_name || user.email}
            </span>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="bg-transparent border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
              <span className="sm:hidden">Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <Tabs defaultValue="artists" className="space-y-4 sm:space-y-6">
          {/* Desktop Tabs - Hidden on Mobile */}
          <TabsList className="hidden lg:grid w-full grid-cols-5 bg-passionate-gray/20">
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
            <TabsTrigger value="releases" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <Star className="h-4 w-4 mr-2" />
              Latest Releases
            </TabsTrigger>
            <TabsTrigger value="demos" className="text-passionate-white data-[state=active]:bg-passionate-red">
              <Music className="h-4 w-4 mr-2" />
              Demo Submissions
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="artists" className="space-y-4 sm:space-y-6">
            <ArtistManagement />
          </TabsContent>

          <TabsContent value="events" className="space-y-4 sm:space-y-6">
            <EventManagement />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 sm:space-y-6">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="releases" className="space-y-4 sm:space-y-6">
            <LatestReleaseManagement />
          </TabsContent>

          <TabsContent value="demos" className="space-y-4 sm:space-y-6">
            <DemoSubmissionManagement />
          </TabsContent>

          {/* Mobile Dock Navigation - Fixed at Bottom */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-passionate-black/95 backdrop-blur-lg border-t border-passionate-gray/30">
              <TabsList className="grid w-full grid-cols-5 bg-transparent border-0 p-2">
                <TabsTrigger 
                  value="artists" 
                  className="flex flex-col items-center justify-center p-2 text-passionate-white/70 data-[state=active]:text-passionate-red data-[state=active]:bg-passionate-red/10 rounded-lg touch-manipulation min-h-[60px]"
                >
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs font-syncopate tracking-wider">ARTISTS</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="events" 
                  className="flex flex-col items-center justify-center p-2 text-passionate-white/70 data-[state=active]:text-passionate-red data-[state=active]:bg-passionate-red/10 rounded-lg touch-manipulation min-h-[60px]"
                >
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs font-syncopate tracking-wider">EVENTS</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="projects" 
                  className="flex flex-col items-center justify-center p-2 text-passionate-white/70 data-[state=active]:text-passionate-red data-[state=active]:bg-passionate-red/10 rounded-lg touch-manipulation min-h-[60px]"
                >
                  <Music className="h-5 w-5 mb-1" />
                  <span className="text-xs font-syncopate tracking-wider">PROJECTS</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="releases" 
                  className="flex flex-col items-center justify-center p-2 text-passionate-white/70 data-[state=active]:text-passionate-red data-[state=active]:bg-passionate-red/10 rounded-lg touch-manipulation min-h-[60px]"
                >
                  <Star className="h-5 w-5 mb-1" />
                  <span className="text-xs font-syncopate tracking-wider">RELEASES</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="demos" 
                  className="flex flex-col items-center justify-center p-2 text-passionate-white/70 data-[state=active]:text-passionate-red data-[state=active]:bg-passionate-red/10 rounded-lg touch-manipulation min-h-[60px]"
                >
                  <Music className="h-5 w-5 mb-1" />
                  <span className="text-xs font-syncopate tracking-wider">DEMOS</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
