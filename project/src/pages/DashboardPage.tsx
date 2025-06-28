import React, { useState, useRef } from 'react';
import { Search, Filter, Play, Pause, Download, Edit, Rocket, MoreVertical, Calendar, Clock, User, Video, Mic, Plus, Grid, List, Eye, Trash2, Copy, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DigitalTwin {
  id: string;
  name: string;
  type: 'video' | 'voice' | 'both';
  status: 'ready' | 'processing' | 'failed';
  createdAt: string;
  description?: string;
  avatarUrl: string;
  voiceUrl?: string;
  duration: number;
  size: string;
  lastUsed?: string;
  processingProgress?: number;
}

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClone, setSelectedClone] = useState<DigitalTwin | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock data - in real app this would come from API
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([
    {
      id: '1',
      name: 'Alex Professional',
      type: 'both',
      status: 'ready',
      createdAt: '2025-01-15',
      description: 'Professional presenter avatar for business content',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      voiceUrl: '/audio/alex-voice.mp3',
      duration: 45,
      size: '2.3 MB',
      lastUsed: '2025-01-20'
    },
    {
      id: '2',
      name: 'Sarah Educator',
      type: 'voice',
      status: 'ready',
      createdAt: '2025-01-12',
      description: 'Multilingual voice clone for educational content',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      voiceUrl: '/audio/sarah-voice.mp3',
      duration: 60,
      size: '1.8 MB',
      lastUsed: '2025-01-18'
    },
    {
      id: '3',
      name: 'Marcus Gaming',
      type: 'video',
      status: 'processing',
      createdAt: '2025-01-14',
      description: 'Gaming avatar with real-time facial expressions',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 30,
      size: '3.1 MB',
      processingProgress: 65
    },
    {
      id: '4',
      name: 'Emma Creative',
      type: 'both',
      status: 'ready',
      createdAt: '2025-01-10',
      description: 'Creative content avatar for social media',
      avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      voiceUrl: '/audio/emma-voice.mp3',
      duration: 35,
      size: '2.7 MB',
      lastUsed: '2025-01-16'
    },
    {
      id: '5',
      name: 'David Tech',
      type: 'voice',
      status: 'failed',
      createdAt: '2025-01-08',
      description: 'Technical tutorial voice clone',
      avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 25,
      size: '1.2 MB'
    },
    {
      id: '6',
      name: 'Lisa Wellness',
      type: 'both',
      status: 'ready',
      createdAt: '2025-01-05',
      description: 'Wellness coach avatar for meditation content',
      avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      voiceUrl: '/audio/lisa-voice.mp3',
      duration: 55,
      size: '2.9 MB',
      lastUsed: '2025-01-19'
    }
  ]);

  const filteredTwins = digitalTwins
    .filter(twin => {
      const matchesSearch = twin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           twin.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'ready' && twin.status === 'ready') ||
                           (filterBy === 'processing' && twin.status === 'processing') ||
                           (filterBy === 'failed' && twin.status === 'failed') ||
                           (filterBy === 'avatars' && (twin.type === 'video' || twin.type === 'both')) ||
                           (filterBy === 'voices' && (twin.type === 'voice' || twin.type === 'both'));
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastUsed':
          if (!a.lastUsed && !b.lastUsed) return 0;
          if (!a.lastUsed) return 1;
          if (!b.lastUsed) return -1;
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
        default:
          return 0;
      }
    });

  const handlePlayAudio = (twinId: string, audioUrl: string) => {
    if (playingAudio === twinId) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setPlayingAudio(twinId);
      }
    }
  };

  const handlePreview = (twin: DigitalTwin) => {
    setSelectedClone(twin);
    setShowPreviewModal(true);
  };

  const handleEdit = (twin: DigitalTwin) => {
    setSelectedClone(twin);
    setEditForm({ name: twin.name, description: twin.description || '' });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedClone) {
      setDigitalTwins(prev => prev.map(twin => 
        twin.id === selectedClone.id 
          ? { ...twin, name: editForm.name, description: editForm.description }
          : twin
      ));
      setShowEditModal(false);
      setSelectedClone(null);
    }
  };

  const handleDelete = (twinId: string) => {
    if (confirm('Are you sure you want to delete this clone? This action cannot be undone.')) {
      setDigitalTwins(prev => prev.filter(twin => twin.id !== twinId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'voice':
        return <Mic className="h-4 w-4" />;
      case 'both':
        return (
          <div className="flex space-x-1">
            <Video className="h-3 w-3" />
            <Mic className="h-3 w-3" />
          </div>
        );
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Avatar';
      case 'voice':
        return 'Voice';
      case 'both':
        return 'Both';
      default:
        return 'Clone';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const readyCount = digitalTwins.filter(t => t.status === 'ready').length;
  const processingCount = digitalTwins.filter(t => t.status === 'processing').length;
  const failedCount = digitalTwins.filter(t => t.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                My Clones
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                View and manage all your generated AI avatars and voices
              </p>
            </div>
            <Link
              to="/create"
              className="mt-6 sm:mt-0 inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Clone
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clones</p>
                <p className="text-3xl font-bold text-gray-900">{digitalTwins.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-3xl font-bold text-gray-900">{readyCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-3xl font-bold text-gray-900">{processingCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <Rocket className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deployed</p>
                <p className="text-3xl font-bold text-gray-900">{readyCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clones by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white/50 backdrop-blur-sm"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>
                
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                    <div className="p-2">
                      <div className="space-y-1">
                        {[
                          { value: 'all', label: 'All Clones' },
                          { value: 'ready', label: 'Ready' },
                          { value: 'processing', label: 'Processing' },
                          { value: 'failed', label: 'Failed' },
                          { value: 'avatars', label: 'Avatars' },
                          { value: 'voices', label: 'Voices' }
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => { setFilterBy(filter.value); setShowFilters(false); }}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                              filterBy === filter.value ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="lastUsed">Recently Used</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Twins Grid/List */}
        {filteredTwins.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full opacity-50" />
              <User className="h-12 w-12 text-blue-600 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery || filterBy !== 'all' ? 'No clones found' : "You haven't created any clones yet"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || filterBy !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for'
                : 'Create your first AI avatar or voice clone to get started with EchoForge AI'
              }
            </p>
            {!searchQuery && filterBy === 'all' && (
              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Clone
              </Link>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredTwins.map((twin) => (
              <div
                key={twin.id}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 ${
                  viewMode === 'grid' ? 'overflow-hidden' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Avatar Preview */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={twin.avatarUrl}
                        alt={twin.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(twin.status)}`}>
                          {twin.status === 'processing' && (
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse mr-2" />
                          )}
                          {twin.status.charAt(0).toUpperCase() + twin.status.slice(1)}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          {getTypeIcon(twin.type)}
                        </div>
                      </div>

                      {/* Processing Progress */}
                      {twin.status === 'processing' && twin.processingProgress && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${twin.processingProgress}%` }}
                              />
                            </div>
                            <span className="text-white text-xs font-medium">{twin.processingProgress}%</span>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      {twin.status === 'ready' && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                            <button 
                              onClick={() => handlePreview(twin)}
                              className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all transform hover:scale-105"
                            >
                              <Eye className="h-5 w-5 text-blue-600" />
                            </button>
                            {twin.voiceUrl && (
                              <button 
                                onClick={() => handlePlayAudio(twin.id, twin.voiceUrl!)}
                                className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all transform hover:scale-105"
                              >
                                {playingAudio === twin.id ? (
                                  <Pause className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Play className="h-5 w-5 text-green-600" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {twin.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{getTypeLabel(twin.type)}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{twin.size}</span>
                          </div>
                        </div>
                      </div>

                      {twin.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {twin.description}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center text-xs text-gray-500 space-x-3 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(twin.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{twin.duration}s</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {twin.status === 'ready' && (
                            <>
                              <button
                                onClick={() => handlePreview(twin)}
                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                                <span>Preview</span>
                              </button>
                              
                              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </button>
                            </>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => handleEdit(twin)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {twin.status === 'ready' && (
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Rocket className="h-4 w-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(twin.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* List View */
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={twin.avatarUrl}
                        alt={twin.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 right-1">
                        <div className="bg-white/90 rounded-full p-1">
                          {getTypeIcon(twin.type)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {twin.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(twin.status)}`}>
                          {twin.status === 'processing' && (
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse mr-1" />
                          )}
                          {twin.status.charAt(0).toUpperCase() + twin.status.slice(1)}
                        </span>
                      </div>
                      {twin.description && (
                        <p className="text-sm text-gray-600 truncate mb-2">
                          {twin.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span>{getTypeLabel(twin.type)}</span>
                        <span>{formatDate(twin.createdAt)}</span>
                        <span>{twin.duration}s</span>
                        <span>{twin.size}</span>
                        {twin.lastUsed && (
                          <span>Used {formatDate(twin.lastUsed)}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {twin.status === 'ready' && (
                        <>
                          <button
                            onClick={() => handlePreview(twin)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {twin.voiceUrl && (
                            <button
                              onClick={() => handlePlayAudio(twin.id, twin.voiceUrl!)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              {playingAudio === twin.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Rocket className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleEdit(twin)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(twin.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedClone && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Preview: {selectedClone.name}</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedClone.avatarUrl}
                    alt={selectedClone.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedClone.voiceUrl && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Voice Sample</h4>
                    <audio controls className="w-full">
                      <source src={selectedClone.voiceUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Type:</span> {getTypeLabel(selectedClone.type)}</p>
                    <p><span className="font-medium">Duration:</span> {selectedClone.duration}s</p>
                    <p><span className="font-medium">Size:</span> {selectedClone.size}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="h-4 w-4 mr-2 inline" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Rocket className="h-4 w-4 mr-2 inline" />
                      Deploy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedClone && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Edit Clone</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setPlayingAudio(null)}
          onError={() => setPlayingAudio(null)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;