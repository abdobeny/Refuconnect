import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
	<footer className="mt-12 py-8">
		<div className="max-w-7xl mx-auto px-6">
			<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex items-center gap-3">
					<div className="text-primary text-2xl">🐾</div>
					<div>
						<div className="font-serif text-lg font-bold">RefuConnect</div>
						<div className="text-sm text-muted">Relier des animaux avec des familles aimantes</div>
					</div>
				</div>
				<div className="flex gap-6 text-sm text-text-main">
					<Link to="/animaux" className="hover:text-primary">Animaux</Link>
					<Link to="/toilettage" className="hover:text-primary">Toilettage</Link>
					<Link to="/couplage" className="hover:text-primary">Couplage</Link>
					<Link to="/dons" className="hover:text-primary">Dons</Link>
				</div>
			</div>
			<div className="text-xs text-muted text-center mt-4">© {new Date().getFullYear()} RefuConnect — Tous droits réservés</div>
		</div>
	</footer>
);

export default Footer;
