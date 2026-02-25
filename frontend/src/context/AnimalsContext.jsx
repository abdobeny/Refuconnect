import React, { createContext, useState } from 'react';
import mockAnimals from '../data/mockAnimals';

export const AnimalsContext = createContext();

export const AnimalsProvider = ({ children }) => {
  // Initialize with mock data
  const [animals, setAnimals] = useState(mockAnimals);

  const addAnimal = (newAnimal) => {
    const animal = {
      id: Date.now(),
      ...newAnimal,
      images: newAnimal.images
        ? newAnimal.images.split(',').map((url) => url.trim())
        : ['https://via.placeholder.com/400x400?text=No+Image'],
      veterinaryInfo: [],
    };
    setAnimals([...animals, animal]);
    return animal;
  };

  const updateAnimal = (id, updatedData) => {
    setAnimals(
      animals.map((a) => (a.id === id ? { ...a, ...updatedData } : a))
    );
  };

  const deleteAnimal = (id) => {
    setAnimals(animals.filter((a) => a.id !== id));
  };

  const getAnimalById = (id) => {
    return animals.find((a) => a.id === parseInt(id));
  };

  return (
    <AnimalsContext.Provider value={{ animals, addAnimal, updateAnimal, deleteAnimal, getAnimalById }}>
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
