/**
 * Color tokens — mirrors the CSS custom properties in `src/styles/global.css`.
 * Keep these two files in sync; this file exists for contexts that need the
 * raw values in JS/TS (Framer Motion variants, canvas/SVG charts, emails).
 */
export const colors = {
  navy: {
    950: '#06182f',
    900: '#0a2038',
    800: '#123152',
    700: '#1c4569',
    600: '#2a5c85',
  },
  cyan: {
    500: '#1fa9d6',
    400: '#2cc3ec',
    300: '#73d4ee',
    200: '#bae5f1',
    100: '#e3f6fc',
  },
  steel: {
    200: '#c3d2dd',
    100: '#eaf1f3',
  },
  ink: {
    900: '#202024',
    800: '#333236',
    700: '#3b3a3e',
    600: '#57565b',
    500: '#75747a',
  },
  slate: {
    600: '#57697d',
    500: '#75879a',
    400: '#9db0c1',
  },
  badge: {
    platinum: '#2cc3ec',
    gold: '#e8b93b',
    silver: '#a7b0b8',
    bronze: '#c17a3f',
    emerging: '#333236',
  },
  white: '#ffffff',
} as const;

export type BadgeTier = keyof typeof colors.badge;
