import { useState } from 'react';
import { motion } from 'framer-motion';
import { solarTerms } from '../../data/solarTerms';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useCurrentTerm } from '../../hooks/useCurrentTerm';
import { wheelRotate } from '../../lib/animations';
import type { SolarTerm } from '../../data/types';

const WHEEL_SIZE = 500;
const CENTER = WHEEL_SIZE / 2;
const OUTER_RADIUS = 220;
const INNER_RADIUS = 100;
const SEGMENT_ANGLE = 360 / 24;

const seasonColors: Record<string, string> = {
  spring: '#22c55e',
  summer: '#ef4444',
  autumn: '#f59e0b',
  winter: '#3b82f6',
};

interface WheelSegmentProps {
  term: SolarTerm;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (term: SolarTerm | null) => void;
  onClick: () => void;
}

const WheelSegment = ({ term, index, isActive, isHovered, onHover, onClick }: WheelSegmentProps) => {
  const startAngle = index * SEGMENT_ANGLE - 90;
  const endAngle = (index + 1) * SEGMENT_ANGLE - 90;
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = CENTER + OUTER_RADIUS * Math.cos(startRad);
  const y1 = CENTER + OUTER_RADIUS * Math.sin(startRad);
  const x2 = CENTER + OUTER_RADIUS * Math.cos(endRad);
  const y2 = CENTER + OUTER_RADIUS * Math.sin(endRad);
  const x3 = CENTER + INNER_RADIUS * Math.cos(endRad);
  const y3 = CENTER + INNER_RADIUS * Math.sin(endRad);
  const x4 = CENTER + INNER_RADIUS * Math.cos(startRad);
  const y4 = CENTER + INNER_RADIUS * Math.sin(startRad);

  const pathD = `
    M ${x1} ${y1}
    A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${x4} ${y4}
    Z
  `;

  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const labelRadius = (OUTER_RADIUS + INNER_RADIUS) / 2;
  const labelX = CENTER + labelRadius * Math.cos(midRad);
  const labelY = CENTER + labelRadius * Math.sin(midRad);

  const color = seasonColors[term.season];
  const opacity = isActive ? 1 : isHovered ? 0.8 : 0.6;

  return (
    <g
      onMouseEnter={() => onHover(term)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      className="cursor-pointer"
    >
      <motion.path
        d={pathD}
        fill={color}
        initial={{ opacity: 0.6 }}
        animate={{ 
          opacity, 
          scale: isHovered || isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="500"
        style={{ 
          transform: `rotate(${midAngle + 90}deg)`,
          transformOrigin: `${labelX}px ${labelY}px`,
          pointerEvents: 'none',
        }}
      >
        {term.nameCN}
      </text>
    </g>
  );
};

export const SolarTermWheel = () => {
  const { currentTerm } = useCurrentTerm();
  const [hoveredTerm, setHoveredTerm] = useState<SolarTerm | null>(null);
  const scrollToSection = useScrollToSection();

  // Display term: show hovered term, or default to current term
  const displayTerm = hoveredTerm || currentTerm;

  const handleSegmentClick = (term: SolarTerm) => {
    scrollToSection(`term-${term.id}`);
  };

  const currentIndex = solarTerms.findIndex((t) => t.id === currentTerm.id);

  return (
    <section id="wheel" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-chinese font-bold text-center text-[var(--color-text)] mb-4"
        >
          节气轮
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto"
        >
          点击任意节气，了解更多
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Wheel */}
          <motion.div
            variants={wheelRotate}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <svg
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
              className="drop-shadow-lg"
            >
              {/* Center Circle */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={INNER_RADIUS - 5}
                fill="var(--color-surface)"
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              <text
                x={CENTER}
                y={CENTER - 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-text)"
                fontSize="16"
                fontWeight="600"
              >
                二十四
              </text>
              <text
                x={CENTER}
                y={CENTER + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-text)"
                fontSize="16"
                fontWeight="600"
              >
                节气
              </text>

              {/* Segments */}
              {solarTerms.map((term, index) => (
                <WheelSegment
                  key={term.id}
                  term={term}
                  index={index}
                  isActive={index === currentIndex}
                  isHovered={hoveredTerm?.id === term.id}
                  onHover={setHoveredTerm}
                  onClick={() => handleSegmentClick(term)}
                />
              ))}
            </svg>
          </motion.div>

          {/* Info Card - Always shows content (current term or hovered term) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-sm bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg border border-[var(--color-primary)]/10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: seasonColors[displayTerm.season] }}
              />
              <span className="text-sm text-[var(--color-text-muted)]">
                {displayTerm.season === 'spring' && '春'}
                {displayTerm.season === 'summer' && '夏'}
                {displayTerm.season === 'autumn' && '秋'}
                {displayTerm.season === 'winter' && '冬'}
              </span>
              {!hoveredTerm && (
                <span className="ml-auto text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                  当前
                </span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-chinese font-bold text-[var(--color-text)] mb-1">
              {displayTerm.nameCN}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">
              {displayTerm.pinyin} · {displayTerm.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">
              {displayTerm.month}月{displayTerm.day}日
            </p>
            
            {/* Description */}
            <p className="text-sm text-[var(--color-text)] mb-4">{displayTerm.descriptionCN}</p>
            
            {/* Poem - compact */}
            <div className="mb-4 p-3 bg-[var(--color-background)] rounded-lg">
              <p className="font-chinese text-sm text-[var(--color-text)]">
                {displayTerm.poem.contentCN.join('')}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                —— {displayTerm.poem.authorCN}《{displayTerm.poem.titleCN}》
              </p>
            </div>
            
            {/* Characteristics */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {displayTerm.characteristicsCN.map((char, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-xs"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleSegmentClick(displayTerm)}
              className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              查看详情
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
