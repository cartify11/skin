import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C89B7B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[#0B2521] text-white hover:bg-[#143D36] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98',
    gold:
      'bg-gradient-to-r from-[#C89B7B] to-[#D4AF37] text-white hover:brightness-108 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border-2 border-[#0B2521] text-[#0B2521] bg-transparent hover:bg-[#0B2521] hover:text-white',
    ghost:
      'text-[#0B2521] bg-transparent hover:bg-[#0B2521]/10',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
