import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size]), className)}
      {...props}
    >
      {children}
    </button>
  );
};
