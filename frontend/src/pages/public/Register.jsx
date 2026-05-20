import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Logo from '../../components/Logo';
import { ADMIN_URL } from '../../config';

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
        window.location.href = ADMIN_URL;
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

      <section className="mx-auto flex min-h-screen max-w-[700px] flex-col justify-center px-4 py-6 sm:px-6">
        <Link to="/" className="mx-auto mb-6 inline-flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="font-serif text-xl font-bold">
            Refu<span className="text-accent">Connect</span>
          </span>
        </Link>

        <div className="rounded-[20px] border border-primary/10 bg-white p-6 shadow-[0_20px_60px_rgba(31,37,35,0.10)] sm:p-7">
          <div className="mb-6 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <ShieldCheck size={14} />
              Nouveau membre
            </p>
            <h1 className="font-serif text-3xl font-bold text-primary-dark">Creer votre compte</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Un compte pour suivre vos demandes et garder le contact avec le refuge.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-primary-dark">
                Nom complet
              </label>
              <div className="relative mt-1">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Votre nom et prenom"
                  autoComplete="name"
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
                />
              </div>
              {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary-dark">
                Adresse email
              </label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="vous@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
                />
              </div>
              {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-primary-dark">
                  Mot de passe
                </label>
                <div className="relative mt-1">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    placeholder="Minimum 8 caracteres"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-12 py-3 outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-primary-dark">
                  Confirmer le mot de passe
                </label>
                <div className="relative mt-1">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                  <input
                    id="password_confirmation"
                    type={showConfirmation ? 'text' : 'password'}
                    value={passwordConfirmation}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, passwordConfirmation: '' }));
                    }}
                    placeholder="Retapez votre mot de passe"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-12 py-3 outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmation((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.passwordConfirmation && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.passwordConfirmation}</p>
                )}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-primary-dark">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  setFieldErrors((prev) => ({ ...prev, acceptTerms: '' }));
                }}
                className="mt-1 h-4 w-4 rounded border-primary/30"
              />
              <span>
                J'accepte les{' '}
                <Link to="/cgu" className="font-semibold hover:underline">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/politique-confidentialite" className="font-semibold hover:underline">
                  politique de confidentialite
                </Link>
                .
              </span>
              {fieldErrors.acceptTerms && <p className="text-xs text-red-600">{fieldErrors.acceptTerms}</p>}
            </label>

            <Button
              variant="primary"
              className="w-full py-3 font-semibold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creation...' : 'Creer mon compte'}
            </Button>

            <p className="text-center text-sm text-muted">
              Deja inscrit ?{' '}
              <Link to="/connexion" className="font-semibold text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
