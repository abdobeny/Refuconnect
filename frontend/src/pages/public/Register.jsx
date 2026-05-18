import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/Logo';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !passwordConfirmation) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const user = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        password_confirmation: passwordConfirmation,
      });

      if (user.role === 'admin') {
        window.location.href = import.meta.env.VITE_ADMIN_URL || 'http://127.0.0.1:8000/admin';
      } else {
        navigate('/user', { replace: true });
      }
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      const msgs = err.response?.data?.errors;
      if (msgs) {
        const firstError = Object.values(msgs).flat()[0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-white to-background-cream px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-4 inline-flex items-center justify-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-serif text-lg font-bold">
              Refu<span className="text-accent">Connect</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Inscription</h1>
          <p className="mt-2 text-sm text-muted">Créez votre compte personnel</p>
        </div>

        {error && (
          <div className="mb-6 whitespace-pre-line rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <Card className="p-6 md:p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              id="name"
              label="Nom complet"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              disabled={isLoading}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@example.com"
              disabled={isLoading}
            />
            <Input
              id="password"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 caractères"
              disabled={isLoading}
            />
            <Input
              id="password_confirmation"
              label="Confirmer le mot de passe"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Retapez votre mot de passe"
              disabled={isLoading}
            />
            <Button variant="primary" className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted">
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="font-medium text-primary hover:text-primary-hover">
              Se connecter
            </Link>
          </p>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-primary hover:text-primary-hover">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
