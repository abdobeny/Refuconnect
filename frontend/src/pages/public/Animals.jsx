import React, { useState, useEffect } from 'react';
import AnimalGrid from '../../components/features/animals/AnimalGrid';
import { useAnimals } from '../../context/AnimalsContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Heart, PawPrint, CheckCircle2 } from 'lucide-react';

const Animals = () => {
  const navigate = useNavigate();
  const { animals, loading, error, fetchAnimals } = useAnimals();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAnimals({ type: selectedType, search: searchTerm || undefined });
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedType, searchTerm, fetchAnimals]);

  const handleView = (id) => navigate(`/animaux/${id}`);

  // Get unique animal types and breeds
  const types = ['all', ...new Set(animals.map(a => a.type).filter(Boolean))];
  const breeds = ['all', ...new Set(animals.map(a => a.breed).filter(Boolean))];

  // Filter animals
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || animal.type === selectedType;
    const matchesBreed = selectedBreed === 'all' || animal.breed === selectedBreed;
    
    return matchesSearch && matchesType && matchesBreed;
  });

  const adoptionCount = filteredAnimals.length;
  const adoptionLabel = adoptionCount > 1
    ? `${adoptionCount} profils à consulter`
    : adoptionCount === 1
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
                    'Temps d’adaptation prévu',
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
            <span className="text-sm font-semibold text-accent">{adoptionCount} résultat{adoptionCount > 1 ? 's' : ''}</span>
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
            <div className="mt-4 grid gap-5 border-t border-slate-100 pt-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <label className="mb-3 block text-sm font-bold text-text-dark">
                  Type d'animal
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                        selectedType === type
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-background-cream hover:text-primary'
                      }`}
                    >
                      {type === 'all' ? 'Tous' : type.charAt(0).toUpperCase() + type.slice(1)}
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
                  {breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed === 'all' ? 'Toutes les races' : breed}
                    </option>
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
              {adoptionCount} résultat{adoptionCount > 1 ? 's' : ''} affiché{adoptionCount > 1 ? 's' : ''} avec vos critères.
            </p>
          </div>
        </div>

        {loading && (
          <p className="py-12 text-center text-muted">Chargement des animaux...</p>
        )}
        {error && !loading && (
          <p className="py-12 text-center text-red-600">{error}</p>
        )}
        {!loading && !error && filteredAnimals.length > 0 ? (
          <AnimalGrid animals={filteredAnimals} onView={handleView} />
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
