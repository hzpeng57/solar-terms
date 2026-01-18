import { motion } from 'framer-motion';
import type { SolarTerm } from '../../data/types';
import { useScrollToSection } from '../../hooks/useScrollToSection';

interface TimelineItemProps {
  term: SolarTerm;
  index: number;
  isLeft: boolean;
}

export const TimelineItem = ({ term, isLeft }: TimelineItemProps) => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="relative mb-6 md:mb-8">
      {/* Center Dot - on left for mobile, center for desktop */}
      <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--color-primary)] border-2 md:border-4 border-[var(--color-surface)] shadow-md" />
      </div>

      {/* Content wrapper - always right on mobile, alternating on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`
          pl-10 md:pl-0
          md:flex
          ${isLeft ? 'md:justify-end md:pr-[calc(50%+2rem)]' : 'md:justify-start md:pl-[calc(50%+2rem)]'}
        `}
      >
        {/* Content Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => scrollToSection(`term-${term.id}`)}
          className={`
            w-full max-w-md bg-[var(--color-surface)] rounded-xl p-4 md:p-5 shadow-md border border-[var(--color-primary)]/10 
            cursor-pointer hover:shadow-lg transition-shadow
            text-left md:${isLeft ? 'text-right' : 'text-left'}
          `}
        >
          <div className={`flex items-center gap-2 mb-1 md:mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-xs text-[var(--color-text-muted)]">
              {term.month}月{term.day}日
            </span>
          </div>
          <h3 className="font-chinese text-lg md:text-xl font-bold text-[var(--color-text)] mb-1">
            {term.nameCN}
          </h3>
          <p className="text-xs md:text-sm text-[var(--color-text-muted)] mb-1 md:mb-2">
            {term.pinyin}
          </p>
          <p className="text-xs md:text-sm text-[var(--color-text)] line-clamp-2">
            {term.descriptionCN}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
