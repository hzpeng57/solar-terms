import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { seasons } from '../../data/seasons';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { MobileNav } from './MobileNav';

export const Header = () => {
  const { season, setSeason, isAutoSeason, setIsAutoSeason } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  const handleSeasonChange = (newSeason: typeof season) => {
    setIsAutoSeason(false);
    setSeason(newSeason);
  };

  const handleAutoSeason = () => {
    setIsAutoSeason(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[var(--color-primary)]/40 after:to-transparent"
        style={{ height: 'var(--header-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-chinese text-xl font-semibold text-[var(--color-text)] cursor-pointer hover:text-[var(--color-primary)] transition-colors"
          >
            二十四节气
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('wheel')}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              节气轮
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              时间线
            </button>
            
            {/* Season Switcher */}
            <div className="flex items-center gap-1 ml-4 p-1 bg-[var(--color-background)] rounded-full">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSeasonChange(s.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    season === s.id && !isAutoSeason
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.nameCN}</span>
                </button>
              ))}
              <button
                onClick={handleAutoSeason}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isAutoSeason
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                自动
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-[var(--color-text)] cursor-pointer"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            onClose={() => setIsMobileMenuOpen(false)}
            season={season}
            onSeasonChange={handleSeasonChange}
            isAutoSeason={isAutoSeason}
            onAutoSeason={handleAutoSeason}
          />
        )}
      </AnimatePresence>
    </>
  );
};
