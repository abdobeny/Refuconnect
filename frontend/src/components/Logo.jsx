import React from 'react';
import { Heart, PawPrint } from 'lucide-react';

const Logo = ({ className = 'w-8 h-8 lg:w-9 lg:h-9' }) => {
  return (
    <div className={`${className} relative rounded-full bg-primary text-white shadow-sm`}>
      <PawPrint className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2" />
      <span className="absolute -right-1 -top-1 flex h-[42%] w-[42%] items-center justify-center rounded-full bg-accent text-white ring-2 ring-background-paper">
        <Heart className="h-[58%] w-[58%] fill-current" />
      </span>
    </div>
  );
};

export default Logo;
