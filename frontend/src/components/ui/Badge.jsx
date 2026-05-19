import { cn } from '../../lib/utils';

const Badge = ({ children, className = '', variant = 'light', ...props }) => {
  const variants = {
    light: 'inline-flex items-center justify-center flex-shrink-0 whitespace-nowrap bg-white text-sm text-text-main px-3 py-1 rounded-full shadow-sm',
    solid: 'inline-flex items-center justify-center flex-shrink-0 whitespace-nowrap bg-primary text-white text-sm px-3 py-1 rounded-full',
    muted: 'inline-flex items-center justify-center flex-shrink-0 whitespace-nowrap bg-gray-100 text-muted text-sm px-3 py-1 rounded-md'
  };

  return (
    <span className={cn(variants[variant] || variants.light, className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
