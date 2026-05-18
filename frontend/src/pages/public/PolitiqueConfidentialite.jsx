import React from 'react';
import { Link } from 'react-router-dom';

const PolitiqueConfidentialite = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl">Politique de Confidentialité</h1>

      <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <section>
          <h2 className="mb-4 font-serif text-2xl">1. Collecte des données</h2>
          <p className="text-muted leading-relaxed">
            L'association RefuCollecte collecte les données personnelles suivantes :<br />
            — Nom et prénom<br />
            — Adresse email<br />
            — Numéro de téléphone (facultatif)<br />
            — Adresse postale (facultatif)<br />
            — Messages et motivations fournis dans les formulaires
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">2. Finalité du traitement</h2>
          <p className="text-muted leading-relaxed">
            Les données collectées sont utilisées pour :<br />
            — Gérer les demandes d'adoption et assurer le suivi<br />
            — Traiter les réservations de toilettage et de couplage<br />
            — Gérer les dons et les candidatures au bénévolat<br />
            — Communiquer avec les utilisateurs concernant leurs demandes<br />
            — Améliorer les services proposés sur le site
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">3. Base légale</h2>
          <p className="text-muted leading-relaxed">
            Le traitement des données est fondé sur le consentement de l'utilisateur, donné lors de
            la soumission des formulaires, et sur l'exécution de mesures précontractuelles.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">4. Durée de conservation</h2>
          <p className="text-muted leading-relaxed">
            Les données personnelles sont conservées pendant une durée de 3 ans à compter du dernier
            contact avec l'utilisateur, sauf obligation légale de conservation plus longue.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">5. Destinataires des données</h2>
          <p className="text-muted leading-relaxed">
            Les données sont destinées uniquement au personnel habilité de l'association RefuConnect.
            Elles ne sont ni vendues, ni cédées à des tiers.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">6. Sécurité</h2>
          <p className="text-muted leading-relaxed">
            L'association met en place des mesures techniques et organisationnelles appropriées pour
            protéger les données personnelles contre tout accès non autorisé, perte ou modification.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">7. Vos droits</h2>
          <p className="text-muted leading-relaxed">
            Conformément au RGPD, vous disposez des droits suivants :<br />
            — Droit d'accès à vos données personnelles<br />
            — Droit de rectification des données inexactes<br />
            — Droit à l'effacement de vos données<br />
            — Droit à la portabilité de vos données<br />
            — Droit d'opposition au traitement<br />
            <br />
            Pour exercer ces droits, contactez-nous à : contact@refuconnect.fr
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl">8. Cookies</h2>
          <p className="text-muted leading-relaxed">
            Le site utilise des cookies strictement nécessaires à son fonctionnement (authentification,
            panier, préférences). Aucun cookie de traçage ou d'analyse n'est utilisé sans votre
            consentement explicite.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
