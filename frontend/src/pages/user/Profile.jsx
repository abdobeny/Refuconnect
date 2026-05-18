import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const Profile = () => {
  const { user, logout, persistAuth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const { data } = await axiosClient.put('/user', { name, email });
      const updatedUser = data.data ?? data;
      persistAuth(localStorage.getItem('token'), updatedUser);
      setSuccess('Profil mis à jour avec succès');
      setIsEditing(false);
    } catch (err) {
      const msgs = err.response?.data?.errors;
      if (msgs) {
        setError(Object.values(msgs).flat()[0]);
      } else {
        setError('Erreur lors de la mise à jour.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);

    try {
      await axiosClient.put('/user', {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess('Mot de passe modifié avec succès');
      setShowPasswordForm(false);
      setCurrentPassword('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe.');
    } finally {
      setIsLoading(false);
    }
  };

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl font-bold">Mon Profil</h1>
        <Badge variant="solid" className="bg-green-500">
          Actif
        </Badge>
      </div>

      {(error) && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">{success}</div>
      )}

      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted">{user?.email}</p>
              {joinedDate && (
                <p className="text-sm text-muted mt-1">Inscrit depuis le {joinedDate}</p>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <Input
                  id="name"
                  label="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Nom complet</label>
                  <p className="text-text-main">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Email</label>
                  <p className="text-text-main">{user?.email}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
                <Button variant="white" onClick={() => { setIsEditing(false); setError(''); }}>
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

      <Card className="p-6 md:p-8">
        <h3 className="font-serif text-lg font-bold mb-4">Sécurité & Compte</h3>
        <div className="space-y-4">
          {!showPasswordForm ? (
            <Button variant="outline" className="w-full md:w-auto" onClick={() => setShowPasswordForm(true)}>
              Changer le mot de passe
            </Button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <Input
                id="current_password"
                label="Mot de passe actuel"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                id="new_password"
                label="Nouveau mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                required
              />
              <Input
                id="confirm_password"
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <div className="flex gap-3">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Modification...' : 'Changer'}
                </Button>
                <Button variant="white" type="button" onClick={() => { setShowPasswordForm(false); setError(''); }}>
                  Annuler
                </Button>
              </div>
            </form>
          )}
          <div>
            <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={logout}>
              Se déconnecter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
