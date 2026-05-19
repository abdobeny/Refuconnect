import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { mapAnimalFromApi, speciesToApi } from '../api/mappers/animalMapper';

export const AnimalsContext = createContext();

export const AnimalsProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  const fetchAnimals = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      const species = speciesToApi(filters.type);
      if (species) params.species = species;
      if (filters.search) params.search = filters.search;
      if (filters.breed && filters.breed !== 'all') params.breed = filters.breed;
      if (filters.page) params.page = filters.page;
      params.per_page = 12;

      const { data } = await axiosClient.get('/animals', { params });
      const apiAnimals = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];
      const list = apiAnimals.map(mapAnimalFromApi);

      setAnimals(list);
      setPagination({
        current_page: data.meta?.current_page ?? 1,
        last_page: data.meta?.last_page ?? 1,
        per_page: data.meta?.per_page ?? 12,
        total: data.meta?.total ?? list.length,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les animaux depuis l API.');
      setAnimals([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0,
      });
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
        return null;
      }
    },
    [animals]
  );

  return (
    <AnimalsContext.Provider value={{ animals, loading, error, fetchAnimals, getAnimalById, pagination }}>
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
