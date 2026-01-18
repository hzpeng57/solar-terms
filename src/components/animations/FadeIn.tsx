import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeIn } from '../../lib/animations';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}

const variants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  none: fadeIn,
};

export const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
}: FadeInProps) => {
  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
