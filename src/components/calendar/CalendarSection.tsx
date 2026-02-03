import { motion } from 'framer-motion';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarDetail } from './CalendarDetail';

export const CalendarSection = () => {
  const {
    year,
    month,
    days,
    selectedDay,
    selectDay,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  return (
    <section id="calendar" className="py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-chinese font-bold text-[var(--color-text)] mb-2 md:mb-4">
            节气日历
          </h2>
          <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-xl mx-auto">
            二十四节气与传统节日，感受四季更迭的时光韵律
          </p>
        </motion.div>

        {/* 日历主体 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* 日历卡片 */}
          <div className="chinese-card p-4 md:p-6 flex-1">
            <CalendarHeader
              year={year}
              month={month}
              onPrevMonth={goToPrevMonth}
              onNextMonth={goToNextMonth}
              onToday={goToToday}
            />
            <CalendarGrid
              days={days}
              selectedDay={selectedDay}
              onSelectDay={selectDay}
            />
          </div>

          {/* 详情卡片 - 桌面端常显，移动端按需显示 */}
          <div className="lg:w-80">
            {/* 移动端：选中时显示 */}
            <div className="lg:hidden">
              {selectedDay && (
                <CalendarDetail day={selectedDay} onClose={() => selectDay(selectedDay)} />
              )}
            </div>

            {/* 桌面端：常显 */}
            <div className="hidden lg:block">
              {selectedDay ? (
                <CalendarDetail day={selectedDay} onClose={() => {}} />
              ) : (
                <div className="chinese-card p-5 text-center">
                  <p className="text-[var(--color-text-muted)] text-sm">
                    点击日期查看详情
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 图例 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-[var(--color-text-muted)]"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <span>今天</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-primary)] border-b border-[var(--color-primary)]">节气</span>
            <span>节气</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1 text-[10px] font-bold text-red-500 bg-red-50 rounded">休</span>
            <span>放假</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1 text-[10px] font-bold text-gray-500 bg-gray-100 rounded">班</span>
            <span>调休</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
