import React from 'react';
import AnimalCard from './AnimalCard';

const AnimalGrid = ({ animals = [], onView }) => {
  if (!animals || animals.length === 0) {
    return <div className="text-center text-muted">Aucun animal trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {animals.map((a) => (
        <div key={a.id || a._id} className="w-full">
          <AnimalCard animal={a} onView={onView} />
        </div>
      ))}
    </div>
  );
};

export default AnimalGrid;
