import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HeartHandshake,
  MailCheck,
  MapPin,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck,
  UsersRound,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

const heroStats = [
  { value: '2h', label: 'pour commencer', text: 'un petit créneau régulier suffit' },
  { value: '7j', label: 'de besoins', text: 'soins, repas, sorties et présence' },
  { value: '1re', label: 'mission guidée', text: 'vous n’êtes jamais lâché seul' },
];

const storyPhotos = [
  { src: '/benev8.png', title: 'Socialisation', text: 'Habituer les animaux au contact humain avec calme.', tag: 'Chats' },
  { src: '/benev4.png', title: 'Repas', text: 'Aider l’équipe sur les routines du quotidien.', tag: 'Matin' },
  { src: '/benev7.png', title: 'Observation', text: 'Repérer les animaux timides et garder les espaces propres.', tag: 'Suivi' },
];

const daySteps = [
  { time: '09:00', title: 'Préparer les repas', text: 'Gamelles, eau fraîche et vérification rapide des espaces.' },
  { time: '10:30', title: 'Nettoyer et observer', text: 'Aider sans stress, signaler un animal fatigué ou inquiet.' },
  { time: '12:00', title: 'Moments calmes', text: 'Présence douce, caresses, jeux simples et socialisation.' },
  { time: '15:00', title: 'Promenades ou accueil', text: 'Sorties encadrées, photos, visiteurs ou aide aux collectes.' },
  { time: '17:00', title: 'Transmission', text: 'Partager les infos utiles à l’équipe avant de partir.' },
];

const missions = [
  {
    title: 'Aider aux soins quotidiens',
    text: 'Préparer les gamelles, renouveler l’eau, ranger les couvertures et signaler les besoins visibles à l’équipe.',
    detail: 'Idéal pour commencer avec des consignes simples.',
    icon: Stethoscope,
  },
  {
    title: 'Promener les chiens',
    text: 'Sorties courtes ou plus longues selon le chien, toujours avec une consigne claire sur le rythme et la sécurité.',
    detail: 'Utile le matin, en fin de journée et le week-end.',
    icon: PawPrint,
  },
  {
    title: 'Accompagner les chats',
    text: 'Présence calme, jeux doux, observation des caractères et aide à garder les espaces propres.',
    detail: 'Parfait pour les personnes patientes et attentives.',
    icon: Sparkles,
  },
  {
    title: 'Photos, collectes et transport',
    text: 'Aider sur les annonces, les collectes, les trajets vétérinaires ou les événements adoption.',
    detail: 'Mission ponctuelle possible selon vos disponibilités.',
    icon: Camera,
  },
];

const requirements = [
  'Être ponctuel et prévenir en cas d’absence.',
  'Respecter les consignes du refuge et le rythme des animaux.',
  'Pouvoir aider quelques heures, même seulement le week-end.',
  'Accepter une première mission simple avant les tâches plus sensibles.',
  'Pour les mineurs, venir avec autorisation ou accompagnement selon les règles du refuge.',
];

const impactItems = [
  { icon: HeartHandshake, title: 'Moins de stress', text: 'Les animaux ont plus de présence humaine dans la journée.' },
  { icon: ShieldCheck, title: 'Routines tenues', text: 'Repas, nettoyage et sorties restent plus réguliers.' },
  { icon: Camera, title: 'Profils plus vivants', text: 'Les photos et observations rendent les annonces plus crédibles.' },
  { icon: Truck, title: 'Déplacements aidés', text: 'Les rendez-vous et collectes deviennent plus faciles à organiser.' },
];

const testimonials = [
  {
    name: 'Yassine B.',
    role: 'Bénévole week-end',
    quote: 'Je viens le samedi matin. Au début je pensais juste promener les chiens, maintenant je vois surtout leur confiance revenir.',
  },
  {
    name: 'Mina L.',
    role: 'Aide aux chats',
    quote: 'Les missions sont claires, l’équipe explique bien. Même deux heures changent vraiment l’ambiance dans les box.',
  },
];

const faqs = [
  {
    q: 'Faut-il avoir de l’expérience avec les animaux ?',
    a: 'Non. Les premières missions sont simples et expliquées. Le plus important est d’être calme, fiable et attentif.',
  },
  {
    q: 'Combien d’heures faut-il donner ?',
    a: 'Un créneau de deux heures peut déjà aider. Le refuge préfère une disponibilité réaliste et régulière.',
  },
  {
    q: 'Puis-je venir seulement le week-end ?',
    a: 'Oui, surtout pour les promenades, l’accueil, les photos, les collectes et certains événements.',
  },
  {
    q: 'Est-ce possible sans voiture ?',
    a: 'Oui pour les missions sur place. La voiture est utile uniquement pour le transport ou certaines collectes.',
  },
  {
    q: 'Comment se passe la première journée ?',
    a: 'Vous êtes accueilli, les règles sont présentées, puis une mission courte et adaptée vous est confiée.',
  },
];

const missionOptions = ['Soins quotidiens', 'Promenades', 'Chats', 'Accueil', 'Photos', 'Transport', 'Événements'];

const Volunteer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    mission: '',
    experience: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Le nom est requis';
    if (!form.email.trim()) e.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.availability.trim()) e.availability = 'Les disponibilités sont requises';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate(`/connexion?redirect=${encodeURIComponent('/bénévolat')}`);
      return;
    }

    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setSubmitting(true);
    setApiError('');

    try {
      const message = [
        form.availability && `Disponibilités: ${form.availability}`,
        form.mission && `Mission préférée: ${form.mission}`,
        form.experience && `Expérience: ${form.experience}`,
        form.message && `Message: ${form.message}`,
      ].filter(Boolean).join('\n');

      await axiosClient.post('/volunteer-applications', {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: message || null,
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', availability: '', mission: '', experience: '', message: '' });
      setShowForm(false);
      document.getElementById('top-benevolat')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      const msg =
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || "Impossible d'envoyer la candidature.";
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="top-benevolat" className="bg-[#F6F1EA] text-[#202824]">
      <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2523] text-white md:-mt-10">
        <img
          src="/benev1.png"
          alt="Bénévole entourée de chiens au refuge"
          className="absolute inset-0 h-full w-full object-cover object-[center_48%]"
        />
        <div className="absolute inset-0 bg-[#1F2523]/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1F2523] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-end gap-8 px-6 py-10 lg:grid-cols-[1fr_0.82fr] lg:py-14">
          <div className="max-w-3xl">
            <div className="flex w-fit items-center gap-2 border-y border-white/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80">
              <HeartHandshake className="h-4 w-4" />
              Bénévolat au refuge
            </div>
            <h1 className="mt-7 text-5xl font-extrabold leading-[0.98] md:text-7xl">
              Devenez bénévole au refuge.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Quelques heures par semaine pour nourrir, rassurer, promener et accompagner les animaux qui attendent une famille.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="white"
                className="h-12 rounded-lg border-0 px-6 font-extrabold text-[#202824]"
                onClick={() => document.getElementById('formulaire-benevole')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Proposer votre aide
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={() => document.getElementById('journee-benevole')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/35 px-6 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Voir une journée type
              </button>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/18 bg-white/12 p-4 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-1">
            {heroStats.map((item) => (
              <div key={item.label} className="border-b border-white/14 pb-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 sm:last:border-r-0 lg:border-b lg:border-r-0 lg:pb-3 lg:pr-0 lg:last:border-b-0">
                <p className="text-3xl font-extrabold text-[#F0BE98]">{item.value}</p>
                <p className="mt-1 font-bold">{item.label}</p>
                <p className="mt-1 text-sm leading-5 text-white/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {success && (
        <section className="mx-auto max-w-7xl px-6 pt-8">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
            Candidature envoyée avec succès. Nous vous contacterons bientôt.
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Sur le terrain</p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold leading-tight text-[#202824]">
              Le bénévolat se voit dans les petits gestes.
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-[#68726D] lg:justify-self-end">
            Une photo, une promenade, une gamelle préparée ou dix minutes de calme peuvent transformer la journée d’un animal.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <figure className="overflow-hidden rounded-2xl border border-[#DED3C7] bg-white shadow-[0_18px_44px_rgba(38,51,46,0.08)]">
            <div className="relative aspect-[4/3] bg-[#E9DED4]">
              <img
                src="/benev5.png"
                alt="Chats dans un espace calme du refuge"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#A66449] shadow-sm">
                Vie du refuge
              </div>
            </div>
            <figcaption className="grid gap-3 border-t border-[#EEE5DA] p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-2xl font-extrabold text-[#202824]">Des espaces plus calmes, des animaux mieux observés.</p>
                <p className="mt-2 text-sm leading-6 text-[#68726D]">
                  Cette partie montre l’ambiance du refuge. Les missions détaillées arrivent juste après, sans répéter les mêmes photos.
                </p>
              </div>
              <span className="w-fit rounded-full bg-[#F3E8DC] px-4 py-2 text-sm font-extrabold text-[#A66449]">
                Quotidien
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-3">
            {storyPhotos.map((photo) => (
              <article key={photo.title} className="grid grid-cols-[8.5rem_1fr] overflow-hidden rounded-2xl border border-[#DED3C7] bg-white shadow-[0_10px_24px_rgba(38,51,46,0.04)] sm:grid-cols-[10rem_1fr]">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full min-h-[8.5rem] w-full object-cover"
                />
                <div className="p-4">
                  <span className="rounded-full bg-[#F6F1EA] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#A66449]">
                    {photo.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-[#202824]">{photo.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#68726D]">{photo.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="journee-benevole" className="border-y border-[#DED3C7] bg-[#FFFCF7]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Une journée de bénévole</p>
              <h2 className="mt-3 font-serif text-4xl font-extrabold text-[#202824]">Des tâches simples, un vrai impact.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#68726D]">
              Les horaires changent selon le refuge, mais ce parcours montre le rythme réel d’une aide sur place.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {daySteps.map((step) => (
              <article key={step.time} className="border-l-4 border-[#A66449] bg-[#F6F1EA] p-5">
                <p className="font-serif text-3xl font-extrabold text-[#A66449]">{step.time}</p>
                <h3 className="mt-4 min-h-[3.5rem] text-lg font-extrabold text-[#202824]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#68726D]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Missions concrètes</p>
          <h2 className="mt-3 font-serif text-4xl font-extrabold text-[#202824]">Choisissez une mission qui vous ressemble.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <article key={mission.title} className="flex min-h-[18rem] flex-col justify-between rounded-2xl border border-[#DED3C7] bg-white p-6 shadow-[0_14px_34px_rgba(38,51,46,0.06)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E8DC] text-[#A66449]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wide text-[#B59A86]">Mission</span>
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-[#202824]">{mission.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#68726D]">{mission.text}</p>
                </div>
                <p className="mt-6 border-t border-[#EEE5DA] pt-4 text-sm font-semibold leading-6 text-[#A66449]">
                  {mission.detail}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#26332E] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#F0BE98]">Avant de commencer</p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold leading-tight">Un bon bénévole n’a pas besoin d’être expert.</h2>
            <p className="mt-4 leading-7 text-white/72">
              Le refuge cherche surtout des personnes fiables, patientes et capables de respecter les consignes. L’expérience vient avec le terrain.
            </p>
          </div>
          <div className="grid gap-3">
            {requirements.map((item, index) => (
              <div key={item} className="flex gap-3 border-b border-white/12 pb-3 last:border-b-0 last:pb-0">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-extrabold text-[#F0BE98]">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-white/82">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Votre impact</p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold text-[#202824]">Ce que votre présence change vraiment.</h2>
            <p className="mt-4 leading-7 text-[#68726D]">
              Le bénévolat n’est pas seulement “aider un peu”. C’est rendre le refuge plus humain, plus propre, plus calme et plus efficace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {impactItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-[#DED3C7] bg-white p-5">
                  <Icon className="h-6 w-6 text-[#A66449]" />
                  <h3 className="mt-4 font-extrabold text-[#202824]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68726D]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#DED3C7] bg-[#FFFCF7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-2xl border border-[#DED3C7] bg-white p-6 shadow-[0_12px_28px_rgba(38,51,46,0.05)]">
                <p className="text-lg font-semibold leading-8 text-[#202824]">“{testimonial.quote}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A66449] text-sm font-extrabold text-white">
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-extrabold text-[#202824]">{testimonial.name}</p>
                    <p className="text-sm font-semibold text-[#A66449]">{testimonial.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Retours bénévoles</p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold text-[#202824]">Les bénévoles ne donnent pas seulement du temps.</h2>
            <p className="mt-4 leading-7 text-[#68726D]">
              Ils apprennent à connaître les animaux, repèrent les progrès et deviennent une vraie mémoire du refuge.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[#DED3C7] bg-white">
              <img src="/benev3.png" alt="Chatons au refuge" className="h-64 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Questions fréquentes</p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold text-[#202824]">Avant votre première journée.</h2>
            <p className="mt-4 leading-7 text-[#68726D]">
              Une page professionnelle doit rassurer. Ces réponses évitent les hésitations avant de remplir le formulaire.
            </p>
          </div>

          <div className="divide-y divide-[#DED3C7] overflow-hidden rounded-2xl border border-[#DED3C7] bg-white">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="block w-full p-5 text-left transition hover:bg-[#FFFCF7]"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-extrabold text-[#202824]">{item.q}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-[#A66449] transition ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                  {isOpen && <span className="mt-3 block text-sm leading-6 text-[#68726D]">{item.a}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="formulaire-benevole" className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid overflow-hidden rounded-2xl border border-[#DED3C7] bg-white shadow-[0_18px_46px_rgba(38,51,46,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="bg-[#F1E5DA] p-7 md:p-9">
            <MailCheck className="h-8 w-8 text-[#A66449]" />
            <h2 className="mt-5 font-serif text-4xl font-extrabold leading-tight text-[#202824]">Envoyer votre candidature.</h2>
            <p className="mt-4 leading-7 text-[#68726D]">
              Le formulaire arrive à la fin parce qu’il doit venir après la confiance: vous savez quoi proposer, le refuge sait comment vous orienter.
            </p>
            <div className="mt-7 grid gap-3 text-sm">
              {[
                ['Réponse', 'L’équipe vous recontacte selon les besoins.'],
                ['Cadre', 'Première mission simple et expliquée.'],
                ['Compte', 'Connexion requise pour enregistrer la demande.'],
              ].map(([label, text]) => (
                <div key={label} className="border-l border-[#CFA98F] pl-4">
                  <p className="font-extrabold text-[#202824]">{label}</p>
                  <p className="mt-1 leading-5 text-[#68726D]">{text}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="p-6 md:p-8">
            {!showForm ? (
              <div className="flex min-h-[24rem] flex-col items-start justify-center">
                <BadgeCheck className="h-8 w-8 text-[#A66449]" />
                <h3 className="mt-5 text-3xl font-extrabold text-[#202824]">Présentez-vous en une minute.</h3>
                <p className="mt-3 max-w-2xl leading-7 text-[#68726D]">
                  Dites quand vous êtes disponible, quelles missions vous attirent et si vous avez déjà vécu avec des animaux.
                </p>
                <Button variant="primary" className="mt-7 h-12 rounded-lg px-6 font-extrabold" onClick={() => setShowForm(true)}>
                  Remplir le formulaire
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                {apiError && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{apiError}</div>
                )}

                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Input id="volName" label="Nom complet" value={form.name} onChange={handleChange('name')} />
                      {errors.name && <div className="mt-2 text-sm text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                      <Input id="volEmail" label="Email" type="email" value={form.email} onChange={handleChange('email')} />
                      {errors.email && <div className="mt-2 text-sm text-red-500">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input id="volPhone" label="Téléphone" type="tel" value={form.phone} onChange={handleChange('phone')} />
                    <div>
                      <Input id="volAvailability" label="Disponibilités" placeholder="Ex: samedi matin, mercredi après-midi..." value={form.availability} onChange={handleChange('availability')} />
                      {errors.availability && <div className="mt-2 text-sm text-red-500">{errors.availability}</div>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="volMission" className="mb-2 block text-sm font-medium text-text-main">Mission préférée</label>
                      <select
                        id="volMission"
                        value={form.mission}
                        onChange={handleChange('mission')}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choisir une mission</option>
                        {missionOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <Input id="volExperience" label="Expérience avec animaux" placeholder="Ex: chat à la maison, aucune, garde de chien..." value={form.experience} onChange={handleChange('experience')} />
                  </div>

                  <Input
                    id="volMessage"
                    label="Message"
                    as="textarea"
                    placeholder="Ajoutez une précision utile pour l’équipe du refuge..."
                    value={form.message}
                    onChange={handleChange('message')}
                  />

                  {!isAuthenticated && (
                    <div className="rounded-xl border border-[#DED3C7] bg-[#FFFCF7] p-4 text-sm leading-6 text-[#68726D]">
                      Connexion requise pour enregistrer la candidature dans RefuConnect.
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button type="submit" variant="primary" className="h-12 flex-1 rounded-lg font-extrabold" disabled={submitting}>
                      {submitting ? 'Envoi...' : 'Envoyer candidature'}
                    </Button>
                    <Button type="button" variant="white" className="h-12 rounded-lg px-6 font-extrabold" onClick={() => { setShowForm(false); setApiError(''); }}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
