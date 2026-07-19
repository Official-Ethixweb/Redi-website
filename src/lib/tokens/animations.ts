import type { Transition, Variants } from 'framer-motion';

export const easeOutQuad: Transition['ease'] = [0.25, 0.46, 0.45, 0.94];
export const easeOutBack: Transition['ease'] = [0.34, 1.56, 0.64, 1];

export const durations = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: easeOutQuad } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeOutQuad },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeOutQuad },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.base, ease: easeOutBack },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: easeOutQuad } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: easeOutQuad } },
};

/** Apply to a parent; children using `fadeInUp` (etc.) will cascade. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const hoverLift = {
  rest: {
    y: 0,
    boxShadow: '0 2px 8px -2px rgba(6,24,47,0.12), 0 8px 24px -8px rgba(6,24,47,0.14)',
  },
  hover: {
    y: -6,
    boxShadow: '0 12px 32px -8px rgba(6,24,47,0.28)',
    transition: { duration: durations.fast, ease: easeOutQuad },
  },
};

export const viewportOnce = { once: true, margin: '-80px 0px' } as const;
