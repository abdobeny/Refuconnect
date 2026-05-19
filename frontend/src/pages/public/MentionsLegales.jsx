import React from 'react';
import { Link } from 'react-router-dom';

const MentionsLegales = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl">Mentions Légales</h1>

      <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <section>
          <h2 className="mb-4 font-serif text-2xl">1. Éditeur du site</h2>
          <p className="text-muted leading-relaxed">
            Le site RefuConnect est édité par l'association RefuConnect, association régie par la Loi 1-09-15 relative aux associations, à but non lucratif,
            dont le siège social est situé au 45 Avenue Hassan II, Casablanca 20000, Maroc.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">2. Directeur de la publication</h2>
          <p className="text-muted leading-relaxed">
            Le directeur de la publication est le président de l'association RefuConnect.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">3. Hébergement</h2>
          <p className="text-muted leading-relaxed">
            Le site est hébergé par :<br />
            Fondation Maroc Numerique<br />
            Technopark Casablanca, Casablanca, Maroc<br />
            Tél. : +212 5 22-98-56-00
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">4. Propriété intellectuelle</h2>
          <p className="text-muted leading-relaxed">
            L'ensemble des contenus présents sur le site RefuConnect (textes, images, graphismes, logo, icônes)
            sont la propriété exclusive de l'association RefuConnect ou de ses partenaires. Toute reproduction,
            représentation, modification ou adaptation, totale ou partielle, est strictement interdite sans
            autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">5. Données personnelles</h2>
          <p className="text-muted leading-relaxed">
            Les informations collectées via les formulaires du site sont destinées à l'association RefuConnect
            dans le cadre de la gestion des adoptions, dons, bénévolat et services. Conformément à la Loi 09-08 relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification
            et de suppression de vos données en contactant : contact@refuconnect.ma
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">6. Cookies</h2>
          <p className="text-muted leading-relaxed">
            Le site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de traçage
            ou de publicité n'est déposé sans votre consentement.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">7. Contact</h2>
          <p className="text-muted leading-relaxed">
            Pour toute question relative aux mentions légales :<br />
            Email : contact@refuconnect.ma<br />
            Téléphone : +212 5 22-98-56-00
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default MentionsLegales;
