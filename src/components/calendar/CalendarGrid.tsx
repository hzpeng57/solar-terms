import { CalendarDayCell } from './CalendarDayCell';
import type { CalendarDay } from './types';

interface CalendarGridProps {
  days: CalendarDay[];
  selectedDay: CalendarDay | null;
  onSelectDay: (day: CalendarDay) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const CalendarGrid = ({ days, selectedDay, onSelectDay }: CalendarGridProps) => {
  return (
    <div className="w-full">
      {/* 星期表头 */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`
              text-center text-xs md:text-sm font-medium py-2
              ${index === 0 || index === 6 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {days.map((day, index) => (
          <CalendarDayCell
            key={`${day.year}-${day.month}-${day.day}-${index}`}
            day={day}
            isSelected={
              selectedDay?.year === day.year &&
              selectedDay?.month === day.month &&
              selectedDay?.day === day.day
            }
            onSelect={onSelectDay}
          />
        ))}
      </div>
    </div>
  );
};
