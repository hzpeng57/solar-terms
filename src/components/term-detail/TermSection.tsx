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
      className="py-16 px-4 border-b border-[var(--color-primary)]/10 last:border-b-0"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16`}>
          {/* Main Info */}
          <div className="flex-1">
            <FadeIn direction={isEven ? 'left' : 'right'}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-[var(--color-text-muted)]">
                  {formatDateCN(term.month, term.day)}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">·</span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {formatDate(term.month, term.day)}
                </span>
              </div>
              
              <h2 className="font-chinese text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-2">
                {term.nameCN}
              </h2>
              <p className="text-xl text-[var(--color-text-muted)] mb-2">
                {term.pinyin}
              </p>
              <p className="text-lg text-[var(--color-text-muted)] mb-6">
                {term.name}
              </p>
              
              <p className="text-lg text-[var(--color-text)] mb-8 leading-relaxed">
                {term.descriptionCN}
              </p>

              {/* Characteristics */}
              <div className="mb-8">
                <h3 className="font-chinese text-lg font-semibold text-[var(--color-text)] mb-3">
                  三候
                </h3>
                <div className="flex flex-wrap gap-2">
                  {term.characteristicsCN.map((char, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Details Grid */}
          <div className="flex-1 space-y-6">
            {/* Customs */}
            <FadeIn direction={isEven ? 'right' : 'left'} delay={0.1}>
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md border border-[var(--color-primary)]/10">
                <h3 className="font-chinese text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <span>🎊</span>
                  习俗
                </h3>
                <ul className="space-y-2">
                  {term.customsCN.map((custom, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                      <span className="text-[var(--color-primary)] mt-1">•</span>
                      {custom}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Foods */}
            <FadeIn direction={isEven ? 'right' : 'left'} delay={0.2}>
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md border border-[var(--color-primary)]/10">
                <h3 className="font-chinese text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <span>🍜</span>
                  时令美食
                </h3>
                <div className="flex flex-wrap gap-2">
                  {term.foodsCN.map((food, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[var(--color-background)] text-[var(--color-text)] rounded-lg text-sm"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Poem */}
            <FadeIn direction={isEven ? 'right' : 'left'} delay={0.3}>
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md border border-[var(--color-primary)]/10">
                <h3 className="font-chinese text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <span>📜</span>
                  诗词
                </h3>
                <div className="mb-3">
                  <p className="font-chinese text-[var(--color-text)] font-medium">
                    《{term.poem.titleCN}》
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {term.poem.authorCN}
                  </p>
                </div>
                <div className="font-chinese text-[var(--color-text)] leading-loose">
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
