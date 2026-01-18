import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-[var(--color-surface)] border-t border-[var(--color-primary)]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-chinese text-2xl font-bold text-[var(--color-text)] mb-4">
            二十四节气
          </h3>
          <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
            传承千年的中国智慧，指引农耕与生活的时间密码
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="#hero"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              首页
            </a>
            <a
              href="#wheel"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              节气轮
            </a>
            <a
              href="#timeline"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              时间线
            </a>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} 二十四节气 · 24 Solar Terms
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
