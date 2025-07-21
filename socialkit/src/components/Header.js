import React, { useContext } from 'react';
import { Sun, Moon, User, LogOut, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('socialkit_email') || 'user@example.com';

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="logo-gradient w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">
              SocialKit
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Free Creator Tools
            </p>
          </div>
          <span className="hidden md:inline text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
            100% Free
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* AdSense Slot - Top */}
          <div className="hidden lg:block">
            <div id="adsense-slot-1" className="w-72 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                📢 AdSense Banner (728x90)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus-ring"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              data-tooltip={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium truncate max-w-32">
                    {userEmail}
                  </span>
                </div>
                <button 
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 focus-ring"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 focus-ring"
              >
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;