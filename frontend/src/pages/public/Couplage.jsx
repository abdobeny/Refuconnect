import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const Couplage = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: '', maleBreed: '', femaleBreed: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Demande de couplage envoyée (mock) — merci !');
    setShowForm(false);
    setForm({ fullName: '', maleBreed: '', femaleBreed: '' });
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl mb-8"><span className="text-primary">Couplage</span> des races</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Pricing Card */}
        <div className="lg:w-1/3 bg-orange-50 p-6 rounded-2xl border border-orange-100 h-fit">
          <h3 className="font-serif text-xl font-bold mb-4">Tarification du service</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2 border-orange-200">
              <span>Couplage standard</span>
              <span className="font-bold text-primary">300 DH</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-orange-200">
              <span>Race spécifiques</span>
              <span className="font-bold text-primary">400-600 DH</span>
            </div>
            <p className="text-xs text-muted mt-4">Les prix varient selon la race et l'état de santé. Validation vétérinaire requise.</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3">
          {!showForm ? (
            <Button variant="primary" onClick={() => setShowForm(true)}>Demande de couplage</Button>
          ) : (
            <Card className="p-6 border-t-4 border-secondary">
              <h3 className="font-serif text-xl font-bold mb-6">Demande de couplage</h3>
              <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                <Input
                  id="fullName"
                  label="Nom complet"
                  value={form.fullName}
                  onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                  required
                />
                <Input
                  id="maleBreed"
                  label="Race du mâle"
                  value={form.maleBreed}
                  onChange={(e) => setForm((s) => ({ ...s, maleBreed: e.target.value }))}
                  required
                />
                <Input
                  id="femaleBreed"
                  label="Race de la femelle"
                  value={form.femaleBreed}
                  onChange={(e) => setForm((s) => ({ ...s, femaleBreed: e.target.value }))}
                  required
                />
                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="secondary" className="flex-1 bg-secondary text-white">Envoyer la demande</Button>
                  <Button type="button" variant="white" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default Couplage;
