import React from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const DeleteConfirmation = ({ animal, onConfirm, onCancel, isDeleting }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <h3 className="text-center font-serif text-xl font-bold text-gray-900">
            Confirmer la suppression
          </h3>

          <p className="mt-3 text-center text-sm text-gray-600">
            Êtes-vous sûr de vouloir supprimer{' '}
            <span className="font-semibold">{animal.name}</span> ? Cette action ne peut
            pas être annulée.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="white"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeleteConfirmation;
