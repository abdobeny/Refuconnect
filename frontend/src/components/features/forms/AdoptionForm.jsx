import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import axiosClient from '../../../api/axiosClient';
import { useAuth } from '../../../context/AuthContext';

const AdoptionForm = ({ animalId, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [hasOtherPets, setHasOtherPets] = useState('no');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!isAuthenticated) {
      navigate(`/connexion?redirect=/animaux/${animalId}`);
      return;
    }

    if (!message.trim()) {
      setErrors({ message: 'Merci de décrire votre motivation' });
      return;
    }
    setErrors({});

    setSubmitting(true);
    setApiError('');

    const motivation = [
      message,
      fullName && `Nom : ${fullName}`,
      email && `Email : ${email}`,
      address && `Adresse : ${address}`,
      `Autres animaux : ${hasOtherPets === 'yes' ? 'Oui' : 'Non'}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const response = await axiosClient.post('/adoptions', {
        animal_id: Number(animalId),
        motivation,
      });
      onSuccess?.(response.data.data ?? response.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join(' ') ||
        'Impossible d\'envoyer la demande.';
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
        <Input id="fullName" label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="address" label="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
        
        <div className="w-full">
          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
            Pourquoi souhaitez-vous adopter ?
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 min-h-[120px] resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Décrivez votre motivation..."
          />
        </div>
        {errors.message && <div className="text-sm text-red-500">{errors.message}</div>}

        <div className="flex items-center gap-4">
          <div className="font-medium">Avez-vous d&apos;autres animaux ?</div>
          <label className="flex items-center gap-2">
            <input type="radio" name="pets" value="yes" checked={hasOtherPets === 'yes'} onChange={() => setHasOtherPets('yes')} /> Oui
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pets" value="no" checked={hasOtherPets === 'no'} onChange={() => setHasOtherPets('no')} /> Non
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
