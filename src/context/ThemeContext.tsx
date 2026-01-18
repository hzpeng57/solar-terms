import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Season } from '../data/types';
import { getCurrentSeason } from '../lib/utils';

interface ThemeContextType {
  season: Season;
  setSeason: (season: Season) => void;
  isAutoSeason: boolean;
  setIsAutoSeason: (auto: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [season, setSeason] = useState<Season>(() => getCurrentSeason());
  const [isAutoSeason, setIsAutoSeason] = useState(true);

  useEffect(() => {
    if (isAutoSeason) {
      setSeason(getCurrentSeason());
    }
  }, [isAutoSeason]);

  useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
  }, [season]);

  return (
    <ThemeContext.Provider value={{ season, setSeason, isAutoSeason, setIsAutoSeason }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
