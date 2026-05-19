import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Filter,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import AnimalForm from '../../components/admin/AnimalForm';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';

const statusLabels = {
  available: { label: 'Disponible', color: 'bg-green-100 text-green-800' },
  in_care: { label: 'En soin', color: 'bg-blue-100 text-blue-800' },
  adopted: { label: 'Adopté', color: 'bg-purple-100 text-purple-800' },
  unavailable: { label: 'Indisponible', color: 'bg-gray-100 text-gray-800' },
};

const speciesLabels = {
  dog: 'Chien',
  cat: 'Chat',
  other: 'Autre',
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setError('Accès refusé. Vous devez être administrateur.');
    }
  }, [user]);

  // Load animals
  useEffect(() => {
    if (user?.role === 'admin') {
      loadAnimals();
    }
  }, [user]);

  const loadAnimals = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosClient.get('/animals', {
        params: {
          per_page: 100,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
        },
      });
      setAnimals(data.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des animaux.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddAnimal = () => {
    setEditingAnimal(null);
    setShowForm(true);
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingAnimal) {
        await axiosClient.put(`/admin/animals/${editingAnimal.id}`, formData);
      } else {
        await axiosClient.post('/admin/animals', formData);
      }
      setShowForm(false);
      setEditingAnimal(null);
      await loadAnimals();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (animal) => {
    setDeleteConfirm(animal);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await axiosClient.delete(`/admin/animals/${deleteConfirm.id}`);
      setDeleteConfirm(null);
      await loadAnimals();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (animal, newStatus) => {
    try {
      await axiosClient.patch(`/admin/animals/${animal.id}/status`, {
        status: newStatus,
      });
      await loadAnimals();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
          <h2 className="font-serif text-2xl font-bold">Accès refusé</h2>
          <p className="mt-3 text-muted">
            Vous devez être administrateur pour accéder à cette section.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-text-dark">
          Gestion des animaux
        </h1>
        <p className="mt-2 text-text-light">
          Gérez les animaux du refuge : ajouter, modifier, supprimer et changer le statut
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou race..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setLoading(true);
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="in_care">En soin</option>
            <option value="adopted">Adopté</option>
            <option value="unavailable">Indisponible</option>
          </select>
        </div>
        <Button
          variant="primary"
          onClick={handleAddAnimal}
          className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold"
        >
          <Plus className="h-5 w-5" />
          Ajouter un animal
        </Button>
      </div>

      {/* Animals table/grid */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-20" />
          ))}
        </div>
      ) : filteredAnimals.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-text-light">
            {searchTerm ? 'Aucun animal trouvé.' : 'Aucun animal dans le refuge.'}
          </p>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Espèce
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Race
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Âge
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{animal.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {speciesLabels[animal.species] || animal.species}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{animal.breed}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{animal.age} ans</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={animal.status}
                      onChange={(e) => handleStatusChange(animal, e.target.value)}
                      className={`rounded px-3 py-1 text-xs font-medium border-0 cursor-pointer ${
                        statusLabels[animal.status]?.color || 'bg-gray-100'
                      }`}
                    >
                      {Object.entries(statusLabels).map(([key, { label }]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAnimal(animal)}
                        className="inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 className="h-3 w-3" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteClick(animal)}
                        className="inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Animal Form Modal */}
      {showForm && (
        <AnimalForm
          animal={editingAnimal}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingAnimal(null);
          }}
          isSubmitting={submitting}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmation
          animal={deleteConfirm}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          isDeleting={submitting}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
