import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const Toilettage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, animalName: 'Max', service: 'Bain', date: '2026-02-26', time: '10:00', status: 'confirmed', price: '150 DH' },
    { id: 2, animalName: 'Bella', service: 'Coupe', date: '2026-02-27', time: '14:00', status: 'pending', price: '250 DH' },
    { id: 3, animalName: 'Leo', service: 'Soins Spéciaux', date: '2026-02-28', time: '11:00', status: 'completed', price: '300 DH' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    animalName: '',
    service: 'Bain',
    date: '',
    time: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAppointment = () => {
    setError('');

    if (!formData.animalName || !formData.date || !formData.time || !formData.price) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: 'pending',
    };

    setAppointments([...appointments, newAppointment]);
    setShowForm(false);
    setError('');
    setFormData({
      animalName: '',
      service: 'Bain',
      date: '',
      time: '',
      price: '',
    });
  };

  const handleCompleteAppointment = (id) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: 'completed' } : a))
    );
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') return <Badge variant="solid">✓ Complété</Badge>;
    if (status === 'confirmed') return <Badge variant="light">✓ Confirmé</Badge>;
    return <Badge>⏳ En attente</Badge>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl">RDV Toilettage</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'outline' : 'primary'}
        >
          {showForm ? 'Annuler' : '+ Nouveau RDV'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Ajouter RDV Toilettage</h3>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm w-full break-words">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom de l'animal"
              name="animalName"
              value={formData.animalName}
              onChange={handleInputChange}
              placeholder="Ex: Max"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Bain">Bain</option>
              <option value="Coupe">Coupe</option>
              <option value="Soins Spéciaux">Soins Spéciaux</option>
            </select>
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <Input
              label="Heure"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
            <Input
              label="Prix (DH)"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="150 DH"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="primary" onClick={handleAddAppointment}>
              Ajouter RDV
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/10 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-bold">Animal</th>
              <th className="text-left px-4 py-3 font-bold">Service</th>
              <th className="text-left px-4 py-3 font-bold">Date</th>
              <th className="text-left px-4 py-3 font-bold">Heure</th>
              <th className="text-left px-4 py-3 font-bold">Prix</th>
              <th className="text-left px-4 py-3 font-bold">Statut</th>
              <th className="text-right px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-b hover:bg-muted/5">
                <td className="px-4 py-3 font-bold">{apt.animalName}</td>
                <td className="px-4 py-3">{apt.service}</td>
                <td className="px-4 py-3 text-sm text-muted">{apt.date}</td>
                <td className="px-4 py-3 text-sm">{apt.time}</td>
                <td className="px-4 py-3 font-bold text-primary">{apt.price}</td>
                <td className="px-4 py-3">{getStatusBadge(apt.status)}</td>
                <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                  {apt.status !== 'completed' && (
                    <Button
                      variant="outline"
                      onClick={() => handleCompleteAppointment(apt.id)}
                      className="text-xs px-3 py-1 text-green-600"
                    >
                      ✓ Complété
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => handleCancelAppointment(apt.id)}
                    className="text-xs px-3 py-1 text-red-600 hover:bg-red-50"
                  >
                    Annuler
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {appointments.length === 0 && (
        <div className="text-center py-12 text-muted">
          Aucun RDV toilettage.
        </div>
      )}
    </div>
  );
};

export default Toilettage;
