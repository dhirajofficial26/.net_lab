import React, { useState } from 'react';
import { Type, Copy, Check, RotateCcw } from 'lucide-react';

const TitleCapitalizer = () => {
  const [inputText, setInputText] = useState('');
  const [copiedStyle, setCopiedStyle] = useState('');

  const capitalizationStyles = [
    {
      name: 'Title Case',
      transform: (text) => {
        const exceptions = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
        return text.toLowerCase().split(' ').map((word, index) => {
          if (index === 0 || !exceptions.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        }).join(' ');
      },
      description: 'Capitalize major words (The Quick Brown Fox)'
    },
    {
      name: 'Sentence Case',
      transform: (text) => {
        return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (match) => match.toUpperCase());
      },
      description: 'Capitalize first word of sentences (The quick brown fox)'
    },
    {
      name: 'UPPER CASE',
      transform: (text) => text.toUpperCase(),
      description: 'All letters uppercase (THE QUICK BROWN FOX)'
    },
    {
      name: 'lower case',
      transform: (text) => text.toLowerCase(),
      description: 'All letters lowercase (the quick brown fox)'
    },
    {
      name: 'Proper Case',
      transform: (text) => {
        return text.toLowerCase().split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      },
      description: 'Capitalize every word (The Quick Brown Fox)'
    },
    {
      name: 'camelCase',
      transform: (text) => {
        const words = text.toLowerCase().split(' ');
        return words[0] + words.slice(1).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
      },
      description: 'First word lowercase, others capitalized (theQuickBrownFox)'
    },
    {
      name: 'PascalCase',
      transform: (text) => {
        return text.toLowerCase().split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
      },
      description: 'All words capitalized, no spaces (TheQuickBrownFox)'
    },
    {
      name: 'kebab-case',
      transform: (text) => text.toLowerCase().replace(/\s+/g, '-'),
      description: 'Lowercase with hyphens (the-quick-brown-fox)'
    },
    {
      name: 'snake_case',
      transform: (text) => text.toLowerCase().replace(/\s+/g, '_'),
      description: 'Lowercase with underscores (the_quick_brown_fox)'
    },
    {
      name: 'CONSTANT_CASE',
      transform: (text) => text.toUpperCase().replace(/\s+/g, '_'),
      description: 'Uppercase with underscores (THE_QUICK_BROWN_FOX)'
    },
    {
      name: 'dot.case',
      transform: (text) => text.toLowerCase().replace(/\s+/g, '.'),
      description: 'Lowercase with dots (the.quick.brown.fox)'
    },
    {
      name: 'AlTeRnAtInG cAsE',
      transform: (text) => {
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      },
      description: 'Alternating uppercase and lowercase (ThE qUiCk BrOwN fOx)'
    }
  ];

  const copyToClipboard = (text, styleName) => {
    navigator.clipboard.writeText(text);
    setCopiedStyle(styleName);
    setTimeout(() => setCopiedStyle(''), 2000);
  };

  const clearText = () => {
    setInputText('');
  };

  const generateAllStyles = () => {
    return capitalizationStyles.map(style => ({
      ...style,
      result: style.transform(inputText)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Title Capitalizer</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Format your text in different capitalization styles. Perfect for titles, headings, usernames, and various text formatting needs.
        </p>
      </div>

      {/* Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter your text:
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here... (e.g., the quick brown fox jumps over the lazy dog)"
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            rows="3"
          />
          {inputText && (
            <button
              onClick={clearText}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Clear text"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
        {inputText && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} characters • {inputText.split(' ').length} words • {generateAllStyles().length} styles available
          </p>
        )}
      </div>

      {/* Quick Examples */}
      {!inputText && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Examples:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'the quick brown fox',
              'hello world',
              'social media marketing',
              'content creator tools',
              'youtube video title'
            ].map(example => (
              <button
                key={example}
                onClick={() => setInputText(example)}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {inputText && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Type className="text-purple-500" size={20} />
            <h3 className="text-xl font-semibold">Capitalization Results</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generateAllStyles().map((style, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {style.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(style.result, style.name)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    {copiedStyle === style.name ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedStyle === style.name ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <p className="font-mono text-sm break-all select-all">
                    {style.result}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Copy All Button */}
          <div className="text-center">
            <button
              onClick={() => {
                const allResults = generateAllStyles().map(style => 
                  `${style.name}: ${style.result}`
                ).join('\n');
                copyToClipboard(allResults, 'all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {copiedStyle === 'all' ? 'All Styles Copied!' : 'Copy All Styles'}
            </button>
          </div>

          {/* Use Cases */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Use Cases:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
              <div>
                <h5 className="font-medium mb-1">Content Creation:</h5>
                <ul className="space-y-1">
                  <li>• Title Case: Blog titles, headlines</li>
                  <li>• Sentence Case: Social media posts</li>
                  <li>• UPPER CASE: Attention-grabbing text</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-1">Programming:</h5>
                <ul className="space-y-1">
                  <li>• camelCase: JavaScript variables</li>
                  <li>• PascalCase: Class names</li>
                  <li>• snake_case: Python variables</li>
                  <li>• kebab-case: CSS classes, URLs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!inputText && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Type className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start Formatting Your Text
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter some text above to see all the available capitalization options
          </p>
        </div>
      )}
    </div>
  );
};

export default TitleCapitalizer;