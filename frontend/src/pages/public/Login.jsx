import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { PawPrint } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Email invalide');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // Mock login - support admin and visitor demo accounts
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'admin@refuge.com' && password === 'admin123') {
      login({ email: normalizedEmail, role: 'admin' });
      navigate('/admin', { replace: true });
    } else if (normalizedEmail === 'visitor@refuge.com' && password === 'visitor') {
      login({ email: normalizedEmail, role: 'user' });
      navigate('/user', { replace: true });
    } else {
      setError("Email ou mot de passe incorrect.\n\nDémo : admin@refuge.com / admin123 (admin)\nvisitor@refuge.com / visitor (visiteur)");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <PawPrint className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 flex gap-0.5">
                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
              </div>
            </div>
            <span className="font-serif text-lg font-bold">Refu<span className="text-primary">Connect</span></span>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Connexion Admin</h1>
          <p className="text-muted text-sm mt-2">Accédez à votre espace de gestion</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        {/* Login Form */}
        <Card className="p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@refuge.com"
              disabled={isLoading}
            />

            <Input
              id="password"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />

            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-xs text-muted">Démo : admin@refuge.com / admin123 ou visitor@refuge.com / visitor</p>
            </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-primary hover:text-orange-600 font-medium">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
