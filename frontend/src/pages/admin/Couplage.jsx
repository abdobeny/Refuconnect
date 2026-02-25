import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const Couplage = () => {
  const [requests, setRequests] = useState([
    { id: 1, fullName: 'Sophie Moreau', email: 'sophie@email.com', maleBreed: 'Berger Allemand', femaleBreed: 'Berger Allemand', status: 'pending', date: '2026-02-20' },
    { id: 2, fullName: 'Marc Beaumont', email: 'marc@email.com', maleBreed: 'Golden Retriever', femaleBreed: 'Golden Retriever', status: 'approved', date: '2026-02-19' },
    { id: 3, fullName: 'Nathalie Rousseau', email: 'nathalie@email.com', maleBreed: 'Labrador', femaleBreed: 'Labrador', status: 'pending', date: '2026-02-21' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    maleBreed: '',
    femaleBreed: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRequest = () => {
    setError('');

    if (!formData.fullName || !formData.email || !formData.maleBreed || !formData.femaleBreed) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    setRequests([...requests, newRequest]);
    setShowForm(false);
    setError('');
    setFormData({
      fullName: '',
      email: '',
      maleBreed: '',
      femaleBreed: '',
    });
  };

  const handleApprove = (id) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'approved') return <Badge variant="solid">Approuvé</Badge>;
    if (status === 'rejected') return <Badge variant="muted">Rejeté</Badge>;
    return <Badge variant="light">En attente</Badge>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl">Demandes de Couplage</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'outline' : 'primary'}
        >
          {showForm ? 'Annuler' : '+ Nouvelle Demande'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Ajouter Demande de Couplage</h3>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm w-full break-words">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom complet"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Ex: Sophie Moreau"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="sophie@email.com"
            />
            <Input
              label="Race du mâle"
              name="maleBreed"
              value={formData.maleBreed}
              onChange={handleInputChange}
              placeholder="Ex: Berger Allemand"
            />
            <Input
              label="Race de la femelle"
              name="femaleBreed"
              value={formData.femaleBreed}
              onChange={handleInputChange}
              placeholder="Ex: Berger Allemand"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="primary" onClick={handleAddRequest}>
              Ajouter Demande
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
              <th className="text-left px-4 py-3 font-bold">Nom</th>
              <th className="text-left px-4 py-3 font-bold">Email</th>
              <th className="text-left px-4 py-3 font-bold">♂ Race</th>
              <th className="text-left px-4 py-3 font-bold">♀ Race</th>
              <th className="text-left px-4 py-3 font-bold">Date</th>
              <th className="text-left px-4 py-3 font-bold">Statut</th>
              <th className="text-right px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-muted/5">
                <td className="px-4 py-3 font-bold">{req.fullName}</td>
                <td className="px-4 py-3 text-xs">{req.email}</td>
                <td className="px-4 py-3 text-sm">{req.maleBreed}</td>
                <td className="px-4 py-3 text-sm">{req.femaleBreed}</td>
                <td className="px-4 py-3 text-xs text-muted">{req.date}</td>
                <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                  {req.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleApprove(req.id)}
                        className="text-xs px-3 py-1 text-green-600"
                      >
                        ✓ Approuver
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleReject(req.id)}
                        className="text-xs px-3 py-1 text-red-600 hover:bg-red-50"
                      >
                        ✗ Rejeter
                      </Button>
                    </>
                  )}
                  {req.status !== 'pending' && (
                    <span className="text-xs text-muted">Décidé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {requests.length === 0 && (
        <div className="text-center py-12 text-muted">
          Aucune demande de couplage.
        </div>
      )}
    </div>
  );
};

export default Couplage;
