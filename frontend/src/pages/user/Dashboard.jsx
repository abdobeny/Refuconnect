import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Heart, FileText, Clock } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock user adoption applications & favorites
  const adoptionApplications = [
    {
      id: 1,
      animalName: 'Bella',
      animalImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100',
      status: 'approved',
      appliedDate: '2024-01-20',
      statusLabel: 'Approuvée',
    },
    {
      id: 2,
      animalName: 'Max',
      animalImage: 'https://images.unsplash.com/photo-1587300411515-150e88cd8744?w=100',
      status: 'pending',
      appliedDate: '2024-02-10',
      statusLabel: 'En attente',
    },
    {
      id: 3,
      animalName: 'Luna',
      animalImage: 'https://images.unsplash.com/photo-1574158622147-e121317e57d3?w=100',
      status: 'rejected',
      appliedDate: '2024-01-05',
      statusLabel: 'Non approuvée',
    },
  ];

  const favorites = [
    { id: 1, name: 'Bella', breed: 'Golden Retriever' },
    { id: 2, name: 'Shadow', breed: 'Chat Noir' },
  ];

  const stats = [
    { label: 'Demandes', value: adoptionApplications.length, icon: '📋' },
    { label: 'Favoris', value: favorites.length, icon: '❤️' },
    { label: 'Visites', value: 12, icon: '👁️' },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'solid';
      case 'pending':
        return 'light';
      case 'rejected':
        return 'muted';
      default:
        return 'light';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-blue-50 text-blue-700';
      case 'rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white p-6 md:p-8 rounded-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          Bienvenue, Abdel Beny!
        </h1>
        <p className="text-orange-50">Suivez vos demandes d'adoption et gérez vos animaux favoris</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Adoption Applications */}
      <div>
        <h2 className="font-serif text-2xl font-bold mb-4">Mes demandes d'adoption</h2>
        {adoptionApplications.length === 0 ? (
          <Card className="p-6 text-center text-muted">
            <p>Aucune demande d'adoption pour le moment.</p>
            <Button variant="primary" className="mt-4" onClick={() => navigate('/animaux')}>
              Voir les animaux
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {adoptionApplications.map((app) => (
              <Card key={app.id} className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={app.animalImage}
                      alt={app.animalName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{app.animalName}</h3>
                      <p className="text-sm text-muted">Demandé le {new Date(app.appliedDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={getStatusVariant(app.status)}
                      className={getStatusColor(app.status)}
                    >
                      {app.statusLabel}
                    </Badge>
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() => navigate(`/animaux/${app.id}`)}
                    >
                      Voir le profil
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Favorites */}
      <div>
        <h2 className="font-serif text-2xl font-bold mb-4">Mes animaux favoris</h2>
        {favorites.length === 0 ? (
          <Card className="p-6 text-center text-muted">
            <p>Aucun animal dans vos favoris.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((fav) => (
              <Card key={fav.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{fav.name}</h3>
                    <p className="text-sm text-muted">{fav.breed}</p>
                  </div>
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                </div>
                <Button variant="outline" className="w-full text-sm">
                  Voir le profil
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white">
        <h3 className="font-serif text-lg font-bold mb-4">Actions rapides</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <Button variant="primary" onClick={() => navigate('/animaux')}>
            Voir les animaux
          </Button>
          <Button variant="outline" onClick={() => navigate('/dons')}>
            Faire un don
          </Button>
          <Button variant="white" onClick={() => navigate('/bénévolat')}>
            Devenir bénévole
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
