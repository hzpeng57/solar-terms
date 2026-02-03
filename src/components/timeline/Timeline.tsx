import { motion } from 'framer-motion';
import { solarTerms } from '../../data/solarTerms';
import { TimelineItem } from './TimelineItem';
import { SeasonDivider } from './SeasonDivider';
import type { Season } from '../../data/types';

export const Timeline = () => {
  // Group terms by season with dividers
  const renderTimelineItems = () => {
    const items: React.ReactNode[] = [];
    let currentSeason: Season | null = null;

    solarTerms.forEach((term, index) => {
      // Add season divider when season changes
      if (term.season !== currentSeason) {
        currentSeason = term.season;
        items.push(
          <SeasonDivider key={`season-${term.season}`} season={term.season} />
        );
      }

      // Add timeline item
      items.push(
        <TimelineItem
          key={term.id}
          term={term}
          index={index}
          isLeft={index % 2 === 0}
        />
      );
    });

    return items;
  };

  return (
    <section id="timeline" className="py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-chinese font-bold text-center text-[var(--color-text)] mb-2 md:mb-4"
        >
          时间线
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-center text-[var(--color-text-muted)] mb-8 md:mb-12 max-w-xl mx-auto"
        >
          二十四节气，一年四季的时光轮转
        </motion.p>

        {/* Timeline Container */}
        <div className="relative">
          {/* 水墨渐变竖线 */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-ink)]/30 to-transparent md:-translate-x-1/2" />

          {/* Timeline Items */}
          {renderTimelineItems()}
        </div>
      </div>
    </section>
  );
};
