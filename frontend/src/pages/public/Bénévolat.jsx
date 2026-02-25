import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const Volunteer = () => {
  const [showForm, setShowForm] = useState(false);

  const opportunities = [
    { role: 'Soigneur', desc: 'Aide aux soins quotidiens des animaux.' },
    { role: 'Accueil', desc: 'Accueil des visiteurs et présentation des animaux.' },
    { role: 'Événements', desc: 'Organisation d\'événements et collectes.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire de bénévolat envoyé (mock) — merci !');
    setShowForm(false);
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

        {!showForm ? (
          <Button variant="primary" onClick={() => setShowForm(true)}>Proposer votre aide</Button>
        ) : (
          <Card className="max-w-2xl mx-auto p-8">
            <h2 className="font-serif text-2xl font-bold mb-6">Inscription bénévole</h2>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <Input id="volName" label="Nom complet" required />
              <Input id="volEmail" label="Email" type="email" required />
              <Input id="volPhone" label="Téléphone" type="tel" />
              <Input id="volMessage" label="Disponibilités et intérêts" as="textarea" />
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">Envoyer candidature</Button>
                <Button type="button" variant="white" onClick={() => setShowForm(false)}>Annuler</Button>
              </div>
            </form>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Volunteer;
