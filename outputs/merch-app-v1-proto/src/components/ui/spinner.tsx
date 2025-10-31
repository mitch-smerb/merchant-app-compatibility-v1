
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader, Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  color?: string;
}

export function Spinner({ size, show, children, className, color }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader color={color ?? '#334bc1'} className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}


export function LoadingPage({ show, children, className }: SpinnerContentProps) {
  return (
    <div className={show ? 'backdrop fixed inset-0 outline-none focus:outline-none justify-center items-center flex' : 'hidden'}>
      <Spinner show={show} size={'large'} children={children} className='z-50' />
    </div>
  );
}
