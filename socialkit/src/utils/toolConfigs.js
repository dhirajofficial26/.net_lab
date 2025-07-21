import { 
  Youtube, Instagram, Facebook, Twitter, Hash, Image, Type, Smile, 
  Zap, TrendingUp, HelpCircle, LayoutDashboard
} from 'lucide-react';
import React from 'react';

const toolConfigs = {
  // YouTube Tools
  'thumbnail-downloader': {
    id: 'thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    description: 'Download high-quality thumbnails from any YouTube video',
    category: 'youtube',
    icon: <Image size={24} className="text-white" />,
    gradient: 'from-red-500 to-red-600',
    tags: ['youtube', 'thumbnail', 'download', 'image'],
    implemented: true
  },
  'title-generator': {
    id: 'title-generator',
    name: 'YouTube Title Generator',
    description: 'Generate catchy, SEO-optimized video titles that get clicks',
    category: 'youtube',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-red-500 to-red-600',
    tags: ['youtube', 'title', 'seo', 'generator'],
    implemented: true
  },
  'thumbnail-preview': {
    id: 'thumbnail-preview',
    name: 'Thumbnail Preview',
    description: 'Preview how your thumbnail will look on different devices',
    category: 'youtube',
    icon: <LayoutDashboard size={24} className="text-white" />,
    gradient: 'from-red-500 to-red-600',
    tags: ['youtube', 'thumbnail', 'preview', 'mobile'],
    implemented: false
  },
  'description-ideas': {
    id: 'description-ideas',
    name: 'Video Description Ideas',
    description: 'Get engaging video description templates and ideas',
    category: 'youtube',
    icon: <HelpCircle size={24} className="text-white" />,
    gradient: 'from-red-500 to-red-600',
    tags: ['youtube', 'description', 'template', 'ideas'],
    implemented: false
  },

  // Instagram Tools
  'hashtag-generator': {
    id: 'hashtag-generator',
    name: 'Instagram Hashtag Generator',
    description: 'Generate trending hashtags for maximum reach and engagement',
    category: 'instagram',
    icon: <Hash size={24} className="text-white" />,
    gradient: 'from-pink-500 to-purple-600',
    tags: ['instagram', 'hashtags', 'trending', 'engagement'],
    implemented: true
  },
  'dp-downloader': {
    id: 'dp-downloader',
    name: 'Profile DP Downloader',
    description: 'Download Instagram profile pictures in full resolution',
    category: 'instagram',
    icon: <Image size={24} className="text-white" />,
    gradient: 'from-pink-500 to-purple-600',
    tags: ['instagram', 'profile', 'download', 'image'],
    implemented: false
  },
  'caption-ideas': {
    id: 'caption-ideas',
    name: 'Caption Ideas Generator',
    description: 'Creative caption templates for every occasion and mood',
    category: 'instagram',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-pink-500 to-purple-600',
    tags: ['instagram', 'captions', 'creative', 'templates'],
    implemented: false
  },

  // Facebook Tools
  'post-checker': {
    id: 'post-checker',
    name: 'Facebook Post Length Checker',
    description: 'Check character limits and optimize your Facebook posts',
    category: 'facebook',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-blue-500 to-blue-600',
    tags: ['facebook', 'post', 'character', 'limit'],
    implemented: false
  },
  'engagement-generator': {
    id: 'engagement-generator',
    name: 'Engagement Post Generator',
    description: 'Create posts that drive likes, comments, and shares',
    category: 'facebook',
    icon: <TrendingUp size={24} className="text-white" />,
    gradient: 'from-blue-500 to-blue-600',
    tags: ['facebook', 'engagement', 'viral', 'generator'],
    implemented: false
  },

  // Twitter Tools
  'tweet-optimizer': {
    id: 'tweet-optimizer',
    name: 'Tweet Optimizer',
    description: 'Optimize your tweets for maximum engagement and reach',
    category: 'twitter',
    icon: <Zap size={24} className="text-white" />,
    gradient: 'from-blue-400 to-blue-500',
    tags: ['twitter', 'tweet', 'optimize', 'engagement'],
    implemented: false
  },
  'thread-creator': {
    id: 'thread-creator',
    name: 'Twitter Thread Creator',
    description: 'Create engaging Twitter threads that tell a story',
    category: 'twitter',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-blue-400 to-blue-500',
    tags: ['twitter', 'thread', 'story', 'creator'],
    implemented: false
  },

  // General Tools
  'emoji-picker': {
    id: 'emoji-picker',
    name: 'Emoji Picker',
    description: 'Find and copy the perfect emojis for your content',
    category: 'general',
    icon: <Smile size={24} className="text-white" />,
    gradient: 'from-purple-500 to-pink-500',
    tags: ['emoji', 'picker', 'copy', 'unicode'],
    implemented: true
  },
  'text-styler': {
    id: 'text-styler',
    name: 'Text Styler',
    description: 'Transform your text with fancy Unicode styles and formats',
    category: 'general',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-purple-500 to-pink-500',
    tags: ['text', 'style', 'unicode', 'format'],
    implemented: true
  },
  'title-capitalizer': {
    id: 'title-capitalizer',
    name: 'Title Capitalizer',
    description: 'Format text in different capitalization styles',
    category: 'general',
    icon: <Type size={24} className="text-white" />,
    gradient: 'from-purple-500 to-pink-500',
    tags: ['title', 'capitalize', 'format', 'case'],
    implemented: true
  }
};

export const getToolConfig = (toolId) => {
  return toolConfigs[toolId] || null;
};

export const getToolsByCategory = (category) => {
  return Object.values(toolConfigs).filter(tool => tool.category === category);
};

export const getAllTools = () => {
  return Object.values(toolConfigs);
};

export const getImplementedTools = () => {
  return Object.values(toolConfigs).filter(tool => tool.implemented);
};

export default toolConfigs;