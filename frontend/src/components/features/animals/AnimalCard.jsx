import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import { ArrowRight, PawPrint } from 'lucide-react';

const AnimalCard = ({ animal = {}, onView }) => {
  const { id, name, age, ageUnit, type, species, breed, sex, image: singleImage, photos = [], images = [], description, status, vaccinated, sterilized } = animal;
  const publicImages = ['dog1.jpg', 'dog3.webp', 'dog4.webp', 'dog44.webp', 'dog5.webp'];
  const animalHash = Math.abs(String(id || name || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0));
  const fallbackIndex = animalHash % publicImages.length;
  const image = singleImage || photos[0] || images[0] || `/${publicImages[fallbackIndex]}`;
  const ageLabel = age ? `${age} ${ageUnit || 'ANS'}` : 'Age a confirmer';
  const healthBadges = [];
  if (vaccinated) healthBadges.push('Vaccine');
  else if (vaccinated === false) healthBadges.push('Suivi veterinaire');
  if (sterilized) healthBadges.push('Sterilise');
  else if (sterilized === false) healthBadges.push('A steriliser');

  return (
    <Card className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name || 'Animal a adopter'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
        <Badge className="absolute left-3 top-3 bg-white/95 font-bold text-primary">
          {status || 'Disponible'}
        </Badge>
        <Badge className="absolute right-3 top-3 bg-white/95 font-bold text-text-main">
          {ageLabel}
        </Badge>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-text-dark">{name || 'Sans nom'}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-text-light">
              <PawPrint className="h-4 w-4 text-accent" />
              {type || species || 'Animal'} - {breed || 'Race inconnue'} - {sex || 'Sexe a confirmer'}
            </p>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {healthBadges.map((badge) => (
            <Badge key={badge} variant="muted" className="rounded-full bg-background-cream px-2.5 py-1 text-xs font-semibold text-text-light">
              {badge}
            </Badge>
          ))}
        </div>
        <p className="mb-5 line-clamp-2 min-h-[3rem] text-sm leading-6 text-text-light">
          {description || 'Un compagnon du refuge pret a rencontrer une famille attentive.'}
        </p>
        <Button variant="primary" className="h-10 w-full rounded-lg text-sm font-semibold" onClick={() => onView?.(id)}>
          Voir le profil
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AnimalCard;
