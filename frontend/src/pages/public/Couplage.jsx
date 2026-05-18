import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';
import {
  AlertTriangle,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Dog,
  FileCheck2,
  HeartHandshake,
  HelpCircle,
  MessageSquareText,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const mapSpecies = (value) => {
  const v = value.toLowerCase();
  if (v.includes('chat')) return 'cat';
  if (v.includes('chien')) return 'dog';
  return null;
};

const mapSex = (value) => (value === 'Mâle' ? 'male' : value === 'Femelle' ? 'female' : null);

const mapVaccinated = (value) => {
  if (value === 'Oui') return 'yes';
  if (value === 'Non') return 'no';
  if (value === 'À confirmer') return 'unknown';
  return null;
};

const Couplage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    animalType: '',
    breed: '',
    sex: '',
    age: '',
    vaccinated: '',
    healthStatus: '',
    preferredBreed: '',
    message: '',
  });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/connexion?redirect=/couplage');
      return;
    }

    const petSpecies = mapSpecies(form.animalType);
    const petSex = mapSex(form.sex);
    const vaccinated = mapVaccinated(form.vaccinated);

    if (!petSpecies || !petSex || !vaccinated) {
      setError('Vérifiez le type d\'animal, le sexe et les vaccins.');
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post('/coupling-requests', {
        contact_phone: form.phone,
        pet_species: petSpecies,
        pet_breed: form.breed,
        pet_sex: petSex,
        pet_age: form.age,
        vaccinated,
        health_status: form.healthStatus || undefined,
        preferred_breed: form.preferredBreed || undefined,
        message: [form.fullName && `Contact: ${form.fullName}`, form.message].filter(Boolean).join('\n') || undefined,
      });
      setSuccess(true);
      setForm({
        fullName: '',
        phone: '',
        animalType: '',
        breed: '',
        sex: '',
        age: '',
        vaccinated: '',
        healthStatus: '',
        preferredBreed: '',
        message: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'envoyer le dossier.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const prices = [
    { label: 'Standard', value: '300 DH', note: 'compatibilité simple' },
    { label: 'Race spécifique', value: '400 - 600 DH', note: 'recherche ciblée' },
    { label: 'Validation santé', value: 'incluse', note: 'vérification du dossier' },
  ];

  const reviewSteps = [
    { icon: ClipboardList, title: 'Dossier reçu', text: 'Les informations de base sont vérifiées.' },
    { icon: Stethoscope, title: 'Contrôle santé', text: 'Vaccins, âge et état général sont examinés.' },
    { icon: Users, title: 'Compatibilité', text: 'Race, gabarit et tempérament sont comparés.' },
    { icon: MessageSquareText, title: 'Retour équipe', text: 'Vous recevez une réponse claire avant toute mise en relation.' },
  ];

  const eligibility = [
    'Animal identifié et en bonne santé',
    'Âge adapté selon l’espèce',
    'Vaccins à jour ou justificatif disponible',
    'Aucun signe de maladie ou blessure',
    'Tempérament compatible avec une rencontre',
    'Accord de refus si la demande présente un risque',
  ];

  const faq = [
    ['Le couplage est-il automatique ?', 'Non. Chaque dossier est étudié avant toute proposition.'],
    ['Pourquoi autant de questions ?', 'Elles évitent les mises en relation risquées et protègent les animaux.'],
    ['Le prix peut-il changer ?', 'Oui, surtout pour une race spécifique ou une recherche plus rare.'],
  ];

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="overflow-hidden rounded-[2rem] border border-background-beige bg-background-paper shadow-soft">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 md:p-10">
              <div className="flex w-fit items-center gap-2 rounded-full border border-background-beige bg-background-cream px-4 py-2 text-sm font-bold text-accent">
                <ShieldCheck className="h-4 w-4" />
                Couplage responsable
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight text-text-dark md:text-6xl">
                Un dossier étudié avant toute mise en relation.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-text-light">
                RefuConnect ne traite pas le couplage comme une simple annonce. Chaque demande passe par une vérification de santé, de compatibilité et de contexte.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" className="rounded-xl px-7 py-3 text-base font-bold" onClick={() => document.getElementById('dossier-couplage')?.scrollIntoView({ behavior: 'smooth' })}>
                  Déposer un dossier
                </Button>
                <Button variant="white" className="rounded-xl px-7 py-3 text-base font-bold" onClick={() => document.getElementById('admissibilite')?.scrollIntoView({ behavior: 'smooth' })}>
                  Vérifier les critères
                </Button>
              </div>
            </div>

            <div className="bg-primary p-7 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/65">Décision de principe</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">Le bien-être animal reste prioritaire.</h2>
              <div className="mt-8 space-y-3">
                {[
                  ['Pas de couplage forcé', AlertTriangle],
                  ['Validation santé recommandée', Stethoscope],
                  ['Refus possible si risque', FileCheck2],
                ].map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-semibold text-white/82">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid border-t border-background-beige bg-background-cream/60 md:grid-cols-3">
            {prices.map((price) => (
              <div key={price.label} className="border-b border-background-beige p-6 md:border-b-0 md:border-r last:md:border-r-0">
                <p className="text-sm font-bold uppercase tracking-wide text-accent">{price.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-text-dark">{price.value}</p>
                <p className="mt-1 text-sm text-text-light">{price.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-background-beige bg-background-paper p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Parcours du dossier</p>
            <div className="mt-6 space-y-5">
              {reviewSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      {index < reviewSteps.length - 1 && <div className="mt-2 h-10 w-px bg-background-beige" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-dark">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-text-light">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div id="admissibilite" className="rounded-3xl bg-primary p-6 text-white shadow-soft">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6" />
              <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Admissibilité</p>
            </div>
            <div className="mt-5 space-y-3">
              {eligibility.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-sm leading-6 text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main id="dossier-couplage" className="rounded-3xl border border-background-beige bg-background-paper shadow-soft">
          <div className="border-b border-background-beige p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">Dossier de demande</p>
                <h2 className="mt-2 text-3xl font-bold text-text-dark">Informations à vérifier</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-light">
                  Remplissez seulement les informations utiles. L’équipe vous contacte si un document ou une précision manque.
                </p>
              </div>
              <div className="rounded-2xl bg-background-cream px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">Réponse estimée</p>
                <p className="mt-1 text-xl font-extrabold text-text-dark">24 - 48h</p>
              </div>
            </div>
          </div>

          {success && (
            <div className="mx-6 mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 md:mx-8">
              Dossier envoyé. L&apos;équipe vous contactera sous 24–48h.
            </div>
          )}
          {error && (
            <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 md:mx-8">{error}</div>
          )}

          <form className="grid gap-4 p-6 md:grid-cols-2 md:p-8" onSubmit={handleSubmit}>
            <Input id="fullName" label="Nom complet" placeholder="Ex: Sara Benali" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} required />
            <Input id="phone" label="Téléphone" placeholder="Ex: 06 12 34 56 78" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
            <Input id="animalType" label="Type d’animal" placeholder="Chien, chat..." value={form.animalType} onChange={(e) => updateField('animalType', e.target.value)} required />
            <Input id="breed" label="Race de votre animal" placeholder="Ex: Berger allemand" value={form.breed} onChange={(e) => updateField('breed', e.target.value)} required />
            <div className="w-full">
              <label htmlFor="sex" className="mb-2 block text-sm font-medium text-text-main">Sexe</label>
              <select id="sex" value={form.sex} onChange={(e) => updateField('sex', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required>
                <option value="">Choisir</option>
                <option>Mâle</option>
                <option>Femelle</option>
              </select>
            </div>
            <Input id="age" label="Âge" placeholder="Ex: 2 ans" value={form.age} onChange={(e) => updateField('age', e.target.value)} required />
            <div className="w-full">
              <label htmlFor="vaccinated" className="mb-2 block text-sm font-medium text-text-main">Vaccins à jour ?</label>
              <select id="vaccinated" value={form.vaccinated} onChange={(e) => updateField('vaccinated', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required>
                <option value="">Choisir</option>
                <option>Oui</option>
                <option>Non</option>
                <option>À confirmer</option>
              </select>
            </div>
            <Input id="healthStatus" label="État de santé" placeholder="Ex: en bonne santé" value={form.healthStatus} onChange={(e) => updateField('healthStatus', e.target.value)} />
            <Input id="preferredBreed" label="Race recherchée" placeholder="Optionnel" value={form.preferredBreed} onChange={(e) => updateField('preferredBreed', e.target.value)} />
            <Input id="message" label="Détails importants" as="textarea" className="md:col-span-2" placeholder="Tempérament, taille, documents disponibles, contraintes..." value={form.message} onChange={(e) => updateField('message', e.target.value)} />
            <div className="flex flex-col gap-3 border-t border-background-beige pt-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-sm leading-6 text-text-light">
                En envoyant la demande, vous acceptez qu’elle soit refusée si elle ne respecte pas les critères de bien-être animal.
              </p>
              <Button type="submit" variant="primary" className="h-12 rounded-xl px-7 font-bold" disabled={submitting}>
                {submitting ? 'Envoi...' : 'Envoyer le dossier'}
              </Button>
            </div>
          </form>
        </main>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-background-beige bg-background-paper p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-text-dark">Questions fréquentes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faq.map(([question, answer]) => (
              <article key={question} className="border-l-2 border-accent pl-4">
                <h3 className="font-bold text-text-dark">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-text-light">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Couplage;
