import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

const Donations = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const amounts = [50, 100, 200, 500];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/connexion?redirect=/dons');
      return;
    }

    const amount = customAmount ? Number(customAmount) : selectedAmount;
    if (!amount || amount < 1) {
      setError('Veuillez choisir ou saisir un montant.');
      return;
    }

    setSubmitting(true);
    try {
      await axiosClient.post('/donations', {
        type: 'financial',
        amount,
        message: message || undefined,
      });
      setSuccess(true);
      setSelectedAmount(null);
      setCustomAmount('');
      setMessage('');
    } catch (err) {
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'enregistrer le don.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-center">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-4 font-serif text-4xl">
          Soutenir <span className="text-primary">RefuConnect</span>
        </h1>
        <p className="mb-12 text-lg text-muted">
          Votre engagement financier aide le refuge (aucun paiement en ligne — promesse de don).
        </p>

        {success && (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
            Merci ! Votre don a été enregistré. L&apos;équipe vous contactera si besoin.
          </div>
        )}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {amounts.map((am) => (
              <Button
                key={am}
                type="button"
                variant={selectedAmount === am ? 'primary' : 'white'}
                className={`border border-gray-200 ${selectedAmount === am ? 'bg-primary text-white' : ''}`}
                onClick={() => {
                  setSelectedAmount(am);
                  setCustomAmount('');
                }}
              >
                {am} DH
              </Button>
            ))}
          </div>

          <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold">Montant personnalisé (DH)</label>
              <Input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Entrez un montant"
              />
            </div>

            <Input
              id="message"
              label="Message (optionnel)"
              as="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button variant="primary" className="mt-6 w-full" type="submit" disabled={submitting}>
              {submitting ? 'Envoi...' : 'Enregistrer mon don'}
            </Button>
            {!isAuthenticated && (
              <p className="mt-3 text-xs text-muted">Connexion requise pour enregistrer un don.</p>
            )}
          </div>
        </form>

        <Card className="border border-orange-100 bg-orange-50 p-6">
          <h3 className="mb-2 font-serif text-xl font-bold">Votre impact</h3>
          <p className="text-sm text-muted">Chaque don soutient notre mission de refuge. Merci !</p>
        </Card>
      </section>
    </div>
  );
};

export default Donations;
