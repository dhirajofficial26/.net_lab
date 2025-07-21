'use client';

import { useEffect, ReactNode } from 'react';

interface HydrationProviderProps {
  children: ReactNode;
}

export function HydrationProvider({ children }: HydrationProviderProps) {
  useEffect(() => {
    // Client-side only: Remove problematic attributes that cause hydration mismatch
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      
      // Remove the webcrx attribute that causes hydration mismatch in Firebase Studio
      htmlElement.removeAttribute('webcrx');
      
      // Also remove other potential problematic attributes from browser extensions
      htmlElement.removeAttribute('data-webcrx');
      htmlElement.removeAttribute('webcrx-extension');
      
      // Log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Firebase Studio Hydration Fix: Cleaned up problematic attributes');
      }
    }
  }, []);

  return <>{children}</>;
}