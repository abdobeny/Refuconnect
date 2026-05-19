import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Logo from '../../components/Logo';
import { ADMIN_URL } from '../../config';

const passwordRules = [
  { label: '8 caracteres minimum', test: (value) => value.length >= 8 },
  { label: 'Une lettre', test: (value) => /[A-Za-z]/.test(value) },
  { label: 'Un chiffre conseille', test: (value) => /\d/.test(value) },
];

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

  const completedRules = useMemo(
    () => passwordRules.filter((rule) => rule.test(password)).length,
    [password]
  );

  const strengthLabel = ['Faible', 'Correct', 'Bon', 'Solide'][completedRules] || 'Faible';

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
    <main className="min-h-screen bg-background-paper text-text-main">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[560px]">
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
                Nouveau membre
              </p>
              <h1 className="font-serif text-4xl font-bold text-primary-dark sm:text-5xl">Creer votre compte</h1>
              <p className="mt-3 text-base leading-7 text-muted">
                Un seul compte pour adopter, donner, reserver un toilettage, proposer du benevolat et suivre les reponses du refuge.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-[0_22px_70px_rgba(31,37,35,0.10)] sm:p-7">
              <div className="grid gap-5">
                <label htmlFor="name" className="block">
                  <span className="mb-2 block text-sm font-semibold text-primary-dark">Nom complet</span>
                  <span className="relative block">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
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
                      className="h-14 w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-4 text-base outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </span>
                  {fieldErrors.name && <span className="mt-2 block text-sm text-red-600">{fieldErrors.name}</span>}
                </label>

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
                      placeholder="Minimum 8 caracteres"
                      autoComplete="new-password"
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

                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted">
                      <span>Securite du mot de passe</span>
                      <span className="font-semibold text-primary">{strengthLabel}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((index) => (
                        <span
                          key={index}
                          className={`h-2 rounded-full ${index < completedRules ? 'bg-primary' : 'bg-primary/10'}`}
                        />
                      ))}
                    </div>
                    <div className="mt-3 grid gap-2 text-xs text-muted sm:grid-cols-3">
                      {passwordRules.map((rule) => {
                        const passed = rule.test(password);
                        return (
                          <span key={rule.label} className={`inline-flex items-center gap-1.5 ${passed ? 'text-primary' : ''}`}>
                            <Check size={14} />
                            {rule.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </label>

                <label htmlFor="password_confirmation" className="block">
                  <span className="mb-2 block text-sm font-semibold text-primary-dark">Confirmer le mot de passe</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
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
                      className="h-14 w-full rounded-2xl border border-primary/15 bg-background-paper pl-12 pr-14 text-base outline-none transition placeholder:text-muted/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmation((value) => !value)}
                      className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-primary-light hover:text-primary"
                      aria-label={showConfirmation ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                    >
                      {showConfirmation ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </span>
                  {fieldErrors.passwordConfirmation && (
                    <span className="mt-2 block text-sm text-red-600">{fieldErrors.passwordConfirmation}</span>
                  )}
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary-light/45 p-4 text-sm leading-6 text-primary">
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

                <Button variant="primary" className="h-14 w-full text-base" type="submit" disabled={isLoading}>
                  {isLoading ? 'Creation du compte...' : 'Creer mon compte'}
                </Button>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-5 text-center text-sm text-muted">
                Deja inscrit ?{' '}
                <Link to="/connexion" className="font-semibold text-primary hover:text-primary-hover">
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-primary lg:block">
          <img
            src="/benev1.png"
            alt="Benevole du refuge avec plusieurs chats"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/72 to-primary-dark/15" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C8B5]">
                Portail refuge
              </p>
              <h2 className="font-serif text-5xl font-bold leading-tight text-white">
                Un compte utile pour chaque action avec le refuge.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/82">
                Les informations restent organisees: demandes d'adoption, dons, reservations et messages importants.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-3">
              {[
                'Suivi des dossiers',
                'Dons confirmes',
                'Rendez-vous toilettage',
                'Candidature benevole',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 p-4 text-white backdrop-blur">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/16">
                    <Check size={17} />
                  </span>
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
