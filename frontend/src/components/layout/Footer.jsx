import { Link } from 'react-router-dom';
import {
  Facebook,
  Gift,
  HandHeart,
  Home,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  PawPrint,
  Phone,
  Scissors,
  Users,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: 'Facebook', href: import.meta.env.VITE_FACEBOOK_URL, icon: Facebook },
    { label: 'Instagram', href: import.meta.env.VITE_INSTAGRAM_URL, icon: Instagram },
  ].filter((item) => item.href);

  return (
    <footer className="mt-auto border-t border-[#DED3C7] bg-[#FBF7F1] text-[#202824]">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26332E] text-white">
                <PawPrint className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl font-extrabold">
                Refu<span className="text-[#A66449]">Connect</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5F6863]">
              Relier les animaux aux bonnes familles, et faciliter les gestes utiles pour les refuges.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-3 flex gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CBBE] bg-white text-[#5F6863] transition-colors hover:border-[#A66449] hover:text-[#A66449]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <nav aria-label="Services" className="md:justify-self-center">
            <h3 className="font-serif text-lg font-bold text-[#202824]">Services</h3>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
              <Link to="/animaux" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <Home className="h-3.5 w-3.5 text-[#A66449]" />
                Adoption
              </Link>
              <Link to="/toilettage" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <Scissors className="h-3.5 w-3.5 text-[#A66449]" />
                Toilettage
              </Link>
              <Link to="/couplage" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <HandHeart className="h-3.5 w-3.5 text-[#A66449]" />
                Couplage
              </Link>
              <Link to="/dons" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <Gift className="h-3.5 w-3.5 text-[#A66449]" />
                Soutien
              </Link>
              <Link to="/bénévolat" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <Users className="h-3.5 w-3.5 text-[#A66449]" />
                Bénévolat
              </Link>
              <Link to="/temoignages" className="flex items-center gap-2 text-sm text-[#5F6863] transition-colors hover:text-[#A66449]">
                <MessageSquare className="h-3.5 w-3.5 text-[#A66449]" />
                Témoignages
              </Link>
            </div>
          </nav>

          <div className="md:justify-self-end">
            <h3 className="font-serif text-lg font-bold text-[#202824]">Contact</h3>
            <div className="mt-2 grid gap-2 text-sm text-[#5F6863]">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A66449]" />
                Marrakech, Maroc
              </p>
              <a href="tel:+212612345678" className="flex gap-2.5 transition-colors hover:text-[#A66449]">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A66449]" />
                +212 6 12 34 56 78
              </a>
              <a href="mailto:contact@refuconnect.ma" className="flex gap-2.5 transition-colors hover:text-[#A66449]">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A66449]" />
                contact@refuconnect.ma
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#DED3C7] pt-3 text-sm text-[#6D7671] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} RefuConnect. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/mentions-legales" className="transition-colors hover:text-[#A66449]">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="transition-colors hover:text-[#A66449]">Confidentialité</Link>
            <Link to="/cgu" className="transition-colors hover:text-[#A66449]">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
