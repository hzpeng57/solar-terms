import type { SolarTerm } from '../../data/types';
import { FadeIn } from '../animations';
import { formatDate, formatDateCN } from '../../lib/utils';

interface TermSectionProps {
  term: SolarTerm;
  index: number;
}

export const TermSection = ({ term, index }: TermSectionProps) => {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`term-${term.id}`}
      className="py-12 md:py-20 px-4 overflow-hidden relative"
    >
      {/* 分隔装饰线 */}
      {index > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      )}

      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16`}>
          {/* Main Info */}
          <div className="flex-1">
            <FadeIn direction="up">
              {/* 日期 */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-[var(--color-primary)]/50 to-transparent" />
                <span className="text-xs md:text-sm text-[var(--color-text-muted)] tracking-wider">
                  {formatDateCN(term.month, term.day)} · {formatDate(term.month, term.day)}
                </span>
                <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-[var(--color-primary)]/50 to-transparent" />
              </div>

              {/* 标题区 */}
              <div className="text-center lg:text-left mb-6 md:mb-8">
                <h2 className="font-chinese text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-3 tracking-wide">
                  {term.nameCN}
                </h2>
                <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-1">
                  {term.pinyin}
                </p>
                <p className="text-base md:text-lg text-[var(--color-text-muted)]">
                  {term.name}
                </p>
              </div>

              {/* 描述 - 带引号装饰 */}
              <div className="relative mb-8 md:mb-10 px-4 md:px-6">
                <span className="absolute -left-1 md:left-0 -top-2 font-chinese text-3xl md:text-4xl text-[var(--color-primary)]/20 leading-none">"</span>
                <p className="text-base md:text-lg text-[var(--color-text)] leading-relaxed">
                  {term.descriptionCN}
                </p>
                <span className="absolute -right-1 md:right-0 -bottom-4 font-chinese text-3xl md:text-4xl text-[var(--color-primary)]/20 leading-none">"</span>
              </div>

              {/* 三候 */}
              <div className="mb-6 md:mb-8">
                <h3 className="font-chinese text-base md:text-lg font-semibold text-[var(--color-text)] mb-3 md:mb-4 flex items-center gap-3">
                  <span className="seal-box text-xs">候</span>
                  <span>三候</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {term.characteristicsCN.map((char, i) => (
                    <span
                      key={i}
                      className="px-3 md:px-4 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] rounded border border-[var(--color-border)] text-sm md:text-base font-chinese"
                    >
                      <span className="text-[var(--color-primary)] mr-1">·</span>
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Details Grid */}
          <div className="flex-1 space-y-5 md:space-y-6">
            {/* 习俗 */}
            <FadeIn direction="up" delay={0.1}>
              <div className="chinese-card p-5 md:p-6">
                <h3 className="font-chinese text-base md:text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-3">
                  <span className="seal-box text-xs">俗</span>
                  <span>习俗</span>
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {term.customsCN.map((custom, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[var(--color-text)]">
                      <span className="text-[var(--color-primary)] mt-0.5 text-lg">·</span>
                      {custom}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* 时令美食 */}
            <FadeIn direction="up" delay={0.2}>
              <div className="chinese-card p-5 md:p-6">
                <h3 className="font-chinese text-base md:text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-3">
                  <span className="seal-box text-xs">食</span>
                  <span>时令美食</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {term.foodsCN.map((food, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[var(--color-background)] text-[var(--color-text)] rounded border border-[var(--color-border)] text-sm"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 诗词 */}
            <FadeIn direction="up" delay={0.3}>
              <div className="chinese-card p-5 md:p-6">
                <h3 className="font-chinese text-base md:text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-3">
                  <span className="seal-box text-xs">诗</span>
                  <span>诗词</span>
                </h3>
                <div className="mb-3">
                  <p className="font-chinese text-base md:text-lg text-[var(--color-text)] font-medium">
                    《{term.poem.titleCN}》
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {term.poem.authorCN}
                  </p>
                </div>
                <div className="poem-quote font-chinese text-sm md:text-base text-[var(--color-text)] leading-loose border-l-2 border-[var(--color-primary)]/30 pl-4">
                  {term.poem.contentCN.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
