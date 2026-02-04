import { motion } from 'framer-motion';
import type { CalendarDay } from './types';

interface CalendarDayCellProps {
  day: CalendarDay;
  isSelected: boolean;
  onSelect: (day: CalendarDay) => void;
}

export const CalendarDayCell = ({ day, isSelected, onSelect }: CalendarDayCellProps) => {
  const {
    date,
    day: dayNum,
    lunarDay,
    isCurrentMonth,
    isToday,
    jieQi,
    holiday,
    isHoliday,
    isWorkday,
  } = day;

  // 判断是否是周末（0=周日, 6=周六）
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // 判断是否是"休息日"：周末且非调班，或者有节假日放假
  const isRestDay = (isWeekend && !isWorkday) || isHoliday;

  // 节假日名称（只显示放假的，不显示调班）
  const holidayName = holiday && !holiday.isWork ? holiday.name : null;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(day)}
      className={`
        relative w-full aspect-square p-1 md:p-2 flex flex-col items-center justify-center
        rounded-lg transition-colors cursor-pointer
        ${!isCurrentMonth ? 'opacity-30' : ''}
        ${isSelected ? 'bg-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]' : 'hover:bg-[var(--color-primary)]/5'}
        ${isToday && !isSelected ? 'bg-[var(--color-primary)]/5' : ''}
        ${isRestDay && !isSelected && !isToday && isCurrentMonth ? 'bg-[var(--color-primary)]/[0.03]' : ''}
      `}
    >
      {/* 公历日期 */}
      <span
        className={`
          text-sm md:text-base font-medium leading-none
          ${isToday ? 'text-[var(--color-primary)] font-bold' : ''}
          ${!isToday && isRestDay && isCurrentMonth ? 'text-[var(--color-primary)]/70' : ''}
          ${!isToday && !isRestDay && isCurrentMonth ? 'text-[var(--color-text)]' : ''}
          ${!isCurrentMonth ? 'text-[var(--color-text-muted)]' : ''}
        `}
      >
        {dayNum}
      </span>

      {/* 农历/节气 */}
      <span
        className={`
          text-[10px] md:text-xs leading-none mt-0.5 md:mt-1 truncate max-w-full px-0.5
          ${jieQi ? 'text-[var(--color-primary)] font-medium border-b border-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}
        `}
      >
        {jieQi || lunarDay}
      </span>

      {/* 节假日名称 */}
      {holidayName && (
        <span
          className="text-[8px] md:text-[10px] leading-none mt-0.5 truncate max-w-full px-0.5 text-red-500 font-medium"
        >
          {holidayName}
        </span>
      )}

      {/* 休/班标记 */}
      {(isHoliday || isWorkday) && (
        <span
          className={`
            absolute top-0.5 right-0.5 md:top-1 md:right-1
            text-[8px] md:text-[10px] font-bold px-1 rounded
            ${isHoliday ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-100'}
          `}
        >
          {isHoliday ? '休' : '班'}
        </span>
      )}

      {/* 今天标记 */}
      {isToday && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]" />
      )}
    </motion.button>
  );
};
