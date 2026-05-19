import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-white to-background-cream px-4">
      <div className="text-center">
        <Logo className="mx-auto mb-6 h-16 w-16" />
        <h1 className="font-serif text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-muted">Cette page n&apos;existe pas.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
