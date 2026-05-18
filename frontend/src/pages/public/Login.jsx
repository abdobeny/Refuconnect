import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_URL } from '../../config';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectAfterLogin = (user) => {
    const redirect = searchParams.get('redirect');
    if (user.role === 'admin') {
      window.location.href = ADMIN_URL;
      return;
    }
    navigate(redirect && redirect.startsWith('/user') ? redirect : '/user', { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      const user = await login(email.trim().toLowerCase(), password);
      redirectAfterLogin(user);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || (err.code === 'ERR_NETWORK' ? 'Impossible de joindre le serveur. Vérifiez que le backend est en cours d\'exécution.' : 'Email ou mot de passe incorrect.');
      setError(msg);
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
          <h1 className="font-serif text-3xl font-bold">Connexion</h1>
          <p className="mt-2 text-sm text-muted">Accédez à votre espace personnel</p>
        </div>

        {error && (
          <div className="mb-6 whitespace-pre-line rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <Card className="p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
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
              disabled={isLoading}
            />
            <Button variant="primary" className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="font-medium text-primary hover:text-primary-hover">
              S'inscrire
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

export default Login;
