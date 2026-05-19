import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_URL } from '../../config';
import Button from '../../components/ui/Button';
import Logo from '../../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const redirect = searchParams.get('redirect');
  const safeRedirect = useMemo(
    () => (redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/user'),
    [redirect]
  );

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        window.location.href = ADMIN_URL;
        return;
      }
      navigate(safeRedirect, { replace: true });
    }
  }, [loading, navigate, safeRedirect, user]);

  const redirectAfterLogin = (freshUser) => {
    if (freshUser.role === 'admin') {
      window.location.href = ADMIN_URL;
      return;
    }
    navigate(safeRedirect, { replace: true });
  };

  const validate = (emailValue = email, passwordValue = password) => {
    const nextErrors = {};
    if (!emailValue.trim()) nextErrors.email = 'Votre email est obligatoire.';
    if (emailValue.trim() && !/^\S+@\S+\.\S+$/.test(emailValue.trim())) nextErrors.email = 'Entrez une adresse email valide.';
    if (!passwordValue) nextErrors.password = 'Votre mot de passe est obligatoire.';
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const emailValue = String(formData.get('email') || email).trim().toLowerCase();
    const passwordValue = String(formData.get('password') || password);

    setEmail(emailValue);
    setPassword(passwordValue);

    if (!validate(emailValue, passwordValue)) return;

    setIsLoading(true);

    try {
      const freshUser = await login(emailValue, passwordValue, { remember: rememberMe });
      redirectAfterLogin(freshUser);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        setFieldErrors({
          email: validationErrors.email?.[0],
          password: validationErrors.password?.[0],
        });
      }

      const msg = err.response?.data?.message
        || validationErrors?.email?.[0]
        || (err.code === 'ERR_NETWORK'
          ? "Impossible de joindre le serveur. Verifiez que le backend est en cours d'execution."
          : 'Email ou mot de passe incorrect.');
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F4EF] text-text-main">
      <Link
        to="/"
        className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
        aria-label="Retour a l'accueil"
      >
        <ArrowLeft size={19} />
      </Link>

      <section className="mx-auto flex min-h-screen max-w-[460px] flex-col justify-center px-4 py-5">
        <Link to="/" className="mx-auto mb-4 inline-flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="font-serif text-xl font-bold">
            Refu<span className="text-accent">Connect</span>
          </span>
        </Link>

        <div className="rounded-[20px] border border-primary/10 bg-white p-5 shadow-[0_16px_45px_rgba(31,37,35,0.09)] sm:p-6">
          <div className="mb-4 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-primary">
              <ShieldCheck size={14} />
              Connexion membre
            </p>
            <h1 className="font-sans text-2xl font-bold leading-tight text-primary-dark">Connexion</h1>
            <p className="mt-1.5 text-sm leading-5 text-muted">
              Accedez a votre espace refuge.
            </p>
              {redirect && (
                <p className="mt-3 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-primary">
                  Connectez-vous pour terminer cette action en toute securite.
                </p>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

          <form onSubmit={handleLogin}>
              <div className="space-y-3.5">
                <label htmlFor="email" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-primary-dark">Adresse email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFieldErrors((current) => ({ ...current, email: '' }));
                      }}
                      placeholder="vous@example.com"
                      autoComplete="email"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.email)}
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-4 text-[15px] outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </span>
                  {fieldErrors.email && <span className="mt-2 block text-sm text-red-600">{fieldErrors.email}</span>}
                </label>

                <label htmlFor="password" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-primary-dark">Mot de passe</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((current) => ({ ...current, password: '' }));
                      }}
                      autoComplete="current-password"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.password)}
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-14 text-[15px] outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-primary-light hover:text-primary"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </span>
                  {fieldErrors.password && <span className="mt-2 block text-sm text-red-600">{fieldErrors.password}</span>}
                </label>

              <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                    />
                    Rester connecte
                  </label>
                <a href="mailto:contact@refuconnect.fr" className="hover:text-primary">
                  Assistance
                </a>
                </div>

                <Button variant="primary" className="h-11 w-full text-[15px]" type="submit" disabled={isLoading}>
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </div>

            <div className="mt-4 border-t border-primary/10 pt-3 text-center text-sm text-muted">
                Pas encore de compte ?{' '}
                <Link to="/inscription" className="font-semibold text-primary hover:text-primary-hover">
                  Creer un compte
                </Link>
              </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
