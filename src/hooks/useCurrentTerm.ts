import { useState, useEffect } from 'react';
import type { SolarTerm } from '../data/types';
import { getCurrentSolarTerm, getNextSolarTerm, getCountdownToNextTerm } from '../lib/utils';

export const useCurrentTerm = () => {
  const [currentTerm, setCurrentTerm] = useState<SolarTerm>(() => getCurrentSolarTerm());
  const [nextTerm, setNextTerm] = useState<SolarTerm>(() => getNextSolarTerm());

  useEffect(() => {
    // Update at midnight
    const checkForUpdate = () => {
      const newCurrentTerm = getCurrentSolarTerm();
      if (newCurrentTerm.id !== currentTerm.id) {
        setCurrentTerm(newCurrentTerm);
        setNextTerm(getNextSolarTerm());
      }
    };

    // Check every hour
    const interval = setInterval(checkForUpdate, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [currentTerm.id]);

  return { currentTerm, nextTerm };
};

export const useCountdown = () => {
  const [countdown, setCountdown] = useState(() => getCountdownToNextTerm());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownToNextTerm());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return countdown;
};
