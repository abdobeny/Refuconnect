import { API_ORIGIN } from '../../config';

const speciesLabels = { dog: 'Chien', cat: 'Chat' };
const sexLabels = { male: 'Male', female: 'Femelle' };
const statusLabels = {
  available: 'Disponible',
  adopted: 'Adopté',
  in_care: 'En soins',
};

export function resolvePhotoUrl(photo) {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  return `${API_ORIGIN}${photo.startsWith('/') ? photo : `/${photo}`}`;
}

export function mapAnimalFromApi(animal) {
  const photos = (animal.photos || []).map(resolvePhotoUrl).filter(Boolean);

  const healthLines = [];
  if (animal.health_status) {
    const healthMap = { good: 'Bon', fair: 'Moyen', critical: 'Fragile' };
    healthLines.push(`État de santé : ${healthMap[animal.health_status] || animal.health_status}`);
  }
  if (animal.vaccinated != null) {
    healthLines.push(`Vacciné : ${animal.vaccinated ? 'Oui' : 'Non'}`);
  }
  if (animal.sterilized != null) {
    healthLines.push(`Stérilisé : ${animal.sterilized ? 'Oui' : 'Non'}`);
  }

  return {
    id: String(animal.id),
    name: animal.name,
    species: animal.species,
    type: speciesLabels[animal.species] || animal.species,
    breed: animal.breed,
    sex: sexLabels[animal.sex] || animal.sex,
    sexRaw: animal.sex,
    age: animal.age,
    ageUnit: 'ANS',
    size: animal.size,
    vaccinated: animal.vaccinated,
    sterilized: animal.sterilized,
    health_status: animal.health_status,
    description: animal.description || '',
    status: statusLabels[animal.status] || animal.status,
    statusRaw: animal.status,
    images: photos,
    veterinaryInfo: healthLines.length ? healthLines : ['Informations à confirmer avec le refuge'],
  };
}

export function speciesToApi(type) {
  if (!type || type === 'all') return null;
  const map = { Chien: 'dog', Chat: 'cat', dog: 'dog', cat: 'cat' };
  return map[type] || null;
}
