import React from 'react';
import { ArrowLeft, Shield, Users, Code, Heart, Globe, Zap, Github, Star, GitFork, ExternalLink, Award, Target, Lightbulb, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const coreValues = [
    {
      icon: Code,
      title: 'Open-Source First',
      description: 'Built in public, by the community. Every line of code is transparent and auditable.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lock,
      title: 'User Data Ownership',
      description: 'You control your uploads, outputs, and digital identity. Your data never leaves your control.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'No Lock-in',
      description: 'No subscriptions, no paywalls, no vendor control. Use it however you want, forever.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Ethical AI',
      description: 'Transparent, explainable, and fair. AI that serves humanity, not corporate interests.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Free forever, for everyone. Breaking down barriers to AI technology worldwide.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Decisions made by users, for users. Democratic governance and inclusive development.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Lead Developer',
      bio: 'Former AI researcher at Stanford. Passionate about democratizing AI technology.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      github: 'alexchen',
      contributions: 247
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Community Manager',
      bio: 'Open source advocate with 10+ years building developer communities.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      github: 'sarahrod',
      contributions: 156
    },
    {
      name: 'Marcus Johnson',
      role: 'AI Ethics Lead',
      bio: 'PhD in AI Ethics from MIT. Ensuring responsible AI development and deployment.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      github: 'marcusj',
      contributions: 89
    },
    {
      name: 'Emma Thompson',
      role: 'UX Designer',
      bio: 'Design systems expert focused on making AI accessible to everyone.',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
      github: 'emmat',
      contributions: 134
    }
  ];

  const milestones = [
    {
      date: '2024 Q1',
      title: 'Project Genesis',
      description: 'EchoForge AI was born from a simple idea: AI should belong to everyone, not just big tech companies.'
    },
    {
      date: '2024 Q2',
      title: 'Open Source Release',
      description: 'Released the first version under MIT license, making it truly free and open for all.'
    },
    {
      date: '2024 Q3',
      title: 'Community Growth',
      description: 'Reached 1,000 GitHub stars and welcomed our first 100 community contributors.'
    },
    {
      date: '2024 Q4',
      title: 'Global Impact',
      description: 'Users from 50+ countries created over 10,000 digital twins, proving AI can be democratized.'
    },
    {
      date: '2025 Q1',
      title: 'Ethical AI Framework',
      description: 'Launched comprehensive AI ethics guidelines and responsible use policies.'
    }
  ];

  const stats = [
    { label: 'GitHub Stars', value: '2.3k+', icon: Star },
    { label: 'Contributors', value: '456', icon: Users },
    { label: 'Countries', value: '50+', icon: Globe },
    { label: 'Clones Created', value: '50k+', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 rounded-full p-6 shadow-2xl">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              We're Building Ethical AI
            </span>
            <br />
            <span className="text-gray-900">for Everyone</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            EchoForge AI is a free, open-source platform where your digital twin belongs to you — forever.
            <br />
            <span className="font-semibold text-blue-600">No corporate control. No data mining. No hidden agendas.</span>
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">MIT Licensed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="font-medium">100% Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              <span className="font-medium">Community Governed</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed text-center mb-8">
                EchoForge AI exists to <span className="font-semibold text-blue-600">empower individuals and small teams</span> to create, 
                own, and deploy realistic AI clones without giving up their data or freedom. We believe in open technology, 
                personal ownership, and <span className="font-semibold text-teal-600">ethical AI as a human right</span>.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
                <blockquote className="text-lg text-gray-800 italic text-center leading-relaxed">
                  "In a world where big tech controls AI, we're building something different. 
                  A platform where <span className="font-semibold not-italic">you</span> are in control, 
                  where <span className="font-semibold not-italic">your creativity</span> drives innovation, 
                  and where <span className="font-semibold not-italic">your data</span> stays yours forever."
                </blockquote>
                <div className="text-center mt-4">
                  <cite className="text-blue-600 font-medium">— The EchoForge AI Team</cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet the Core Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of developers, researchers, and advocates united by a shared vision of ethical AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                    <Github className="h-4 w-4" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Github className="h-3 w-3" />
                    <span>@{member.github}</span>
                  </span>
                  <span>{member.contributions} commits</span>
                </div>
              </div>
            ))}
          </div>

          {/* Community Contributors */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Powered by Global Contributors</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              EchoForge AI is maintained by <span className="font-semibold">456 contributors</span> from around the world. 
              Every feature, bug fix, and improvement comes from our amazing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors">
                <Users className="h-4 w-4 mr-2" />
                View All Contributors
              </button>
              <Link
                to="/community"
                className="inline-flex items-center px-6 py-3 border border-purple-300 text-purple-600 font-medium rounded-xl hover:bg-purple-50 transition-colors"
              >
                <Heart className="h-4 w-4 mr-2" />
                Join Our Community
              </Link>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a global movement for ethical AI.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                      <div className="text-blue-600 font-semibold mb-2">{milestone.date}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative flex items-center justify-center w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ethics Policy Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
                <Shield className="h-10 w-10" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">EchoForge AI Ethics Policy</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                We're committed to responsible development and deployment of generative AI technologies. 
                Our ethics framework ensures AI serves humanity, not the other way around.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-lg font-bold mb-3">Privacy Protection</h3>
                <p className="text-green-100 text-sm">
                  Your data is processed locally or on infrastructure you control. We never store, analyze, or monetize your personal information.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-lg font-bold mb-3">Responsible Use</h3>
                <p className="text-green-100 text-sm">
                  Clear guidelines prevent misuse while preserving creative freedom. We provide tools to detect and prevent harmful applications.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-bold mb-3">Transparency</h3>
                <p className="text-green-100 text-sm">
                  Open source code, public roadmaps, and community governance ensure accountability and trust in our AI systems.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <ExternalLink className="h-5 w-5 mr-2" />
                Read Our Full AI Ethics Policy
              </button>
            </div>
          </div>
        </div>

        {/* Open Source Acknowledgment */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Github className="h-12 w-12" />
                <div className="text-left">
                  <h2 className="text-3xl font-bold">Open Source & Proud</h2>
                  <p className="text-gray-300">MIT Licensed • Community Driven</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                EchoForge AI is powered by the open-source community. We invite you to fork, contribute, 
                or simply explore how ethical AI can be built transparently.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-2">
                  <Star className="h-6 w-6" />
                  <span className="text-2xl font-bold">2.3k</span>
                </div>
                <p className="text-gray-400">GitHub Stars</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-400 mb-2">
                  <GitFork className="h-6 w-6" />
                  <span className="text-2xl font-bold">456</span>
                </div>
                <p className="text-gray-400">Forks</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">456</span>
                </div>
                <p className="text-gray-400">Contributors</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Github className="h-5 w-5 mr-2" />
                Visit GitHub Repository
              </button>
              <button className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Award className="h-5 w-5 mr-2" />
                View MIT License
              </button>
            </div>
          </div>
        </div>

        {/* Manifesto */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-orange-100 to-teal-100 rounded-3xl p-8 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-teal-500 rounded-2xl mb-8">
              <Lightbulb className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              "Open AI for Open People"
            </h2>
            
            <blockquote className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed italic mb-8">
              "We believe that artificial intelligence should be a tool of empowerment, not exploitation. 
              A technology that amplifies human creativity, not replaces human agency. 
              A platform that serves communities, not corporate shareholders. 
              This is our manifesto, our commitment, and our promise to you."
            </blockquote>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="font-bold text-gray-900 mb-4">Join the Movement</h3>
              <p className="text-gray-600 mb-6">
                Every user, contributor, and advocate helps us build a more ethical future for AI. 
                Together, we're proving that technology can be both powerful and principled.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/create"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-teal-600 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Create Your Digital Twin
                </Link>
                <Link
                  to="/community"
                  className="inline-flex items-center px-6 py-3 border border-orange-300 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Our Community
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Your AI Twin?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've taken control of their digital identity. 
              Your data, your AI, your future.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl"
            >
              <Zap className="h-6 w-6 mr-3" />
              Create Yours Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;