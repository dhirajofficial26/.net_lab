import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Copy, Sparkles, Zap, Share2 } from 'lucide-react';
import { getToolConfig } from '../utils/toolConfigs';
import YouTubeThumbnailDownloader from '../components/tools/YouTubeThumbnailDownloader';
import TitleGenerator from '../components/tools/TitleGenerator';
import HashtagGenerator from '../components/tools/HashtagGenerator';
import EmojiPicker from '../components/tools/EmojiPicker';
import TextStyler from '../components/tools/TextStyler';
import TitleCapitalizer from '../components/tools/TitleCapitalizer';

const ToolPage = () => {
  const { toolId } = useParams();
  const [toolConfig, setToolConfig] = useState(null);

  useEffect(() => {
    const config = getToolConfig(toolId);
    setToolConfig(config);
  }, [toolId]);

  const renderTool = () => {
    switch (toolId) {
      case 'thumbnail-downloader':
        return <YouTubeThumbnailDownloader />;
      case 'title-generator':
        return <TitleGenerator />;
      case 'hashtag-generator':
        return <HashtagGenerator />;
      case 'emoji-picker':
        return <EmojiPicker />;
      case 'text-styler':
        return <TextStyler />;
      case 'title-capitalizer':
        return <TitleCapitalizer />;
      default:
        return <ComingSoonTool toolConfig={toolConfig} />;
    }
  };

  if (!toolConfig) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading tool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${toolConfig.gradient} shadow-lg`}>
            {toolConfig.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {toolConfig.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {toolConfig.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <span className="flex items-center space-x-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
              <Zap size={12} />
              <span>Free Tool</span>
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {toolConfig.tags?.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* AdSense Slot - Before Tool */}
      <div className="my-6">
        <div id="adsense-tool-top" className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            📢 AdSense Banner (728x90)
          </span>
        </div>
      </div>

      {/* Tool Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          {renderTool()}
        </div>
      </div>

      {/* AdSense Slot - After Tool */}
      <div className="my-8">
        <div id="adsense-tool-bottom" className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            📱 AdSense Banner (728x90)
          </span>
        </div>
      </div>

      {/* Share Tool */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${toolConfig.name} - SocialKit`,
                text: toolConfig.description,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              // Show toast
              const toast = document.createElement('div');
              toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
              toast.textContent = 'Link copied to clipboard!';
              document.body.appendChild(toast);
              setTimeout(() => document.body.removeChild(toast), 2000);
            }
          }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Share2 size={16} />
          <span>Share this tool</span>
        </button>
      </div>
    </div>
  );
};

// Coming Soon component for tools not yet implemented
const ComingSoonTool = ({ toolConfig }) => {
  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="text-purple-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Coming Soon!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          We're working hard to bring you this amazing tool. It will be available very soon!
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 max-w-lg mx-auto">
        <h3 className="font-semibold mb-3">What this tool will do:</h3>
        <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span>{toolConfig?.description || 'Enhance your social media content'}</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span>Save time with automated processing</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span>No API keys or external dependencies</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span>100% free to use</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-6">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft size={16} />
          <span>Try Other Tools</span>
        </Link>
      </div>
    </div>
  );
};

export default ToolPage;