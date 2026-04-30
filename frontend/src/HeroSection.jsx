import React from 'react';
import Button from './components/ui/Button';
import './App.css';

const HeroSection = () => {
  return (
    <section className="w-full h-[500px] flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(/dog1.jpg)' }}>
      <div className="flex w-full h-full items-center justify-between px-16">
        <div className="flex flex-col justify-center w-1/2">
          <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Bienvenue sur Refuconnect</h1>
          <p className="text-xl mb-8 text-white drop-shadow-lg">Adoptez un animal, changez une vie.</p>
          <div className="flex gap-4">
            <Button>Voir les animaux</Button>
            <Button variant="outline">Faire un don</Button>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img src="/dog3.webp" alt="Hero animal" className="rounded-3xl shadow-xl w-full h-auto max-h-[400px] object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
