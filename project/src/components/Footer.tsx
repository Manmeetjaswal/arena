import React from 'react';
import { Github, MessageCircle, Star, GitFork, Heart, Zap } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Create Clone', href: '/create' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'API Docs', href: '/developers' },
      { name: 'Pricing', href: '#' }
    ],
    Community: [
      { name: 'Discord', href: '#' },
      { name: 'GitHub', href: '#' },
      { name: 'Tutorials', href: '/community' },
      { name: 'Support', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'MIT License', href: '#' },
      { name: 'Ethics Policy', href: '/about' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400 opacity-20 blur-sm rounded-full" />
              </div>
              <span className="text-xl font-bold">EchoForge AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Free & open-source digital twin studio. Create AI avatars and voice clones while maintaining complete control over your data.
            </p>
            
            {/* GitHub Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <Star className="h-4 w-4" />
                <span>2.3k</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <GitFork className="h-4 w-4" />
                <span>456</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 EchoForge AI. Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>by the community</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Open Source Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Open Source & Community Driven</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;