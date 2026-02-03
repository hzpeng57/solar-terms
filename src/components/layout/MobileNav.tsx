import { motion } from 'framer-motion';
import { seasons } from '../../data/seasons';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import type { Season } from '../../data/types';

interface MobileNavProps {
  onClose: () => void;
  season: Season;
  onSeasonChange: (season: Season) => void;
  isAutoSeason: boolean;
  onAutoSeason: () => void;
}

export const MobileNav = ({
  onClose,
  season,
  onSeasonChange,
  isAutoSeason,
  onAutoSeason,
}: MobileNavProps) => {
  const scrollToSection = useScrollToSection();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 cursor-pointer"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--color-surface)] shadow-xl"
      >
        <div className="p-4">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 mb-8">
            <button
              onClick={() => handleNavClick('hero')}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)] rounded-lg transition-colors cursor-pointer"
            >
              首页
            </button>
            <button
              onClick={() => handleNavClick('wheel')}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)] rounded-lg transition-colors cursor-pointer"
            >
              节气轮
            </button>
            <button
              onClick={() => handleNavClick('timeline')}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)] rounded-lg transition-colors cursor-pointer"
            >
              时间线
            </button>
            <button
              onClick={() => handleNavClick('calendar')}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)] rounded-lg transition-colors cursor-pointer"
            >
              日历
            </button>
          </nav>

          {/* Season Switcher */}
          <div className="border-t border-[var(--color-primary)]/10 pt-6">
            <p className="text-sm text-[var(--color-text-muted)] mb-3">切换季节主题</p>
            <div className="grid grid-cols-2 gap-2">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSeasonChange(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    season === s.id && !isAutoSeason
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-background)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.nameCN}</span>
                </button>
              ))}
            </div>
            <button
              onClick={onAutoSeason}
              className={`w-full mt-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                isAutoSeason
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-background)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10'
              }`}
            >
              🔄 自动（根据当前节气）
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
