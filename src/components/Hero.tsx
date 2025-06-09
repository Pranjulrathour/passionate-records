
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-passionate-black overflow-hidden pt-16">
      {/* Main Content */}
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-passionate-white mb-6 leading-tight">
            Discover Your Sound,
            <br />
            <span className="text-passionate-red">Amplify Your Passion</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-passionate-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            All-in-one platform to discover, collaborate, and deliver — 
            faster and smarter music experiences.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Link
              to="/submit-demo"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-passionate-red text-passionate-white font-semibold rounded-full hover:bg-passionate-red/90 transition-colors duration-300"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Artist Showcase */}
          <div className="relative">
            {/* Artist Cards Container */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl">
                {/* Artist Cards */}
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800">
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-green-600 to-green-800">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696358-c4f3b4b23c0b?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 4"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 5"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 6"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-600 to-pink-800">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
                    alt="Artist 7"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-passionate-red" />
            </div>
            <h3 className="text-xl font-semibold text-passionate-white mb-2">
              Real-Time Collaboration
            </h3>
            <p className="text-passionate-white/60 text-sm">
              Communicate seamlessly and keep everyone in sync with built-in messaging, file sharing, and live updates.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-passionate-red" />
            </div>
            <h3 className="text-xl font-semibold text-passionate-white mb-2">
              Track & Project Management
            </h3>
            <p className="text-passionate-white/60 text-sm">
              Assign tasks, set deadlines, and visualize progress with boards, lists, and timelines tailored to your team's style.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-passionate-red" />
            </div>
            <h3 className="text-xl font-semibold text-passionate-white mb-2">
              Performance Insights
            </h3>
            <p className="text-passionate-white/60 text-sm">
              Make smarter decisions with analytics that show productivity trends, bottlenecks, and team workload balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
