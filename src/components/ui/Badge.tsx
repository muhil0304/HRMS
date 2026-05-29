import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';

  const variants = {
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    danger: 'bg-rose-100 text-rose-800 border border-rose-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    neutral: 'bg-slate-100 text-slate-800 border border-slate-200'
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant]), className)}
      {...props}
    >
      {children}
    </span>
  );
};
