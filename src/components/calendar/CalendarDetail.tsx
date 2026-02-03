import { motion, AnimatePresence } from 'framer-motion';
import type { CalendarDay } from './types';
import { solarTerms } from '../../data/solarTerms';
import { useTermModal } from '../../context/TermModalContext';

interface CalendarDetailProps {
  day: CalendarDay | null;
  onClose: () => void;
}

export const CalendarDetail = ({ day, onClose }: CalendarDetailProps) => {
  const { openTerm } = useTermModal();

  if (!day) return null;

  const { year, month, day: dayNum, lunarMonth, lunarDay, jieQi, holiday, isHoliday } = day;

  // 如果是节气，获取节气详情
  const termData = jieQi ? solarTerms.find((t) => t.nameCN === jieQi) : null;

  const handleViewTermDetail = () => {
    if (termData) {
      openTerm(termData.id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="chinese-card p-4 md:p-5 mt-4 md:mt-0"
      >
        {/* 头部 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-chinese text-lg md:text-xl font-bold text-[var(--color-text)]">
              {month}月{dayNum}日
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              {lunarMonth}{lunarDay} · {year}年
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--color-primary)]/10 rounded transition-colors cursor-pointer md:hidden"
            aria-label="关闭"
          >
            <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 节假日信息 */}
        {holiday && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span
                className={`
                  px-2 py-0.5 text-xs font-bold rounded
                  ${isHoliday ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-200'}
                `}
              >
                {isHoliday ? '休' : '班'}
              </span>
              <span className="font-medium text-[var(--color-text)]">{holiday.name}</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {isHoliday ? '法定节假日' : '调休上班'}
            </p>
          </div>
        )}

        {/* 节气信息 */}
        {jieQi && termData && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="seal-box text-xs">节气</span>
              <span className="font-chinese text-lg font-bold text-[var(--color-primary)]">{jieQi}</span>
              <span className="text-sm text-[var(--color-text-muted)]">{termData.pinyin}</span>
            </div>

            {/* 节气描述 */}
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              {termData.descriptionCN}
            </p>

            {/* 三候 */}
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1.5">三候</p>
              <div className="flex flex-wrap gap-1.5">
                {termData.characteristicsCN.map((char, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* 诗词 */}
            <div className="pt-2 border-t border-[var(--color-border)]">
              <p className="font-chinese text-sm text-[var(--color-text)] leading-relaxed">
                {termData.poem.contentCN.slice(0, 2).join('')}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                —— {termData.poem.authorCN}《{termData.poem.titleCN}》
              </p>
            </div>

            {/* 查看详情按钮 */}
            <button
              onClick={handleViewTermDetail}
              className="w-full mt-3 py-2 bg-[var(--color-primary)] text-white rounded text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              查看详情
            </button>
          </div>
        )}

        {/* 普通日期（无节气无节日） */}
        {!jieQi && !holiday && (
          <p className="text-sm text-[var(--color-text-muted)]">
            农历{lunarMonth}{lunarDay}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
