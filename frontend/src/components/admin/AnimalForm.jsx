import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AnimalForm = ({ animal, onSubmit, onClose, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '',
    sex: 'male',
    description: '',
    size: 'medium',
    vaccinated: false,
    sterilized: false,
    health_status: 'good',
    status: 'available',
    photos: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.breed.trim()) newErrors.breed = 'La race est requise';
    if (!formData.age) newErrors.age = 'L\'âge est requis';
    if (parseInt(formData.age) < 0) newErrors.age = 'L\'âge doit être positif';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="font-serif text-2xl font-bold">
            {animal ? 'Modifier l\'animal' : 'Ajouter un animal'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name and Species */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200'
                }`}
                placeholder="Ex: Max"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Espèce *
              </label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="dog">Chien</option>
                <option value="cat">Chat</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>

          {/* Breed and Age */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Race *
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.breed
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200'
                }`}
                placeholder="Ex: Labrador"
              />
              {errors.breed && (
                <p className="mt-1 text-xs text-red-600">{errors.breed}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Âge (années) *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.age
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200'
                }`}
                placeholder="0"
              />
              {errors.age && (
                <p className="mt-1 text-xs text-red-600">{errors.age}</p>
              )}
            </div>
          </div>

          {/* Sex and Size */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sexe
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="male">Mâle</option>
                <option value="female">Femelle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Taille
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
              </select>
            </div>
          </div>

          {/* Health Status and Status */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                État de santé
              </label>
              <select
                name="health_status"
                value={formData.health_status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="good">Bon</option>
                <option value="fair">Moyen</option>
                <option value="poor">Mauvais</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="available">Disponible</option>
                <option value="in_care">En soin</option>
                <option value="adopted">Adopté</option>
                <option value="unavailable">Indisponible</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Décrivez le comportement, les caractéristiques spéciales..."
            />
          </div>

          {/* Health Info */}
          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="vaccinated"
                checked={formData.vaccinated}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-900">Vacciné</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="sterilized"
                checked={formData.sterilized}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-900">Stérilisé/Castré</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="white"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'En cours...' : animal ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AnimalForm;
