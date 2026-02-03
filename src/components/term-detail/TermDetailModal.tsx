import { motion, AnimatePresence } from 'framer-motion';
import { useTermModal } from '../../context/TermModalContext';
import { formatDate, formatDateCN } from '../../lib/utils';

export const TermDetailModal = () => {
  const { selectedTerm: term, isOpen, closeTerm } = useTermModal();

  if (!term) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeTerm}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[var(--color-surface)] rounded-lg shadow-2xl chinese-card"
          >
            {/* Close Button */}
            <button
              onClick={closeTerm}
              className="absolute top-4 right-4 z-10 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              aria-label="关闭"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[var(--color-border)]">
              {/* 日期 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-[var(--color-primary)]/50 to-transparent" />
                <span className="text-xs md:text-sm text-[var(--color-text-muted)] tracking-wider">
                  {formatDateCN(term.month, term.day)} · {formatDate(term.month, term.day)}
                </span>
                <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-[var(--color-primary)]/50 to-transparent" />
              </div>

              {/* 标题 */}
              <div className="text-center">
                <h2 className="font-chinese text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-2 tracking-wide">
                  {term.nameCN}
                </h2>
                <p className="text-lg text-[var(--color-text-muted)]">
                  {term.pinyin} · {term.name}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* 描述 */}
              <div className="relative px-4">
                <span className="absolute -left-1 -top-2 font-chinese text-3xl text-[var(--color-primary)]/20 leading-none">"</span>
                <p className="text-base md:text-lg text-[var(--color-text)] leading-relaxed">
                  {term.descriptionCN}
                </p>
                <span className="absolute -right-1 -bottom-4 font-chinese text-3xl text-[var(--color-primary)]/20 leading-none">"</span>
              </div>

              {/* 三候 */}
              <div>
                <h3 className="font-chinese text-base font-semibold text-[var(--color-text)] mb-3 flex items-center gap-3">
                  <span className="seal-box text-xs">候</span>
                  <span>三候</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {term.characteristicsCN.map((char, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[var(--color-background)] text-[var(--color-text)] rounded border border-[var(--color-border)] text-sm font-chinese"
                    >
                      <span className="text-[var(--color-primary)] mr-1">·</span>
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* 两列布局 */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* 习俗 */}
                <div className="p-4 bg-[var(--color-background)] rounded-lg">
                  <h3 className="font-chinese text-base font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <span className="seal-box text-xs">俗</span>
                    <span>习俗</span>
                  </h3>
                  <ul className="space-y-2">
                    {term.customsCN.map((custom, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                        <span className="text-[var(--color-primary)] mt-0.5">·</span>
                        {custom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 时令美食 */}
                <div className="p-4 bg-[var(--color-background)] rounded-lg">
                  <h3 className="font-chinese text-base font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <span className="seal-box text-xs">食</span>
                    <span>时令美食</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {term.foodsCN.map((food, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text)] rounded border border-[var(--color-border)] text-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 诗词 */}
              <div className="p-4 bg-[var(--color-background)] rounded-lg">
                <h3 className="font-chinese text-base font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  <span className="seal-box text-xs">诗</span>
                  <span>诗词</span>
                </h3>
                <div className="mb-2">
                  <p className="font-chinese text-base text-[var(--color-text)] font-medium">
                    《{term.poem.titleCN}》
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {term.poem.authorCN}
                  </p>
                </div>
                <div className="font-chinese text-sm text-[var(--color-text)] leading-loose border-l-2 border-[var(--color-primary)]/30 pl-4">
                  {term.poem.contentCN.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
