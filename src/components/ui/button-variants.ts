import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'relative isolate inline-flex items-center justify-center gap-2 text-center whitespace-normal rounded-md font-heading font-semibold uppercase tracking-wide sm:whitespace-nowrap',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cyan-400 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-cyan-400 text-navy-950 shadow-soft hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-card active:translate-y-0',
        dark: 'bg-navy-950 text-white shadow-soft hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-card active:translate-y-0',
        outline:
          'border-2 border-cyan-400/70 bg-black/10 text-cyan-400 backdrop-blur-lg hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-black/20 active:translate-y-0',
        'outline-dark':
          'border-2 border-navy-950/20 bg-transparent text-navy-950 hover:-translate-y-0.5 hover:border-navy-950/40 hover:bg-navy-950/5 active:translate-y-0',
        ghost: 'bg-transparent text-navy-950 hover:bg-navy-950/5',
        link: 'bg-transparent p-0 text-cyan-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'min-h-10 sm:h-10 px-4 text-xs',
        md: 'min-h-[55px] sm:h-[55px] px-8 text-base',
        lg: 'min-h-[58px] sm:h-[58px] px-6 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
