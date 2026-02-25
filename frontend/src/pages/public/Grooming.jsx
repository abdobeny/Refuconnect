import React from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Grooming = () => {
  const services = [
    { name: 'Bain', description: 'Nettoyage complet avec produits adaptés.', duration: 'dès 45 min' },
    { name: 'Coupe', description: 'Coupe hygiénique ou esthétique selon la race.', duration: 'dès 60 min', featured: true },
    { name: 'Soins Spéciaux', description: 'Coupe des griffes, nettoyage des oreilles.', duration: 'Variable' },
  ];

  return (
    <div className="text-center">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl mb-4">Services de <span className="text-primary">toilettage</span></h1>
        <p className="text-muted mb-12">Nos professionnels prennent soin de votre compagnon avec attention.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Card key={i} className={`p-6 hover:shadow-lg transition ${s.featured ? 'border-2 border-primary' : ''}`}>
              <h3 className="font-serif text-xl font-bold mb-2">{s.name}</h3>
              <p className="text-sm text-muted mb-4">{s.description}</p>
              <div className="text-primary font-bold">{s.duration}</div>
            </Card>
          ))}
        </div>

        <Button variant="primary" className="mt-10">Réserver un créneau</Button>
      </section>
    </div>
  );
};

export default Grooming;
