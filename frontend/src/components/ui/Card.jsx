import { cn } from '../../lib/utils';

const Card = ({ children, className = '', as = 'div', ...props }) => {
  const Component = as;

  return (
    <Component
      className={cn('bg-white rounded-3xl shadow-soft overflow-hidden', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
