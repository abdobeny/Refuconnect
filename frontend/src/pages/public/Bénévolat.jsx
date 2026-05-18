import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Volunteer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const opportunities = [
    { role: 'Soigneur', desc: 'Aide aux soins quotidiens des animaux.' },
    { role: 'Accueil', desc: 'Accueil des visiteurs et présentation des animaux.' },
    { role: 'Événements', desc: 'Organisation d\'événements et collectes.' },
  ];

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Le nom est requis';
    if (!form.email.trim()) e.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
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
      await axiosClient.post('/volunteer-applications', {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || null,
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setShowForm(false);
    } catch (err) {
      const msg =
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'envoyer la candidature.';
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl mb-4">Devenez <span className="text-primary">bénévole</span></h1>
        <p className="text-muted mb-12 text-lg">Rejoignez notre équipe et aidez les animaux du refuge.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {opportunities.map((opp, i) => (
            <Card key={i} className="p-6">
              <h3 className="font-serif text-xl font-bold mb-2">{opp.role}</h3>
              <p className="text-sm text-muted">{opp.desc}</p>
            </Card>
          ))}
        </div>

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            Candidature envoyée avec succès. Nous vous contacterons bientôt.
          </div>
        )}

        {!showForm ? (
          <Button variant="primary" onClick={() => setShowForm(true)}>Proposer votre aide</Button>
        ) : (
          <Card className="max-w-2xl mx-auto p-8">
            <h2 className="font-serif text-2xl font-bold mb-6">Inscription bénévole</h2>

            {apiError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{apiError}</div>
            )}

            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <Input id="volName" label="Nom complet" value={form.name} onChange={handleChange('name')} />
              {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
              <Input id="volEmail" label="Email" type="email" value={form.email} onChange={handleChange('email')} />
              {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
              <Input id="volPhone" label="Téléphone" type="tel" value={form.phone} onChange={handleChange('phone')} />
              <div className="w-full">
                <label htmlFor="volMessage" className="block text-sm font-medium text-text-main mb-2">
                  Disponibilités et intérêts
                </label>
                <textarea
                  id="volMessage"
                  value={form.message}
                  onChange={handleChange('message')}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 min-h-[120px] resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
                  {submitting ? 'Envoi...' : 'Envoyer candidature'}
                </Button>
                <Button type="button" variant="white" onClick={() => { setShowForm(false); setApiError(''); }}>Annuler</Button>
              </div>
            </form>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Volunteer;
