import type { Solar, Lunar } from 'lunar-typescript';

export interface CalendarDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  solar: Solar;
  lunar: Lunar;
  lunarDay: string;
  lunarMonth: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  jieQi: string | null;
  holiday: {
    name: string;
    isWork: boolean;
  } | null;
  isHoliday: boolean;
  isWorkday: boolean;
}

export interface CalendarState {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDay: CalendarDay | null;
}
