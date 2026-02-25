import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ label, id, type = 'text', className = '', as = 'input', disabled, ...props }, ref) => {
  const Component = as;
  const isTextarea = as === 'textarea';

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-2">
          {label}
        </label>
      )}
      <Component
        id={id}
        ref={ref}
        type={isTextarea ? undefined : type}
        disabled={disabled}
        className={cn(
          "w-full bg-gray-50 border border-gray-200 rounded-xl p-3 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "hover:bg-white placeholder-gray-400",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100",
          isTextarea && "min-h-[120px] resize-vertical"
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
