/** 4px base spacing scale used across sections/components. */
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

/** Vertical rhythm for full-bleed page sections, responsive per breakpoint. */
export const sectionPadding = {
  sm: 'py-12',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
} as const;
