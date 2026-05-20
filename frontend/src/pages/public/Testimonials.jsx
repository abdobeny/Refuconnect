import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

const Testimonials = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [detail, setDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isAuthenticated) {
      navigate('/connexion?redirect=/temoignages');
      return;
    }

    if (!role.trim() || !quote.trim()) {
      setError('Veuillez remplir votre rôle et votre témoignage.');
      return;
    }

    if (quote.length < 20) {
      setError('Votre témoignage doit contenir au moins 20 caractères.');
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post('/testimonials', {
        role: role.trim(),
        quote: quote.trim(),
        detail: detail.trim() || undefined,
      });
      setSuccess(true);
      setRole('');
      setQuote('');
      setDetail('');
    } catch (err) {
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'envoyer votre témoignage.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <section className="border-b border-[#DED3C7] bg-[#F7F3ED] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl border-l-4 border-[#A66449] pl-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#A66449]">
              Témoignages
            </p>
            <h1 className="text-3xl font-bold leading-tight text-[#202824] md:text-4xl">
              Partagez votre expérience
            </h1>
            <p className="mt-3 text-base leading-7 text-[#68726D]">
              Votre histoire aide d'autres personnes à franchir le pas. Chaque témoignage est relu par l'équipe avant publication.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        {success && (
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Témoignage envoyé !</p>
                <p className="mt-1 text-sm text-green-700">
                  Merci pour votre message. Il sera publié après validation par l'équipe du refuge.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#DED3C7] bg-white p-6 shadow-[0_18px_46px_rgba(38,51,46,0.08)]">
          <div className="mb-6 flex items-center gap-3 border-b border-[#EEE5DA] pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8DC] text-[#A66449]">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#A66449]">Votre témoignage</p>
              <p className="text-sm text-[#68726D]">Les champs marqués * sont obligatoires</p>
            </div>
          </div>

          <div className="grid gap-5">
            <Input
              id="role"
              label="Votre rôle *"
              placeholder="Ex: Adoptant, Bénévole, Famille d'accueil..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <div>
              <label htmlFor="quote" className="mb-2 block text-sm font-bold text-[#202824]">
                Votre témoignage *
              </label>
              <textarea
                id="quote"
                rows={4}
                placeholder="Racontez votre expérience avec le refuge..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full rounded-xl border border-[#DED3C7] bg-[#FBF7F1] px-4 py-3 text-sm leading-6 text-[#202824] outline-none transition-all placeholder:text-[#B5A99E] focus:border-[#A66449] focus:bg-white focus:ring-4 focus:ring-[#A66449]/10"
              />
              <p className="mt-1 text-xs text-[#68726D]">{quote.length}/500 caractères (min. 20)</p>
            </div>

            <div>
              <label htmlFor="detail" className="mb-2 block text-sm font-bold text-[#202824]">
                Précision (optionnel)
              </label>
              <input
                id="detail"
                type="text"
                placeholder="Un détail supplémentaire, le nom de l'animal..."
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#DED3C7] bg-[#FBF7F1] px-4 text-sm text-[#202824] outline-none transition-all placeholder:text-[#B5A99E] focus:border-[#A66449] focus:bg-white focus:ring-4 focus:ring-[#A66449]/10"
              />
              <p className="mt-1 text-xs text-[#68726D]">140 caractères maximum</p>
            </div>
          </div>

          <Button variant="primary" className="mt-6 h-12 w-full rounded-xl font-extrabold" type="submit" disabled={submitting}>
            {submitting ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
            <Send className="h-4 w-4" />
          </Button>

          {!isAuthenticated && (
            <p className="mt-3 text-center text-xs text-[#68726D]">
              Connexion requise pour partager un témoignage.
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default Testimonials;
