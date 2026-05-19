import { Link } from 'react-router-dom';

const CGU = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl">Conditions Générales d'Utilisation</h1>

      <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <section>
          <h2 className="mb-4 font-serif text-2xl">1. Objet</h2>
          <p className="text-muted leading-relaxed">
            Les présentes conditions générales d'utilisation (CGU) définissent les modalités d'accès et
            d'utilisation du site RefuConnect par l'utilisateur. L'accès au site vaut acceptation des
            présentes conditions.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">2. Accès au site</h2>
          <p className="text-muted leading-relaxed">
            Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
            L'association RefuConnect se réserve le droit de modifier, suspendre ou interrompre l'accès
            au site à tout moment, sans préavis.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">3. Inscription et compte utilisateur</h2>
          <p className="text-muted leading-relaxed">
            Certaines fonctionnalités du site nécessitent la création d'un compte utilisateur.
            L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour.
            Il est responsable de la confidentialité de ses identifiants de connexion.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">4. Services proposés</h2>
          <p className="text-muted leading-relaxed">
            Le site RefuConnect propose les services suivants :<br />
            — Consultation des profils d'animaux disponibles à l'adoption<br />
            — Soumission de demandes d'adoption<br />
            — Réservation de services de toilettage<br />
            — Demandes de couplage<br />
            — Gestion de dons<br />
            — Candidatures au bénévolat
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">5. Demandes d'adoption</h2>
          <p className="text-muted leading-relaxed">
            Les demandes d'adoption soumises via le site ne constituent pas un engagement ferme de
            l'association. Chaque demande est étudiée individuellement et l'association se réserve le
            droit d'accepter ou de refuser toute demande, sans avoir à justifier sa décision.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">6. Responsabilité</h2>
          <p className="text-muted leading-relaxed">
            L'association RefuConnect s'efforce d'assurer l'exactitude des informations publiées sur le
            site mais ne saurait être tenue responsable d'éventuelles erreurs ou omissions. L'utilisateur
            utilise le site sous sa propre responsabilité.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">7. Droit applicable</h2>
          <p className="text-muted leading-relaxed">
            Les présentes CGU sont soumises au droit marocain. En cas de litige, les tribunaux marocains
            seront compétents.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default CGU;
