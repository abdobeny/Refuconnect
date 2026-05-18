import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, HeartHandshake, LockKeyhole, MessageCircle, SearchCheck, ShieldCheck, Sparkles, Stethoscope, UserCheck } from 'lucide-react';
import { useAnimals } from '../../context/AnimalsContext';
import Button from '../../components/ui/Button';
import AnimalGrid from '../../components/features/animals/AnimalGrid';

const Home = () => {
  const navigate = useNavigate();
  const { animals, loading } = useAnimals();
  const animalCount = animals.length;
  const featuredAnimals = animals.slice(0, 3);
  const animalCountLabel = animalCount > 1
    ? `${animalCount} compagnons prêts à rencontrer leur famille`
    : animalCount === 1
      ? '1 compagnon prêt à rencontrer sa famille'
      : 'Bientôt de nouveaux compagnons';

  const adoptionSteps = [
    {
      icon: SearchCheck,
      title: 'Choisir un profil',
      text: 'Consultez les fiches et repérez un animal compatible avec votre rythme de vie.',
    },
    {
      icon: ClipboardCheck,
      title: 'Envoyer une demande',
      text: 'Expliquez votre situation pour aider le refuge à étudier l’adoption sérieusement.',
    },
    {
      icon: MessageCircle,
      title: 'Rencontrer l’animal',
      text: 'Un échange permet de confirmer que la rencontre peut devenir une vraie adoption.',
    },
  ];

  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Adoptions suivies',
      text: 'Chaque demande est vérifiée pour protéger l’animal et préparer une arrivée stable.',
    },
    {
      icon: Stethoscope,
      title: 'Informations utiles',
      text: 'Les fiches regroupent l’âge, la race, le caractère et les informations de suivi.',
    },
    {
      icon: HeartHandshake,
      title: 'Accompagnement humain',
      text: 'Le refuge reste présent avant la décision, pendant la rencontre et après l’adoption.',
    },
  ];

  const testimonials = [
    {
      quote: 'La fiche de Nala était claire et l’équipe nous a guidés avant la rencontre. On savait exactement à quoi s’attendre.',
      name: 'Salma R.',
      role: 'Adoptante',
    },
    {
      quote: 'Les demandes sont bien organisées. Pour le refuge, ça aide à répondre plus vite et à mieux suivre chaque adoption.',
      name: 'Yassine B.',
      role: 'Bénévole',
    },
    {
      quote: 'Même sans adopter, j’ai pu aider avec un don et suivre les besoins du refuge de manière simple.',
      name: 'Mina L.',
      role: 'Donatrice',
    },
  ];

  const reasons = [
    {
      icon: UserCheck,
      title: 'Demandes mieux suivies',
      text: 'Les informations importantes sont regroupées pour aider le refuge à traiter chaque demande avec sérieux.',
    },
    {
      icon: Sparkles,
      title: 'Profils plus fiables',
      text: 'Les fiches mettent en avant les détails utiles: âge, caractère, race, sexe et besoins particuliers.',
    },
    {
      icon: HeartHandshake,
      title: 'Aide au-delà de l’adoption',
      text: 'Le site valorise aussi les dons, le bénévolat, le toilettage et les services qui soutiennent le refuge.',
    },
  ];

  const handleView = (id) => {
    navigate(`/animaux/${id}`);
  };

  return (
    <div>
      <section
        className="relative h-[calc(100svh-4rem)] min-h-[420px] max-h-[620px] w-full overflow-hidden bg-cover bg-center lg:h-[calc(100svh-5rem)]"
        style={{ backgroundImage: 'url(/dog1.jpg)', backgroundPosition: 'center 38%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/48 to-black/18" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex h-full w-full items-center px-6">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-center">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl">
              Bienvenue sur RefuConnect
            </h1>
            <p className="mt-5 max-w-2xl text-2xl leading-9 text-white/90 drop-shadow">
              Adoptez un animal, changez une vie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" className="rounded-xl px-8 py-3 text-base font-bold" onClick={() => navigate('/animaux')}>
                Voir les animaux
              </Button>
              <Button variant="white" className="rounded-xl border border-white/30 bg-white/95 px-8 py-3 text-base font-bold" onClick={() => navigate('/dons')}>
                Faire un don
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid overflow-hidden rounded-3xl border border-background-beige bg-background-paper shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[430px] overflow-hidden bg-primary p-7 text-white lg:p-9">
            <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Parcours d’adoption</p>
                <h2 className="mt-3 max-w-md text-3xl font-bold leading-tight md:text-4xl">
                  Simple à comprendre, encadré par le refuge.
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-white/78">
                  Chaque demande passe par un parcours clair pour protéger l’animal, aider la famille à se préparer et garder un vrai échange avec l’équipe.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Dossier refuge</p>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    Une demande complète permet de mieux comprendre le foyer, le rythme de vie et les besoins de l’animal.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-3xl font-extrabold">{animalCount}</p>
                  <p className="mt-1 text-sm text-white/72">profils disponibles</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-3xl font-extrabold">3</p>
                    <p className="mt-1 text-sm text-white/72">étapes avant la rencontre</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-9">
            <div className="grid gap-4">
              {adoptionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="grid gap-4 rounded-2xl border border-background-beige bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Étape {index + 1}</p>
                      <h3 className="mt-1 text-xl font-bold text-text-dark">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-light">{step.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl bg-background-cream p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 text-sm font-bold text-text-dark">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-text-light">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mb-7 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Pourquoi nous choisir ?</p>
          <h2 className="mt-2 text-3xl font-bold text-text-dark">Une plateforme pensée pour le refuge et les familles.</h2>
          <p className="mt-3 leading-7 text-text-light">
            RefuConnect ne se limite pas à afficher des animaux. Le parcours aide à clarifier les demandes et à créer un lien plus sérieux entre le refuge et les adoptants.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="rounded-2xl border border-background-beige bg-background-paper p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text-dark">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-light">{reason.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-text-dark">
              Nos <span className="text-primary">animaux</span> à adopter
            </h2>
            <p className="mt-2 max-w-2xl text-text-light">
              Quelques profils disponibles actuellement. La page animaux permet de rechercher par nom, race ou type.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-fit rounded-full border border-background-beige bg-background-cream px-4 py-2 text-sm font-bold text-primary">
              {animalCountLabel}
            </span>
            <Button variant="white" className="rounded-full px-5 py-2 text-sm font-bold" onClick={() => navigate('/animaux')}>
              Voir tous
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-muted">Chargement des animaux...</p>
        ) : (
          <AnimalGrid animals={featuredAnimals} onView={handleView} />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-5 rounded-2xl border border-background-beige bg-background-paper p-6 shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-cream text-primary">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-dark">Processus sécurisé pour les demandes</h2>
            <p className="mt-1 leading-7 text-text-light">
              Les demandes d’adoption et les informations personnelles passent par un compte utilisateur, afin que le refuge puisse suivre chaque dossier proprement.
            </p>
          </div>
          <Button variant="white" className="h-11 rounded-xl px-5 text-sm font-bold" onClick={() => navigate('/connexion')}>
            Se connecter
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Témoignages</p>
          <h2 className="mt-2 text-3xl font-bold text-text-dark">Des parcours suivis avec confiance.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-2xl border border-background-beige bg-background-paper p-6 shadow-sm">
              <p className="text-sm leading-7 text-text-light">“{testimonial.quote}”</p>
              <div className="mt-5 border-t border-background-beige pt-4">
                <p className="font-bold text-text-dark">{testimonial.name}</p>
                <p className="text-sm text-accent">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-3xl bg-primary p-7 text-white shadow-soft md:p-10">
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Agir avec le refuge</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                Vous ne pouvez pas adopter aujourd’hui ? Vous pouvez quand même aider.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/78">
                RefuConnect met en avant plusieurs façons de soutenir les animaux: découvrir les profils, faire un don ou rejoindre l’équipe bénévole.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button variant="white" className="rounded-xl px-6 py-3 font-bold" onClick={() => navigate('/animaux')}>
                Voir les animaux
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="white" className="rounded-xl px-6 py-3 font-bold" onClick={() => navigate('/dons')}>
                Faire un don
              </Button>
              <Button variant="outline" className="rounded-xl border-white/50 px-6 py-3 font-bold text-white hover:bg-white/10" onClick={() => navigate('/bénévolat')}>
                Devenir bénévole
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
