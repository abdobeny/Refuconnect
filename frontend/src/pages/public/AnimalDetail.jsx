import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimals } from '../../context/AnimalsContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdoptionForm from '../../components/features/forms/AdoptionForm';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAnimalById, loading: listLoading } = useAnimals();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const data = await getAnimalById(id);
      if (active) {
        setAnimal(data);
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id, getAnimalById]);

  if (loading || listLoading) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center text-muted">Chargement du profil...</div>
    );
  }

  if (!animal) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p className="mb-4">Animal introuvable.</p>
        <Button variant="primary" onClick={() => navigate('/animaux')}>Retour à la liste</Button>
      </div>
    );
  }

  const { name, images, breed, sex, age, ageUnit, vaccinated, description, veterinaryInfo } = animal;
  const fallbackImage = '/dog1.jpg';
  const image = images?.[0] || fallbackImage;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-10 rounded-3xl bg-white p-8 shadow-lg md:flex-row">
        <div className="md:w-1/3">
          <img src={image} alt={name} className="h-96 w-full rounded-2xl object-cover shadow-md" />
        </div>
        <div className="space-y-6 md:w-2/3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-serif text-4xl font-bold">{name}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">{breed}</span>
              <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">{sex}</span>
              <Badge className="px-3 py-1">{age} {ageUnit}</Badge>
            </div>
          </div>

          <p className="text-lg">
            Vacciné :{' '}
            <span className={vaccinated ? 'text-green-600' : 'text-red-500'}>
              {vaccinated ? 'Oui' : 'Non'}
            </span>
          </p>

          <div className="rounded-xl border border-orange-100 bg-bg p-6">
            <h3 className="mb-2 font-serif text-xl">Description</h3>
            <p className="leading-relaxed text-muted">{description}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <h3 className="mb-2 font-serif text-xl">Informations vétérinaires</h3>
            <ul className="space-y-2 text-sm text-muted">
              {veterinaryInfo.map((line, idx) => (
                <li key={idx}>• {line}</li>
              ))}
            </ul>
          </div>

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              Demande envoyée. Consultez votre espace pour suivre l&apos;avancement.
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" onClick={() => setShowForm(true)}>Demande d&apos;adoption</Button>
            <Button variant="white" onClick={() => navigate('/animaux')}>Retour</Button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mx-auto mt-8 max-w-2xl">
          <AdoptionForm
            animalId={id}
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              setSuccess(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimalDetail;
