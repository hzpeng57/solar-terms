import { motion } from 'framer-motion';
import { useCurrentTerm } from '../../hooks/useCurrentTerm';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { formatDate, formatDateCN } from '../../lib/utils';
import { CountdownTimer } from './CountdownTimer';

export const HeroSection = () => {
  const { currentTerm, nextTerm } = useCurrentTerm();
  const scrollToSection = useScrollToSection();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Current Term Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs md:text-sm mb-4 md:mb-8"
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          当前节气
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-chinese text-5xl sm:text-6xl md:text-8xl font-bold text-[var(--color-text)] mb-2 md:mb-4"
        >
          {currentTerm.nameCN}
        </motion.h1>

        {/* Pinyin */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-[var(--color-text-muted)] mb-1 md:mb-2"
        >
          {currentTerm.pinyin}
        </motion.p>

        {/* English Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-[var(--color-text-muted)] mb-4 md:mb-6"
        >
          {currentTerm.name}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm text-[var(--color-text-muted)] mb-6 md:mb-8"
        >
          {formatDateCN(currentTerm.month, currentTerm.day)} · {formatDate(currentTerm.month, currentTerm.day)}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-[var(--color-text)] max-w-2xl mx-auto mb-8 md:mb-12 px-2"
        >
          {currentTerm.descriptionCN}
        </motion.p>

        {/* Countdown Timer */}
        <CountdownTimer nextTerm={nextTerm} />
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('wheel')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
      >
        <span className="text-xs md:text-sm">向下滚动</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
};
