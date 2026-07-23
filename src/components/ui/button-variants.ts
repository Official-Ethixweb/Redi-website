import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-heading font-semibold uppercase tracking-wide',
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
          'border-2 border-cyan-400/70 bg-transparent text-cyan-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-400/10 active:translate-y-0',
        'outline-dark':
          'border-2 border-navy-950/20 bg-transparent text-navy-950 hover:-translate-y-0.5 hover:border-navy-950/40 hover:bg-navy-950/5 active:translate-y-0',
        ghost: 'bg-transparent text-navy-950 hover:bg-navy-950/5',
        link: 'bg-transparent p-0 text-cyan-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-4 text-xs',
        md: 'h-[55px] px-8 text-base',
        lg: 'h-[58px] px-6 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
