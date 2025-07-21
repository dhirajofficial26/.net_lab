import React, { useState } from 'react';
import { Download, ExternalLink, Copy, Check, AlertCircle } from 'lucide-react';

const YouTubeThumbnailDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState('');

  const extractVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setThumbnails([]);

    const extractedId = extractVideoId(url);
    
    if (!extractedId) {
      setError('Please enter a valid YouTube URL');
      setIsLoading(false);
      return;
    }

    setVideoId(extractedId);
    
    // Generate thumbnail URLs
    const thumbnailQualities = [
      { name: 'Max Resolution', url: `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`, size: '1280x720' },
      { name: 'High Quality', url: `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`, size: '480x360' },
      { name: 'Medium Quality', url: `https://img.youtube.com/vi/${extractedId}/mqdefault.jpg`, size: '320x180' },
      { name: 'Standard', url: `https://img.youtube.com/vi/${extractedId}/sddefault.jpg`, size: '640x480' },
      { name: 'Default', url: `https://img.youtube.com/vi/${extractedId}/default.jpg`, size: '120x90' }
    ];

    setTimeout(() => {
      setThumbnails(thumbnailQualities);
      setIsLoading(false);
    }, 1000);
  };

  const downloadThumbnail = async (thumbnailUrl, quality) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(' ', '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">YouTube Thumbnail Downloader</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Download high-quality thumbnails from any YouTube video. Just paste the video URL and get instant access to all thumbnail sizes.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube video URL here... (e.g., https://youtube.com/watch?v=dQw4w9WgXcQ)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !url}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <>
                <div className="spinner inline-block mr-2"></div>
                Loading...
              </>
            ) : (
              'Get Thumbnails'
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-3 flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>

      {/* Results */}
      {thumbnails.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Available Thumbnails</h3>
            <a 
              href={`https://youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
            >
              <ExternalLink size={14} />
              <span>View Video</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnails.map((thumbnail, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="aspect-video bg-gray-200 dark:bg-gray-600 relative overflow-hidden">
                  <img
                    src={thumbnail.url}
                    alt={`${thumbnail.name} thumbnail`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="hidden absolute inset-0 bg-gray-300 dark:bg-gray-600 items-center justify-center"
                  >
                    <span className="text-gray-500 text-sm">Preview not available</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {thumbnail.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {thumbnail.size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadThumbnail(thumbnail.url, thumbnail.name)}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(thumbnail.url)}
                      className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      {copiedUrl === thumbnail.url ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Pro Tips:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Max Resolution (1280x720) is perfect for video covers and social media</li>
              <li>• High Quality (480x360) works great for blog thumbnails</li>
              <li>• All thumbnails are directly from YouTube's servers - no processing needed</li>
              <li>• Right-click and "Save As" is an alternative to the download button</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeThumbnailDownloader;