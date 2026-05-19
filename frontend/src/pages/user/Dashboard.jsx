import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { resolvePhotoUrl } from '../../api/mappers/animalMapper';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import { CalendarCheck, Clock, FileText, Gift, Heart, PawPrint, Scissors, UsersRound } from 'lucide-react';

const statusLabels = {
  pending: { label: 'En attente', variant: 'light' },
  approved: { label: 'Approuvée', variant: 'solid' },
  rejected: { label: 'Refusée', variant: 'muted' },
  completed: { label: 'Terminée', variant: 'solid' },
  cancelled: { label: 'Annulée', variant: 'muted' },
};

const formatDate = (value) => {
  if (!value) return 'Date à confirmer';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date à confirmer';
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const statusMeta = (status) => statusLabels[status] || { label: status || 'En attente', variant: 'muted' };

const UserDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    adoptions: [],
    donations: [],
    grooming: [],
    coupling: [],
    volunteers: [],
  });
  const [globalStats, setGlobalStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [adoptionsRes, donationsRes, groomingRes, couplingRes, volunteersRes, statsRes] = await Promise.all([
          axiosClient.get('/my-adoptions'),
          axiosClient.get('/my-donations'),
          axiosClient.get('/my-grooming'),
          axiosClient.get('/my-coupling-requests'),
          axiosClient.get('/my-volunteer-applications'),
          axiosClient.get('/stats'),
        ]);

        setData({
          adoptions: adoptionsRes.data.data || [],
          donations: donationsRes.data.data || [],
          grooming: groomingRes.data.data || [],
          coupling: couplingRes.data.data || [],
          volunteers: volunteersRes.data.data || [],
        });
        setGlobalStats(statsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger le tableau de bord.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activity = useMemo(() => {
    const rows = [
      ...data.adoptions.map((item) => ({
        id: `adoption-${item.id}`,
        type: 'Adoption',
        title: item.animal?.name || 'Demande adoption',
        subtitle: 'Demande pour adopter un animal du refuge',
        status: item.status,
        date: item.requested_at || item.created_at,
        image: item.animal?.photos?.[0] ? resolvePhotoUrl(item.animal.photos[0]) : '/dog1.jpg',
      })),
      ...data.donations.map((item) => ({
        id: `donation-${item.id}`,
        type: 'Don',
        title: item.amount ? `${Number(item.amount).toLocaleString('fr-FR')} DH` : item.item_description || 'Don matériel',
        subtitle: item.type === 'financial' ? 'Contribution financière enregistrée' : 'Contribution matérielle enregistrée',
        status: item.status,
        date: item.donation_date || item.created_at,
        icon: Gift,
      })),
      ...data.grooming.map((item) => ({
        id: `grooming-${item.id}`,
        type: 'Toilettage',
        title: item.pet_name || 'Réservation toilettage',
        subtitle: `${item.pet_type || 'Animal'} - ${item.service_type || 'Service à confirmer'}`,
        status: item.status,
        date: item.reservation_date || item.created_at,
        icon: Scissors,
      })),
      ...data.coupling.map((item) => ({
        id: `coupling-${item.id}`,
        type: 'Couplage',
        title: item.pet_breed || 'Dossier couplage',
        subtitle: `${item.pet_species || 'Animal'} - ${item.pet_age || 'âge à confirmer'}`,
        status: item.status,
        date: item.created_at,
        icon: Heart,
      })),
      ...data.volunteers.map((item) => ({
        id: `volunteer-${item.id}`,
        type: 'Bénévolat',
        title: item.name || 'Candidature bénévole',
        subtitle: item.phone ? `Contact: ${item.phone}` : 'Candidature envoyée au refuge',
        status: item.status,
        date: item.created_at,
        icon: UsersRound,
      })),
    ];

    return rows.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [data]);

  const pendingCount = activity.filter((item) => item.status === 'pending').length;
  const dashboardStats = [
    { label: 'Mes dossiers', value: activity.length, icon: FileText },
    { label: 'En attente', value: pendingCount, icon: Clock },
    { label: 'Animaux disponibles', value: globalStats?.animals_available ?? '-', icon: PawPrint },
    { label: 'Actions refuge', value: (data.donations.length + data.grooming.length + data.volunteers.length), icon: CalendarCheck },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">
          Bonjour{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-2 text-muted">Suivez toutes vos demandes auprès du refuge.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => {
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
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold">Mes activités</h2>
            <p className="mt-1 text-sm text-muted">Adoptions, dons, toilettage, couplage et bénévolat.</p>
          </div>
          <Link to="/animaux">
            <Button variant="primary">Voir les animaux</Button>
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                <Skeleton variant="circle" className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text-lg" className="w-1/3" />
                  <Skeleton variant="text" className="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && activity.length === 0 && (
          <div className="rounded-2xl border border-dashed border-background-beige bg-background-cream p-6 text-muted">
            Vous n'avez pas encore de demande enregistrée.
          </div>
        )}

        <div className="space-y-4">
          {activity.map((item) => {
            const st = statusMeta(item.status);
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-accent">{item.type}</p>
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                  <p className="mt-2 text-xs font-semibold text-text-light">{formatDate(item.date)}</p>
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
