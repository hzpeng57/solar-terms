import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { slideInFromLeft, slideInFromRight } from '../../lib/animations';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  className?: string;
  once?: boolean;
}

export const SlideIn = ({
  children,
  direction = 'left',
  delay = 0,
  className = '',
  once = true,
}: SlideInProps) => {
  return (
    <motion.div
      variants={direction === 'left' ? slideInFromLeft : slideInFromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-100px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
