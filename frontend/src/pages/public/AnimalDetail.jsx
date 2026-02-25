import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimals } from '../../context/AnimalsContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdoptionForm from '../../components/features/forms/AdoptionForm';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animals } = useAnimals();
  const animal = animals.find((a) => a.id === parseInt(id));

  if (!animal) {
    return <div className="max-w-3xl mx-auto p-6">Animal introuvable.</div>;
  }

  const { name, images, breed, sex, age, ageUnit, vaccinated, description, veterinaryInfo } = animal;

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <img src={images[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'} alt={name} className="rounded-2xl w-full h-96 object-cover shadow-md" />
        </div>
        <div className="md:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-4xl font-bold">{name}</h1>
            <div className="flex gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">{breed}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">{sex}</span>
              <Badge className="px-3 py-1">{age} {ageUnit}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg">Race: <span className="font-normal text-muted">{breed}</span></p>
            <p className="font-semibold text-lg">Vacciné: <span className={`font-normal ${vaccinated ? 'text-green-600' : 'text-red-500'}`}>{vaccinated ? 'Oui' : 'Non'}</span></p>
          </div>

          <div className="bg-bg p-6 rounded-xl border border-orange-100">
            <h3 className="font-serif text-xl mb-2">Description</h3>
            <p className="text-muted leading-relaxed">{description}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-serif text-xl mb-2">Information vétérinaires</h3>
            <ul className="text-sm space-y-2 text-muted">
              {veterinaryInfo.map((line, idx) => (
                <li key={idx}>• {line}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="primary" onClick={() => setShowForm(true)}>Demande d'adoption</Button>
            <Button variant="secondary" className="bg-secondary text-white" onClick={() => alert('Demande de couplage (mock)')}>Demande de couplage</Button>
            <Button variant="white" onClick={() => navigate('/animaux')}>Retour</Button>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="max-w-2xl mx-auto mt-8">
          <AdoptionForm animalId={id} onCancel={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default AnimalDetail;
