import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { mapAnimalFromApi, speciesToApi } from '../api/mappers/animalMapper';

export const AnimalsContext = createContext();

const fallbackAnimals = [
  {
    id: '1',
    name: 'Max',
    species: 'dog',
    type: 'Chien',
    breed: 'Berger Allemand',
    sex: 'Male',
    sexRaw: 'male',
    age: 3,
    ageUnit: 'ANS',
    size: 'large',
    vaccinated: true,
    sterilized: true,
    health_status: 'good',
    description: 'Chien affectueux et sportif, parfait pour une famille active.',
    status: 'Urgent',
    statusRaw: 'available',
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e'],
    veterinaryInfo: ['Etat de sante : Bon', 'Vaccine : Oui', 'Sterilise : Oui'],
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    type: 'Chat',
    breed: 'Siamois',
    sex: 'Femelle',
    sexRaw: 'female',
    age: 2,
    ageUnit: 'ANS',
    size: 'medium',
    vaccinated: true,
    sterilized: false,
    health_status: 'good',
    description: 'Chatte calme et sociable, adore les calins.',
    status: 'Disponible',
    statusRaw: 'available',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'],
    veterinaryInfo: ['Etat de sante : Bon', 'Vaccinee : Oui', 'Sterilisee : Non'],
  },
  {
    id: '3',
    name: 'Rocky',
    species: 'dog',
    type: 'Chien',
    breed: 'Labrador',
    sex: 'Male',
    sexRaw: 'male',
    age: 5,
    ageUnit: 'ANS',
    size: 'large',
    vaccinated: true,
    sterilized: true,
    health_status: 'fair',
    description: 'Gentil labrador tres sociable avec les enfants.',
    status: 'Visite possible',
    statusRaw: 'available',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d'],
    veterinaryInfo: ['Etat de sante : Moyen', 'Vaccine : Oui', 'Sterilise : Oui'],
  },
  {
    id: '4',
    name: 'Milo',
    species: 'cat',
    type: 'Chat',
    breed: 'Europeen',
    sex: 'Male',
    sexRaw: 'male',
    age: 1,
    ageUnit: 'ANS',
    size: 'small',
    vaccinated: false,
    sterilized: false,
    health_status: 'good',
    description: 'Jeune chat tres joueur et curieux.',
    status: 'Disponible',
    statusRaw: 'available',
    images: [],
    veterinaryInfo: ['Etat de sante : Bon', 'Vaccin : Non', 'Sterilise : Non'],
  },
];

const filterFallbackAnimals = (filters = {}) => {
  const type = filters.type && filters.type !== 'all' ? filters.type : null;
  const species = speciesToApi(type);
  const search = filters.search?.toLowerCase();
  const breed = filters.breed && filters.breed !== 'all' ? filters.breed.toLowerCase() : null;

  return fallbackAnimals.filter((animal) => {
    const matchesSpecies = !species || animal.species === species;
    const matchesBreed = !breed || animal.breed.toLowerCase().includes(breed);
    const matchesSearch = !search
      || animal.name.toLowerCase().includes(search)
      || animal.breed.toLowerCase().includes(search)
      || animal.description.toLowerCase().includes(search);

    return matchesSpecies && matchesBreed && matchesSearch;
  });
};

export const AnimalsProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimals = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      const species = speciesToApi(filters.type);
      if (species) params.species = species;
      if (filters.search) params.search = filters.search;
      if (filters.breed && filters.breed !== 'all') params.breed = filters.breed;

      const { data } = await axiosClient.get('/animals', { params });
      const list = (data.data || []).map(mapAnimalFromApi);
      setAnimals(list);
    } catch (err) {
      setError(null);
      setAnimals(filterFallbackAnimals(filters));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const getAnimalById = useCallback(
    async (id) => {
      const cached = animals.find((a) => String(a.id) === String(id));
      if (cached) return cached;

      try {
        const { data } = await axiosClient.get(`/animals/${id}`);
        const payload = data.data ?? data;
        return mapAnimalFromApi(payload);
      } catch {
        return fallbackAnimals.find((a) => String(a.id) === String(id)) || null;
      }
    },
    [animals]
  );

  return (
    <AnimalsContext.Provider value={{ animals, loading, error, fetchAnimals, getAnimalById }}>
      {children}
    </AnimalsContext.Provider>
  );
};

export const useAnimals = () => {
  const context = React.useContext(AnimalsContext);
  if (!context) {
    throw new Error('useAnimals must be used within AnimalsProvider');
  }
  return context;
};
