import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { useAnimals } from '../../context/AnimalsContext';

const ManageAnimals = () => {
  const { animals, addAnimal, updateAnimal, deleteAnimal } = useAnimals();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    ageUnit: 'ans',
    sex: 'M',
    vaccinated: false,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddAnimal = () => {
    if (!formData.name || !formData.breed) {
      alert('Veuillez remplir au moins le nom et la race');
      return;
    }

    if (editingId) {
      // Update mode
      const updatedData = {
        name: formData.name,
        breed: formData.breed,
        age: formData.age,
        ageUnit: formData.ageUnit,
        sex: formData.sex,
        vaccinated: formData.vaccinated,
        description: formData.description,
        images: formData.images
          ? formData.images.split(',').map((url) => url.trim())
          : ['https://via.placeholder.com/400x400?text=No+Image'],
      };
      updateAnimal(editingId, updatedData);
      setEditingId(null);
    } else {
      // Add mode
      addAnimal(formData);
    }

    setShowForm(false);
    setFormData({
      name: '',
      breed: '',
      age: '',
      ageUnit: 'ans',
      sex: 'M',
      vaccinated: false,
      description: '',
    });
  };

  const handleEditAnimal = (animal) => {
    setEditingId(animal.id);
    setFormData({
      name: animal.name,
      breed: animal.breed,
      age: animal.age,
      ageUnit: animal.ageUnit,
      sex: animal.sex,
      vaccinated: animal.vaccinated,
      description: animal.description,
    });
    setShowForm(true);
  };

  const handleDeleteAnimal = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      deleteAnimal(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl">Gestion Animaux</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              breed: '',
              age: '',
              ageUnit: 'ans',
              sex: 'M',
              vaccinated: false,
              description: '',
            });
            setShowForm(!showForm);
          }}
          variant={showForm ? 'outline' : 'primary'}
        >
          {showForm ? 'Annuler' : '+ Ajouter Animal'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">
            {editingId ? 'Modifier Animal' : 'Ajouter Animal'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Max"
            />
            <Input
              label="Race"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              placeholder="Ex: Berger Allemand"
            />
            <Input
              label="Âge"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="3"
            />
            <select
              name="ageUnit"
              value={formData.ageUnit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="ans">Ans</option>
              <option value="mois">Mois</option>
            </select>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="M">Mâle</option>
              <option value="F">Femelle</option>
            </select>
            <label className="flex items-center gap-2 px-3 py-2">
              <input
                type="checkbox"
                name="vaccinated"
                checked={formData.vaccinated}
                onChange={handleInputChange}
              />
              <span className="text-sm">Vacciné</span>
            </label>
            <Input
              label="Images (URLs séparées par des virgules)"
              name="images"
              value={formData.images || ''}
              onChange={handleInputChange}
              placeholder="https://... , https://..."
            />
            <Input
              label="Description"
              name="description"
              as="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Caractéristiques, tempérament..."
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="primary" onClick={handleAddAnimal}>
              {editingId ? 'Modifier' : 'Ajouter'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Annuler
            </Button>
          </div>
        </Card>
      )}

      {/* Animals Table - Responsive */}
      <Card className="overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/10 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-bold">Nom</th>
                <th className="text-left px-4 py-3 font-bold">Race</th>
                <th className="text-left px-4 py-3 font-bold">Âge</th>
                <th className="text-left px-4 py-3 font-bold">Sexe</th>
                <th className="text-left px-4 py-3 font-bold">Vacciné</th>
                <th className="text-right px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id} className="border-b hover:bg-muted/5">
                  <td className="px-4 py-3 font-bold">{animal.name}</td>
                  <td className="px-4 py-3">{animal.breed}</td>
                  <td className="px-4 py-3">
                    {animal.age} {animal.ageUnit}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={animal.sex === 'M' ? 'light' : 'solid'}>
                      {animal.sex === 'M' ? 'Mâle' : 'Femelle'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={animal.vaccinated ? 'solid' : 'muted'}
                    >
                      {animal.vaccinated ? 'Oui' : 'Non'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => handleEditAnimal(animal)}
                      className="text-xs px-2 py-1"
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteAnimal(animal.id)}
                      className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {animals.map((animal) => (
            <Card key={animal.id} className="p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-base">{animal.name}</h4>
                    <p className="text-sm text-muted">{animal.breed}</p>
                  </div>
                  <Badge>{animal.age} {animal.ageUnit}</Badge>
                </div>
                <div className="flex gap-2">
                  <Badge variant={animal.sex === 'M' ? 'light' : 'solid'}>
                    {animal.sex === 'M' ? 'Mâle' : 'Femelle'}
                  </Badge>
                  <Badge variant={animal.vaccinated ? 'solid' : 'muted'}>
                    {animal.vaccinated ? 'Vacciné' : 'Non vacciné'}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditAnimal(animal)}
                    className="flex-1 text-xs"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteAnimal(animal.id)}
                    className="flex-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {animals.length === 0 && (
        <div className="text-center py-12 text-muted">
          Aucun animal trouvé. Cliquez sur "+ Ajouter Animal" pour en ajouter un.
        </div>
      )}
    </div>
  );
};

export default ManageAnimals;
