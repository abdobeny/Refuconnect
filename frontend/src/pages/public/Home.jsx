import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarHeart,
  ClipboardCheck,
  HandCoins,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  Quote,
  SearchCheck,
  Sparkles,
  UserCheck,
  UsersRound,
} from 'lucide-react';
import { useAnimals } from '../../context/AnimalsContext';
import Button from '../../components/ui/Button';
import AnimalGrid from '../../components/features/animals/AnimalGrid';
import Skeleton from '../../components/ui/Skeleton';

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

  const supportActions = [
    {
      icon: HandCoins,
      eyebrow: 'Soutenir',
      title: 'Faire un don',
      text: 'Aider à financer les repas, les vaccins et les urgences vétérinaires.',
      meta: 'Utile dès aujourd’hui',
      action: 'Participer aux soins',
      href: '/dons',
      featured: true,
    },
    {
      icon: UsersRound,
      eyebrow: 'Donner du temps',
      title: 'Devenir bénévole',
      text: 'Accompagner les sorties, les soins simples, les photos et les rencontres.',
      meta: 'Selon vos disponibilités',
      action: 'Rejoindre l’équipe',
      href: '/bénévolat',
      featured: false,
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

  const apiTestimonials = [
    { id: 1, name: 'Claire M.', role: 'Adoptante', quote: 'Grâce à RefuConnect, j\'ai pu adopter mon chat en toute confiance. Le processus était clair et rassurant.', detail: 'Adoption validée en 48h' },
    { id: 2, name: 'Thomas R.', role: 'Bénévole', quote: 'La plateforme facilite vraiment le suivi des animaux et des demandes. C\'est un vrai plus pour le refuge.', detail: 'Bénévole depuis 2024' },
    { id: 3, name: 'Sophie L.', role: 'Adoptante', quote: 'J\'ai trouvé mon compagnon idéal. Les fiches détaillées m\'ont aidée à faire le bon choix.', detail: 'A adopté Luna en mars' },
  ];

  const featuredTestimonial = apiTestimonials[0];
  const supportingTestimonials = apiTestimonials.slice(1, 3);

  return (
    <div>
      <section className="relative h-[calc(100svh-7.5rem)] min-h-[520px] overflow-hidden bg-[#1b1714]">
        <img
          src="/hero.png"
          alt="Chat et chien du refuge reposant ensemble"
          className="absolute inset-0 h-full w-full object-cover object-[center_48%]"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(27,23,20,0.2)_45%,rgba(27,23,20,0.82)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6 py-12 text-center text-white">
          <div className="max-w-5xl">
            <p className="mx-auto w-fit border-y border-white/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.32em] text-white/78">
              Refuge • Adoption • Solidarité
            </p>
            <h1 className="mt-8 text-5xl font-extrabold leading-[0.98] tracking-normal md:text-7xl lg:text-7xl">
              Nous vivons pour les animaux.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              Trouvez un compagnon, soutenez le refuge et donnez une vraie chance à ceux qui attendent une famille.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="white"
                className="h-14 rounded-full border-0 px-9 text-base font-extrabold text-[#1b1714] shadow-lg"
                onClick={() => navigate('/animaux')}
              >
                Voir les animaux
              </Button>
              <button
                type="button"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/45 px-7 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
                onClick={() => navigate('/dons')}
              >
                Aider le refuge
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Parcours d’adoption</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-text-dark md:text-5xl">
              Simple pour la famille, sérieux pour le refuge.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-text-light">
            Chaque étape clarifie la demande avant la rencontre. Le refuge garde le contrôle, l’adoptant comprend quoi faire.
          </p>
        </div>

        <div className="relative grid gap-4 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-[#DCC7B7] md:block" />
          {adoptionSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="relative rounded-[1.5rem] border border-background-beige bg-background-paper p-6 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                  <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#B77A5C] text-white shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-5xl font-extrabold leading-none text-background-beige">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-text-dark">{step.title}</h3>
                <p className="mt-3 min-h-[4.5rem] leading-7 text-text-light">{step.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-background-beige bg-[#FBF7F1] p-5 sm:grid-cols-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">En bref</p>
          <p className="text-sm leading-6 text-text-light"><strong className="text-text-dark">{animalCount}</strong> profils disponibles actuellement</p>
          <p className="text-sm leading-6 text-text-light"><strong className="text-text-dark">3</strong> étapes avant une rencontre encadrée</p>
        </div>
      </section>

      <section className="bg-[#FBF7F1] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Nos engagements</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-text-dark md:text-4xl">
                Une plateforme pensée pour un vrai refuge.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-text-light">
              RefuConnect aide à clarifier les demandes, sécuriser les informations et valoriser toutes les façons d’aider.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[1.75rem] border border-background-beige bg-background-paper shadow-sm lg:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-[#EFE4DA] p-7 md:p-8">
              <LockKeyhole className="h-8 w-8 text-[#A85F45]" />
              <h3 className="mt-5 text-2xl font-bold text-text-dark">Demandes mieux cadrées</h3>
              <p className="mt-3 leading-7 text-text-light">
                Un compte utilisateur permet au refuge de suivre les dossiers proprement, sans perdre les informations importantes.
              </p>
              <Button variant="white" className="mt-7 rounded-full px-6 py-3 font-bold" onClick={() => navigate('/connexion')}>
                Se connecter
              </Button>
            </div>

            <div className="divide-y divide-background-beige px-6 md:px-8">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="grid gap-4 py-6 sm:grid-cols-[auto_1fr]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-light">{reason.text}</p>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Skeleton variant="card" className="h-56 rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton variant="text-xl" className="w-2/3" />
                  <Skeleton variant="text" className="w-1/2" />
                  <Skeleton variant="text" className="w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimalGrid animals={featuredAnimals} onView={handleView} />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Retours vérifiés</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-text-dark md:text-4xl">
              Des histoires publiées après validation du refuge.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-text-light">
            Cette zone affiche uniquement des témoignages approuvés depuis l’administration.
          </p>
        </div>

        {featuredTestimonial ? (
          <div className="grid overflow-hidden rounded-[1.75rem] border border-background-beige bg-background-paper shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
            <article className="relative min-h-[24rem] bg-[#F7F1EA] p-7 md:p-9">
              <div className="absolute right-8 top-8 text-8xl font-extrabold leading-none text-[#E7DED4]">01</div>
              <div className="relative max-w-2xl">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#A85F45] shadow-sm">
                  <Quote className="h-6 w-6" />
                </div>
                <p className="text-2xl font-semibold leading-10 text-text-dark">
                  “{featuredTestimonial.quote}”
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#DED1C4] pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A85F45] text-sm font-extrabold text-white">
                    {featuredTestimonial.name?.slice(0, 1) ?? 'R'}
                  </div>
                  <div>
                    <p className="font-bold text-text-dark">{featuredTestimonial.name}</p>
                    <p className="text-sm font-semibold text-accent">{featuredTestimonial.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#D7B39F] bg-white px-3 py-1 text-xs font-bold text-[#8F4E39]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Validé
                  </span>
                </div>
                {featuredTestimonial.detail && (
                  <p className="mt-4 text-sm leading-6 text-text-light">{featuredTestimonial.detail}</p>
                )}
              </div>
            </article>

            <div className="divide-y divide-background-beige p-6 md:p-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">Autres retours publiés</p>
              {supportingTestimonials.length > 0 ? (
                supportingTestimonials.map((testimonial) => (
                  <article key={testimonial.id ?? testimonial.name} className="py-6 first:pt-3">
                    <p className="text-base leading-7 text-text-light">“{testimonial.quote}”</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-bold text-text-dark">{testimonial.name}</span>
                      <span className="h-1 w-1 rounded-full bg-[#C9B6A6]" />
                      <span className="font-semibold text-accent">{testimonial.role}</span>
                    </div>
                    {testimonial.detail && <p className="mt-2 text-sm text-text-light">{testimonial.detail}</p>}
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D7B39F] bg-white p-5 text-sm leading-6 text-text-light">
                  Les prochains témoignages approuvés apparaîtront ici automatiquement.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid overflow-hidden rounded-[1.75rem] border border-background-beige bg-background-paper shadow-soft md:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-[#F7F1EA] p-7 md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#A85F45] shadow-sm">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-text-dark">Aucun témoignage publié pour le moment.</h3>
              <p className="mt-3 leading-7 text-text-light">
                Le site attend des retours réels validés par l’équipe du refuge. Pas de faux avis, pas de contenu inventé.
              </p>
            </div>
            <div className="p-7 md:p-9">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">Fonctionnement réel</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ['1', 'Un utilisateur partage son expérience.'],
                  ['2', 'Le refuge vérifie et approuve le message.'],
                  ['3', 'Le témoignage apparaît ici automatiquement.'],
                ].map(([step, text]) => (
                  <div key={step} className="rounded-2xl border border-background-beige bg-[#FBF7F1] p-4">
                    <p className="text-2xl font-extrabold text-[#A85F45]">{step}</p>
                    <p className="mt-3 text-sm leading-6 text-text-light">{text}</p>
                  </div>
                ))}
              </div>
              <Button variant="white" className="mt-6 rounded-full px-5 py-3 text-sm font-bold" onClick={() => navigate('/connexion')}>
                Partager une expérience
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D7B39F] bg-[#8F4E39] text-white shadow-[0_22px_60px_rgba(88,54,38,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)]" />
          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/75">Agir avec le refuge</p>
                <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight md:text-4xl">
                  Même sans adopter, vous pouvez changer une journée.
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-white/82">
                  Un don, une heure libre ou une présence régulière aide le refuge à nourrir, soigner et rassurer les animaux qui attendent.
                </p>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-white/18 bg-white/10 p-4">
                  <CalendarHeart className="h-5 w-5 text-white/75" />
                  <p className="mt-3 font-bold">Aide concrète</p>
                  <p className="mt-1 text-white/70">Repas, soins, sorties et suivi quotidien.</p>
                </div>
                <div className="rounded-2xl border border-white/18 bg-white/10 p-4">
                  <HeartHandshake className="h-5 w-5 text-white/75" />
                  <p className="mt-3 font-bold">Impact local</p>
                  <p className="mt-1 text-white/70">Chaque geste reste lié aux besoins du refuge.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 border-t border-white/15 bg-white/10 p-5 sm:grid-cols-2 md:p-7 lg:border-l lg:border-t-0">
              {supportActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    className={`group flex min-h-[18rem] flex-col justify-between rounded-[1.4rem] p-6 text-left transition duration-300 hover:-translate-y-1 ${
                      item.featured
                        ? 'bg-background-paper text-[#713724] shadow-[0_18px_42px_rgba(42,27,19,0.18)]'
                        : 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                    }`}
                    onClick={() => navigate(item.href)}
                  >
                    <span>
                      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${item.featured ? 'bg-[#F3E7DC] text-[#A85F45]' : 'bg-white/15 text-white'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`mt-6 block text-sm font-bold uppercase tracking-wide ${item.featured ? 'text-[#A85F45]' : 'text-white/70'}`}>
                        {item.eyebrow}
                      </span>
                      <span className="mt-2 block text-2xl font-extrabold">{item.title}</span>
                      <span className={`mt-4 block text-sm leading-6 ${item.featured ? 'text-[#73584E]' : 'text-white/75'}`}>
                        {item.text}
                      </span>
                    </span>
                    <span>
                      <span className={`mb-4 block rounded-full px-3 py-2 text-xs font-bold ${item.featured ? 'bg-[#F3E7DC] text-[#8F4E39]' : 'bg-white/10 text-white/75'}`}>
                        {item.meta}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold">
                        {item.action}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
