export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SolarTerm {
  id: string;
  name: string;
  nameCN: string;
  pinyin: string;
  season: Season;
  month: number;
  day: number;
  description: string;
  descriptionCN: string;
  customs: string[];
  customsCN: string[];
  foods: string[];
  foodsCN: string[];
  poem: {
    title: string;
    titleCN: string;
    author: string;
    authorCN: string;
    content: string[];
    contentCN: string[];
  };
  characteristics: string[];
  characteristicsCN: string[];
}

export interface SeasonConfig {
  id: Season;
  name: string;
  nameCN: string;
  startTermIndex: number;
  endTermIndex: number;
  icon: string;
}
