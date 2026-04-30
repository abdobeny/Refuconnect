const mockAnimals = [
  {
    id: '1',
    name: 'Max',
    age: 2,
    ageUnit: 'ANS',
    breed: 'Berger Allemand',
    sex: 'Male',
    vaccinated: true,
    images: ['/dog1.jpg'],
    description: 'Chien affectueux et sportif, adapté à une famille active.',
    veterinaryInfo: ['Carnet de santé : Disponible', 'Suivi vétérinaire : Oui']
  },
  {
    id: '2',
    name: 'Bella',
    age: 4,
    ageUnit: 'MOIS',
    breed: 'Chaton',
    sex: 'Femelle',
    vaccinated: false,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop'],
    description: "Chatonne joueuse, très sociable avec les enfants.",
    veterinaryInfo: ['Carnet de santé : En cours', 'Suivi vétérinaire : Non']
  },
  {
    id: '3',
    name: 'Leo',
    age: 3,
    ageUnit: 'ANS',
    breed: 'Labrador',
    sex: 'Male',
    vaccinated: true,
    images: ['/dog3.webp'],
    description: 'Calme et sociable, habitué aux autres animaux.',
    veterinaryInfo: ['Carnet de santé : Disponible', 'Suivi vétérinaire : Oui']
  },
  {
    id: '4',
    name: 'Milo',
    age: 1,
    ageUnit: 'ANS',
    breed: 'Bouledogue',
    sex: 'Male',
    vaccinated: true,
    images: [],
    description: 'Petit gabarit, adore les câlins.',
    veterinaryInfo: ['Carnet de santé : Disponible']
  }
];

export default mockAnimals;
