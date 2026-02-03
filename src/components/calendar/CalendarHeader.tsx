import { motion } from 'framer-motion';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      {/* 年月显示 */}
      <div className="flex items-center gap-2 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevMonth}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-[var(--color-primary)]/10 text-[var(--color-text)] transition-colors cursor-pointer"
          aria-label="上个月"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h3 className="font-chinese text-xl md:text-2xl font-bold text-[var(--color-text)] min-w-[140px] md:min-w-[160px] text-center">
          {year}年{month}月
        </h3>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNextMonth}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-[var(--color-primary)]/10 text-[var(--color-text)] transition-colors cursor-pointer"
          aria-label="下个月"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* 快捷按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToday}
        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-lg hover:bg-[var(--color-primary)]/20 transition-colors cursor-pointer"
      >
        今天
      </motion.button>
    </div>
  );
};
