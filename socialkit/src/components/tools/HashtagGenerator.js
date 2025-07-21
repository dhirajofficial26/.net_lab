import React, { useState } from 'react';
import { Hash, Copy, Check, Shuffle, TrendingUp } from 'lucide-react';

const HashtagGenerator = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState('');

  // Predefined hashtag database for different categories
  const hashtagDatabase = {
    fitness: ['fitness', 'workout', 'gym', 'health', 'fit', 'training', 'exercise', 'motivation', 'fitnessmotivation', 'bodybuilding', 'crossfit', 'yoga', 'running', 'cardio', 'strength', 'muscle', 'fitfam', 'healthylifestyle', 'fitnessjourney', 'transformation'],
    food: ['food', 'foodie', 'delicious', 'yummy', 'tasty', 'cooking', 'recipe', 'chef', 'foodporn', 'instafood', 'foodstagram', 'homemade', 'healthy', 'organic', 'vegan', 'vegetarian', 'foodlover', 'cuisine', 'dinner', 'lunch'],
    travel: ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'trip', 'journey', 'traveling', 'travelling', 'backpacking', 'tourism', 'destination', 'beautiful', 'nature', 'photography', 'landscape', 'sunset', 'beach', 'mountains', 'culture'],
    fashion: ['fashion', 'style', 'outfit', 'ootd', 'fashionista', 'trendy', 'stylish', 'clothing', 'designer', 'model', 'fashionblogger', 'instafashion', 'look', 'beauty', 'accessories', 'shoes', 'dress', 'fashionweek', 'streetstyle', 'vintage'],
    business: ['business', 'entrepreneur', 'startup', 'success', 'motivation', 'leadership', 'marketing', 'branding', 'innovation', 'growth', 'networking', 'hustle', 'mindset', 'goals', 'strategy', 'productivity', 'businessowner', 'corporate', 'finance', 'investment'],
    photography: ['photography', 'photo', 'photographer', 'camera', 'picture', 'art', 'creative', 'canon', 'nikon', 'sony', 'portrait', 'landscape', 'nature', 'streetphotography', 'photooftheday', 'instagood', 'beautiful', 'capture', 'moment', 'artistic'],
    lifestyle: ['lifestyle', 'life', 'happy', 'love', 'instagood', 'photooftheday', 'beautiful', 'smile', 'fun', 'family', 'friends', 'selfie', 'me', 'cute', 'follow', 'like', 'instadaily', 'amazing', 'blessed', 'grateful'],
    technology: ['technology', 'tech', 'innovation', 'digital', 'startup', 'coding', 'programming', 'developer', 'software', 'ai', 'machinelearning', 'blockchain', 'cryptocurrency', 'gadgets', 'smartphone', 'computer', 'internet', 'cybersecurity', 'data', 'cloud'],
    art: ['art', 'artist', 'creative', 'painting', 'drawing', 'design', 'artwork', 'illustration', 'sketch', 'canvas', 'gallery', 'museum', 'artistic', 'creativity', 'handmade', 'craft', 'sculpture', 'abstract', 'contemporary', 'fineart']
  };

  const popularHashtags = ['love', 'instagood', 'photooftheday', 'beautiful', 'happy', 'cute', 'follow', 'like4like', 'followme', 'picoftheday', 'fun', 'smile', 'friends', 'instadaily', 'igers', 'instalike', 'amazing', 'followforfollow', 'bestoftheday', 'instamood'];

  const generateHashtags = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const topicLower = topic.toLowerCase();
      let relevantHashtags = [];
      
      // Find matching categories
      Object.keys(hashtagDatabase).forEach(category => {
        if (topicLower.includes(category) || hashtagDatabase[category].some(tag => topicLower.includes(tag))) {
          relevantHashtags = [...relevantHashtags, ...hashtagDatabase[category]];
        }
      });

      // If no specific match, use general approach
      if (relevantHashtags.length === 0) {
        const words = topicLower.split(' ').filter(word => word.length > 2);
        words.forEach(word => {
          Object.values(hashtagDatabase).forEach(categoryTags => {
            const matchingTags = categoryTags.filter(tag => tag.includes(word) || word.includes(tag));
            relevantHashtags = [...relevantHashtags, ...matchingTags];
          });
        });
      }

      // Add topic-based hashtags
      const topicWords = topic.split(' ').filter(word => word.length > 2);
      topicWords.forEach(word => {
        relevantHashtags.push(word.toLowerCase());
        relevantHashtags.push(word.toLowerCase() + 'life');
        relevantHashtags.push(word.toLowerCase() + 'gram');
        relevantHashtags.push('love' + word.toLowerCase());
      });

      // Add some popular hashtags
      const shuffledPopular = [...popularHashtags].sort(() => 0.5 - Math.random()).slice(0, 8);
      relevantHashtags = [...relevantHashtags, ...shuffledPopular];

      // Remove duplicates and limit to 30
      const uniqueHashtags = [...new Set(relevantHashtags)].slice(0, 30);
      
      setHashtags(uniqueHashtags);
      setIsLoading(false);
    }, 1500);
  };

  const copyHashtags = (hashtagsArray) => {
    const hashtagString = hashtagsArray.map(tag => `#${tag}`).join(' ');
    navigator.clipboard.writeText(hashtagString);
    setCopiedHashtags(hashtagString);
    setTimeout(() => setCopiedHashtags(''), 2000);
  };

  const copyAllHashtags = () => {
    copyHashtags(hashtags);
  };

  const getTopHashtags = () => hashtags.slice(0, 10);
  const getMediumHashtags = () => hashtags.slice(10, 20);
  const getNicheHashtags = () => hashtags.slice(20, 30);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Instagram Hashtag Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate trending hashtags for your Instagram posts. Enter your topic and get 30 relevant hashtags to boost your reach and engagement.
        </p>
      </div>

      {/* Input Form */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic (e.g., fitness, food, travel, fashion...)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && topic && generateHashtags()}
            />
          </div>
          <button
            onClick={generateHashtags}
            disabled={isLoading || !topic}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <>
                <div className="spinner inline-block mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Hash className="inline-block mr-2" size={16} />
                Generate Hashtags
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Topic Buttons */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(hashtagDatabase).map(category => (
            <button
              key={category}
              onClick={() => {
                setTopic(category);
                setTimeout(generateHashtags, 100);
              }}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors capitalize"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {hashtags.length > 0 && (
        <div className="space-y-8">
          {/* Copy All Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Generated Hashtags</h3>
            <button
              onClick={copyAllHashtags}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              {copiedHashtags ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedHashtags ? 'Copied!' : 'Copy All'}</span>
            </button>
          </div>

          {/* Hashtag Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* High Competition */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="text-red-500" size={16} />
                <h4 className="font-semibold text-red-900 dark:text-red-300">High Competition</h4>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400 mb-3">Popular hashtags with millions of posts</p>
              <div className="space-y-2">
                {getTopHashtags().map((tag, index) => (
                  <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
                    <span className="text-sm font-mono">#{tag}</span>
                    <button
                      onClick={() => copyHashtags([tag])}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Competition */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Hash className="text-yellow-500" size={16} />
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-300">Medium Competition</h4>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-3">Balanced reach and competition</p>
              <div className="space-y-2">
                {getMediumHashtags().map((tag, index) => (
                  <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
                    <span className="text-sm font-mono">#{tag}</span>
                    <button
                      onClick={() => copyHashtags([tag])}
                      className="text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Competition */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Shuffle className="text-green-500" size={16} />
                <h4 className="font-semibold text-green-900 dark:text-green-300">Niche/Low Competition</h4>
              </div>
              <p className="text-xs text-green-700 dark:text-green-400 mb-3">Specific hashtags for targeted reach</p>
              <div className="space-y-2">
                {getNicheHashtags().map((tag, index) => (
                  <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
                    <span className="text-sm font-mono">#{tag}</span>
                    <button
                      onClick={() => copyHashtags([tag])}
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">📈 Hashtag Strategy Tips:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Use a mix of high, medium, and low competition hashtags (70% niche, 20% medium, 10% popular)</li>
              <li>• Instagram allows up to 30 hashtags per post - use them all!</li>
              <li>• Place hashtags in your first comment to keep captions clean</li>
              <li>• Research hashtags before using - avoid banned or flagged ones</li>
              <li>• Create branded hashtags for your business or campaign</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashtagGenerator;