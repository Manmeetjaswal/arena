import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Code, Key, Book, ExternalLink, Github, Terminal, Zap, Play, Download, Settings, Star, GitFork, Users, Globe, Cpu, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperPage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateMockApiKey = () => {
    const key = 'ech_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(key);
    setShowApiKey(true);
  };

  const codeExamples = {
    javascript: {
      auth: `// Initialize EchoForge API client
import { EchoForgeAPI } from '@echoforge/sdk';

const client = new EchoForgeAPI({
  apiKey: '${apiKey || 'your-api-key-here'}',
  baseURL: 'https://api.echoforge.ai/v1'
});

// Verify authentication
const user = await client.auth.verify();
console.log('Authenticated as:', user.email);`,
      
      listClones: `// List all your digital twins
const clones = await client.clones.list({
  limit: 10,
  status: 'ready'
});

console.log('Your clones:', clones.data);
clones.data.forEach(clone => {
  console.log(\`\${clone.name} (\${clone.type})\`);
});`,

      createClone: `// Create a new digital twin
const createClone = async (videoFile, audioFile) => {
  try {
    const formData = new FormData();
    formData.append('name', 'My Professional Avatar');
    formData.append('description', 'Business presentation avatar');
    formData.append('video', videoFile);
    formData.append('audio', audioFile);
    
    const clone = await client.clones.create(formData);
    
    console.log('Clone created:', clone.id);
    console.log('Status:', clone.status);
    
    return clone;
  } catch (error) {
    console.error('Error creating clone:', error.message);
  }
};`,

      generateVideo: `// Generate video with your clone
const generateVideo = async (cloneId, text) => {
  const generation = await client.clones.generateVideo({
    cloneId: cloneId,
    text: text,
    voice: {
      speed: 1.0,
      pitch: 0.0,
      emotion: 'neutral'
    },
    video: {
      resolution: '1080p',
      background: 'transparent',
      format: 'mp4'
    }
  });
  
  // Poll for completion
  let result = await client.generations.get(generation.id);
  while (result.status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 2000));
    result = await client.generations.get(generation.id);
  }
  
  return result.videoUrl;
};`,

      webhook: `// Handle webhook events with Express.js
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Verify webhook signature
const verifySignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-echoforge-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifySignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'clone.created':
      console.log('Clone created:', event.data.id);
      break;
    case 'clone.ready':
      console.log('Clone ready:', event.data.id);
      // Notify user that their clone is ready
      break;
    case 'generation.completed':
      console.log('Video generated:', event.data.videoUrl);
      // Process the generated video
      break;
    case 'generation.failed':
      console.log('Generation failed:', event.data.error);
      break;
  }
  
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`
    },
    python: {
      auth: `# Initialize EchoForge API client
from echoforge import EchoForgeAPI

client = EchoForgeAPI(
    api_key="${apiKey || 'your-api-key-here'}",
    base_url="https://api.echoforge.ai/v1"
)

# Verify authentication
user = client.auth.verify()
print(f"Authenticated as: {user.email}")`,

      listClones: `# List all your digital twins
clones = client.clones.list(
    limit=10,
    status="ready"
)

print("Your clones:", clones.data)
for clone in clones.data:
    print(f"{clone.name} ({clone.type})")`,

      createClone: `# Create a new digital twin
def create_clone(video_path, audio_path):
    try:
        with open(video_path, 'rb') as video_file, \\
             open(audio_path, 'rb') as audio_file:
            
            clone = client.clones.create(
                name="My Professional Avatar",
                description="Business presentation avatar",
                video=video_file,
                audio=audio_file
            )
            
        print(f"Clone created: {clone.id}")
        print(f"Status: {clone.status}")
        
        return clone
    except Exception as error:
        print(f"Error creating clone: {error}")`,

      generateVideo: `# Generate video with your clone
import time

def generate_video(clone_id, text):
    generation = client.clones.generate_video(
        clone_id=clone_id,
        text=text,
        voice={
            "speed": 1.0,
            "pitch": 0.0,
            "emotion": "neutral"
        },
        video={
            "resolution": "1080p",
            "background": "transparent",
            "format": "mp4"
        }
    )
    
    # Poll for completion
    result = client.generations.get(generation.id)
    while result.status == "processing":
        time.sleep(2)
        result = client.generations.get(generation.id)
    
    return result.video_url`,

      webhook: `# Handle webhook events with Flask
from flask import Flask, request, abort
import hmac
import hashlib
import os

app = Flask(__name__)

def verify_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-EchoForge-Signature')
    payload = request.get_data()
    
    if not verify_signature(payload, signature, os.environ['WEBHOOK_SECRET']):
        abort(401, 'Invalid signature')
    
    event = request.json
    
    if event['type'] == 'clone.created':
        print(f"Clone created: {event['data']['id']}")
    elif event['type'] == 'clone.ready':
        print(f"Clone ready: {event['data']['id']}")
        # Notify user that their clone is ready
    elif event['type'] == 'generation.completed':
        print(f"Video generated: {event['data']['video_url']}")
        # Process the generated video
    elif event['type'] == 'generation.failed':
        print(f"Generation failed: {event['data']['error']}")
    
    return 'OK', 200

if __name__ == '__main__':
    app.run(port=3000, debug=True)`
    }
  };

  const quickStartExample = `curl -X GET "https://api.echoforge.ai/v1/clones" \\
  -H "Authorization: Bearer ${apiKey || 'your-api-key-here'}" \\
  -H "Content-Type: application/json"`;

  const endpoints = [
    {
      method: 'GET',
      path: '/clones',
      description: 'List all your digital twins',
      params: ['limit?', 'offset?', 'status?', 'type?'],
      response: {
        data: [
          {
            id: 'clone_123',
            name: 'Alex Professional',
            type: 'both',
            status: 'ready',
            created_at: '2025-01-15T10:30:00Z'
          }
        ],
        total: 5,
        has_more: false
      }
    },
    {
      method: 'POST',
      path: '/clones',
      description: 'Create a new digital twin',
      params: ['name', 'video_file', 'audio_file', 'description?'],
      response: {
        id: 'clone_456',
        name: 'My Avatar',
        status: 'processing',
        created_at: '2025-01-20T14:15:00Z'
      }
    },
    {
      method: 'GET',
      path: '/clones/{id}',
      description: 'Get details for a specific digital twin',
      params: ['id'],
      response: {
        id: 'clone_123',
        name: 'Alex Professional',
        type: 'both',
        status: 'ready',
        avatar_url: 'https://cdn.echoforge.ai/avatars/clone_123.mp4',
        voice_url: 'https://cdn.echoforge.ai/voices/clone_123.wav'
      }
    },
    {
      method: 'POST',
      path: '/clones/{id}/generate',
      description: 'Generate video/audio with your clone',
      params: ['id', 'text', 'voice?', 'video?'],
      response: {
        id: 'gen_789',
        status: 'processing',
        estimated_completion: '2025-01-20T14:20:00Z'
      }
    },
    {
      method: 'GET',
      path: '/generations/{id}',
      description: 'Get generation status and results',
      params: ['id'],
      response: {
        id: 'gen_789',
        status: 'completed',
        video_url: 'https://cdn.echoforge.ai/generated/gen_789.mp4',
        audio_url: 'https://cdn.echoforge.ai/generated/gen_789.wav'
      }
    },
    {
      method: 'DELETE',
      path: '/clones/{id}',
      description: 'Delete a digital twin',
      params: ['id'],
      response: {
        deleted: true,
        id: 'clone_123'
      }
    }
  ];

  const integrations = [
    {
      name: 'OBS Studio',
      logo: '🎥',
      description: 'Stream with your avatar in real-time using our OBS plugin',
      link: '#obs-integration',
      category: 'Streaming'
    },
    {
      name: 'Discord.js',
      logo: '🤖',
      description: 'Add voice clones to your Discord bots',
      link: '#discord-integration',
      category: 'Bots'
    },
    {
      name: 'FFmpeg',
      logo: '🎬',
      description: 'Process and convert videos with command-line tools',
      link: '#ffmpeg-integration',
      category: 'Video Processing'
    },
    {
      name: 'Blender',
      logo: '🎨',
      description: 'Import avatars into 3D scenes and animations',
      link: '#blender-integration',
      category: '3D Graphics'
    },
    {
      name: 'Unity',
      logo: '🎮',
      description: 'Use avatars in games and VR experiences',
      link: '#unity-integration',
      category: 'Game Development'
    },
    {
      name: 'Godot',
      logo: '🚀',
      description: 'Open-source game engine integration',
      link: '#godot-integration',
      category: 'Game Development'
    },
    {
      name: 'React',
      logo: '⚛️',
      description: 'Embed avatars in React applications',
      link: '#react-integration',
      category: 'Web Development'
    },
    {
      name: 'Vue.js',
      logo: '💚',
      description: 'Vue.js components for avatar integration',
      link: '#vue-integration',
      category: 'Web Development'
    },
    {
      name: 'Electron',
      logo: '⚡',
      description: 'Desktop applications with avatar support',
      link: '#electron-integration',
      category: 'Desktop Apps'
    }
  ];

  const tutorials = [
    {
      title: 'Building a Voice-Enabled Chatbot',
      description: 'Create an interactive chatbot that speaks with your voice clone',
      duration: '15 min',
      difficulty: 'Intermediate',
      tags: ['Node.js', 'WebRTC', 'Voice', 'Real-time'],
      featured: true
    },
    {
      title: 'Real-time Avatar Streaming with OBS',
      description: 'Stream your digital twin live with OBS Studio integration',
      duration: '20 min',
      difficulty: 'Advanced',
      tags: ['OBS', 'WebSocket', 'Streaming', 'Real-time']
    },
    {
      title: 'Discord Bot with Voice Clones',
      description: 'Add your voice clone to Discord servers for interactive experiences',
      duration: '10 min',
      difficulty: 'Beginner',
      tags: ['Discord.js', 'Bot', 'Voice', 'Community']
    },
    {
      title: 'Automated Video Generation Pipeline',
      description: 'Build a system to automatically generate videos with your avatar',
      duration: '25 min',
      difficulty: 'Advanced',
      tags: ['Python', 'FFmpeg', 'Automation', 'CI/CD']
    },
    {
      title: 'React Component for Avatar Display',
      description: 'Create reusable React components for embedding avatars',
      duration: '12 min',
      difficulty: 'Intermediate',
      tags: ['React', 'TypeScript', 'Components', 'Web']
    },
    {
      title: 'Unity VR Avatar Integration',
      description: 'Use your digital twin in VR experiences with Unity',
      duration: '30 min',
      difficulty: 'Advanced',
      tags: ['Unity', 'VR', 'C#', 'Gaming']
    }
  ];

  const useCases = [
    {
      title: 'Content Creation',
      description: 'Generate personalized video content at scale',
      icon: '🎬',
      examples: ['YouTube videos', 'Course content', 'Marketing videos']
    },
    {
      title: 'Customer Support',
      description: 'Create AI-powered support agents with your voice',
      icon: '🎧',
      examples: ['Help desk bots', 'FAQ responses', 'Onboarding guides']
    },
    {
      title: 'Education',
      description: 'Build interactive learning experiences',
      icon: '📚',
      examples: ['Online courses', 'Language learning', 'Training modules']
    },
    {
      title: 'Gaming & VR',
      description: 'Integrate avatars into immersive experiences',
      icon: '🎮',
      examples: ['NPCs', 'Virtual assistants', 'Social VR']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
                <Code className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Integrate EchoForge AI
                </h1>
                <p className="text-xl text-gray-400 mt-2">
                  Free API access. Build with your digital twin.
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-gray-300">REST API</span>
                </div>
                <p className="text-2xl font-bold text-white">v1.0</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-300">Uptime</span>
                </div>
                <p className="text-2xl font-bold text-white">99.9%</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Github className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">Open Source</span>
                </div>
                <p className="text-2xl font-bold text-white">MIT</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">Developers</span>
                </div>
                <p className="text-2xl font-bold text-white">2.5k+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-700/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-4">1. Get Your API Key</h3>
              <div className="space-y-4">
                {!showApiKey ? (
                  <button
                    onClick={generateMockApiKey}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </button>
                ) : (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Your API Key</span>
                      <button
                        onClick={() => copyToClipboard(apiKey, 'api-key')}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedCode === 'api-key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <code className="text-green-400 font-mono text-sm break-all">{apiKey}</code>
                  </div>
                )}
                <p className="text-sm text-gray-400">
                  Keep your API key secure and never expose it in client-side code.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-4">2. Make Your First Request</h3>
              <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                  <span className="text-sm font-medium text-gray-300">cURL</span>
                  <button
                    onClick={() => copyToClipboard(quickStartExample, 'quick-start')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'quick-start' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                  <code>{quickStartExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Book },
              { id: 'authentication', label: 'Authentication', icon: Key },
              { id: 'endpoints', label: 'API Reference', icon: Terminal },
              { id: 'examples', label: 'Code Examples', icon: Code },
              { id: 'integrations', label: 'Integrations', icon: Settings },
              { id: 'tutorials', label: 'Tutorials', icon: Play }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Getting Started with EchoForge AI</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  The EchoForge AI API allows you to create, manage, and deploy digital twins programmatically. 
                  Build applications that generate personalized video content, voice synthesis, and interactive avatars.
                  Our free, open-source platform gives you complete control over your data and AI models.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Key Features</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Create digital twins from video and audio samples</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Generate videos with custom text and emotions</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Real-time voice synthesis and avatar animation</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Webhook notifications for async operations</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Multiple output formats (MP4, WAV, WebM)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Complete data ownership and privacy</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Rate Limits & Quotas</h3>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Clone Creation:</span>
                          <span className="text-white font-medium">10 per hour</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Video Generation:</span>
                          <span className="text-white font-medium">100 per hour</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">API Requests:</span>
                          <span className="text-white font-medium">1,000 per hour</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Storage:</span>
                          <span className="text-white font-medium">5GB free</span>
                        </div>
                        <div className="pt-2 border-t border-gray-700">
                          <p className="text-xs text-gray-500">
                            Need higher limits? Contact us for enterprise plans.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
                    <div className="text-3xl mb-4">{useCase.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-3">{useCase.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                    <ul className="space-y-1">
                      {useCase.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="text-xs text-gray-500">• {example}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Community & Support */}
              <div className="bg-gradient-to-r from-green-900/50 to-teal-900/50 rounded-2xl p-8 border border-green-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Join the Developer Community</h3>
                <p className="text-green-100 mb-8 text-lg">
                  Connect with other developers, share your projects, and get help from the community.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h4 className="font-semibold text-white mb-2">Discord</h4>
                    <p className="text-green-100 text-sm mb-4">Real-time chat and support</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-300">
                      <Users className="h-4 w-4" />
                      <span>2,500+ members</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <h4 className="font-semibold text-white mb-2">GitHub</h4>
                    <p className="text-green-100 text-sm mb-4">Contribute to the project</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-green-300">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>2.3k</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>456</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌐</div>
                    <h4 className="font-semibold text-white mb-2">Forum</h4>
                    <p className="text-green-100 text-sm mb-4">In-depth discussions</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-300">
                      <Globe className="h-4 w-4" />
                      <span>500+ topics</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Join Discord
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors">
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Authentication */}
          {activeTab === 'authentication' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  EchoForge AI uses API keys for authentication. Include your API key in the Authorization header of all requests.
                  All API requests must be made over HTTPS.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Getting Your API Key</h3>
                    <ol className="list-decimal list-inside space-y-3 text-gray-300 ml-4">
                      <li>Sign up for a free EchoForge AI account</li>
                      <li>Navigate to your Dashboard</li>
                      <li>Go to Settings → API Keys</li>
                      <li>Click "Generate New Key"</li>
                      <li>Copy and securely store your key</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Using Your API Key</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">HTTP Header</span>
                        <button
                          onClick={() => copyToClipboard(`Authorization: Bearer ${apiKey || 'your-api-key-here'}`, 'auth-header')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'auth-header' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>Authorization: Bearer {apiKey || 'your-api-key-here'}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="h-4 w-4 text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-200 mb-3">Security Best Practices</h4>
                        <ul className="text-sm text-yellow-100 space-y-2">
                          <li>• Never expose API keys in client-side code or public repositories</li>
                          <li>• Use environment variables to store keys securely</li>
                          <li>• Rotate keys regularly (recommended: every 90 days)</li>
                          <li>• Use different keys for development and production environments</li>
                          <li>• Monitor API key usage and set up alerts for unusual activity</li>
                          <li>• Revoke compromised keys immediately</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Error Responses</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 border-b border-gray-600">
                          <span className="text-sm font-medium text-gray-300">401 Unauthorized</span>
                        </div>
                        <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                          <code>{JSON.stringify({
                            error: {
                              type: "authentication_error",
                              message: "Invalid API key provided"
                            }
                          }, null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Endpoints */}
          {activeTab === 'endpoints' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Complete reference for all EchoForge AI API endpoints. All endpoints use JSON for request and response bodies.
                </p>

                <div className="space-y-6">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-600 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-600">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            endpoint.method === 'GET' ? 'bg-green-600 text-white' :
                            endpoint.method === 'POST' ? 'bg-blue-600 text-white' :
                            endpoint.method === 'DELETE' ? 'bg-red-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-blue-300 font-mono text-lg">{endpoint.path}</code>
                        </div>
                        <p className="text-gray-300">{endpoint.description}</p>
                      </div>
                      
                      <div className="px-6 py-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Parameters</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <code key={paramIndex} className={`px-2 py-1 rounded text-xs ${
                                param.endsWith('?') 
                                  ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                                  : 'bg-blue-900 text-blue-200 border border-blue-700'
                              }`}>
                                {param}
                              </code>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Example Response</h4>
                          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-700 border-b border-gray-600">
                              <span className="text-xs font-medium text-gray-300">JSON</span>
                              <button
                                onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${index}`)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {copiedCode === `response-${index}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </button>
                            </div>
                            <pre className="p-3 text-xs text-gray-300 overflow-x-auto">
                              <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Code Examples */}
          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Code Examples</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">Language:</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Authentication Example */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Authentication & Setup</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">
                          {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[selectedLanguage].auth, 'auth-example')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'auth-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].auth}</code>
                      </pre>
                    </div>
                  </div>

                  {/* List Clones Example */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">List Your Digital Twins</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">
                          {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[selectedLanguage].listClones, 'list-example')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'list-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].listClones}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Create Clone Example */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Create Digital Twin</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">
                          {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[selectedLanguage].createClone, 'create-example')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'create-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].createClone}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Generate Video Example */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Generate Video</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">
                          {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[selectedLanguage].generateVideo, 'generate-example')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'generate-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].generateVideo}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Webhook Example */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Handle Webhooks</h3>
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-600">
                        <span className="text-sm font-medium text-gray-300">
                          {selectedLanguage === 'javascript' ? 'Express.js' : 'Flask'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[selectedLanguage].webhook, 'webhook-example')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'webhook-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].webhook}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Platform Integrations</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  EchoForge AI works seamlessly with popular open-source tools and platforms. 
                  Build powerful workflows by combining our API with these integrations.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map((integration, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-600 p-6 hover:border-blue-500 transition-all group">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-3xl">{integration.logo}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {integration.name}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                            {integration.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{integration.description}</p>
                      <a
                        href={integration.link}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        View Integration
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Integration */}
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-700/50">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-5xl">🎥</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">OBS Studio Integration</h3>
                    <p className="text-purple-100 text-lg">Stream with your digital twin in real-time</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                    <ul className="space-y-3 text-purple-100">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span>Real-time avatar rendering at 60fps</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span>Voice-driven lip sync and facial expressions</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span>Custom backgrounds and green screen support</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span>Multi-scene support with avatar switching</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span>Low latency streaming optimization</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Setup</h4>
                    <ol className="list-decimal list-inside space-y-2 text-purple-100 text-sm">
                      <li>Download and install the EchoForge OBS Plugin</li>
                      <li>Add your API key in the plugin settings</li>
                      <li>Select your digital twin from the dropdown</li>
                      <li>Configure audio input source for voice detection</li>
                      <li>Add the EchoForge source to your scene</li>
                      <li>Start streaming with your avatar!</li>
                    </ol>
                    
                    <div className="mt-6 p-4 bg-purple-800/30 rounded-lg border border-purple-600/50">
                      <p className="text-sm text-purple-200">
                        <strong>System Requirements:</strong> OBS Studio 28+, GPU with OpenGL 4.1+, 8GB RAM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download OBS Plugin
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors">
                    <Book className="h-4 w-4 mr-2" />
                    Setup Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tutorials */}
          {activeTab === 'tutorials' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Tutorials & Guides</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Step-by-step tutorials to help you build amazing applications with EchoForge AI.
                  From beginner-friendly guides to advanced integration patterns.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className={`bg-gray-900/50 rounded-xl border p-6 transition-all group hover:-translate-y-1 ${
                      tutorial.featured 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
                        : 'border-gray-600 hover:border-blue-500'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                              {tutorial.title}
                            </h3>
                            {tutorial.featured && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{tutorial.description}</p>
                        </div>
                        <Play className="h-5 w-5 text-blue-400 flex-shrink-0 ml-4 group-hover:scale-110 transition-transform" />
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full ${
                            tutorial.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                            tutorial.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {tutorial.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tutorial.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group-hover:shadow-lg">
                        Start Tutorial
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SDK Downloads */}
              <div className="bg-gradient-to-r from-gray-800/50 to-blue-800/50 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Official SDKs & Tools</h3>
                <p className="text-gray-300 mb-8">
                  Get started quickly with our official SDKs and development tools.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">📦</div>
                      <div>
                        <h4 className="font-semibold text-white">JavaScript SDK</h4>
                        <p className="text-sm text-gray-400">npm install @echoforge/sdk</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Full-featured SDK for Node.js and browser environments
                    </p>
                    <button className="w-full bg-yellow-600 text-black py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                      <Download className="h-4 w-4 mr-2 inline" />
                      Install
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">🐍</div>
                      <div>
                        <h4 className="font-semibold text-white">Python SDK</h4>
                        <p className="text-sm text-gray-400">pip install echoforge</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Pythonic interface with async support and type hints
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <Download className="h-4 w-4 mr-2 inline" />
                      Install
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">🔧</div>
                      <div>
                        <h4 className="font-semibold text-white">CLI Tool</h4>
                        <p className="text-sm text-gray-400">npm install -g @echoforge/cli</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Command-line interface for automation and scripting
                    </p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      <Terminal className="h-4 w-4 mr-2 inline" />
                      Install
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;