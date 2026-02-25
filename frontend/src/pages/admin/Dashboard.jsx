import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useAnimals } from '../../context/AnimalsContext';

const Dashboard = () => {
  const { animals } = useAnimals();
  
  // Mock stats - in production, fetch from backend
  const stats = [
    { label: 'Animaux disponibles', value: animals.length, color: 'border-blue-500' },
    { label: "Demandes d'adoption", value: 7, color: 'border-primary' },
    { label: 'Dons ce mois', value: '1456.00 DH', color: 'border-secondary' },
    { label: 'RDV Toilettage', value: 4, color: 'border-green-500' },
  ];

  const activities = [
    { action: "Nouvelle demande d'adoption pour Bella", time: 'Il y a 2h', status: 'pending' },
    { action: 'Don reçu (Matériel)', time: 'Il y a 5h', status: 'success' },
    { action: 'Demande de couplage de Max', time: 'Il y a 1j', status: 'pending' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl">Tableau de bord</h2>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold flex items-center gap-2">
          👤 Admin
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {stats.map((stat, i) => (
          <Card key={i} className={`p-4 md:p-6 border-l-4 ${stat.color}`}>
            <div className="text-muted text-xs md:text-sm">{stat.label}</div>
            <div className="text-2xl md:text-3xl font-bold mt-2">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-4 md:p-6">
        <h3 className="font-bold text-lg mb-4">Activités récentes</h3>
        <div className="space-y-3 md:space-y-4">
          {activities.map((a, i) => (
            <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4 border-b pb-3 md:pb-4 last:border-0">
              <div className="flex-1">
                <div className="font-bold text-sm">{a.action}</div>
                <div className="text-xs text-muted">{a.time}</div>
              </div>
              <Badge variant={a.status === 'pending' ? 'light' : 'solid'} className="w-fit">
                {a.status === 'pending' ? 'En attente' : 'Reçu'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
