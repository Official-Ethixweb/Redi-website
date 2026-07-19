/**
 * Typography tokens.
 *
 * Font matching note: the source design was supplied as flattened PNG
 * screenshots (Figma file access was not grantable — see README). Fonts were
 * identified visually, not read from Figma metadata, and mapped to the
 * closest available variable Google Fonts:
 *   - display (short brand headlines, hero kickers, logo): Bevan
 *   - heading (section titles, nav, buttons, stat numbers): Oswald
 *   - body (paragraphs, form labels): Nunito
 */
export const fontFamily = {
  display: "'Bevan', 'Rokkitt', ui-serif, Georgia, serif",
  heading: "'Oswald Variable', 'Oswald', ui-sans-serif, sans-serif",
  body: "'Nunito Variable', 'Nunito', ui-sans-serif, system-ui, sans-serif",
} as const;

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;
