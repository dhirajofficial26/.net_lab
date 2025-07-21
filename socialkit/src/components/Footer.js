import React from 'react';
import { Heart, Github, Twitter, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="logo-gradient w-8 h-8 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={16} />
              </div>
              <h3 className="text-lg font-bold text-gradient">SocialKit</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Free tools for content creators. No API keys, no limits, just results.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com/socialkit" 
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://github.com/socialkit" 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="mailto:hello@socialkit.com" 
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/tool/thumbnail-downloader" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  YouTube Thumbnail Downloader
                </a>
              </li>
              <li>
                <a 
                  href="/tool/hashtag-generator" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Instagram Hashtag Generator
                </a>
              </li>
              <li>
                <a 
                  href="/tool/text-styler" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Text Styler
                </a>
              </li>
              <li>
                <a 
                  href="/tool/emoji-picker" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Emoji Picker
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/blog" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="/tutorials" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="/api" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a 
                  href="/changelog" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2024 SocialKit. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={12} className="text-red-500" />
                <span>for creators</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>v2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;