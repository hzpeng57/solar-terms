import { motion } from 'framer-motion';
import type { Season } from '../../data/types';

interface SeasonDividerProps {
  season: Season;
}

const seasonData: Record<Season, { name: string; nameCN: string; icon: string }> = {
  spring: { name: 'Spring', nameCN: '春', icon: '🌸' },
  summer: { name: 'Summer', nameCN: '夏', icon: '☀️' },
  autumn: { name: 'Autumn', nameCN: '秋', icon: '🍂' },
  winter: { name: 'Winter', nameCN: '冬', icon: '❄️' },
};

export const SeasonDivider = ({ season }: SeasonDividerProps) => {
  const data = seasonData[season];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex items-center py-6 md:py-12 pl-10 md:pl-0 md:justify-center"
    >
      {/* Solid background to cover the timeline - left on mobile, center on desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-40 h-full bg-[var(--color-background)]" />
      <div className="md:hidden absolute left-0 w-20 h-full bg-[var(--color-background)]" />
      
      <div className="relative z-10 flex items-center gap-2 md:gap-4">
        <div className="hidden md:block h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-primary)]/30" />
        <div className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[var(--color-surface)] rounded-full shadow-md border border-[var(--color-primary)]/10">
          <span className="text-xl md:text-2xl">{data.icon}</span>
          <span className="font-chinese text-xl md:text-2xl font-bold text-[var(--color-text)]">
            {data.nameCN}
          </span>
          <span className="text-xs md:text-sm text-[var(--color-text-muted)]">{data.name}</span>
        </div>
        <div className="hidden md:block h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-primary)]/30" />
      </div>
    </motion.div>
  );
};
