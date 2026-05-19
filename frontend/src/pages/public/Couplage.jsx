import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  FileText,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const mapSpecies = (value) => {
  if (value === 'cat' || value === 'dog') return value;

  const v = value.toLowerCase();
  if (v.includes('chat')) return 'cat';
  if (v.includes('chien')) return 'dog';
  return null;
};

const mapSex = (value) => {
  if (value === 'male' || value === 'female') return value;
  return null;
};

const mapVaccinated = (value) => {
  if (['yes', 'no', 'unknown'].includes(value)) return value;
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
      setError('Verifiez le type d animal, le sexe et les vaccins.');
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
        || 'Impossible d envoyer le dossier.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const checkpoints = [
    { icon: ClipboardCheck, label: 'Dossier', text: 'Identite, race, age, sexe et contexte de base.' },
    { icon: Stethoscope, label: 'Sante', text: 'Vaccins, etat general et suivi si necessaire.' },
    { icon: ShieldCheck, label: 'Decision', text: 'Mise en relation seulement si le risque est raisonnable.' },
  ];

  const pricing = [
    {
      title: 'Couplage standard',
      price: '300 DH',
      text: 'Etude simple lorsque la race et les criteres restent ouverts.',
    },
    {
      title: 'Race specifique',
      price: '400 - 600 DH',
      text: 'Recherche plus ciblee selon la rarete, le gabarit et la disponibilite.',
    },
    {
      title: 'Validation sante',
      price: 'Incluse',
      text: 'Verification des informations de base avant toute proposition.',
    },
  ];

  return (
    <div className="bg-[#F7F3ED]">
      <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 border-b border-[#DED3C7] bg-[#F7F3ED] md:-mt-10">
        <div className="mx-auto grid max-w-7xl lg:h-[min(590px,calc(100svh-5rem))] lg:grid-cols-[1fr_0.95fr]">
          <div className="flex flex-col justify-center px-6 py-8 md:px-8">
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#E2D6CA] bg-[#FFFCF7] px-4 py-2 text-sm font-bold text-[#A66449]">
              <HeartPulse className="h-4 w-4" />
              Evaluation responsable
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] text-[#202824] lg:text-[3rem]">
              Une rencontre preparee avec prudence.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#68726D]">
              Le couplage n est pas une annonce publique. Le refuge regarde la sante, le contexte et la compatibilite avant de proposer le moindre contact.
            </p>

            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {checkpoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="border-l border-[#D9CBBE] pl-4">
                    <Icon className="h-5 w-5 text-[#A66449]" />
                    <p className="mt-2 font-bold text-[#202824]">{item.label}</p>
                    <p className="mt-1 text-sm leading-5 text-[#68726D]">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" className="h-11 rounded-lg px-5 py-2 font-bold" onClick={() => document.getElementById('dossier-couplage')?.scrollIntoView({ behavior: 'smooth' })}>
                Deposer un dossier
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="white" className="h-11 rounded-lg px-5 py-2 font-bold" onClick={() => document.getElementById('tarifs-couplage')?.scrollIntoView({ behavior: 'smooth' })}>
                Voir les conditions
              </Button>
            </div>
          </div>

          <div className="flex min-h-[22rem] items-center bg-[#FDFBF7] px-6 py-7 lg:min-h-0 lg:px-8">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#DFD5CA] bg-white shadow-[0_16px_40px_rgba(38,51,46,0.08)]">
              <div className="absolute left-5 top-5 z-20 rounded-full border border-[#E2D6CA] bg-[#FFFCF7]/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#A66449] shadow-sm">
                Service encadre
              </div>
              <div className="flex min-h-[25rem] items-end justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF7F1_100%)] px-5 pb-0 pt-12">
                <img
                  src="/couplage.png"
                  alt="Groupe de chiens, chats et lapins pour illustrer la compatibilite animale"
                  className="w-full max-w-[48rem] rounded-t-xl object-contain"
                />
              </div>
              <div className="grid border-t border-[#EEE5DA] bg-[#FFFCF7] sm:grid-cols-3">
                {[
                  ['Sante', 'Verifiee'],
                  ['Compatibilite', 'Etudiee'],
                  ['Decision', 'Encadree'],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-[#EEE5DA] px-5 py-3.5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#A66449]">{label}</p>
                    <p className="mt-1 font-extrabold text-[#202824]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifs-couplage" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Tarifs indicatifs</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#202824]">Comprendre le prix avant de deposer un dossier</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#68726D]">
            Le montant exact est confirme par l equipe avant toute mise en relation. Vous ne vous engagez pas en envoyant le formulaire.
          </p>
        </div>

        <div className="grid overflow-hidden border border-[#DFD5CA] bg-white shadow-[0_14px_34px_rgba(38,51,46,0.07)] md:grid-cols-3">
          {pricing.map((item) => (
            <article key={item.title} className="border-b border-[#EEE5DA] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <p className="text-sm font-bold text-[#202824]">{item.title}</p>
              <p className="mt-3 text-2xl font-extrabold text-[#A66449]">{item.price}</p>
              <p className="mt-3 text-sm leading-6 text-[#68726D]">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-3 border border-[#DFD5CA] bg-[#FFFCF7] p-4 text-sm leading-6 text-[#68726D] md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex h-10 w-10 items-center justify-center bg-[#26332E] text-white">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p>
            Le prix peut varier si la race demandee est rare, si une verification supplementaire est necessaire, ou si la coordination demande plus de temps.
          </p>
        </div>
      </section>

      <section id="dossier-couplage" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mb-6 grid gap-4 border-b border-[#DCCFC2] pb-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Dossier de couplage</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#202824]">Deposer une demande</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#68726D]">
            Un membre du refuge lit votre dossier avant toute mise en relation. Reponse estimee sous 24 a 48h. Tarif indicatif: a partir de 300 DH.
          </p>
        </div>

        <main className="border border-[#DFD5CA] bg-white shadow-[0_18px_46px_rgba(38,51,46,0.08)]">
          <div className="border-b border-[#EEE5DA] bg-[#FFFCF7] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#F3E8DC] text-[#A66449]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#202824]">Informations a verifier</h3>
                  <p className="mt-1 text-sm text-[#68726D]">Contact, fiche animal et contexte de recherche.</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#68726D]">
                Aucun couplage n est valide automatiquement.
              </div>
            </div>
          </div>

            {success && (
              <div className="mx-6 mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                Dossier envoye. L equipe vous contactera sous 24 a 48h.
              </div>
            )}
            {error && (
              <div className="mx-6 mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
            )}

            <form className="p-6" onSubmit={handleSubmit}>
              <div className="border-b border-[#EEE5DA] pb-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#A66449]">Contact</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input id="fullName" label="Nom complet" placeholder="Ex: Sara Benali" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} required />
                  <Input id="phone" label="Telephone" placeholder="Ex: 06 12 34 56 78" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
                </div>
              </div>

              <div className="border-b border-[#EEE5DA] py-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#A66449]">Animal</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="w-full">
                    <label htmlFor="animalType" className="mb-2 block text-sm font-medium text-text-main">Type d animal</label>
                    <select id="animalType" value={form.animalType} onChange={(e) => updateField('animalType', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required>
                      <option value="">Choisir</option>
                      <option value="dog">Chien</option>
                      <option value="cat">Chat</option>
                    </select>
                  </div>
                  <Input id="breed" label="Race de votre animal" placeholder="Ex: Berger allemand" value={form.breed} onChange={(e) => updateField('breed', e.target.value)} required />

                  <div className="w-full">
                    <label htmlFor="sex" className="mb-2 block text-sm font-medium text-text-main">Sexe</label>
                    <select id="sex" value={form.sex} onChange={(e) => updateField('sex', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required>
                      <option value="">Choisir</option>
                      <option value="male">Male</option>
                      <option value="female">Femelle</option>
                    </select>
                  </div>
                  <Input id="age" label="Age" placeholder="Ex: 2 ans" value={form.age} onChange={(e) => updateField('age', e.target.value)} required />

                  <div className="w-full">
                    <label htmlFor="vaccinated" className="mb-2 block text-sm font-medium text-text-main">Vaccins a jour ?</label>
                    <select id="vaccinated" value={form.vaccinated} onChange={(e) => updateField('vaccinated', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required>
                      <option value="">Choisir</option>
                      <option value="yes">Oui</option>
                      <option value="no">Non</option>
                      <option value="unknown">A confirmer</option>
                    </select>
                  </div>
                  <Input id="healthStatus" label="Etat de sante" placeholder="Ex: en bonne sante, suivi en cours..." value={form.healthStatus} onChange={(e) => updateField('healthStatus', e.target.value)} />
                </div>
              </div>

              <div className="py-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#A66449]">Recherche et contexte</p>
                <div className="grid gap-4">
                  <Input id="preferredBreed" label="Race recherchee" placeholder="Optionnel" value={form.preferredBreed} onChange={(e) => updateField('preferredBreed', e.target.value)} />
                  <Input id="message" label="Details importants" as="textarea" placeholder="Temperament, taille, documents disponibles, contraintes..." value={form.message} onChange={(e) => updateField('message', e.target.value)} />
                </div>
              </div>

            <div className="flex flex-col gap-4 border-t border-[#EEE5DA] pt-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-sm leading-6 text-[#68726D]">
                L envoi du dossier ne garantit pas une mise en relation. La decision depend du bien-etre et de la securite des animaux.
              </p>
              <Button type="submit" variant="primary" className="h-12 rounded-lg px-7 font-bold" disabled={submitting}>
                {submitting ? 'Envoi...' : 'Envoyer le dossier'}
              </Button>
            </div>
          </form>
        </main>
      </section>
    </div>
  );
};

export default Couplage;
