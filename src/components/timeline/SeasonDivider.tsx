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
      className="relative flex items-center justify-center py-12"
    >
      {/* Solid background to cover the timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 w-40 h-full bg-[var(--color-background)]" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-primary)]/30" />
        <div className="flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] rounded-full shadow-md border border-[var(--color-primary)]/10">
          <span className="text-2xl">{data.icon}</span>
          <span className="font-chinese text-2xl font-bold text-[var(--color-text)]">
            {data.nameCN}
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">{data.name}</span>
        </div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-primary)]/30" />
      </div>
    </motion.div>
  );
};
