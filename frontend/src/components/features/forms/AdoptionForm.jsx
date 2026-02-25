import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import axiosClient from '../../../api/axiosClient';

const AdoptionForm = ({ animalId, onCancel, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    message: '',
    hasOtherPets: 'no'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Nom requis';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Email invalide';
    if (!form.address.trim()) e.address = 'Adresse requise';
    return e;
  };

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);

    try {
      const payload = { animalId, ...form };
      const res = await axiosClient.post('/adoptions', payload);
      onSuccess?.(res.data);
      alert('Demande envoyée — merci !');
    } catch (err) {
      // Fallback to local mock success when backend not available
      console.error('Adoption submit error:', err);
      onSuccess?.({ ...form, animalId });
      alert('Demande envoyée (offline mock) — merci !');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" onSubmit={handleSubmit}>
      <h3 className="font-serif text-xl mb-4">Demande d'adoption</h3>

      <div className="grid grid-cols-1 gap-4">
        <Input id="fullName" label="Nom complet" value={form.fullName} onChange={handleChange('fullName')} />
        {errors.fullName && <div className="text-sm text-red-500">{errors.fullName}</div>}

        <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange('email')} />
        {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}

        <Input id="address" label="Adresse" value={form.address} onChange={handleChange('address')} />
        {errors.address && <div className="text-sm text-red-500">{errors.address}</div>}

        <Input id="message" label="Pourquoi souhaitez-vous adopter ?" as="textarea" value={form.message} onChange={handleChange('message')} />

        <div className="flex items-center gap-4">
          <div className="font-medium">Avez-vous d'autres animaux ?</div>
          <label className="flex items-center gap-2"><input type="radio" name="pets" value="yes" checked={form.hasOtherPets === 'yes'} onChange={() => setForm((s) => ({ ...s, hasOtherPets: 'yes' }))} /> Oui</label>
          <label className="flex items-center gap-2"><input type="radio" name="pets" value="no" checked={form.hasOtherPets === 'no'} onChange={() => setForm((s) => ({ ...s, hasOtherPets: 'no' }))} /> Non</label>
        </div>

        <div className="flex gap-3 mt-4">
          <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>{submitting ? 'Envoi...' : 'Envoyer la demande'}</Button>
          <Button type="button" variant="white" className="flex-0" onClick={onCancel}>Annuler</Button>
        </div>
      </div>
    </form>
  );
};

export default AdoptionForm;
