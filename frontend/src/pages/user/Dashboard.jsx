import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { resolvePhotoUrl } from '../../api/mappers/animalMapper';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import TestimonialSection from '../../components/features/testimonials/TestimonialSection';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Gift,
  Heart,
  HeartHandshake,
  Mail,
  MessageSquare,
  PawPrint,
  Plus,
  Scissors,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const CACHE_KEY = 'refuconnect:user-dashboard:v1';

const emptyDashboard = {
  adoptions: [],
  donations: [],
  grooming: [],
  coupling: [],
  volunteers: [],
  testimonials: [],
  stats: null,
};

const statusLabels = {
  pending: { label: 'En attente', variant: 'light', tone: 'text-[#A05A1F]' },
  approved: { label: 'Approuvee', variant: 'solid', tone: 'text-[#4E7D5F]' },
  rejected: { label: 'Refusee', variant: 'muted', tone: 'text-muted' },
  completed: { label: 'Terminee', variant: 'solid', tone: 'text-[#4E7D5F]' },
  cancelled: { label: 'Annulee', variant: 'muted', tone: 'text-muted' },
};

const safeReadCache = () => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const formatDate = (value) => {
  if (!value) return 'Date a confirmer';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date a confirmer';
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const statusMeta = (status) => statusLabels[status] || { label: status || 'En attente', variant: 'muted', tone: 'text-muted' };

const getFirstName = (user) => {
  const source = user?.name || user?.email?.split('@')[0] || '';
  return source ? source.split(' ')[0] : 'membre';
};

const UserDashboard = () => {
  const { user } = useAuth();
  const cached = useMemo(() => safeReadCache(), []);
  const [data, setData] = useState(cached?.data || emptyDashboard);
  const [loading, setLoading] = useState(!cached);
  const [refreshing, setRefreshing] = useState(Boolean(cached));
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setError('');
      if (!cached) setLoading(true);
      if (cached) setRefreshing(true);

      const requests = [
        ['adoptions', axiosClient.get('/my-adoptions')],
        ['donations', axiosClient.get('/my-donations')],
        ['grooming', axiosClient.get('/my-grooming')],
        ['coupling', axiosClient.get('/my-coupling-requests')],
        ['volunteers', axiosClient.get('/my-volunteer-applications')],
        ['testimonials', axiosClient.get('/my-testimonials')],
        ['stats', axiosClient.get('/stats')],
      ];

      const results = await Promise.allSettled(requests.map(([, request]) => request));
      if (!mounted) return;

      const nextData = { ...emptyDashboard };
      let failed = 0;

      results.forEach((result, index) => {
        const key = requests[index][0];
        if (result.status !== 'fulfilled') {
          failed += 1;
          nextData[key] = key === 'stats' ? null : [];
          return;
        }

        if (key === 'stats') {
          nextData.stats = result.value.data || null;
          return;
        }

        nextData[key] = result.value.data?.data || [];
      });

      setData(nextData);
      setLoading(false);
      setRefreshing(false);

      if (failed === requests.length) {
        setError('Impossible de charger le tableau de bord pour le moment.');
        return;
      }

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: nextData, savedAt: Date.now() }));
      } catch {
        // Cache is optional.
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [cached]);

  const activity = useMemo(() => {
    const rows = [
      ...data.adoptions.map((item) => ({
        id: `adoption-${item.id}`,
        type: 'Adoption',
        title: item.animal?.name || 'Demande adoption',
        subtitle: 'Dossier transmis au refuge',
        status: item.status,
        date: item.requested_at || item.created_at,
        image: item.animal?.photos?.[0] ? resolvePhotoUrl(item.animal.photos[0]) : '/dog1.jpg',
      })),
      ...data.donations.map((item) => ({
        id: `donation-${item.id}`,
        type: 'Don',
        title: item.amount ? `${Number(item.amount).toLocaleString('fr-FR')} DH` : item.item_description || 'Don materiel',
        subtitle: item.type === 'financial' ? 'Contribution financiere enregistree' : 'Contribution materielle enregistree',
        status: item.status,
        date: item.donation_date || item.created_at,
        icon: Gift,
      })),
      ...data.grooming.map((item) => ({
        id: `grooming-${item.id}`,
        type: 'Toilettage',
        title: item.pet_name || 'Reservation toilettage',
        subtitle: `${item.pet_type || 'Animal'} - ${item.service_type || 'Service a confirmer'}`,
        status: item.status,
        date: item.reservation_date || item.created_at,
        icon: Scissors,
      })),
      ...data.coupling.map((item) => ({
        id: `coupling-${item.id}`,
        type: 'Couplage',
        title: item.pet_breed || 'Dossier couplage',
        subtitle: `${item.pet_species || 'Animal'} - ${item.pet_age || 'age a confirmer'}`,
        status: item.status,
        date: item.created_at,
        icon: Heart,
      })),
      ...data.volunteers.map((item) => ({
        id: `volunteer-${item.id}`,
        type: 'Benevolat',
        title: item.name || 'Candidature benevole',
        subtitle: item.phone ? `Contact: ${item.phone}` : 'Candidature envoyee au refuge',
        status: item.status,
        date: item.created_at,
        icon: UsersRound,
      })),
    ];

    return rows.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [data]);

  const pendingCount = activity.filter((item) => item.status === 'pending').length;
  const completedCount = activity.filter((item) => ['approved', 'completed'].includes(item.status)).length;
  const firstName = getFirstName(user);
  const lastActivity = activity[0];

  const stats = [
    { label: 'Dossiers', value: activity.length, icon: FileText, note: 'Toutes demandes' },
    { label: 'En attente', value: pendingCount, icon: Clock, note: 'A suivre' },
    { label: 'Traites', value: completedCount, icon: CheckCircle2, note: 'Valides ou termines' },
    { label: 'Animaux', value: data.stats?.animals_available ?? '-', icon: PawPrint, note: 'Disponibles' },
  ];

  const quickActions = [
    { label: 'Adopter', to: '/animaux', icon: PawPrint },
    { label: 'Faire un don', to: '/dons', icon: Gift },
    { label: 'Toilettage', to: '/toilettage', icon: Scissors },
    { label: 'Benevolat', to: '/bénévolat', icon: HeartHandshake },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-[28px] bg-primary p-6 text-white shadow-soft md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                <Sparkles className="h-4 w-4 text-[#E7C8B5]" />
                Espace membre
              </p>
              <h1 className="mt-4 font-sans text-3xl font-bold leading-tight md:text-4xl">
                Bonjour, {firstName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
                Suivez vos dossiers, vos dons et vos rendez-vous avec le refuge depuis un espace clair et a jour.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/80">
              <p className="font-semibold text-white">Derniere activite</p>
              <p className="mt-1">{lastActivity ? `${lastActivity.type} - ${formatDate(lastActivity.date)}` : 'Aucune demande pour le moment'}</p>
              {refreshing && <p className="mt-2 text-xs text-white/60">Mise a jour en cours...</p>}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-dark">Actions rapides</p>
              <p className="text-xs text-muted">Demarrer une nouvelle demande</p>
            </div>
            <Plus className="h-5 w-5 text-accent" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-2 rounded-xl border border-primary/10 bg-[#FBFAF7] px-3 py-3 text-sm font-semibold text-primary transition hover:border-primary/25 hover:bg-primary-light"
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="mt-2 font-sans text-3xl font-bold text-primary-dark">{loading ? '-' : stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{stat.note}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[28px] border border-primary/10 bg-white shadow-soft">
          <div className="flex flex-col gap-3 border-b border-primary/10 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-sans text-xl font-bold text-primary-dark">Vos témoignages</h2>
              <p className="mt-1 text-sm text-muted">Partagez votre expérience avec le refuge.</p>
            </div>
          </div>
          <div className="p-5">
            <TestimonialSection testimonials={data.testimonials} loading={loading} />
          </div>
        </section>

        <aside className="space-y-6">

          <div className="p-5">
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl border border-primary/10 p-4">
                    <Skeleton variant="circle" className="h-12 w-12 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton variant="text-lg" className="w-1/3" />
                      <Skeleton variant="text" className="w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && activity.length === 0 && (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-[#FBFAF7] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-sans text-lg font-bold text-primary-dark">Votre espace est pret</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  Vous n'avez pas encore de demande enregistree. Commencez par une adoption, un don, une reservation toilettage ou une candidature benevole.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickActions.slice(0, 3).map((action) => (
                    <Link key={action.label} to={action.to} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-primary-light">
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!loading && activity.length > 0 && (
              <div className="space-y-3">
                {activity.slice(0, 8).map((item) => {
                  const st = statusMeta(item.status);
                  const Icon = item.icon || PawPrint;
                  return (
                    <article key={item.id} className="flex gap-4 rounded-2xl border border-primary/10 p-4 transition hover:border-primary/20 hover:bg-[#FBFAF7]">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-14 w-14 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-accent">{item.type}</p>
                            <h3 className="font-sans text-base font-bold text-primary-dark">{item.title}</h3>
                          </div>
                          <Badge variant={st.variant}>{st.label}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                        <p className={`mt-2 text-xs font-semibold ${st.tone}`}>{formatDate(item.date)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <aside className="space-y-6">
          <section className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-soft">
            <h2 className="font-sans text-lg font-bold text-primary-dark">Resume du compte</h2>
            <div className="mt-4 space-y-3">
              {[
                ['Email', user?.email || 'Non renseigne', Mail],
                ['Demandes en cours', `${pendingCount}`, Clock],
                ['Prochaine etape', pendingCount ? 'Attendre la reponse du refuge' : 'Demarrer une action', CalendarCheck],
              ].map(([label, value, Icon]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-[#FBFAF7] p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">{label}</p>
                    <p className="truncate text-sm font-semibold text-primary-dark">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] bg-[#E9EFE9] p-5">
            <h2 className="font-sans text-lg font-bold text-primary-dark">Besoin d'aide ?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Contactez l'equipe pour une question sur un dossier, un don ou un rendez-vous.
            </p>
            <a
              href="mailto:contact@refuconnect.fr"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Contacter le refuge
              <ArrowRight className="h-4 w-4" />
            </a>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default UserDashboard;
