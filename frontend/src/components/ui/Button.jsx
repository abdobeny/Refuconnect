import React from 'react';
import { cn } from '../../lib/utils'; // This should now work

const Button = ({ children, variant = 'primary', className, disabled, ...props }) => {
  const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-orange-600 active:bg-orange-700 disabled:hover:bg-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-orange-600",
    ghost: "text-muted hover:text-primary hover:bg-gray-50 active:bg-gray-100 bg-transparent shadow-none",
    white: "bg-white text-text-main hover:bg-gray-50 active:bg-gray-100 border border-gray-200"
  };

  return (
    <button 
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;