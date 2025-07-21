import React, { useState } from 'react';
import { Type, Copy, Check, Wand2 } from 'lucide-react';

const TextStyler = () => {
  const [inputText, setInputText] = useState('');
  const [copiedStyle, setCopiedStyle] = useState('');

  const textStyles = [
    {
      name: 'Bold',
      transform: (text) => text.replace(/[A-Za-z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D400); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D41A); // a-z
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7CE); // 0-9
        return char;
      }),
      description: 'Bold mathematical characters'
    },
    {
      name: 'Italic',
      transform: (text) => text.replace(/[A-Za-z]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D434); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D44E); // a-z
        return char;
      }),
      description: 'Italic mathematical characters'
    },
    {
      name: 'Bold Italic',
      transform: (text) => text.replace(/[A-Za-z]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D468); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D482); // a-z
        return char;
      }),
      description: 'Bold italic mathematical characters'
    },
    {
      name: 'Script',
      transform: (text) => text.replace(/[A-Za-z]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D49C); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D4B6); // a-z
        return char;
      }),
      description: 'Elegant script style'
    },
    {
      name: 'Monospace',
      transform: (text) => text.replace(/[A-Za-z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D670); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D68A); // a-z
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7F6); // 0-9
        return char;
      }),
      description: 'Monospaced font style'
    },
    {
      name: 'Double-Struck',
      transform: (text) => text.replace(/[A-Za-z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D538); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D552); // a-z
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7D8); // 0-9
        return char;
      }),
      description: 'Double-struck (blackboard bold)'
    },
    {
      name: 'Sans-Serif',
      transform: (text) => text.replace(/[A-Za-z0-9]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D5A0); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D5BA); // a-z
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7E2); // 0-9
        return char;
      }),
      description: 'Clean sans-serif style'
    },
    {
      name: 'Fraktur',
      transform: (text) => text.replace(/[A-Za-z]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D504); // A-Z
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D51E); // a-z
        return char;
      }),
      description: 'Gothic Fraktur style'
    },
    {
      name: 'Circled',
      transform: (text) => text.replace(/[A-Za-z0-9]/g, (char) => {
        if (char >= 'A' && char <= 'Z') return String.fromCharCode(char.charCodeAt(0) - 65 + 0x24B6);
        if (char >= 'a' && char <= 'z') return String.fromCharCode(char.charCodeAt(0) - 97 + 0x24D0);
        if (char >= '0' && char <= '9') return String.fromCharCode(char.charCodeAt(0) - 48 + 0x2460);
        return char;
      }),
      description: 'Characters in circles'
    },
    {
      name: 'Squared',
      transform: (text) => text.replace(/[A-Za-z]/g, (char) => {
        if (char >= 'A' && char <= 'Z') return String.fromCharCode(char.charCodeAt(0) - 65 + 0x1F130);
        return char;
      }),
      description: 'Squared capital letters'
    },
    {
      name: 'Inverted',
      transform: (text) => {
        const flipped = {
          'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
          'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
          'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
          'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ᖴ',
          'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
          'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴿ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ',
          'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
          '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'",
          '?': '¿', '!': '¡', '"': '„', "'": ',', '`': '‛', '(': ')', ')': '(', '[': ']',
          ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋'
        };
        return text.split('').map(char => flipped[char] || char).reverse().join('');
      }),
      description: 'Upside down text'
    },
    {
      name: 'Small Caps',
      transform: (text) => text.replace(/[a-z]/g, (char) => {
        const smallCaps = {
          'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ',
          'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
          'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
          'y': 'ʏ', 'z': 'ᴢ'
        };
        return smallCaps[char] || char;
      }),
      description: 'Small capital letters'
    }
  ];

  const copyToClipboard = (text, styleName) => {
    navigator.clipboard.writeText(text);
    setCopiedStyle(styleName);
    setTimeout(() => setCopiedStyle(''), 2000);
  };

  const generateAllStyles = () => {
    return textStyles.map(style => ({
      ...style,
      result: style.transform(inputText)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Text Styler</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Transform your text with fancy Unicode styles. Perfect for social media posts, bios, and making your content stand out.
        </p>
      </div>

      {/* Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter your text:
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here... (e.g., Hello World, Your Name, Brand Name)"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
          rows="3"
        />
        {inputText && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} characters • {generateAllStyles().length} styles available
          </p>
        )}
      </div>

      {/* Results */}
      {inputText && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Wand2 className="text-purple-500" size={20} />
            <h3 className="text-xl font-semibold">Styled Text Results</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generateAllStyles().map((style, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
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
                  <p className="text-lg font-mono break-all select-all" style={{ fontFamily: 'monospace' }}>
                    {style.result}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-8">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">✨ Pro Tips:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• These styles work on most social media platforms (Instagram, Twitter, Facebook, etc.)</li>
              <li>• Perfect for creating eye-catching bios, usernames, and post content</li>
              <li>• Some styles may not display correctly on all devices or apps</li>
              <li>• Use sparingly for maximum impact - too much styling can be hard to read</li>
              <li>• Test your styled text on different platforms before publishing</li>
            </ul>
          </div>
        </div>
      )}

      {!inputText && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Type className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start Styling Your Text
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter some text above to see all the available styling options
          </p>
        </div>
      )}
    </div>
  );
};

export default TextStyler;