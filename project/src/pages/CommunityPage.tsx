import React, { useState } from 'react';
import { ArrowLeft, Book, Users, MessageCircle, Github, Star, GitFork, Heart, ChevronDown, ChevronUp, ExternalLink, Play, Clock, User, Award, Shield, Lightbulb, HelpCircle, Zap, Target, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    {
      id: 1,
      title: 'How to Create Your First Clone',
      description: 'Step-by-step guide to creating your first AI avatar and voice clone',
      duration: '10 min',
      difficulty: 'Beginner',
      category: 'Getting Started',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Basics', 'Video', 'Audio']
    },
    {
      id: 2,
      title: 'Tips for Better Video & Audio Input',
      description: 'Professional techniques for capturing high-quality source material',
      duration: '15 min',
      difficulty: 'Intermediate',
      category: 'Best Practices',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Quality', 'Recording', 'Tips']
    },
    {
      id: 3,
      title: 'Deploy Your Clone to External Platforms',
      description: 'Learn how to integrate your digital twin with websites, apps, and streaming platforms',
      duration: '20 min',
      difficulty: 'Advanced',
      category: 'Integration',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['API', 'Integration', 'Deployment']
    },
    {
      id: 4,
      title: 'Building Ethical AI Applications',
      description: 'Guidelines and best practices for responsible AI development',
      duration: '12 min',
      difficulty: 'Beginner',
      category: 'Ethics',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Ethics', 'Responsibility', 'Guidelines']
    },
    {
      id: 5,
      title: 'Advanced Voice Customization',
      description: 'Fine-tune your voice clone for different emotions and speaking styles',
      duration: '18 min',
      difficulty: 'Advanced',
      category: 'Customization',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Voice', 'Customization', 'Advanced']
    },
    {
      id: 6,
      title: 'Community Contribution Guide',
      description: 'How to contribute code, documentation, and feedback to EchoForge AI',
      duration: '8 min',
      difficulty: 'Beginner',
      category: 'Contributing',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Open Source', 'Contributing', 'Community']
    }
  ];

  const faqs = [
    {
      question: 'Is EchoForge AI really free?',
      answer: 'Yes! EchoForge AI is completely free and open-source under the MIT license. You can use it for personal or commercial projects without any cost. We believe AI should be accessible to everyone.'
    },
    {
      question: 'Where is my data stored?',
      answer: 'Your data is processed locally on your device or on infrastructure you control. We never store, sell, or share your uploads. You maintain complete ownership and control over your digital twins and source materials.'
    },
    {
      question: 'Can I delete my clone?',
      answer: 'Absolutely! You have full control over your digital twins. You can delete them at any time from your dashboard. Once deleted, all associated data is permanently removed from our systems.'
    },
    {
      question: 'How do I access my API key?',
      answer: 'After creating an account, go to your Dashboard and navigate to Settings → API Keys. You can generate, view, and manage your API keys there. Keep your keys secure and never share them publicly.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'For video: MP4, MOV, WebM (max 100MB). For audio: MP3, WAV, M4A (max 50MB). We recommend high-quality source files for the best results.'
    },
    {
      question: 'Can I use my clone commercially?',
      answer: 'Yes! Since you own your digital twin completely, you can use it for any purpose, including commercial applications. Just ensure you comply with applicable laws and platform terms of service.'
    },
    {
      question: 'How can I contribute to the project?',
      answer: 'We welcome contributions! You can contribute code on GitHub, help with documentation, report bugs, suggest features, or help other users in our community forums. Check our contribution guide for details.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Currently, EchoForge AI is web-based and works great on mobile browsers. We\'re exploring native mobile apps based on community feedback and contributions.'
    }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Best practices for lighting when recording video?',
      author: 'Sarah_Creator',
      replies: 12,
      lastActivity: '2 hours ago',
      category: 'Tips & Tricks',
      isAnswered: true
    },
    {
      id: 2,
      title: 'How to integrate with OBS Studio?',
      author: 'StreamerMike',
      replies: 8,
      lastActivity: '4 hours ago',
      category: 'Integration',
      isAnswered: false
    },
    {
      id: 3,
      title: 'Voice clone sounds robotic - any suggestions?',
      author: 'VoiceArtist23',
      replies: 15,
      lastActivity: '6 hours ago',
      category: 'Troubleshooting',
      isAnswered: true
    },
    {
      id: 4,
      title: 'Contributing to the mobile app development',
      author: 'DevContributor',
      replies: 23,
      lastActivity: '1 day ago',
      category: 'Development',
      isAnswered: false
    }
  ];

  const communitySpotlights = [
    {
      name: 'Alex Chen',
      role: 'Content Creator',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      quote: 'EchoForge AI helped me create multilingual content for my global audience. The fact that I own my data completely gives me peace of mind.',
      project: 'Educational YouTube Channel'
    },
    {
      name: 'Maria Rodriguez',
      role: 'VTuber',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      quote: 'I built my entire VTuber identity using EchoForge AI. Being open-source means I can customize everything to match my brand perfectly.',
      project: 'Twitch Streaming'
    },
    {
      name: 'David Kim',
      role: 'Developer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      quote: 'The API is incredibly well-designed. I integrated voice clones into our customer service chatbot in just a few hours.',
      project: 'Customer Service Bot'
    },
    {
      name: 'Emma Thompson',
      role: 'Educator',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      quote: 'As a teacher, I use my digital twin to create engaging lesson videos. My students love the interactive learning experience.',
      project: 'Online Education Platform'
    }
  ];

  const contributors = [
    { name: 'Alex Chen', contributions: 127, role: 'Core Developer' },
    { name: 'Sarah Johnson', contributions: 89, role: 'Documentation' },
    { name: 'Mike Rodriguez', contributions: 76, role: 'Community Manager' },
    { name: 'Lisa Wang', contributions: 54, role: 'UI/UX Designer' },
    { name: 'Tom Wilson', contributions: 43, role: 'QA Engineer' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Getting Started': 'bg-blue-100 text-blue-800',
      'Best Practices': 'bg-purple-100 text-purple-800',
      'Integration': 'bg-teal-100 text-teal-800',
      'Ethics': 'bg-orange-100 text-orange-800',
      'Customization': 'bg-pink-100 text-pink-800',
      'Contributing': 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-teal-100 rounded-2xl mb-6">
              <Users className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Community & Learn
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Grow with us. Learn, share, and build ethical AI together.
              <br />
              <span className="font-semibold text-orange-600">Join thousands of creators, developers, and innovators.</span>
            </p>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-orange-600 mb-2">12.5k+</div>
            <div className="text-sm text-gray-600">Community Members</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-teal-600 mb-2">2.3k</div>
            <div className="text-sm text-gray-600">GitHub Stars</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">456</div>
            <div className="text-sm text-gray-600">Contributors</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
            <div className="text-sm text-gray-600">Clones Created</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'tutorials', label: 'Tutorials', icon: Book },
                { id: 'faqs', label: 'FAQs', icon: HelpCircle },
                { id: 'forum', label: 'Forum', icon: MessageCircle },
                { id: 'spotlights', label: 'Community Stories', icon: Heart },
                { id: 'contribute', label: 'Contribute', icon: Github }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Tutorials Section */}
          {activeTab === 'tutorials' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn & Master EchoForge AI</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  From beginner guides to advanced techniques, our tutorials will help you create amazing digital twins.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={tutorial.image}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transition-all transform hover:scale-105">
                          <Play className="h-6 w-6 text-orange-600" />
                        </button>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(tutorial.category)}`}>
                          {tutorial.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tutorial.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-medium">
                        Start Tutorial
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {activeTab === 'faqs' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Find answers to common questions about EchoForge AI, data privacy, and getting started.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-orange-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Still have questions? */}
              <div className="bg-gradient-to-r from-orange-100 to-teal-100 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Join our community forum or Discord server to get help from other users and our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Forum
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                    <Users className="h-4 w-4 mr-2" />
                    Join Discord
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Forum Section */}
          {activeTab === 'forum' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Forum</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Connect with other users, share tips, ask questions, and help build the community.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Posts */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Recent Discussions</h3>
                    <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </button>
                  </div>
                  
                  {forumPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors cursor-pointer">
                              {post.title}
                            </h4>
                            {post.isAnswered && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                Answered
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </span>
                            <span>{post.lastActivity}</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{post.replies}</div>
                          <div className="text-xs text-gray-500">replies</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-6">
                    <button className="inline-flex items-center px-6 py-3 border border-orange-300 text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-colors">
                      View All Discussions
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Forum Stats & Categories */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <h4 className="font-bold text-gray-900 mb-4">Forum Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Posts</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-semibold">342</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Solved Questions</span>
                        <span className="font-semibold">89%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <h4 className="font-bold text-gray-900 mb-4">Popular Categories</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Getting Started', count: 156 },
                        { name: 'Tips & Tricks', count: 89 },
                        { name: 'Troubleshooting', count: 67 },
                        { name: 'Integration', count: 45 },
                        { name: 'Development', count: 34 }
                      ].map((category, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700 hover:text-orange-600 cursor-pointer transition-colors">
                            {category.name}
                          </span>
                          <span className="text-sm text-gray-500">{category.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Spotlights */}
          {activeTab === 'spotlights' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Stories</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover how creators, developers, and innovators are using EchoForge AI to build amazing projects.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {communitySpotlights.map((spotlight, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={spotlight.avatar}
                        alt={spotlight.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{spotlight.name}</h3>
                        <p className="text-orange-600 font-medium">{spotlight.role}</p>
                        <p className="text-sm text-gray-500">{spotlight.project}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed">
                      "{spotlight.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>

              {/* Featured Project */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Project of the Month</h3>
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Featured Creator"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900">Marcus Johnson</h4>
                          <p className="text-purple-600">Game Developer</p>
                        </div>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        "EchoVerse" - Virtual Reality Social Platform
                      </h5>
                      <p className="text-gray-600 mb-4">
                        Marcus created a VR social platform where users can interact with their EchoForge AI avatars in virtual spaces. 
                        The project showcases real-time avatar animation and voice synthesis in a 3D environment.
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Your Story */}
              <div className="bg-gradient-to-r from-orange-100 to-teal-100 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Story</h3>
                <p className="text-gray-600 mb-6">
                  Built something amazing with EchoForge AI? We'd love to feature your project and story!
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors">
                  <Heart className="h-4 w-4 mr-2" />
                  Submit Your Story
                </button>
              </div>
            </div>
          )}

          {/* Contribute Section */}
          {activeTab === 'contribute' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contribute to EchoForge AI</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Help us build the future of ethical AI. Every contribution, big or small, makes a difference.
                </p>
              </div>

              {/* GitHub Stats */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Github className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">EchoForge AI on GitHub</h3>
                      <p className="text-gray-300">Open source and community driven</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="h-4 w-4" />
                        <span className="font-bold">2.3k</span>
                      </div>
                      <div className="text-xs text-gray-400">Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-blue-400">
                        <GitFork className="h-4 w-4" />
                        <span className="font-bold">456</span>
                      </div>
                      <div className="text-xs text-gray-400">Forks</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">🔧 Core Development</h4>
                    <p className="text-sm text-gray-300 mb-3">Help improve the AI models, API, and core functionality.</p>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View Issues →
                    </button>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">📚 Documentation</h4>
                    <p className="text-sm text-gray-300 mb-3">Write guides, improve docs, and help others learn.</p>
                    <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                      Contribute Docs →
                    </button>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">🎨 Design & UX</h4>
                    <p className="text-sm text-gray-300 mb-3">Improve the user interface and experience.</p>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                      Design Tasks →
                    </button>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Top Contributors This Month</h3>
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-teal-400 rounded-full text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{contributor.name}</div>
                          <div className="text-sm text-gray-500">{contributor.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{contributor.contributions}</div>
                        <div className="text-xs text-gray-500">contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ways to Contribute */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Github,
                    title: 'Code Contributions',
                    description: 'Submit pull requests, fix bugs, and add new features',
                    color: 'from-gray-500 to-gray-600'
                  },
                  {
                    icon: Book,
                    title: 'Documentation',
                    description: 'Write tutorials, improve guides, and help others learn',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: MessageCircle,
                    title: 'Community Support',
                    description: 'Help answer questions and support new users',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    icon: Lightbulb,
                    title: 'Ideas & Feedback',
                    description: 'Share feature ideas and provide valuable feedback',
                    color: 'from-yellow-500 to-orange-500'
                  },
                  {
                    icon: Target,
                    title: 'Testing & QA',
                    description: 'Test new features and report bugs',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    icon: Coffee,
                    title: 'Sponsorship',
                    description: 'Support the project financially to keep it free',
                    color: 'from-pink-500 to-red-500'
                  }
                ].map((way, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${way.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                      <way.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{way.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{way.description}</p>
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      Get Started →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ethical AI Commitment */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Commitment to Ethical AI</h3>
            <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
              EchoForge AI is built on the principles of transparency, privacy, and user empowerment. 
              We believe AI should serve humanity, not the other way around.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold mb-2">Privacy First</h4>
              <p className="text-sm text-blue-100">Your data stays yours. No tracking, no selling, no compromises.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="font-semibold mb-2">Open & Transparent</h4>
              <p className="text-sm text-blue-100">Open source code, clear policies, and community governance.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚖️</div>
              <h4 className="font-semibold mb-2">Responsible Use</h4>
              <p className="text-sm text-blue-100">Guidelines and tools to prevent misuse and promote ethical applications.</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-colors">
              <Shield className="h-4 w-4 mr-2" />
              Read Our AI Ethics Policy
            </button>
          </div>
        </div>

        {/* Community Invite */}
        <div className="mt-16 bg-gradient-to-r from-orange-100 to-teal-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with thousands of creators, developers, and AI enthusiasts who are building the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              <Users className="h-5 w-5 mr-2" />
              Join Discord Community
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              <Github className="h-5 w-5 mr-2" />
              Star on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;