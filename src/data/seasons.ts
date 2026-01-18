import type { SeasonConfig } from './types';

export const seasons: SeasonConfig[] = [
  {
    id: 'spring',
    name: 'Spring',
    nameCN: '春',
    startTermIndex: 0,
    endTermIndex: 5,
    icon: '🌸',
  },
  {
    id: 'summer',
    name: 'Summer',
    nameCN: '夏',
    startTermIndex: 6,
    endTermIndex: 11,
    icon: '☀️',
  },
  {
    id: 'autumn',
    name: 'Autumn',
    nameCN: '秋',
    startTermIndex: 12,
    endTermIndex: 17,
    icon: '🍂',
  },
  {
    id: 'winter',
    name: 'Winter',
    nameCN: '冬',
    startTermIndex: 18,
    endTermIndex: 23,
    icon: '❄️',
  },
];

export const getSeasonByIndex = (termIndex: number): SeasonConfig => {
  return seasons.find(
    (s) => termIndex >= s.startTermIndex && termIndex <= s.endTermIndex
  ) || seasons[0];
};
