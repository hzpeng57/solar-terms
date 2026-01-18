import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCurrentTerm';
import type { SolarTerm } from '../../data/types';

interface CountdownTimerProps {
  nextTerm: SolarTerm;
}

export const CountdownTimer = ({ nextTerm }: CountdownTimerProps) => {
  const { days, hours, minutes, seconds } = useCountdown();

  const timeUnits = [
    { value: days, label: '天', labelEn: 'Days' },
    { value: hours, label: '时', labelEn: 'Hours' },
    { value: minutes, label: '分', labelEn: 'Min' },
    { value: seconds, label: '秒', labelEn: 'Sec' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[var(--color-surface)]/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-[var(--color-primary)]/10 mb-16 md:mb-24"
    >
      <p className="text-xs md:text-sm text-[var(--color-text-muted)] mb-2">
        距离 <span className="font-chinese text-[var(--color-primary)]">{nextTerm.nameCN}</span> 还有
      </p>
      <div className="flex gap-2 md:gap-3 justify-center">
        {timeUnits.map((unit) => (
          <div key={unit.labelEn} className="text-center w-12 md:w-16">
            <div className="text-2xl md:text-4xl font-bold text-[var(--color-primary)] tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs text-[var(--color-text-muted)]">{unit.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
