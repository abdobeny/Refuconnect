import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { resolvePhotoUrl } from '../../api/mappers/animalMapper';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { FileText, Clock } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';

const statusLabels = {
  pending: { label: 'En attente', variant: 'light' },
  approved: { label: 'Approuvée', variant: 'solid' },
  rejected: { label: 'Refusée', variant: 'muted' },
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosClient.get('/my-adoptions');
        setAdoptions(data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger vos demandes.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { label: 'Demandes d\'adoption', value: adoptions.length, icon: FileText },
    {
      label: 'En attente',
      value: adoptions.filter((a) => a.status === 'pending').length,
      icon: Clock,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">
          Bonjour{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-2 text-muted">Suivez vos demandes auprès du refuge.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold">Mes demandes d&apos;adoption</h2>
          <Link to="/animaux">
            <Button variant="primary">Voir les animaux</Button>
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                <Skeleton variant="circle" className="h-20 w-20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text-lg" className="w-1/3" />
                  <Skeleton variant="text" className="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && adoptions.length === 0 && (
          <p className="text-muted">Vous n&apos;avez pas encore de demande d&apos;adoption.</p>
        )}

        <div className="space-y-4">
          {adoptions.map((adoption) => {
            const st = statusLabels[adoption.status] || { label: adoption.status, variant: 'muted' };
            const photo = adoption.animal?.photos?.[0];
            return (
              <div
                key={adoption.id}
                className="flex gap-4 rounded-xl border border-gray-100 p-4"
              >
                <img
                  src={photo ? resolvePhotoUrl(photo) : '/dog1.jpg'}
                  alt={adoption.animal?.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold">{adoption.animal?.name || 'Animal'}</h3>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Demandé le{' '}
                    {new Date(adoption.requested_at || adoption.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
