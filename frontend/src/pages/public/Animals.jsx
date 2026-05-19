import React, { useState, useEffect } from 'react';
import AnimalGrid from '../../components/features/animals/AnimalGrid';
import { useAnimals } from '../../context/AnimalsContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Heart, PawPrint, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';

const Animals = () => {
  const navigate = useNavigate();
  const { animals, loading, error, fetchAnimals, pagination } = useAnimals();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('available');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAnimals({ type: selectedType, search: searchTerm || undefined, breed: selectedBreed, status: selectedStatus, page: 1 });
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedType, searchTerm, selectedBreed, selectedStatus, fetchAnimals]);

  const handleView = (id) => navigate(`/animaux/${id}`);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchAnimals({ type: selectedType, search: searchTerm || undefined, breed: selectedBreed, status: selectedStatus, page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const adoptionLabel = pagination.total > 1
    ? `${pagination.total} profils à consulter`
    : pagination.total === 1
      ? '1 profil à consulter'
      : 'Aucun profil trouvé';
  const hasActiveFilters = searchTerm || selectedType !== 'all' || selectedBreed !== 'all';

  return (
    <div className="min-h-screen bg-background-cream">
      <section className="border-b border-background-beige bg-background-paper px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-center">
            <div className="border-l-4 border-primary pl-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                Adoption
              </p>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-text-dark md:text-4xl">
                Nos animaux à adopter
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-text-light">
                Retrouvez ici les animaux actuellement pris en charge par RefuConnect. Chaque fiche rassemble les informations utiles avant de contacter le refuge.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-md border border-background-beige bg-background-cream px-3 py-2 text-sm font-semibold text-primary">
                  <PawPrint className="h-4 w-4" />
                  {adoptionLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
                  <Heart className="h-4 w-4" />
                  Demande étudiée par l'équipe
                </span>
              </div>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-background-beige bg-background-paper shadow-[0_12px_32px_rgba(31,37,35,0.10)] sm:grid-cols-[190px_1fr]">
              <div className="relative h-44 sm:h-full">
                <img
                  src="/dog44.webp"
                  alt="Rencontre avec un animal avant adoption"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="p-5">
                <span className="mb-3 inline-flex rounded-md bg-background-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                  Conseil du refuge
                </span>
                <h2 className="text-xl font-bold text-text-dark">Avant de choisir</h2>
                <p className="mt-2 text-sm leading-6 text-text-light">
                  Une adoption se prépare avec calme. Vérifiez que le profil correspond vraiment à votre quotidien.
                </p>
                <div className="mt-4 grid gap-2">
                  {[
                    "Temps d'adaptation prévu",
                    'Espace et rythme adaptés',
                    'Échange avec le refuge',
                  ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-text-light">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-dark">Rechercher un animal</h2>
              <p className="text-sm text-text-light">Filtrez la liste sans quitter la page.</p>
            </div>
            <span className="text-sm font-semibold text-accent">{pagination.total} résultat{pagination.total > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Chercher par nom ou race..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-text-main outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 font-semibold text-text-main transition-all hover:border-background-beige hover:bg-background-cream hover:text-primary"
              >
                <Filter className="h-4 w-4" />
                Filtres
              </button>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedBreed('all');
                  }}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                  Effacer
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-5 border-t border-slate-100 pt-4 lg:grid-cols-3">
              <div>
                <label className="mb-3 block text-sm font-bold text-text-dark">
                  Type d'animal
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'Chien', 'Chat'].map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                        selectedType === type
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-background-cream hover:text-primary'
                      }`}
                    >
                      {type === 'all' ? 'Tous' : type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold text-text-dark">
                  Statut
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'available', label: 'Disponible' },
                    { value: 'adopted', label: 'Adopté' },
                    { value: 'in_care', label: 'En soins' },
                    { value: 'all', label: 'Tous' },
                  ].map(status => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                        selectedStatus === status.value
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-background-cream hover:text-primary'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold text-text-dark">
                  Race
                </label>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-text-main outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                >
                  <option value="all">Toutes les races</option>
                  {animals.map(a => a.breed).filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i).map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-dark">Animaux disponibles</h2>
            <p className="mt-1 text-text-light">
              Page {pagination.current_page} sur {pagination.last_page} — {animals.length} affiché{animals.length > 1 ? 's' : ''} sur {pagination.total}.
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Skeleton variant="card" className="h-56 rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton variant="text-xl" className="w-2/3" />
                  <Skeleton variant="text" className="w-1/2" />
                  <Skeleton variant="text" className="w-full" />
                  <Skeleton variant="text" className="w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && !loading && (
          <p className="py-12 text-center text-red-600">{error}</p>
        )}
        {!loading && !error && animals.length > 0 ? (
          <>
            <AnimalGrid animals={animals} onView={handleView} />
            {pagination.last_page > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
                      p === pagination.current_page
                        ? 'bg-primary text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : !loading && !error ? (
          <div className="rounded-2xl border border-background-beige bg-white px-6 py-16 text-center shadow-soft">
            <p className="mb-4 text-lg text-text-light">
              Aucun animal ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedBreed('all');
              }}
              className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-all hover:bg-primary-hover"
            >
              Voir tous les animaux
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Animals;
