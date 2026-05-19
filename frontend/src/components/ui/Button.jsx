import { cn } from '../../lib/utils'; // This should now work

const Button = ({ children, variant = 'primary', className, disabled, ...props }) => {
  const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-dark disabled:hover:bg-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary-light active:bg-primary-light",
    ghost: "text-muted hover:text-primary hover:bg-primary/5 active:bg-primary/10 bg-transparent shadow-none",
    white: "bg-white text-text-main hover:bg-background-cream active:bg-background-beige border border-primary/20"
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
