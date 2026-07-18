import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: PageHeaderProps) {
  const reduce = useReducedMotion();
  const alignment = align === 'center' ? 'text-center items-center' : '';

  return (
    <div className={['flex flex-col gap-3', alignment].join(' ')}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan"
          />
          {eyebrow}
        </motion.span>
      )}
      <motion.h1
        className="page-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          className={[
            'max-w-2xl text-sm text-mist-300 sm:text-base',
            align === 'center' ? 'mx-auto' : '',
          ].join(' ')}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
