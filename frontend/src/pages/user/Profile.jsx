import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Abdel Beny',
    email: user?.email || '',
    phone: '+212 6 12 34 56 78',
    city: 'Casablanca',
    address: '123 Rue de la Paix',
  });

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = () => {
    // In production, send to backend
    alert('Profil mis à jour avec succès');
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl font-bold">Mon Profil</h1>
        <Badge variant="solid" className="bg-green-500">
          Actif
        </Badge>
      </div>

      {/* Profile Card */}
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Avatar + Basic Info */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
              AB
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">{isEditing ? 'Modification en cours...' : formData.fullName}</h2>
              <p className="text-muted">{formData.email}</p>
              <p className="text-sm text-muted mt-1">Inscrit depuis le 15 janvier 2024</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <Input
                  id="fullName"
                  label="Nom complet"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                />
                <Input
                  id="phone"
                  label="Téléphone"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                />
                <Input id="email" label="Email" type="email" value={formData.email} disabled />
                <Input
                  id="city"
                  label="Ville"
                  value={formData.city}
                  onChange={handleChange('city')}
                />
                <Input
                  id="address"
                  label="Adresse"
                  className="md:col-span-2"
                  value={formData.address}
                  onChange={handleChange('address')}
                />
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Nom complet</label>
                  <p className="text-text-main">{formData.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Téléphone</label>
                  <p className="text-text-main">{formData.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Email</label>
                  <p className="text-text-main">{formData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Ville</label>
                  <p className="text-text-main">{formData.city}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-main mb-1">Adresse</label>
                  <p className="text-text-main">{formData.address}</p>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button variant="primary" onClick={handleSave}>
                  Enregistrer
                </Button>
                <Button variant="white" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Modifier le profil
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Safety Section */}
      <Card className="p-6 md:p-8">
        <h3 className="font-serif text-lg font-bold mb-4">Sécurité & Compte</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full md:w-auto">
            Changer le mot de passe
          </Button>
          <Button variant="ghost" className="w-full md:w-auto text-red-600 hover:bg-red-50" onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
