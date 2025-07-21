import React, { useState } from 'react';
import { Shuffle, Copy, Check, Lightbulb, TrendingUp } from 'lucide-react';

const TitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState('');

  const titleTemplates = {
    howTo: [
      'How to {topic} in {time}',
      'The Ultimate Guide to {topic}',
      '{number} Ways to {topic} Like a Pro',
      'Master {topic} With This Simple Trick',
      'How to {topic} (Even if You\'re a Beginner)',
      'The Secret to {topic} That Nobody Tells You',
      'Learn {topic} in {time} (Step by Step)',
      'How I Learned {topic} in {time}',
      'The Complete {topic} Tutorial for Beginners'
    ],
    listicle: [
      '{number} {topic} Tips That Will Change Your Life',
      '{number} Mistakes Everyone Makes With {topic}',
      'Top {number} {topic} Secrets Revealed',
      '{number} {topic} Hacks You Need to Know',
      '{number} Reasons Why {topic} Is Important',
      'The {number} Best {topic} Strategies',
      '{number} {topic} Facts That Will Surprise You',
      '{number} Signs You\'re Ready for {topic}',
      '{number} {topic} Myths Debunked'
    ],
    clickbait: [
      'You Won\'t Believe What Happened When I Tried {topic}',
      'This {topic} Trick Will Blow Your Mind',
      'I Tried {topic} For {time} and Here\'s What Happened',
      'The {topic} Method That\'s Taking Over {platform}',
      'Why Everyone\'s Talking About {topic} Right Now',
      'This Changes Everything About {topic}',
      'The {topic} Secret That Experts Don\'t Want You to Know',
      'What They Don\'t Tell You About {topic}',
      'The Shocking Truth About {topic}'
    ],
    question: [
      'Is {topic} Worth It in {year}?',
      'What\'s the Best Way to {topic}?',
      'Should You Try {topic}?',
      'Can You Really {topic} in {time}?',
      'What Happens When You {topic}?',
      'Why Is {topic} So Popular?',
      'Is {topic} Dead? The Truth Revealed',
      'What\'s Wrong With {topic}?',
      'How Much Does {topic} Really Cost?'
    ],
    comparison: [
      '{topic} vs {alternative}: Which Is Better?',
      '{topic} vs {alternative}: The Ultimate Comparison',
      'Why I Switched From {alternative} to {topic}',
      '{topic} or {alternative}? Here\'s My Choice',
      'The Battle: {topic} vs {alternative}',
      '{topic} vs {alternative}: Pros and Cons',
      'Comparing {topic} and {alternative} in {year}',
      '{topic} vs {alternative}: My Honest Review',
      'Which Is Better: {topic} or {alternative}?'
    ],
    review: [
      '{topic} Review: Is It Worth Your Money?',
      'My Honest {topic} Review After {time}',
      '{topic} Review: The Good, Bad, and Ugly',
      'I Used {topic} for {time} - Here\'s My Review',
      '{topic} Review: Don\'t Buy Until You Watch This',
      'The Truth About {topic} - My Full Review',
      '{topic} Review: {year} Edition',
      'Is {topic} a Scam? My Honest Review',
      '{topic} Review: Worth the Hype?'
    ]
  };

  const generateTitles = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const generatedTitles = [];
      const currentYear = new Date().getFullYear();
      const times = ['30 days', '1 week', '24 hours', '30 minutes', '1 hour', '3 months'];
      const numbers = ['5', '7', '10', '15', '20'];
      const platforms = ['YouTube', 'TikTok', 'Instagram', 'Twitter'];
      const alternatives = ['traditional methods', 'the old way', 'expensive alternatives', 'complicated solutions'];

      // Get all template categories
      Object.values(titleTemplates).forEach(categoryTemplates => {
        // Pick 2-3 random templates from each category
        const shuffled = [...categoryTemplates].sort(() => 0.5 - Math.random());
        shuffled.slice(0, 2).forEach(template => {
          let title = template
            .replace(/{topic}/g, topic)
            .replace(/{time}/g, times[Math.floor(Math.random() * times.length)])
            .replace(/{number}/g, numbers[Math.floor(Math.random() * numbers.length)])
            .replace(/{year}/g, currentYear.toString())
            .replace(/{platform}/g, platforms[Math.floor(Math.random() * platforms.length)])
            .replace(/{alternative}/g, alternatives[Math.floor(Math.random() * alternatives.length)]);
          
          generatedTitles.push(title);
        });
      });

      // Shuffle and limit to 12 titles
      const finalTitles = generatedTitles.sort(() => 0.5 - Math.random()).slice(0, 12);
      setTitles(finalTitles);
      setIsLoading(false);
    }, 1500);
  };

  const copyTitle = (title) => {
    navigator.clipboard.writeText(title);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(''), 2000);
  };

  const regenerateTitles = () => {
    if (topic) {
      generateTitles();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">YouTube Title Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate catchy, SEO-optimized video titles that get clicks. Enter your video topic and get 12 engaging title ideas instantly.
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
              placeholder="Enter your video topic (e.g., cooking, fitness, travel, tech review...)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && topic && generateTitles()}
            />
          </div>
          <button
            onClick={generateTitles}
            disabled={isLoading || !topic}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <>
                <div className="spinner inline-block mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="inline-block mr-2" size={16} />
                Generate Titles
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Topic Buttons */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'cooking recipe', 'fitness workout', 'tech review', 'travel vlog', 
            'makeup tutorial', 'gaming tips', 'business advice', 'music cover',
            'diy project', 'productivity hacks', 'investing guide', 'photography tips'
          ].map(quickTopic => (
            <button
              key={quickTopic}
              onClick={() => {
                setTopic(quickTopic);
                setTimeout(() => generateTitles(), 100);
              }}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {quickTopic}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {titles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Generated Titles</h3>
            <button
              onClick={regenerateTitles}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Shuffle size={16} />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {titles.map((title, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {title}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <TrendingUp size={14} />
                        <span>High CTR Potential</span>
                      </span>
                      <span>{title.length} characters</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyTitle(title)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    {copiedTitle === title ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedTitle === title ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Copy All Button */}
          <div className="text-center">
            <button
              onClick={() => {
                const allTitles = titles.join('\n');
                copyTitle(allTitles);
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg hover:from-red-700 hover:to-orange-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Copy All Titles
            </button>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">🎯 Title Optimization Tips:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Keep titles under 60 characters for better visibility in search results</li>
              <li>• Use numbers and specific details to increase click-through rates</li>
              <li>• Include your main keyword at the beginning of the title</li>
              <li>• Create curiosity with words like "secret", "revealed", "surprising"</li>
              <li>• A/B test different titles to see which performs better</li>
              <li>• Avoid clickbait that doesn't deliver on the promise</li>
            </ul>
          </div>

          {/* Title Categories */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">📊 Title Categories Used:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-600 dark:text-green-400">How-To:</span>
                <p className="text-gray-600 dark:text-gray-400">Educational content</p>
              </div>
              <div>
                <span className="font-medium text-blue-600 dark:text-blue-400">Listicles:</span>
                <p className="text-gray-600 dark:text-gray-400">Number-based titles</p>
              </div>
              <div>
                <span className="font-medium text-purple-600 dark:text-purple-400">Questions:</span>
                <p className="text-gray-600 dark:text-gray-400">Curiosity-driven</p>
              </div>
              <div>
                <span className="font-medium text-red-600 dark:text-red-400">Reviews:</span>
                <p className="text-gray-600 dark:text-gray-400">Product/service reviews</p>
              </div>
              <div>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">Comparisons:</span>
                <p className="text-gray-600 dark:text-gray-400">Versus content</p>
              </div>
              <div>
                <span className="font-medium text-orange-600 dark:text-orange-400">Clickbait:</span>
                <p className="text-gray-600 dark:text-gray-400">High engagement</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleGenerator;