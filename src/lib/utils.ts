import { solarTerms } from '../data/solarTerms';
import type { Season, SolarTerm } from '../data/types';

// Solar term approximate dates - handle year boundaries correctly
const getSolarTermDate = (term: SolarTerm, year: number): Date => {
  return new Date(year, term.month - 1, term.day);
};

export const getCurrentSolarTerm = (): SolarTerm => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // For January dates, we need to check winter terms (小寒, 大寒) first
  // 小寒 is around Jan 6, 大寒 is around Jan 20
  if (month === 1) {
    const xiaohan = solarTerms.find(t => t.id === 'xiaohan')!; // 小寒 Jan 6
    const dahan = solarTerms.find(t => t.id === 'dahan')!; // 大寒 Jan 20
    
    if (day < xiaohan.day) {
      // Before 小寒, still in 大寒 of previous cycle (冬至 -> 小寒)
      return solarTerms.find(t => t.id === 'dongzhi')!; // 冬至
    } else if (day < dahan.day) {
      // Between 小寒 and 大寒
      return xiaohan;
    } else {
      // After 大寒, before 立春
      return dahan;
    }
  }
  
  // For February, check if before or after 立春
  if (month === 2) {
    const lichun = solarTerms.find(t => t.id === 'lichun')!;
    const yushui = solarTerms.find(t => t.id === 'yushui')!;
    
    if (day < lichun.day) {
      return solarTerms.find(t => t.id === 'dahan')!; // Still in 大寒
    } else if (day < yushui.day) {
      return lichun;
    }
  }

  // For other months, iterate through terms in order
  for (let i = 0; i < solarTerms.length; i++) {
    const currentTerm = solarTerms[i];
    const nextTerm = solarTerms[(i + 1) % solarTerms.length];
    
    // Skip January terms here (handled above)
    if (currentTerm.month === 1) continue;
    
    if (currentTerm.month === month) {
      if (day >= currentTerm.day) {
        // Check if we're still in this term or moved to next
        if (nextTerm.month === month && day >= nextTerm.day) {
          continue; // Move to next term
        }
        if (nextTerm.month === month + 1 || (month === 12 && nextTerm.month === 1)) {
          return currentTerm;
        }
        if (nextTerm.month === month && day < nextTerm.day) {
          return currentTerm;
        }
      }
    }
  }

  // Fallback: find the term by checking ranges more carefully
  for (let i = 0; i < solarTerms.length; i++) {
    const term = solarTerms[i];
    const nextTerm = solarTerms[(i + 1) % solarTerms.length];
    
    const termDate = getSolarTermDate(term, year);
    let nextTermDate = getSolarTermDate(nextTerm, year);
    
    // Handle year boundary
    if (nextTerm.month < term.month) {
      nextTermDate = getSolarTermDate(nextTerm, year + 1);
    }
    
    if (now >= termDate && now < nextTermDate) {
      return term;
    }
  }
  
  // Check if we're in late December (冬至 period)
  const dongzhi = solarTerms.find(t => t.id === 'dongzhi')!;
  if (month === 12 && day >= dongzhi.day) {
    return dongzhi;
  }
  
  return solarTerms[0];
};

export const getNextSolarTerm = (): SolarTerm => {
  const currentTerm = getCurrentSolarTerm();
  
  // Find current term index and return the next one
  const currentIndex = solarTerms.findIndex(t => t.id === currentTerm.id);
  const nextIndex = (currentIndex + 1) % solarTerms.length;
  return solarTerms[nextIndex];
};

export const getCountdownToNextTerm = (): { days: number; hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const year = now.getFullYear();
  const nextTerm = getNextSolarTerm();
  
  let nextTermDate = getSolarTermDate(nextTerm, year);
  
  // If the next term date has passed this year, it's next year
  if (nextTermDate <= now) {
    nextTermDate = getSolarTermDate(nextTerm, year + 1);
  }
  
  const diff = nextTermDate.getTime() - now.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};

export const getCurrentSeason = (): Season => {
  const currentTerm = getCurrentSolarTerm();
  return currentTerm.season;
};

export const getSeasonFromTermIndex = (index: number): Season => {
  if (index < 6) return 'spring';
  if (index < 12) return 'summer';
  if (index < 18) return 'autumn';
  return 'winter';
};

export const formatDate = (month: number, day: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[month - 1]} ${day}`;
};

export const formatDateCN = (month: number, day: number): string => {
  return `${month}月${day}日`;
};

export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
