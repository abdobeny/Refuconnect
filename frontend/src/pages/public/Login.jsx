import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, HeartHandshake, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
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

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Votre email est obligatoire.';
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = 'Entrez une adresse email valide.';
    if (!password) nextErrors.password = 'Votre mot de passe est obligatoire.';
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      const freshUser = await login(email.trim().toLowerCase(), password, { remember: rememberMe });
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
    <main className="min-h-screen bg-background-paper text-text-main">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-primary lg:block">
          <img
            src="/hero.png"
            alt="Equipe du refuge avec un animal recueilli"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/72 to-primary-dark/20" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link to="/" className="inline-flex w-fit items-center gap-3 text-white">
              <Logo className="h-11 w-11" />
              <span className="font-serif text-2xl font-bold">
                Refu<span className="text-[#D0A083]">Connect</span>
              </span>
            </Link>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C8B5]">
                Espace securise
              </p>
              <h1 className="font-serif text-5xl font-bold leading-tight text-white">
                Retrouvez vos demandes, dons et rendez-vous au meme endroit.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/82">
                Connectez-vous pour suivre vos adoptions, confirmer vos dons et garder un contact clair avec l'equipe du refuge.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3">
              {[
                ['Adoptions', 'Suivi des demandes'],
                ['Dons', 'Confirmation PayPal'],
                ['Profil', 'Espace personnel'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-white/12 p-4 text-white backdrop-blur">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[520px]">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-3">
                <Logo className="h-10 w-10" />
                <span className="font-serif text-xl font-bold">
                  Refu<span className="text-accent">Connect</span>
                </span>
              </Link>
              <Link
                to="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition hover:bg-primary hover:text-white"
                aria-label="Retour a l'accueil"
              >
                <ArrowLeft size={20} />
              </Link>
            </div>

            <div className="mb-7">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <ShieldCheck size={15} />
                Connexion membre
              </p>
              <h2 className="font-serif text-4xl font-bold text-primary-dark sm:text-5xl">Connexion</h2>
              <p className="mt-3 text-base leading-7 text-muted">
                Accedez a votre espace personnel pour continuer une adoption, un don ou une demande de service.
              </p>
              {redirect && (
                <p className="mt-3 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-primary">
                  Connectez-vous pour terminer cette action en toute securite.
                </p>
              )}
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-[0_22px_70px_rgba(31,37,35,0.10)] sm:p-7">
              <div className="space-y-5">
                <label htmlFor="email" className="block">
                  <span className="mb-2 block text-sm font-semibold text-primary-dark">Adresse email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input
                      id="email"
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
                      className="h-14 w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-4 text-base outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </span>
                  {fieldErrors.email && <span className="mt-2 block text-sm text-red-600">{fieldErrors.email}</span>}
                </label>

                <label htmlFor="password" className="block">
                  <span className="mb-2 block text-sm font-semibold text-primary-dark">Mot de passe</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((current) => ({ ...current, password: '' }));
                      }}
                      autoComplete="current-password"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.password)}
                      className="h-14 w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-14 text-base outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-primary-light hover:text-primary"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </span>
                  {fieldErrors.password && <span className="mt-2 block text-sm text-red-600">{fieldErrors.password}</span>}
                </label>

                <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                    />
                    Rester connecte
                  </label>
                  <span className="text-muted">Assistance: contact@refuconnect.fr</span>
                </div>

                <Button variant="primary" className="h-14 w-full text-base" type="submit" disabled={isLoading}>
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-5 text-center text-sm text-muted">
                Pas encore de compte ?{' '}
                <Link to="/inscription" className="font-semibold text-primary hover:text-primary-hover">
                  Creer un compte
                </Link>
              </div>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-primary-light/70 p-4 text-sm leading-6 text-primary">
              <HeartHandshake className="mt-0.5 shrink-0" size={20} />
              <p>
                Votre compte permet au refuge de retrouver vos demandes et de vous repondre plus vite, comme sur un vrai portail client.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
