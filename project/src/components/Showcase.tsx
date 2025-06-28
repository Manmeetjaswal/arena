import React from 'react';
import { Play, Download, Share2 } from 'lucide-react';

const Showcase = () => {
  const showcaseItems = [
    {
      id: 1,
      name: 'Alex Digital Twin',
      type: 'Video Avatar',
      preview: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional presenter avatar with natural movements'
    },
    {
      id: 2,
      name: 'Sarah Voice Clone',
      type: 'Voice AI',
      preview: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Multilingual voice clone for educational content'
    },
    {
      id: 3,
      name: 'Marcus VTuber',
      type: 'Interactive Avatar',
      preview: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Gaming avatar with real-time facial expressions'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See What's Possible
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From video avatars to voice clones, our community is creating amazing digital twins. 
            Here's a glimpse into the future of content creation.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Preview Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.preview}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-105">
                    <Play className="h-6 w-6 text-blue-600" />
                  </button>
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Play className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
            <div className="text-gray-600 text-sm">Digital Twins Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
            <div className="text-gray-600 text-sm">Active Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600 text-sm">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Open Source</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;