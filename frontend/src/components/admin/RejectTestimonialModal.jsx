import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const RejectTestimonialModal = ({ testimonialId, onSubmit, onClose, isLoading }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Veuillez expliquer pourquoi ce témoignage est rejeté.');
      return;
    }

    if (reason.length < 10) {
      setError('Le motif doit contenir au moins 10 caractères.');
      return;
    }

    onSubmit(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="font-serif text-xl font-bold">Motif du rejet</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Écrivez le motif du rejet. L'utilisateur verra ce message et comprendra pourquoi son témoignage n'a pas été accepté.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Raison du rejet
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              rows="5"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
              }`}
              placeholder="Ex: Le témoignage contient des propos inappropriés. Veuillez reformuler sans contenu offensant..."
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500">
              {reason.length}/500 caractères
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end border-t border-gray-200 pt-4">
            <Button
              type="button"
              variant="white"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'En cours...' : 'Rejeter'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RejectTestimonialModal;
