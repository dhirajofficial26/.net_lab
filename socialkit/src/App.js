import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ToolPage from './pages/ToolPage';
import Footer from './components/Footer';
import ThemeContext from './context/ThemeContext';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('socialkit_token');
    if (token) {
      setIsLoggedIn(true);
    }
    
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('socialkit_darkmode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('socialkit_darkmode', JSON.stringify(newDarkMode));
  };

  const handleLogin = (email) => {
    localStorage.setItem('socialkit_token', 'dummy_token_' + Date.now());
    localStorage.setItem('socialkit_email', email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('socialkit_token');
    localStorage.removeItem('socialkit_email');
    setIsLoggedIn(false);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <Router>
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-4 md:p-6 lg:p-8 ml-0 md:ml-64">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/tool/:toolId" element={<ToolPage />} />
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </Router>
        </div>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;