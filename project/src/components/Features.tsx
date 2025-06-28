import React from 'react';
import { Shield, Users, Code, Heart, Lock, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Code,
      title: 'Free & Open-Source',
      description: 'No hidden costs, no proprietary restrictions. Access the full source code, contribute to development, and use it freely for any purpose.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Full Data Ownership',
      description: 'Your data stays yours. We never store, sell, or share your uploads. Process everything locally or on your own infrastructure.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Community-Powered',
      description: 'Built by creators, for creators. Join our community of developers, artists, and innovators shaping the future of digital twins.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: 'Ethical AI',
      description: 'Transparent AI models, privacy-first design, and responsible innovation.',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Fast AI inference with optimized models for quick results.',
    },
    {
      icon: Heart,
      title: 'Creator-Friendly',
      description: 'Built specifically for content creators, educators, and developers.',
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EchoForge?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on the principles of openness, privacy, and community collaboration. 
            Your digital twin, your way.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 shadow-lg`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Built for the Future
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced features designed to give you complete control over your digital presence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                  <feature.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;