import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Upload, Video, Mic, User, Sparkles, Check, AlertCircle, Play, Pause, RotateCcw, FileVideo, FileAudio, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FileUpload {
  file: File | null;
  preview?: string;
  duration?: number;
  isValid: boolean;
  error?: string;
}

interface FormData {
  video: FileUpload;
  audio: FileUpload;
  name: string;
  description: string;
}

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    video: { file: null, isValid: false },
    audio: { file: null, isValid: false },
    name: '',
    description: ''
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { 
      id: 1, 
      title: 'Upload Video', 
      icon: Video, 
      description: 'Record or upload a 30-second video',
      subtitle: 'Well-lit, front-facing video with neutral background'
    },
    { 
      id: 2, 
      title: 'Upload Audio', 
      icon: Mic, 
      description: 'Provide a clear voice sample',
      subtitle: '30-second clip of you speaking clearly'
    },
    { 
      id: 3, 
      title: 'Name Your Twin', 
      icon: User, 
      description: 'Give your digital twin a name',
      subtitle: 'Add a name and optional description'
    },
    { 
      id: 4, 
      title: 'Generate Clone', 
      icon: Sparkles, 
      description: 'Create your AI avatar',
      subtitle: 'AI processing and model generation'
    }
  ];

  const validateVideo = useCallback((file: File): Promise<{ isValid: boolean; error?: string; duration?: number }> => {
    return new Promise((resolve) => {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        resolve({ isValid: false, error: 'Video file too large (max 100MB)' });
        return;
      }

      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        const duration = video.duration;
        if (duration < 10) {
          resolve({ isValid: false, error: 'Video must be at least 10 seconds long' });
        } else if (duration > 120) {
          resolve({ isValid: false, error: 'Video must be less than 2 minutes long' });
        } else {
          resolve({ isValid: true, duration });
        }
      };

      video.onerror = () => {
        resolve({ isValid: false, error: 'Invalid video format. Please use MP4, MOV, or WebM' });
      };

      video.src = URL.createObjectURL(file);
    });
  }, []);

  const validateAudio = useCallback((file: File): Promise<{ isValid: boolean; error?: string; duration?: number }> => {
    return new Promise((resolve) => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        resolve({ isValid: false, error: 'Audio file too large (max 50MB)' });
        return;
      }

      const audio = document.createElement('audio');
      audio.preload = 'metadata';
      
      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        if (duration < 10) {
          resolve({ isValid: false, error: 'Audio must be at least 10 seconds long' });
        } else if (duration > 300) {
          resolve({ isValid: false, error: 'Audio must be less than 5 minutes long' });
        } else {
          resolve({ isValid: true, duration });
        }
      };

      audio.onerror = () => {
        resolve({ isValid: false, error: 'Invalid audio format. Please use MP3, WAV, or M4A' });
      };

      audio.src = URL.createObjectURL(file);
    });
  }, []);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = await validateVideo(file);
    const preview = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      video: {
        file,
        preview,
        duration: validation.duration,
        isValid: validation.isValid,
        error: validation.error
      }
    }));
  };

  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = await validateAudio(file);
    const preview = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      audio: {
        file,
        preview,
        duration: validation.duration,
        isValid: validation.isValid,
        error: validation.error
      }
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const stages = [
      'Analyzing video content...',
      'Processing facial features...',
      'Training voice model...',
      'Generating avatar...',
      'Finalizing digital twin...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setGenerationStage(stages[i]);
      
      // Simulate processing time with more realistic progress
      const stageProgress = 100 / stages.length;
      for (let progress = 0; progress <= 100; progress += Math.random() * 5 + 1) {
        setGenerationProgress(Math.min(100, (i * stageProgress) + (progress * stageProgress / 100)));
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      }
    }

    setIsComplete(true);
    setIsGenerating(false);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.video.isValid;
      case 2:
        return formData.audio.isValid;
      case 3:
        return formData.name.trim().length > 0;
      default:
        return false;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            {/* Success Animation */}
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative bg-green-500 rounded-full p-8 shadow-2xl">
                <Check className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎉 Your Digital Twin is Ready!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              <span className="font-semibold text-green-600">{formData.name}</span> has been successfully created
            </p>
            <p className="text-gray-500 mb-8">
              Your AI avatar and voice clone are now ready to use
            </p>
            
            {/* Success Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <Video className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Video Avatar</div>
                <div className="text-xs text-gray-500">Ready</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <Mic className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Voice Clone</div>
                <div className="text-xs text-gray-500">Ready</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <Sparkles className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">AI Model</div>
                <div className="text-xs text-gray-500">Trained</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                <Zap className="h-5 w-5 mr-2" />
                View in Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsComplete(false);
                  setCurrentStep(1);
                  setFormData({
                    video: { file: null, isValid: false },
                    audio: { file: null, isValid: false },
                    name: '',
                    description: ''
                  });
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 border border-gray-300 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                <User className="h-5 w-5 mr-2" />
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Digital Twin</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform yourself into an AI avatar in just a few simple steps. 
              Upload your video and audio, and let our AI create your digital twin.
            </p>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="mb-16">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-green-500 border-green-500 text-white shadow-lg'
                      : currentStep === step.id
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg animate-pulse'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                    
                    {/* Glow effect for current step */}
                    {currentStep === step.id && (
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-30 animate-ping" />
                    )}
                  </div>
                  
                  <div className="mt-4 text-center max-w-32">
                    <div className={`text-sm font-semibold transition-colors ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 leading-tight">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Step 1: Video Upload */}
          {currentStep === 1 && (
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6">
                  <Video className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Upload Your Video</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Upload a clear, front-facing video of yourself speaking. Best results with good lighting and neutral background.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                {!formData.video.file ? (
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="relative border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors">
                          <Upload className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Click to upload video</h3>
                        <p className="text-gray-600 mb-4">or drag and drop your file here</p>
                        
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <FileVideo className="h-4 w-4" />
                            <span>MP4, MOV, WebM</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Max 100MB</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>10-120 seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-3">💡 Tips for best results:</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Use good lighting (natural light works best)</li>
                        <li>• Keep a neutral, solid-colored background</li>
                        <li>• Look directly at the camera</li>
                        <li>• Speak clearly and naturally</li>
                        <li>• Avoid excessive movement or gestures</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Video Preview */}
                    <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                      <video
                        ref={videoRef}
                        src={formData.video.preview}
                        controls
                        className="w-full max-h-96 object-contain"
                      />
                    </div>
                    
                    {/* File Info */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl ${formData.video.isValid ? 'bg-green-100' : 'bg-red-100'}`}>
                            {formData.video.isValid ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{formData.video.file.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              {formData.video.duration && (
                                <span>{formatDuration(formData.video.duration)}</span>
                              )}
                              <span>{(formData.video.file.size / (1024 * 1024)).toFixed(1)}MB</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                formData.video.isValid 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {formData.video.isValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, video: { file: null, isValid: false } }));
                            if (videoInputRef.current) videoInputRef.current.value = '';
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Remove video"
                        >
                          <RotateCcw className="h-5 w-5" />
                        </button>
                      </div>

                      {formData.video.error && (
                        <div className="mt-4 flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Upload Error</p>
                            <p className="text-sm text-red-700 mt-1">{formData.video.error}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Step 2: Audio Upload */}
          {currentStep === 2 && (
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-6">
                  <Mic className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Upload Your Voice Sample</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Provide a clear audio sample of your voice. Speak naturally and avoid background noise for the best voice clone quality.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                {!formData.audio.file ? (
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div
                      onClick={() => audioInputRef.current?.click()}
                      className="relative border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-teal-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6 group-hover:bg-green-200 transition-colors">
                          <Upload className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Click to upload audio</h3>
                        <p className="text-gray-600 mb-4">or drag and drop your file here</p>
                        
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <FileAudio className="h-4 w-4" />
                            <span>MP3, WAV, M4A</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Max 50MB</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>10-300 seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                      <h4 className="font-semibold text-green-900 mb-3">🎤 Tips for best voice quality:</h4>
                      <ul className="space-y-2 text-green-800 text-sm">
                        <li>• Record in a quiet environment</li>
                        <li>• Speak at your normal pace and volume</li>
                        <li>• Use a good quality microphone if available</li>
                        <li>• Include varied sentences and emotions</li>
                        <li>• Avoid background music or noise</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Audio Preview */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                          <Mic className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Preview</h3>
                      </div>
                      
                      <audio
                        ref={audioRef}
                        src={formData.audio.preview}
                        controls
                        className="w-full"
                      />
                    </div>
                    
                    {/* File Info */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl ${formData.audio.isValid ? 'bg-green-100' : 'bg-red-100'}`}>
                            {formData.audio.isValid ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{formData.audio.file.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              {formData.audio.duration && (
                                <span>{formatDuration(formData.audio.duration)}</span>
                              )}
                              <span>{(formData.audio.file.size / (1024 * 1024)).toFixed(1)}MB</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                formData.audio.isValid 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {formData.audio.isValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, audio: { file: null, isValid: false } }));
                            if (audioInputRef.current) audioInputRef.current.value = '';
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Remove audio"
                        >
                          <RotateCcw className="h-5 w-5" />
                        </button>
                      </div>

                      {formData.audio.error && (
                        <div className="mt-4 flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Upload Error</p>
                            <p className="text-sm text-red-700 mt-1">{formData.audio.error}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Step 3: Name and Description */}
          {currentStep === 3 && (
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-6">
                  <User className="h-10 w-10 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Name Your Digital Twin</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Give your AI avatar a memorable name and add an optional description to help you identify it later.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Alex Professional, Sarah Educator, Marcus Gaming"
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                  />
                  <p className="text-sm text-gray-500 mt-2">Choose a name that reflects your digital twin's purpose</p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your digital twin's purpose, style, or characteristics..."
                    rows={4}
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none shadow-sm"
                  />
                  <p className="text-sm text-gray-500 mt-2">Help others understand what makes your digital twin unique</p>
                </div>

                {/* Preview Card */}
                {formData.name && (
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                    <h4 className="font-semibold text-purple-900 mb-3">Preview</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{formData.name}</h5>
                          {formData.description && (
                            <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Generate */}
          {currentStep === 4 && (
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl mb-6">
                  <Sparkles className="h-10 w-10 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 4: Generate Your Clone</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Review your inputs and let our AI create your digital twin. This process typically takes 2-5 minutes.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                {!isGenerating ? (
                  <div className="space-y-8">
                    {/* Summary */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Summary</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <Video className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Video Upload</p>
                            <p className="text-sm text-gray-600">
                              {formData.video.duration && formatDuration(formData.video.duration)} • {formData.video.file && (formData.video.file.size / (1024 * 1024)).toFixed(1)}MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-100 rounded-xl">
                            <Mic className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Audio Upload</p>
                            <p className="text-sm text-gray-600">
                              {formData.audio.duration && formatDuration(formData.audio.duration)} • {formData.audio.file && (formData.audio.file.size / (1024 * 1024)).toFixed(1)}MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-purple-100 rounded-xl">
                            <User className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{formData.name}</p>
                            {formData.description && (
                              <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerate}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-6 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl text-lg"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <Sparkles className="h-6 w-6" />
                        <span>Generate My Digital Twin</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-8">
                    {/* Generation Animation */}
                    <div className="relative">
                      <div className="w-40 h-40 mx-auto bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center relative overflow-hidden">
                        <Sparkles className="h-16 w-16 text-orange-600 animate-pulse z-10" />
                        
                        {/* Animated rings */}
                        <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-spin" style={{ 
                          animationDuration: '3s',
                          borderTopColor: 'transparent',
                          borderRightColor: 'transparent'
                        }} />
                        <div className="absolute inset-4 rounded-full border-4 border-pink-300 animate-spin" style={{ 
                          animationDuration: '2s',
                          animationDirection: 'reverse',
                          borderBottomColor: 'transparent',
                          borderLeftColor: 'transparent'
                        }} />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Creating Your Digital Twin</h3>
                      <p className="text-lg font-medium text-orange-600 mb-2">{generationStage}</p>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-pink-500 h-4 rounded-full transition-all duration-300 relative overflow-hidden"
                          style={{ width: `${generationProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
                        </div>
                      </div>
                      
                      <p className="text-lg font-semibold text-gray-700">{Math.round(generationProgress)}% complete</p>
                      <p className="text-sm text-gray-500 mt-2">This may take a few minutes. Please don't close this page.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!isGenerating && (
            <div className="border-t border-gray-200 px-8 lg:px-12 py-8">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
                
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </div>
                
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceedToNext()}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    Next Step
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;