import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Logo from '../../components/Logo';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Votre nom complet est obligatoire.';
    if (!email.trim()) nextErrors.email = 'Votre email est obligatoire.';
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = 'Entrez une adresse email valide.';
    if (!password) nextErrors.password = 'Choisissez un mot de passe.';
    if (password && password.length < 8) nextErrors.password = 'Le mot de passe doit contenir au moins 8 caracteres.';
    if (password !== passwordConfirmation) nextErrors.passwordConfirmation = 'Les mots de passe ne correspondent pas.';
    if (!acceptTerms) nextErrors.acceptTerms = 'Vous devez accepter les conditions pour creer un compte.';
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

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
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        setFieldErrors({
          name: validationErrors.name?.[0],
          email: validationErrors.email?.[0],
          password: validationErrors.password?.[0],
        });
        setError(Object.values(validationErrors).flat()[0]);
      } else {
        setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
      }
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

      <section className="mx-auto flex min-h-screen max-w-[860px] flex-col justify-center px-4 py-4">
        <Link to="/" className="mx-auto mb-4 inline-flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="font-serif text-2xl font-bold">
            Refu<span className="text-accent">Connect</span>
          </span>
        </Link>

        <div className="rounded-[24px] border border-primary/10 bg-white p-5 shadow-[0_20px_60px_rgba(31,37,35,0.10)] sm:p-6">
          <div className="mb-4 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <ShieldCheck size={15} />
                Nouveau membre
              </p>
            <h1 className="font-sans text-3xl font-bold leading-tight text-primary-dark">Creer votre compte</h1>
            <p className="mt-1.5 text-sm leading-6 text-muted">
                Un compte pour suivre vos demandes et garder le contact avec le refuge.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

          <form onSubmit={handleRegister}>
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                <label htmlFor="name" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-primary-dark">Nom complet</span>
                  <span className="relative block">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setFieldErrors((current) => ({ ...current, name: '' }));
                      }}
                      placeholder="Votre nom et prenom"
                      autoComplete="name"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.name)}
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-4 text-base outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </span>
                  {fieldErrors.name && <span className="mt-2 block text-sm text-red-600">{fieldErrors.name}</span>}
                </label>

                <label htmlFor="email" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-primary-dark">Adresse email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
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
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-4 text-base outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((current) => ({ ...current, password: '' }));
                      }}
                      placeholder="Minimum 8 caracteres"
                      autoComplete="new-password"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.password)}
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-14 text-base outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
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

                <label htmlFor="password_confirmation" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-primary-dark">Confirmer le mot de passe</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                      id="password_confirmation"
                      type={showConfirmation ? 'text' : 'password'}
                      value={passwordConfirmation}
                      onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                        setFieldErrors((current) => ({ ...current, passwordConfirmation: '' }));
                      }}
                      placeholder="Retapez votre mot de passe"
                      autoComplete="new-password"
                      disabled={isLoading}
                      aria-invalid={Boolean(fieldErrors.passwordConfirmation)}
                    className="h-11 w-full rounded-xl border border-primary/15 bg-[#FBFAF7] pl-11 pr-14 text-base outline-none transition placeholder:text-muted/55 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmation((value) => !value)}
                      className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-primary-light hover:text-primary"
                      aria-label={showConfirmation ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                    >
                      {showConfirmation ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </span>
                  {fieldErrors.passwordConfirmation && (
                    <span className="mt-2 block text-sm text-red-600">{fieldErrors.passwordConfirmation}</span>
                  )}
                </label>

              <label className="flex items-start gap-3 rounded-xl border border-primary/10 bg-primary-light/45 p-3 text-sm leading-5 text-primary sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      setFieldErrors((current) => ({ ...current, acceptTerms: '' }));
                    }}
                    className="mt-1 h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                  />
                  <span>
                    J'accepte les{' '}
                    <Link to="/cgu" className="font-semibold underline-offset-4 hover:underline">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="/politique-confidentialite" className="font-semibold underline-offset-4 hover:underline">
                      politique de confidentialite
                    </Link>
                    .
                    {fieldErrors.acceptTerms && <span className="mt-1 block text-red-600">{fieldErrors.acceptTerms}</span>}
                  </span>
                </label>

              <Button variant="primary" className="h-11 w-full text-base sm:col-span-2" type="submit" disabled={isLoading}>
                  {isLoading ? 'Creation du compte...' : 'Creer mon compte'}
                </Button>
              </div>

            <div className="mt-4 border-t border-primary/10 pt-3 text-center text-sm text-muted">
                Deja inscrit ?{' '}
                <Link to="/connexion" className="font-semibold text-primary hover:text-primary-hover">
                  Se connecter
                </Link>
              </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
