import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import axiosClient from '../../../api/axiosClient';
import { useAuth } from '../../../context/AuthContext';

const AdoptionForm = ({ animalId, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    message: '',
    hasOtherPets: 'no',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.message.trim()) e.message = 'Merci de décrire votre motivation';
    return e;
  };

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!isAuthenticated) {
      navigate(`/connexion?redirect=/animaux/${animalId}`);
      return;
    }

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    setApiError('');

    const motivation = [
      form.message,
      form.fullName && `Nom : ${form.fullName}`,
      form.email && `Email : ${form.email}`,
      form.address && `Adresse : ${form.address}`,
      `Autres animaux : ${form.hasOtherPets === 'yes' ? 'Oui' : 'Non'}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const { data } = await axiosClient.post('/adoptions', {
        animal_id: Number(animalId),
        motivation,
      });
      onSuccess?.(data.data ?? data);
    } catch (err) {
      const msg =
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Impossible d\'envoyer la demande.';
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <h3 className="mb-4 font-serif text-xl">Demande d&apos;adoption</h3>

      {apiError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{apiError}</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <Input id="fullName" label="Nom complet" value={form.fullName} onChange={handleChange('fullName')} />
        <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange('email')} />
        <Input id="address" label="Adresse" value={form.address} onChange={handleChange('address')} />
        <Input
          id="message"
          label="Pourquoi souhaitez-vous adopter ?"
          as="textarea"
          value={form.message}
          onChange={handleChange('message')}
        />
        {errors.message && <div className="text-sm text-red-500">{errors.message}</div>}

        <div className="flex items-center gap-4">
          <div className="font-medium">Avez-vous d&apos;autres animaux ?</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pets"
              value="yes"
              checked={form.hasOtherPets === 'yes'}
              onChange={() => setForm((s) => ({ ...s, hasOtherPets: 'yes' }))}
            />
            Oui
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pets"
              value="no"
              checked={form.hasOtherPets === 'no'}
              onChange={() => setForm((s) => ({ ...s, hasOtherPets: 'no' }))}
            />
            Non
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
            {submitting ? 'Envoi...' : 'Envoyer la demande'}
          </Button>
          <Button type="button" variant="white" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AdoptionForm;
