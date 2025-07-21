import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { 
  Youtube, Instagram, Facebook, Twitter, Hash, Image, Type, Smile, 
  Zap, TrendingUp, Star, Crown, Check, X, Sparkles, Users, Clock
} from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const [showAccessMessage, setShowAccessMessage] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Show access message if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setShowAccessMessage(true);
      const timer = setTimeout(() => {
        setShowAccessMessage(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const categories = [
    {
      id: 'youtube',
      name: 'YouTube Tools',
      icon: <Youtube size={24} className="text-red-600" />,
      color: 'red',
      description: 'Grow your YouTube channel with powerful video optimization tools',
      tools: [
        { id: 'thumbnail-downloader', name: 'Thumbnail Downloader', icon: <Image size={20} />, description: 'Download YouTube video thumbnails in high quality' },
        { id: 'title-generator', name: 'Title Generator', icon: <Type size={20} />, description: 'Generate catchy, SEO-optimized video titles' },
        { id: 'thumbnail-preview', name: 'Thumbnail Preview', icon: <Image size={20} />, description: 'Preview how thumbnails look on different devices' },
        { id: 'description-ideas', name: 'Description Ideas', icon: <Type size={20} />, description: 'Get engaging video description templates' },
      ],
    },
    {
      id: 'instagram',
      name: 'Instagram Tools',
      icon: <Instagram size={24} className="text-pink-600" />,
      color: 'pink',
      description: 'Boost your Instagram engagement with content creation tools',
      tools: [
        { id: 'hashtag-generator', name: 'Hashtag Generator', icon: <Hash size={20} />, description: 'Generate trending hashtags for maximum reach' },
        { id: 'dp-downloader', name: 'Profile DP Downloader', icon: <Image size={20} />, description: 'Download Instagram profile pictures' },
        { id: 'caption-ideas', name: 'Caption Ideas', icon: <Type size={20} />, description: 'Creative caption templates for every occasion' },
      ],
    },
    {
      id: 'facebook',
      name: 'Facebook Tools',
      icon: <Facebook size={24} className="text-blue-600" />,
      color: 'blue',
      description: 'Optimize your Facebook posts for better engagement',
      tools: [
        { id: 'post-checker', name: 'Post Length Checker', icon: <Type size={20} />, description: 'Check character limits and optimize post length' },
        { id: 'engagement-generator', name: 'Engagement Generator', icon: <TrendingUp size={20} />, description: 'Create posts that drive likes and comments' },
      ],
    },
    {
      id: 'twitter',
      name: 'Twitter Tools',
      icon: <Twitter size={24} className="text-blue-400" />,
      color: 'blue',
      description: 'Craft perfect tweets and grow your Twitter presence',
      tools: [
        { id: 'tweet-optimizer', name: 'Tweet Optimizer', icon: <Zap size={20} />, description: 'Optimize tweets for maximum engagement' },
        { id: 'thread-creator', name: 'Thread Creator', icon: <Type size={20} />, description: 'Create engaging Twitter threads easily' },
      ],
    },
    {
      id: 'general',
      name: 'General Tools',
      icon: <Sparkles size={24} className="text-purple-500" />,
      color: 'purple',
      description: 'Universal tools for all your content creation needs',
      tools: [
        { id: 'emoji-picker', name: 'Emoji Picker', icon: <Smile size={20} />, description: 'Find and copy emojis with one click' },
        { id: 'text-styler', name: 'Text Styler', icon: <Type size={20} />, description: 'Transform text with fancy Unicode styles' },
        { id: 'title-capitalizer', name: 'Title Capitalizer', icon: <Type size={20} />, description: 'Format text in different capitalization styles' },
      ],
    },
  ];

  const handleToolClick = (toolId) => {
    navigate(`/tool/${toolId}`);
  };

  const stats = [
    { label: 'Free Tools', value: '14+', icon: <Zap className="text-yellow-500" /> },
    { label: 'Active Users', value: '50K+', icon: <Users className="text-blue-500" /> },
    { label: 'Tools Used Today', value: '1.2M+', icon: <TrendingUp className="text-green-500" /> },
    { label: 'Avg. Save Time', value: '2hrs', icon: <Clock className="text-purple-500" /> },
  ];

  return (
    <div className="container mx-auto animate-fade-in-up">
      {/* Access message for non-logged users */}
      {showAccessMessage && (
        <div className="fixed top-24 right-4 left-4 md:left-auto md:w-96 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-xl shadow-2xl animate-bounce">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Crown className="text-yellow-300 mt-0.5" size={20} />
              <div>
                <h3 className="font-bold text-sm">🎉 Free Access Available!</h3>
                <p className="text-xs mt-1 opacity-90">
                  Get 1-day unlimited access to all premium tools. No credit card required!
                </p>
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-3 py-1 bg-white text-purple-600 rounded font-medium hover:bg-gray-100 transition-colors text-xs"
                  >
                    Claim Free Access
                  </button>
                  <button 
                    onClick={() => setShowAccessMessage(false)}
                    className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors text-xs"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="logo-gradient w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            SocialKit
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Free tools for content creators
        </p>
        <p className="text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
          Boost your social media presence with our collection of powerful, free tools. 
          No API keys, no subscriptions, no limits - just results.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {stat.icon}
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Slot - Top */}
      <div className="my-8">
        <div id="adsense-slot-3" className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center border border-gray-300 dark:border-gray-600">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            📢 AdSense Leaderboard Banner (728x90)
          </span>
        </div>
      </div>

      {/* Tool Categories */}
      {categories.map((category, index) => (
        <div key={category.id} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {category.icon}
              <div>
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium">
              {category.tools.length} tools
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map(tool => (
              <ToolCard 
                key={tool.id}
                name={tool.name}
                icon={tool.icon}
                description={tool.description}
                category={category.id}
                onClick={() => handleToolClick(tool.id)}
              />
            ))}
          </div>

          {/* AdSense after every 2 categories */}
          {(index + 1) % 2 === 0 && index < categories.length - 1 && (
            <div className="my-10">
              <div id={`adsense-slot-${index + 4}`} className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center border border-gray-300 dark:border-gray-600">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  📱 AdSense Banner (728x90)
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Premium Upsell Section */}
      <div className="mt-16 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="text-yellow-500" size={32} />
              <h2 className="text-3xl font-bold text-gradient">Upgrade to SocialKit Pro</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Unlock advanced features, unlimited usage, and priority support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <Zap className="mx-auto text-gray-500 mb-2" size={32} />
                <h3 className="font-bold text-xl mb-2">Free</h3>
                <div className="text-3xl font-bold mb-2">$0</div>
                <p className="text-sm text-gray-500">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">14+ free tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Basic usage limits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <X size={16} className="text-red-500" />
                  <span className="text-sm text-gray-400">Advanced features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <X size={16} className="text-red-500" />
                  <span className="text-sm text-gray-400">Priority support</span>
                </li>
              </ul>
              <button className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-2 border-purple-500 relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <Star className="mx-auto text-purple-500 mb-2" size={32} />
                <h3 className="font-bold text-xl mb-2">Pro Creator</h3>
                <div className="text-3xl font-bold mb-2">
                  $9<span className="text-lg">/month</span>
                </div>
                <p className="text-sm text-gray-500">For serious creators</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">All tools unlocked</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Unlimited usage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">API access</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Trial
              </button>
            </div>

            {/* Agency Plan */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <Users className="mx-auto text-blue-500 mb-2" size={32} />
                <h3 className="font-bold text-xl mb-2">Agency</h3>
                <div className="text-3xl font-bold mb-2">
                  $29<span className="text-lg">/month</span>
                </div>
                <p className="text-sm text-gray-500">For teams and agencies</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Team collaboration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">White-label reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>
              <button className="w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              ✨ All plans include 14-day free trial • Cancel anytime • No setup fees
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>🔒 Secure Payment</span>
              <span>•</span>
              <span>💳 No Hidden Fees</span>
              <span>•</span>
              <span>🔄 Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;