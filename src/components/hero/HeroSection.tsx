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
      {/* 水墨山水背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 水墨晕染效果 - 更明显 */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 10% 0%, var(--color-ink) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 90% 10%, var(--color-ink) 0%, transparent 40%),
              radial-gradient(ellipse 120% 40% at 50% 100%, var(--color-ink) 0%, transparent 35%)
            `,
            opacity: 0.08,
          }}
        />

        {/* 山水剪影 - 底部 */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-64 md:h-80"
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 0.06 }}
        >
          <path
            d="M0,300 L0,200 Q100,150 200,180 Q350,100 500,160 Q600,120 700,150 Q850,80 950,140 Q1050,100 1150,130 L1200,120 L1200,300 Z"
            fill="var(--color-ink)"
          />
          <path
            d="M0,300 L0,240 Q150,200 300,220 Q450,180 600,210 Q750,170 900,200 Q1050,160 1200,190 L1200,300 Z"
            fill="var(--color-ink)"
            opacity="0.5"
          />
        </svg>

        {/* 云纹装饰 */}
        <svg className="absolute top-20 left-0 right-0 w-full h-40 opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="cloud-hero" x="0" y="0" width="300" height="80" patternUnits="userSpaceOnUse">
              <path d="M0,40 Q30,20 60,40 Q90,15 120,40 Q150,10 180,40 Q210,20 240,40 Q270,15 300,40" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-hero)" />
        </svg>

        {/* 装饰性圆形 - 日/月 */}
        <div
          className="absolute top-32 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[var(--color-primary)]/20"
          style={{
            background: `radial-gradient(circle at 30% 30%, var(--color-primary), transparent 70%)`,
            opacity: 0.15,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 印章风格当前节气标识 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-6 md:mb-10"
        >
          <div className="seal-box px-3 py-1.5 text-sm md:text-base">
            当前节气
          </div>
        </motion.div>

        {/* Main Title - 更大更突出 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-chinese text-6xl sm:text-7xl md:text-9xl font-bold text-[var(--color-text)] mb-4 md:mb-6 tracking-wider"
        >
          {currentTerm.nameCN}
        </motion.h1>

        {/* 装饰性横线 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 md:w-48 h-px mx-auto mb-4 md:mb-6 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
        />

        {/* Pinyin & English */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-[var(--color-text-muted)] mb-1 md:mb-2"
        >
          {currentTerm.pinyin}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Description - 带引号装饰 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto mb-8 md:mb-12 px-6 md:px-8"
        >
          <span className="absolute -left-2 md:left-0 top-0 font-chinese text-4xl md:text-5xl text-[var(--color-primary)]/20 leading-none">"</span>
          <p className="text-base md:text-xl text-[var(--color-text)] leading-relaxed">
            {currentTerm.descriptionCN}
          </p>
          <span className="absolute -right-2 md:right-0 bottom-0 font-chinese text-4xl md:text-5xl text-[var(--color-primary)]/20 leading-none">"</span>
        </motion.div>

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
