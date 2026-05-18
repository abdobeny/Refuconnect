import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, Clock, Droplets, HeartPulse, MessageCircle, Scissors, ShieldCheck, Sparkles, Stars, Syringe } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const SERVICE_MAP = {
  'Bain complet - dès 80 DH': 'bath',
  'Coupe hygiénique - dès 120 DH': 'haircut',
  'Toilettage complet - dès 180 DH': 'full_grooming',
  'Griffes & oreilles - dès 40 DH': 'nail_trim',
  'Soin sensible - dès 150 DH': 'other',
};

const mapPetType = (value) => {
  const v = value.toLowerCase();
  if (v.includes('chat')) return 'cat';
  if (v.includes('chien')) return 'dog';
  return 'other';
};

const Grooming = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    petName: '',
    petType: '',
    service: 'Bain complet - dès 80 DH',
    date: '',
    time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/connexion?redirect=/toilettage');
      return;
    }

    if (!form.date) {
      setError('Choisissez une date.');
      return;
    }

    const reservationDate = form.time
      ? `${form.date}T${form.time}:00`
      : `${form.date}T10:00:00`;

    setSubmitting(true);
    try {
      await axiosClient.post('/grooming', {
        pet_name: form.petName,
        pet_type: mapPetType(form.petType),
        service_type: SERVICE_MAP[form.service] || 'other',
        reservation_date: reservationDate,
        notes: form.notes || undefined,
      });
      setSuccess(true);
      setForm({ petName: '', petType: '', service: 'Bain complet - dès 80 DH', date: '', time: '', notes: '' });
    } catch (err) {
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'envoyer la demande.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      icon: Droplets,
      name: 'Bain complet',
      description: 'Shampooing doux, rinçage soigné, séchage et brossage adapté au pelage.',
      duration: '45 à 60 min',
      price: 'à partir de 80 DH',
      bestFor: 'Chiens et chats calmes',
    },
    {
      icon: Scissors,
      name: 'Coupe hygiénique',
      description: 'Coupe simple autour des zones sensibles, entretien du poil et finition propre.',
      duration: '60 à 90 min',
      price: 'à partir de 120 DH',
      bestFor: 'Poils longs ou emmêlés',
    },
    {
      icon: Sparkles,
      name: 'Toilettage complet',
      description: 'Bain, coupe, griffes, oreilles et brossage. Le soin intégral pour votre animal.',
      duration: '90 à 120 min',
      price: 'à partir de 180 DH',
      bestFor: 'Entretien complet',
      featured: true,
    },
    {
      icon: Sparkles,
      name: 'Soin griffes & oreilles',
      description: 'Coupe des griffes, nettoyage léger des oreilles et contrôle de confort.',
      duration: '20 à 30 min',
      price: 'à partir de 40 DH',
      bestFor: 'Entretien rapide',
    },
    {
      icon: HeartPulse,
      name: 'Soin sensible',
      description: 'Approche douce pour animaux âgés, stressés ou avec besoin particulier.',
      duration: 'selon le cas',
      price: 'à partir de 150 DH',
      bestFor: 'Sur recommandation',
    },
  ];

  const steps = [
    { icon: CalendarCheck, title: 'Choisir un créneau', text: 'Indiquez le service, le jour souhaité et les besoins de votre compagnon.' },
    { icon: MessageCircle, title: 'Confirmation', text: 'L’équipe vous contacte pour valider l’heure et poser les questions utiles.' },
    { icon: Stars, title: 'Soin sur place', text: 'Le toilettage se fait avec calme, produits adaptés et pauses si nécessaire.' },
  ];

  const comfortNotes = [
    { icon: ShieldCheck, text: 'Produits doux adaptés au type de poil' },
    { icon: HeartPulse, text: 'Manipulation calme pour réduire le stress' },
    { icon: Syringe, text: 'Carnet de santé conseillé pour les soins sensibles' },
    { icon: Clock, text: 'Prévenez en cas d’allergie, blessure ou peur particulière' },
  ];

  return (
    <div className="bg-background">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Toilettage solidaire</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-extrabold leading-tight text-text-dark md:text-6xl">
            Des soins propres, doux et faciles à réserver.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-light">
            Bain, coupe, griffes et soins adaptés au caractère de chaque animal. Les prix sont simples, le rendez-vous est confirmé par l’équipe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" className="rounded-xl px-7 py-3 text-base font-bold" onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}>
              Réserver un créneau
            </Button>
            <Button variant="white" className="rounded-xl px-7 py-3 text-base font-bold" onClick={() => document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' })}>
              Voir les tarifs
            </Button>
          </div>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-3xl bg-primary shadow-soft">
          <img src="/image.png" alt="Chien pendant un bain de toilettage" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-sm rounded-2xl border border-white/15 bg-white/12 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Créneau moyen</p>
              <p className="mt-2 text-3xl font-extrabold">45 - 90 min</p>
              <p className="mt-2 text-sm leading-6 text-white/78">Selon le service choisi, la taille de l’animal et son niveau de confort.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifs" className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Services & tarifs</p>
            <h2 className="mt-2 text-3xl font-bold text-text-dark">Choisissez le soin adapté.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-text-light">
            Les prix peuvent varier légèrement selon la taille, le pelage et l’état de l’animal. L’équipe confirme toujours avant le rendez-vous.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.name} className={`border p-6 shadow-sm ${service.featured ? 'border-primary bg-primary text-white' : 'border-background-beige bg-background-paper'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.featured ? 'bg-white text-primary' : 'bg-background-cream text-primary'}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className={`mt-5 text-xl font-bold ${service.featured ? 'text-white' : 'text-text-dark'}`}>{service.name}</h3>
                <p className={`mt-3 min-h-[5.5rem] text-sm leading-6 ${service.featured ? 'text-white/78' : 'text-text-light'}`}>{service.description}</p>
                <div className={`mt-5 rounded-2xl p-4 ${service.featured ? 'bg-white/10' : 'bg-background-cream'}`}>
                  <p className={`text-2xl font-extrabold ${service.featured ? 'text-white' : 'text-text-dark'}`}>{service.price}</p>
                  <p className={`mt-1 text-sm ${service.featured ? 'text-white/70' : 'text-text-light'}`}>{service.duration}</p>
                  <p className={`mt-3 text-xs font-semibold uppercase tracking-wide ${service.featured ? 'text-white/65' : 'text-accent'}`}>{service.bestFor}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Comment ça se passe ?</p>
          <h2 className="mt-2 text-3xl font-bold text-text-dark">Un rendez-vous simple, sans surprise.</h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-background-beige bg-background-paper p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Étape {index + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-text-dark">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-text-light">{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <Card id="reservation" className="border border-background-beige bg-background-paper p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Réservation</p>
          <h2 className="mt-2 text-3xl font-bold text-text-dark">Demander un créneau</h2>
          <p className="mt-2 text-sm leading-6 text-text-light">Remplissez les informations principales. L’équipe vous confirme le rendez-vous.</p>

          {success && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              Demande envoyée. L&apos;équipe vous confirmera le créneau.
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
          )}

          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Input id="animalType" label="Type d’animal" placeholder="Chien, chat..." value={form.petType} onChange={update('petType')} required />
            <Input id="animalName" label="Nom de l’animal" placeholder="Ex: Max" value={form.petName} onChange={update('petName')} required />
            <div className="w-full sm:col-span-2">
              <label htmlFor="service" className="mb-2 block text-sm font-medium text-text-main">Service souhaité</label>
              <select
                id="service"
                value={form.service}
                onChange={update('service')}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.keys(SERVICE_MAP).map((label) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </div>
            <Input id="date" label="Date souhaitée" type="date" value={form.date} onChange={update('date')} required />
            <Input id="time" label="Heure préférée" type="time" value={form.time} onChange={update('time')} />
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">Message</label>
              <textarea
                id="message"
                placeholder="Taille, comportement, allergies..."
                value={form.notes}
                onChange={update('notes')}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 min-h-[120px] resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" variant="primary" className="h-12 rounded-xl font-bold sm:col-span-2" disabled={submitting}>
              {submitting ? 'Envoi...' : 'Envoyer la demande'}
            </Button>
          </form>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-3xl bg-primary p-7 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Avant le rendez-vous</p>
          <h2 className="mt-2 text-3xl font-bold">Quelques notes utiles</h2>
          <div className="mt-6 grid gap-3">
            {comfortNotes.map((note) => {
              const Icon = note.icon;
              return (
                <div key={note.text} className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm leading-6 text-white/80">{note.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Grooming;
