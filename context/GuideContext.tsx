'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GuideContextType {
  isOpen: boolean;
  openGuide: () => void;
  closeGuide: () => void;
}

const GuideContext = createContext<GuideContextType>({
  isOpen: false,
  openGuide: () => {},
  closeGuide: () => {},
});

export function GuideProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has visited before
    if (typeof window !== 'undefined') {
      const hasSeen = localStorage.getItem('kazcut_guide_seen');
      if (!hasSeen) {
        // Automatically open the guide on first visit after page mounts
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const openGuide = () => {
    setIsOpen(true);
  };

  const closeGuide = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kazcut_guide_seen', 'true');
    }
    setIsOpen(false);
  };

  return (
    <GuideContext.Provider value={{ isOpen, openGuide, closeGuide }}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuide() {
  return useContext(GuideContext);
}

