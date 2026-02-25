import React from 'react';
import AnimalGrid from '../../components/features/animals/AnimalGrid';
import { useAnimals } from '../../context/AnimalsContext';
import { useNavigate } from 'react-router-dom';

const Animals = () => {
  const navigate = useNavigate();
  const { animals } = useAnimals();

  const handleView = (id) => navigate(`/animaux/${id}`);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl mb-6">Animaux</h1>
        <AnimalGrid animals={animals} onView={handleView} />
      </section>
    </div>
  );
};

export default Animals;
