import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Adoptions = () => {
  const [adoptions, setAdoptions] = useState([
    { id: 1, fullName: 'Jean Martin', email: 'jean@email.com', address: 'Paris', animalName: 'Max', status: 'pending', date: '2026-02-20' },
    { id: 2, fullName: 'Marie Dupont', email: 'marie@email.com', address: 'Lyon', animalName: 'Bella', status: 'approved', date: '2026-02-18' },
    { id: 3, fullName: 'Paul Leclerc', email: 'paul@email.com', address: 'Marseille', animalName: 'Leo', status: 'pending', date: '2026-02-22' },
  ]);

  const handleApprove = (id) => {
    setAdoptions(
      adoptions.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );
  };

  const handleReject = (id) => {
    setAdoptions(
      adoptions.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
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
        <h2 className="font-serif text-3xl">Demandes d'adoption</h2>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/10 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-bold">Nom</th>
              <th className="text-left px-4 py-3 font-bold">Email</th>
              <th className="text-left px-4 py-3 font-bold">Adresse</th>
              <th className="text-left px-4 py-3 font-bold">Animal</th>
              <th className="text-left px-4 py-3 font-bold">Date</th>
              <th className="text-left px-4 py-3 font-bold">Statut</th>
              <th className="text-right px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption) => (
              <tr key={adoption.id} className="border-b hover:bg-muted/5">
                <td className="px-4 py-3 font-bold">{adoption.fullName}</td>
                <td className="px-4 py-3 text-xs">{adoption.email}</td>
                <td className="px-4 py-3 text-sm">{adoption.address}</td>
                <td className="px-4 py-3 font-bold">{adoption.animalName}</td>
                <td className="px-4 py-3 text-xs text-muted">{adoption.date}</td>
                <td className="px-4 py-3">{getStatusBadge(adoption.status)}</td>
                <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                  {adoption.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleApprove(adoption.id)}
                        className="text-xs px-3 py-1 text-green-600"
                      >
                        ✓ Approuver
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleReject(adoption.id)}
                        className="text-xs px-3 py-1 text-red-600 hover:bg-red-50"
                      >
                        ✗ Rejeter
                      </Button>
                    </>
                  )}
                  {adoption.status !== 'pending' && (
                    <span className="text-xs text-muted">Décidé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {adoptions.length === 0 && (
        <div className="text-center py-12 text-muted">
          Aucune demande d'adoption.
        </div>
      )}
    </div>
  );
};

export default Adoptions;
