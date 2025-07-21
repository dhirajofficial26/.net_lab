import React, { useState, useContext } from 'react';
import { 
  LayoutDashboard, Youtube, Instagram, Facebook, Twitter, 
  Hash, Image, Type, Smile, Settings, HelpCircle, Menu, X,
  Zap, TrendingUp
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

  const categories = [
    { id: 'youtube', name: 'YouTube Tools', icon: <Youtube size={18} className="text-red-500" />, count: 4 },
    { id: 'instagram', name: 'Instagram Tools', icon: <Instagram size={18} className="text-pink-500" />, count: 3 },
    { id: 'facebook', name: 'Facebook Tools', icon: <Facebook size={18} className="text-blue-500" />, count: 2 },
    { id: 'twitter', name: 'Twitter Tools', icon: <Twitter size={18} className="text-blue-400" />, count: 2 },
    { id: 'general', name: 'General Tools', icon: <LayoutDashboard size={18} className="text-gray-500" />, count: 3 },
  ];

  const tools = [
    { id: 'thumbnail-downloader', name: 'Thumbnail Downloader', category: 'youtube', icon: <Image size={18} />, description: 'Download YouTube thumbnails' },
    { id: 'title-generator', name: 'Title Generator', category: 'youtube', icon: <Type size={18} />, description: 'Generate catchy video titles' },
    { id: 'thumbnail-preview', name: 'Thumbnail Preview', category: 'youtube', icon: <LayoutDashboard size={18} />, description: 'Preview thumbnail layouts' },
    { id: 'description-ideas', name: 'Description Ideas', category: 'youtube', icon: <HelpCircle size={18} />, description: 'Get video description templates' },
    { id: 'hashtag-generator', name: 'Hashtag Generator', category: 'instagram', icon: <Hash size={18} />, description: 'Generate trending hashtags' },
    { id: 'dp-downloader', name: 'Profile DP Downloader', category: 'instagram', icon: <Image size={18} />, description: 'Download profile pictures' },
    { id: 'caption-ideas', name: 'Caption Ideas', category: 'instagram', icon: <Type size={18} />, description: 'Creative caption templates' },
    { id: 'post-checker', name: 'Post Length Checker', category: 'facebook', icon: <Type size={18} />, description: 'Check character limits' },
    { id: 'engagement-generator', name: 'Engagement Generator', category: 'facebook', icon: <TrendingUp size={18} />, description: 'Create engaging posts' },
    { id: 'tweet-optimizer', name: 'Tweet Optimizer', category: 'twitter', icon: <Zap size={18} />, description: 'Optimize tweet content' },
    { id: 'thread-creator', name: 'Thread Creator', category: 'twitter', icon: <Type size={18} />, description: 'Create Twitter threads' },
    { id: 'emoji-picker', name: 'Emoji Picker', category: 'general', icon: <Smile size={18} />, description: 'Find and copy emojis' },
    { id: 'text-styler', name: 'Text Styler', category: 'general', icon: <Type size={18} />, description: 'Style your text' },
    { id: 'title-capitalizer', name: 'Title Capitalizer', category: 'general', icon: <Type size={18} />, description: 'Format text cases' },
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const isToolActive = (toolId) => {
    return location.pathname === `/tool/${toolId}`;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-gray-200 dark:border-gray-700 z-40 bg-white dark:bg-gray-800 transition-transform duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="h-full flex flex-col pt-20 md:pt-4">
          {/* Categories */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <LayoutDashboard size={18} className="text-purple-500" />
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeCategory === 'all' 
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 shadow-sm' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <LayoutDashboard size={18} className="text-gray-500" />
                  <span className="font-medium">All Tools</span>
                </div>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                  {tools.length}
                </span>
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 shadow-sm' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="flex-1 overflow-y-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <Zap size={18} className="text-yellow-500" />
              <h2 className="text-lg font-semibold">
                {activeCategory === 'all' ? 'All Tools' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
            </div>
            <div className="space-y-1">
              {filteredTools.map(tool => (
                <NavLink 
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-3 rounded-lg transition-all duration-200 border ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 shadow-sm' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
                    }`
                  }
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded-lg ${
                      isToolActive(tool.id) 
                        ? 'bg-purple-200 dark:bg-purple-800 text-purple-600 dark:text-purple-300' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{tool.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* AdSense Slot - Sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div id="adsense-slot-2" className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center">
                📱 AdSense<br/>Rectangle (300x250)
              </span>
            </div>
          </div>

          {/* Footer links */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left">
              <Settings size={18} className="text-gray-500" />
              <span className="font-medium">Settings</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left">
              <HelpCircle size={18} className="text-gray-500" />
              <span className="font-medium">Help & Support</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;