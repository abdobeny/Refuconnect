import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const base = 'animate-pulse rounded-lg bg-slate-200';
  const variants = {
    rect: `${base} h-4`,
    circle: `${base} rounded-full`,
    card: `${base} h-48`,
    text: `${base} h-4`,
    'text-lg': `${base} h-6`,
    'text-xl': `${base} h-8`,
  };

  return <div className={`${variants[variant] || variants.rect} ${className}`} />;
};

export default Skeleton;
