import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-pill font-heading font-medium uppercase tracking-wider',
  {
    variants: {
      variant: {
        outline: 'border border-cyan-300/50 text-cyan-200',
        'outline-dark': 'border border-navy-950/25 text-navy-950',
        solid: 'bg-cyan-400 text-navy-950',
        subtle: 'bg-cyan-100 text-navy-950',
      },
      size: {
        sm: 'px-3 py-1 text-[10px]',
        md: 'px-4 py-1.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
