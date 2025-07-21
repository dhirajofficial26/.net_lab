import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const ToolCard = ({ name, icon, description, onClick, category }) => {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'youtube': return 'from-red-500 to-red-600';
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'facebook': return 'from-blue-500 to-blue-600';
      case 'twitter': return 'from-blue-400 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group card-hover overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${getCategoryColor(category)}`}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 p-3 rounded-xl text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {name}
              </h3>
              <div className="flex items-center space-x-1 mt-1">
                <Zap size={12} className="text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Free Tool
                </span>
              </div>
            </div>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={20} className="text-purple-500" />
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description || getDefaultDescription(name)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Available Now
            </span>
          </div>
          
          <button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 flex items-center space-x-1 group-hover:translate-x-1 transform transition-transform duration-300">
            <span>Use Tool</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      
      {/* Subtle bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-purple-200 dark:via-purple-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const getDefaultDescription = (name) => {
  if (name.includes('Downloader')) return 'Download high-quality images and media from social platforms';
  if (name.includes('Generator')) return 'Generate creative and engaging content ideas for your posts';
  if (name.includes('Preview')) return 'Preview how your content will look before publishing';
  if (name.includes('Checker')) return 'Validate and optimize your content for platform requirements';
  if (name.includes('Picker')) return 'Find and copy the perfect emojis for your content';
  if (name.includes('Styler')) return 'Transform your text with beautiful formatting and styles';
  if (name.includes('Optimizer')) return 'Optimize your content for maximum engagement';
  return 'Enhance your social media presence with this powerful tool';
};

export default ToolCard;