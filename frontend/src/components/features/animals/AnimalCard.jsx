import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

const AnimalCard = ({ animal = {}, onView }) => {
  const { id, name, age, ageUnit, breed, sex, images = [] } = animal;
  const image = images[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop';

  return (
    <Card className="group">
      <div className="relative h-64">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          <Badge>{age ? `${age} ${ageUnit || 'ANS'}` : '—'}</Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-xl font-bold">{name || 'Sans nom'}</h3>
        <p className="text-sm text-muted mb-4">{breed || 'Race inconnue'} • {sex || '—'}</p>
        <Button variant="primary" className="w-full text-sm" onClick={() => onView?.(id)}>
          Voir le profil
        </Button>
      </div>
    </Card>
  );
};

export default AnimalCard;
