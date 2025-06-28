import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Zap, text: "AI-Powered", color: "text-blue-400" },
    { icon: Shield, text: "Privacy-First", color: "text-green-400" },
    { icon: Users, text: "Open-Source", color: "text-purple-400" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate features every 3 seconds
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Destructure the current feature's icon component
  const CurrentIcon = features[currentFeature].icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-6">
              {/* Dynamic Feature Badge */}
              <div className="flex items-center space-x-3 text-sm font-medium">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50 shadow-lg">
                  <CurrentIcon className={`h-4 w-4 ${features[currentFeature].color} transition-all duration-500`} />
                  <span className="text-gray-700 transition-all duration-500">{features[currentFeature].text}</span>
                  <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                <span className="text-blue-600 font-semibold">Digital Twin Studio</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Digital Twin.
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                  Your Data.
                </span>
                <br />
                <span className="relative">
                  Your Control.
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full opacity-30" />
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Create AI avatars and voice clones with complete ownership. 
                <span className="font-semibold text-gray-800"> 100% Free & Open-Source.</span>
                <br />
                No hidden costs, no proprietary restrictions, no data mining.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>MIT Licensed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span>Community-Driven</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/create"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative">Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-300/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2.3k+</div>
                <div className="text-sm text-gray-500">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-500">Clones Created</div>
              </div>
            </div>
          </div>

          {/* Enhanced AI Avatar Animation */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              {/* Main Glassmorphism Container */}
              <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Avatar Container with Enhanced Animation */}
                <div className="relative aspect-square bg-gradient-to-br from-blue-100 via-white to-teal-100 rounded-2xl overflow-hidden shadow-inner">
                  {/* Animated Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Face Shape with Breathing Animation */}
                      <div className="w-32 h-40 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full animate-pulse shadow-lg" 
                           style={{ animation: 'breathe 4s ease-in-out infinite' }} />
                      
                      {/* Eyes with Blinking */}
                      <div className="absolute top-12 left-6 w-3 h-3 bg-blue-600 rounded-full animate-pulse" 
                           style={{ animation: 'blink 3s ease-in-out infinite' }} />
                      <div className="absolute top-12 right-6 w-3 h-3 bg-blue-600 rounded-full animate-pulse" 
                           style={{ animation: 'blink 3s ease-in-out infinite, blink 3s ease-in-out infinite 0.1s' }} />
                      
                      {/* Mouth with Speaking Animation */}
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-600 rounded-full" 
                           style={{ animation: 'speak 2s ease-in-out infinite' }} />
                      
                      {/* Facial Features */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-blue-500 rounded-full opacity-60" />
                    </div>
                  </div>
                  
                  {/* Enhanced Floating Particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-8 left-8 w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.9s' }} />
                  
                  {/* AI Processing Visualization */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse" />
                    <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-l from-teal-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                
                {/* Enhanced Status Indicators */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">AI Active</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Voice Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Learning</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-float shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400 rounded-full opacity-60 animate-float shadow-lg" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float shadow-lg" style={{ animationDelay: '2s' }} />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-3xl blur-xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;