import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { SolarTerm } from '../data/types';
import { solarTerms } from '../data/solarTerms';

interface TermModalContextType {
  selectedTerm: SolarTerm | null;
  isOpen: boolean;
  openTerm: (termId: string) => void;
  closeTerm: () => void;
}

const TermModalContext = createContext<TermModalContextType | null>(null);

export const TermModalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTerm, setSelectedTerm] = useState<SolarTerm | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openTerm = useCallback((termId: string) => {
    const term = solarTerms.find(t => t.id === termId);
    if (term) {
      setSelectedTerm(term);
      setIsOpen(true);
    }
  }, []);

  const closeTerm = useCallback(() => {
    setIsOpen(false);
    // 延迟清除数据，让动画完成
    setTimeout(() => setSelectedTerm(null), 300);
  }, []);

  return (
    <TermModalContext.Provider value={{ selectedTerm, isOpen, openTerm, closeTerm }}>
      {children}
    </TermModalContext.Provider>
  );
};

export const useTermModal = () => {
  const context = useContext(TermModalContext);
  if (!context) {
    throw new Error('useTermModal must be used within a TermModalProvider');
  }
  return context;
};
