import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const Donations = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const amounts = [10, 25, 50, 100];

  return (
    <div className="text-center">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl mb-4">Soutenir <span className="text-primary">RefuConnect</span></h1>
        <p className="text-muted mb-12 text-lg">Votre don aide nos animaux à trouver une nouvelle maison aimante.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {amounts.map((am) => (
            <Button
              key={am}
              variant={selectedAmount === am ? 'primary' : 'white'}
              className={`border border-gray-200 ${selectedAmount === am ? 'bg-primary text-white' : ''}`}
              onClick={() => setSelectedAmount(am)}
            >
              {am} DH
            </Button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Montant personnalisé</label>
            <Input type="number" id="customAmount" placeholder="Entrez un montant" />
          </div>

          <form className="grid grid-cols-1 gap-4 mb-6">
            <Input id="donorName" label="Nom" />
            <Input id="donorEmail" label="Email" type="email" />
          </form>

          <Button variant="primary" className="w-full">Effectuer un don</Button>
        </div>

        <Card className="p-6 bg-orange-50 border border-orange-100">
          <h3 className="font-serif text-xl font-bold mb-2">Votre impact</h3>
          <p className="text-sm text-muted">Chaque don soutient notre mission de refuge. Merci !</p>
        </Card>
      </section>
    </div>
  );
};

export default Donations;
