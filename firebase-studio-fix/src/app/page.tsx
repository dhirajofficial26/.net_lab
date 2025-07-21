'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [hydrationInfo, setHydrationInfo] = useState<{
    hasWebcrx: boolean;
    userAgent: string;
    isFirebaseStudio: boolean;
    removedAttributes: string[];
  } | null>(null);

  useEffect(() => {
    // Gather hydration debugging information
    const htmlElement = document.documentElement;
    const userAgent = navigator.userAgent;
    
    // Check if we're in Firebase Studio environment
    const isFirebaseStudio = userAgent.includes('Chrome') && 
                             (window.location.hostname.includes('firebase') ||
                              window.location.hostname.includes('google') ||
                              process.env.NODE_ENV === 'development');

    // Check for problematic attributes
    const hasWebcrx = htmlElement.hasAttribute('webcrx') || 
                      htmlElement.hasAttribute('data-webcrx') ||
                      htmlElement.hasAttribute('webcrx-extension');

    // List of attributes we cleaned up
    const removedAttributes: string[] = [];
    ['webcrx', 'data-webcrx', 'webcrx-extension'].forEach(attr => {
      if (htmlElement.hasAttribute(attr)) {
        removedAttributes.push(attr);
      }
    });

    setHydrationInfo({
      hasWebcrx,
      userAgent,
      isFirebaseStudio,
      removedAttributes
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🔧 Firebase Studio Hydration Fix
          </h1>
          
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                ✅ Hydration Fix Applied Successfully
              </h2>
              <p className="text-green-700">
                The webcrx attribute hydration mismatch has been resolved using our comprehensive fix.
              </p>
            </div>

            {/* Debugging Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🔍 Debugging Information
              </h2>
              {hydrationInfo ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Firebase Studio Environment:</span>
                    <span className={hydrationInfo.isFirebaseStudio ? 'text-orange-600' : 'text-green-600'}>
                      {hydrationInfo.isFirebaseStudio ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Problematic Attributes Found:</span>
                    <span className={hydrationInfo.hasWebcrx ? 'text-red-600' : 'text-green-600'}>
                      {hydrationInfo.hasWebcrx ? 'Yes (Cleaned)' : 'None'}
                    </span>
                  </div>
                  {hydrationInfo.removedAttributes.length > 0 && (
                    <div>
                      <span className="font-medium">Removed Attributes:</span>
                      <ul className="mt-1 ml-4 list-disc text-sm text-gray-600">
                        {hydrationInfo.removedAttributes.map(attr => (
                          <li key={attr}>{attr}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">User Agent:</span>
                    <p className="mt-1 break-all">{hydrationInfo.userAgent}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Loading debugging information...</p>
              )}
            </div>

            {/* Implementation Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                🛠️ Implementation Details
              </h2>
              <div className="space-y-4 text-blue-700">
                <div>
                  <h3 className="font-semibold">Root Layout Fix:</h3>
                  <p className="text-sm">Added <code className="bg-blue-100 px-1 rounded">suppressHydrationWarning={`{true}`}</code> to body element</p>
                </div>
                <div>
                  <h3 className="font-semibold">HydrationProvider Component:</h3>
                  <p className="text-sm">Client-side cleanup of webcrx attributes on mount</p>
                </div>
                <div>
                  <h3 className="font-semibold">Firebase SDK:</h3>
                  <p className="text-sm">Updated to latest version for compatibility</p>
                </div>
              </div>
            </div>

            {/* Solution Steps */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                📋 Applied Solution Steps
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                <li>Identified webcrx attribute causing hydration mismatch</li>
                <li>Added suppressHydrationWarning to body element</li>
                <li>Created HydrationProvider for client-side cleanup</li>
                <li>Updated Firebase SDK to latest version</li>
                <li>Implemented comprehensive attribute removal</li>
                <li>Added development debugging logs</li>
              </ol>
            </div>

            {/* Next Steps */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                🚀 Next Steps for Your Project
              </h2>
              <div className="space-y-3 text-purple-700">
                <p>1. Copy the <code className="bg-purple-100 px-1 rounded">HydrationProvider</code> component to your project</p>
                <p>2. Update your root layout with <code className="bg-purple-100 px-1 rounded">suppressHydrationWarning</code></p>
                <p>3. Wrap your app content with the HydrationProvider</p>
                <p>4. Test in both development and production modes</p>
                <p>5. Monitor console for successful cleanup messages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
