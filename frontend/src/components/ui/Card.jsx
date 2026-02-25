import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ children, className = '', as: Component = 'div', ...props }) => {
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
