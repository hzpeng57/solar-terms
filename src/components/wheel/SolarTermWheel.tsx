import { useState } from 'react';
import { motion } from 'framer-motion';
import { solarTerms } from '../../data/solarTerms';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useCurrentTerm } from '../../hooks/useCurrentTerm';
import { wheelRotate } from '../../lib/animations';
import type { SolarTerm } from '../../data/types';

const seasonColors: Record<string, string> = {
  spring: '#3C9566',  // 松花绿
  summer: '#C04851',  // 胭脂
  autumn: '#C28B3D',  // 藤黄
  winter: '#4A5568',  // 黛青
};

interface WheelSegmentProps {
  term: SolarTerm;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (term: SolarTerm | null) => void;
  onClick: () => void;
  size: number;
}

const WheelSegment = ({ term, index, isActive, isHovered, onHover, onClick, size }: WheelSegmentProps) => {
  const center = size / 2;
  const outerRadius = size * 0.44;
  const innerRadius = size * 0.2;
  const segmentAngle = 360 / 24;
  
  const startAngle = index * segmentAngle - 90;
  const endAngle = (index + 1) * segmentAngle - 90;
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = center + outerRadius * Math.cos(startRad);
  const y1 = center + outerRadius * Math.sin(startRad);
  const x2 = center + outerRadius * Math.cos(endRad);
  const y2 = center + outerRadius * Math.sin(endRad);
  const x3 = center + innerRadius * Math.cos(endRad);
  const y3 = center + innerRadius * Math.sin(endRad);
  const x4 = center + innerRadius * Math.cos(startRad);
  const y4 = center + innerRadius * Math.sin(startRad);

  const pathD = `
    M ${x1} ${y1}
    A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4}
    Z
  `;

  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const labelRadius = (outerRadius + innerRadius) / 2;
  const labelX = center + labelRadius * Math.cos(midRad);
  const labelY = center + labelRadius * Math.sin(midRad);

  const color = seasonColors[term.season];
  const opacity = isActive ? 1 : isHovered ? 0.8 : 0.6;
  const fontSize = size < 350 ? 8 : size < 450 ? 10 : 12;

  return (
    <g
      onMouseEnter={() => onHover(term)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(term)}
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
        style={{ transformOrigin: `${center}px ${center}px` }}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={fontSize}
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
    <section id="wheel" className="py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-chinese font-bold text-center text-[var(--color-text)] mb-2 md:mb-4"
        >
          节气轮
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-center text-[var(--color-text-muted)] mb-8 md:mb-12 max-w-xl mx-auto"
        >
          点击任意节气，了解更多
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Wheel - Responsive size */}
          <motion.div
            variants={wheelRotate}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square"
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-lg"
            >
              {/* Center Circle */}
              <circle
                cx={250}
                cy={250}
                r={95}
                fill="var(--color-surface)"
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              <text
                x={250}
                y={238}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-text)"
                fontSize="16"
                fontWeight="600"
              >
                二十四
              </text>
              <text
                x={250}
                y={262}
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
                  size={500}
                />
              ))}
            </svg>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="chinese-card w-full max-w-sm p-5 md:p-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="seal-box text-xs">
                {displayTerm.season === 'spring' && '春'}
                {displayTerm.season === 'summer' && '夏'}
                {displayTerm.season === 'autumn' && '秋'}
                {displayTerm.season === 'winter' && '冬'}
              </span>
              {!hoveredTerm && (
                <span className="ml-auto text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded">
                  当前
                </span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-chinese font-bold text-[var(--color-text)] mb-1">
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
            <div className="mb-4 p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
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
                    className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-xs border border-[var(--color-primary)]/20"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleSegmentClick(displayTerm)}
              className="w-full py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90 transition-opacity cursor-pointer text-sm md:text-base"
            >
              查看详情
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
