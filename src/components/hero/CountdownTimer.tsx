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
      className="chinese-card p-5 md:p-6 mb-16 md:mb-24"
    >
      <p className="text-xs md:text-sm text-[var(--color-text-muted)] mb-3 text-center">
        距离 <span className="font-chinese font-semibold text-[var(--color-primary)]">{nextTerm.nameCN}</span> 还有
      </p>
      <div className="flex gap-3 md:gap-4 justify-center">
        {timeUnits.map((unit, i) => (
          <div key={unit.labelEn} className="text-center">
            <div className="w-12 md:w-16 h-12 md:h-16 flex items-center justify-center bg-[var(--color-background)] rounded border border-[var(--color-border)]">
              <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] tabular-nums font-chinese">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <div className="text-[10px] md:text-xs text-[var(--color-text-muted)] mt-1.5 font-chinese">{unit.label}</div>
            {i < timeUnits.length - 1 && (
              <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-[var(--color-text-muted)]">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
