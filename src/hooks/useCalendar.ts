import { useState, useMemo, useCallback } from 'react';
import { Solar, HolidayUtil } from 'lunar-typescript';
import type { CalendarDay } from '../components/calendar/types';

export const useCalendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-12

  // 默认选中今天
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(() => {
    return createCalendarDay(today.getFullYear(), today.getMonth() + 1, today.getDate(), true, today);
  });

  // 生成当月日历数据
  const days = useMemo(() => {
    const result: CalendarDay[] = [];

    // 获取当月第一天和最后一天
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    // 获取第一天是星期几（0=周日）
    const startDayOfWeek = firstDayOfMonth.getDay();

    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

    // 填充上个月的日期
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      result.push(createCalendarDay(prevYear, prevMonth, day, false, today));
    }

    // 填充当月日期
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      result.push(createCalendarDay(year, month, day, true, today));
    }

    // 填充下个月的日期（补满6行）
    const remainingDays = 42 - result.length; // 6行 x 7列 = 42
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      result.push(createCalendarDay(nextYear, nextMonth, day, false, today));
    }

    return result;
  }, [year, month]);

  // 上个月
  const goToPrevMonth = useCallback(() => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    setSelectedDay(null);
  }, [year, month]);

  // 下个月
  const goToNextMonth = useCallback(() => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDay(null);
  }, [year, month]);

  // 回到今天
  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setSelectedDay(createCalendarDay(today.getFullYear(), today.getMonth() + 1, today.getDate(), true, today));
  }, []);

  // 选择日期
  const selectDay = useCallback((day: CalendarDay) => {
    setSelectedDay(day);
  }, []);

  return {
    year,
    month,
    days,
    selectedDay,
    selectDay,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
};

// 创建单个日期的数据
function createCalendarDay(
  year: number,
  month: number,
  day: number,
  isCurrentMonth: boolean,
  today: Date
): CalendarDay {
  const date = new Date(year, month - 1, day);
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();

  // 获取节气（通过 Lunar 对象获取）
  const jieQi = lunar.getJieQi();

  // 获取节假日信息
  const holidayInfo = HolidayUtil.getHoliday(year, month, day);

  // 判断是否是今天
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  // 农历日期显示
  const lunarDay = lunar.getDayInChinese();
  const lunarMonth = lunar.getMonthInChinese() + '月';

  // 判断节假日和调休
  let isHoliday = false;
  let isWorkday = false;
  let holiday: { name: string; isWork: boolean } | null = null;

  if (holidayInfo) {
    holiday = {
      name: holidayInfo.getName(),
      isWork: holidayInfo.isWork(),
    };
    isHoliday = !holidayInfo.isWork();
    isWorkday = holidayInfo.isWork();
  }

  return {
    date,
    year,
    month,
    day,
    solar,
    lunar,
    lunarDay,
    lunarMonth,
    isCurrentMonth,
    isToday,
    jieQi: jieQi || null,
    holiday,
    isHoliday,
    isWorkday,
  };
}
