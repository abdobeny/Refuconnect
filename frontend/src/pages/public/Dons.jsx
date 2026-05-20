import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Gift,
  HandCoins,
  HeartHandshake,
  PackageCheck,
  PawPrint,
  ShieldCheck,
  Stethoscope,
  Truck,
  Utensils,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

const impactOptions = [
  {
    amount: 50,
    title: 'Repas et litière',
    text: 'Aide à couvrir les besoins du quotidien pour un animal accueilli.',
    icon: Utensils,
  },
  {
    amount: 100,
    title: 'Soins de base',
    text: 'Participe aux produits de soin, antiparasitaires et petits contrôles.',
    icon: ShieldCheck,
  },
  {
    amount: 200,
    title: 'Vaccin ou traitement',
    text: 'Soutient une visite vétérinaire simple ou un traitement ponctuel.',
    icon: Stethoscope,
  },
  {
    amount: 500,
    title: 'Urgence vétérinaire',
    text: 'Aide le refuge à réagir quand un animal arrive avec un besoin urgent.',
    icon: HeartHandshake,
  },
];

const transparencyItems = [
  { icon: Utensils, label: 'Nourriture', text: 'Croquettes, pâtée, litière et eau propre.' },
  { icon: Stethoscope, label: 'Vétérinaire', text: 'Consultations, vaccins, traitements et suivis.' },
  { icon: Truck, label: 'Transport', text: 'Déplacements vers clinique, familles et points relais.' },
  { icon: PackageCheck, label: 'Matériel', text: 'Couvertures, cages, produits d’hygiène et sécurité.' },
];

const helpOptions = [
  { title: 'Nourriture', text: 'Croquettes, pâtée, lait maternisé, litière.' },
  { title: 'Matériel', text: 'Couvertures, paniers, cages de transport.' },
  { title: 'Parrainage', text: 'Aider un animal précis sur plusieurs semaines.' },
  { title: 'Bénévolat', text: 'Photos, promenades, transport ou soins simples.' },
];

const Donations = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [publicStats, setPublicStats] = useState(null);

  const customValue = Number(customAmount);
  const activeAmount = customAmount ? customValue : selectedAmount;
  const selectedImpact = useMemo(
    () => impactOptions.find((item) => item.amount === selectedAmount),
    [selectedAmount]
  );
  const monthlyGoal = 4000;
  const collected = publicStats?.donations_confirmed ?? 0;
  const progress = Math.min(Math.round((collected / monthlyGoal) * 100), 100);

  useEffect(() => {
    axiosClient.get('/public-stats')
      .then(({ data }) => setPublicStats(data))
      .catch(() => setPublicStats(null));
  }, []);

  useEffect(() => {
    const paypalStatus = searchParams.get('paypal');
    const donationId = searchParams.get('donation_id');

    if (!paypalStatus) return;

    if (paypalStatus === 'cancel') {
      setError('Paiement PayPal annulé. Votre don n’a pas été confirmé.');
      setSearchParams({}, { replace: true });
      return;
    }

    if (paypalStatus === 'success' && donationId) {
      if (!isAuthenticated) {
        navigate(`/connexion?redirect=${encodeURIComponent(`/dons?paypal=success&donation_id=${donationId}`)}`);
        return;
      }

      setSubmitting(true);
      setError('');
      axiosClient.post(`/donations/${donationId}/capture-paypal`)
        .then(() => {
          setSuccess(true);
          setMessage('');
          setSearchParams({}, { replace: true });
          return axiosClient.get('/public-stats');
        })
        .then(({ data }) => setPublicStats(data))
        .catch((err) => {
          setError(
            err.response?.data?.message
            || Object.values(err.response?.data?.errors || {}).flat().join(' ')
            || 'Impossible de confirmer le paiement PayPal.'
          );
        })
        .finally(() => setSubmitting(false));
    }
  }, [isAuthenticated, navigate, searchParams, setSearchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isAuthenticated) {
      navigate('/connexion?redirect=/dons');
      return;
    }

    if (!activeAmount || activeAmount < 1) {
      setError('Veuillez choisir ou saisir un montant.');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosClient.post('/donations/paypal-orders', {
        amount: activeAmount,
        message: [
          donorName && `Nom: ${donorName}`,
          donorEmail && `Email: ${donorEmail}`,
          selectedImpact && !customAmount && `Impact choisi: ${selectedImpact.title}`,
          message,
        ].filter(Boolean).join('\n') || undefined,
      });

      window.location.href = data.approval_url;
    } catch (err) {
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d’enregistrer le don.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F3ED] text-[#202824]">
      <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 border-b border-[#DED3C7] bg-[#F7F3ED] md:-mt-10">
        <div className="mx-auto grid max-w-7xl lg:h-[min(550px,calc(100svh-5rem))] lg:grid-cols-[1fr_0.95fr]">
          <div className="flex flex-col justify-center px-6 py-8 md:px-8">
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#E2D6CA] bg-[#FFFCF7] px-4 py-2 text-sm font-bold text-[#A66449]">
              <HandCoins className="h-4 w-4" />
              Soutenir le refuge
            </div>


            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] text-[#202824] lg:text-[3rem]">
              Un don nourrit, soigne et protège.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#68726D]">
              Le refuge regarde l'impact de chaque don, la transparence et l'utilisation réelle avant de confirmer la collecte.
            </p>

            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'Paiement', text: 'Sécurisé via PayPal' },
                { icon: BadgeCheck, label: 'Suivi', text: 'Dossier enregistré' },
                { icon: HeartHandshake, label: 'Impact', text: 'Traçable et visible' },
              ].map((item) => {
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
              <Button variant="primary" className="h-11 rounded-lg px-5 py-2 font-bold" onClick={() => document.getElementById('dossier-don')?.scrollIntoView({ behavior: 'smooth' })}>
                Faire un don
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="white" className="h-11 rounded-lg px-5 py-2 font-bold" onClick={() => document.getElementById('transparence-don')?.scrollIntoView({ behavior: 'smooth' })}>
                Où va votre don
              </Button>
            </div>
          </div>

          <div className="flex min-h-[22rem] items-center bg-[#FDFBF7] px-6 py-7 lg:min-h-0 lg:px-8">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#DFD5CA] bg-white shadow-[0_16px_40px_rgba(38,51,46,0.08)]">
              <div className="absolute left-5 top-5 z-20 rounded-full border border-[#E2D6CA] bg-[#FFFCF7]/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#A66449] shadow-sm">
                Plateforme sécurisée
              </div>
              <div className="flex min-h-[25rem] items-end justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF7F1_100%)] px-5 pb-0 pt-12">
                <img
                  src="/dons.png"
                  alt="Dons au refuge - Nourriture, jouets et matériel pour les animaux"
                  className="w-full max-w-[48rem] rounded-t-xl object-contain"
                />
              </div>
              <div className="grid border-t border-[#EEE5DA] bg-[#FFFCF7] sm:grid-cols-3">
                {[
                  ['Promesses', `${collected.toLocaleString('fr-FR')} DH`],
                  ['Objectif', `${monthlyGoal.toLocaleString('fr-FR')} DH`],
                  ['Progression', `${progress}%`],
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

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Choisir un impact</p>
            <h2 className="mt-2 font-serif text-4xl font-extrabold text-[#202824]">Votre aide devient concrète.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {impactOptions.map((item) => {
              const Icon = item.icon;
              const active = !customAmount && selectedAmount === item.amount;
              return (
                <button
                  key={item.amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(item.amount);
                    setCustomAmount('');
                  }}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? 'border-[#26332E] bg-[#26332E] text-white shadow-[0_16px_38px_rgba(38,51,46,0.18)]'
                      : 'border-[#DED3C7] bg-white text-[#202824] hover:border-[#A66449]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${active ? 'bg-white/12 text-[#D9A17F]' : 'bg-[#F3E8DC] text-[#A66449]'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-2xl font-extrabold ${active ? 'text-white' : 'text-[#A66449]'}`}>{item.amount} DH</span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold">{item.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${active ? 'text-white/72' : 'text-[#68726D]'}`}>{item.text}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-[#DED3C7] bg-[#FBF7F1] p-5">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#A66449]" />
              <p className="text-sm leading-6 text-[#68726D]">
                RefuConnect enregistre votre promesse de don, puis PayPal s’ouvre pour finaliser le paiement sécurisé.
              </p>
            </div>
          </div>
        </div>

        <form id="dossier-don" onSubmit={handleSubmit} className="rounded-3xl border border-[#DED3C7] bg-white p-6 shadow-[0_18px_46px_rgba(38,51,46,0.08]\">  
          <div className="mb-6 border-b border-[#EEE5DA] pb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Votre don</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <p className="font-serif text-4xl font-extrabold text-[#202824]">{activeAmount || 0} DH</p>
                <p className="mt-1 text-sm text-[#68726D]">{customAmount ? 'Montant personnalisé' : selectedImpact?.title}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8DC] text-[#A66449]">
                <PawPrint className="h-5 w-5" />
              </div>
            </div>
          </div>

          {success && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              Merci. Votre paiement PayPal a été confirmé et le don est enregistré.
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          <div className="grid gap-4">
            <Input
              id="customAmount"
              type="number"
              label="Montant personnalisé (DH)"
              placeholder="Ex: 150"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="donorName"
                label="Nom (optionnel)"
                placeholder="Ex: Sara Benali"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
              <Input
                id="donorEmail"
                type="email"
                label="Email (optionnel)"
                placeholder="Ex: sara@email.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
              />
            </div>
            <Input
              id="message"
              label="Message (optionnel)"
              as="textarea"
              placeholder="Un mot pour l’équipe, un animal à soutenir, une précision..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

          </div>

          <Button variant="primary" className="mt-6 h-12 w-full rounded-xl font-extrabold" type="submit" disabled={submitting}>
            {submitting ? 'Préparation...' : 'Payer avec PayPal'}
            <ArrowRight className="h-4 w-4" />
          </Button>

          {!isAuthenticated && (
            <p className="mt-3 text-center text-xs text-[#68726D]">Connexion requise pour enregistrer le don dans RefuConnect.</p>
          )}
          <p className="mt-3 text-center text-xs text-[#68726D]">Le paiement est finalisé sur PayPal. Le statut reste à confirmer par l’équipe du refuge.</p>
        </form>
      </section>

      <section id="transparence-don" className="border-y border-[#DED3C7] bg-[#FBF7F1]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Transparence</p>
              <h2 className="mt-2 font-serif text-4xl font-extrabold text-[#202824]">Où va votre don ?</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#68726D]">
              Les dons sont orientés vers les besoins les plus urgents du refuge: soins, nourriture, matériel et transport.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {transparencyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-2xl border border-[#DED3C7] bg-white p-5">
                  <Icon className="h-6 w-6 text-[#A66449]" />
                  <h3 className="mt-4 font-extrabold text-[#202824]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68726D]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-[#DED3C7] bg-white shadow-[0_16px_40px_rgba(38,51,46,0.08)]">
            <img src="/dn2.png" alt="Animal du refuge en attente de soutien" className="h-72 w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Autres façons d’aider</p>
            <h2 className="mt-2 font-serif text-4xl font-extrabold text-[#202824]">Un don peut aussi être matériel.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {helpOptions.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#DED3C7] bg-white p-5">
                  <Gift className="h-5 w-5 text-[#A66449]" />
                  <h3 className="mt-3 font-extrabold text-[#202824]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68726D]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donations;

