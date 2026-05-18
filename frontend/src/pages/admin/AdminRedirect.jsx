import React, { useEffect } from 'react';
import { ADMIN_URL } from '../../config';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = ADMIN_URL;
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <Card className="max-w-md p-8 text-center">
        <h2 className="font-serif text-2xl font-bold">Administration</h2>
        <p className="mt-3 text-sm text-muted">
          La gestion du refuge se fait via le tableau de bord Filament.
        </p>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => {
            window.location.href = ADMIN_URL;
          }}
        >
          Ouvrir le tableau de bord
        </Button>
      </Card>
    </div>
  );
};

export default AdminRedirect;
