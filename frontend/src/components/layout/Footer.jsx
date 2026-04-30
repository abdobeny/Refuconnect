import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock, Home, Scissors, HeartHandshake, DollarSign, Handshake } from 'lucide-react';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-br from-background-beige to-background-cream border-t border-primary/10 mt-auto">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* About Section */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="bg-gradient-to-br from-primary to-primary-light p-2.5 rounded-xl shadow-lg">
								<Heart className="w-8 h-8 text-white" fill="white" />
							</div>
							<h3 className="text-2xl font-bold text-primary font-serif">RefuConnect</h3>
						</div>
						<p className="text-text-light text-sm leading-relaxed">
							Relier des animaux avec des familles aimantes. Nous nous engageons à offrir une seconde chance à chaque animal en besoin.
						</p>
						<div className="flex gap-3 pt-2">
							<a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300 group" aria-label="Facebook">
								<Facebook className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
							</a>
							<a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300 group" aria-label="Instagram">
								<Instagram className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
							</a>
							<a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300 group" aria-label="Twitter">
								<Twitter className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
							</a>
							<a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300 group" aria-label="LinkedIn">
								<Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-primary font-serif">Liens Rapides</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/animaux" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:scale-125 transition-transform"></span>
									Nos Animaux
								</Link>
							</li>
							<li>
								<Link to="/toilettage" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:scale-125 transition-transform"></span>
									Toilettage
								</Link>
							</li>
							<li>
								<Link to="/couplage" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:scale-125 transition-transform"></span>
									Couplage
								</Link>
							</li>
							<li>
								<Link to="/dons" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:scale-125 transition-transform"></span>
									Faire un Don
								</Link>
							</li>
							<li>
								<Link to="/bénévolat" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:scale-125 transition-transform"></span>
									Bénévolat
								</Link>
							</li>
						</ul>
					</div>

					{/* Services */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-primary font-serif">Nos Services</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/animaux" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<Home className="w-4 h-4 text-primary/60 group-hover:scale-110 transition-transform" />
									<span className="group-hover:translate-x-1 transition-transform">Adoption</span>
								</Link>
							</li>
							<li>
								<Link to="/toilettage" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<Scissors className="w-4 h-4 text-primary/60 group-hover:scale-110 transition-transform" />
									<span className="group-hover:translate-x-1 transition-transform">Services de Toilettage</span>
								</Link>
							</li>
							<li>
								<Link to="/couplage" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<HeartHandshake className="w-4 h-4 text-primary/60 group-hover:scale-110 transition-transform" />
									<span className="group-hover:translate-x-1 transition-transform">Accouplement</span>
								</Link>
							</li>
							<li>
								<Link to="/dons" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<DollarSign className="w-4 h-4 text-primary/60 group-hover:scale-110 transition-transform" />
									<span className="group-hover:translate-x-1 transition-transform">Soutien Financier</span>
								</Link>
							</li>
							<li>
								<Link to="/bénévolat" className="text-text-main hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
									<Handshake className="w-4 h-4 text-primary/60 group-hover:scale-110 transition-transform" />
									<span className="group-hover:translate-x-1 transition-transform">Devenir Bénévole</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-primary font-serif">Contact</h3>
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 text-primary/60 mt-0.5 flex-shrink-0" />
								<p className="text-text-main text-sm">
									123 Rue des Animaux<br />
									75000 Paris, France
								</p>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-primary/60 flex-shrink-0" />
								<p className="text-text-main text-sm">+33 1 23 45 67 89</p>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-primary/60 flex-shrink-0" />
								<p className="text-text-main text-sm">contact@refuconnect.fr</p>
							</div>
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-primary/60 flex-shrink-0" />
								<p className="text-text-main text-sm">Lun - Sam: 9h - 18h</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-primary/10 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
						<p>© {currentYear} RefuConnect — Tous droits réservés</p>
						<div className="flex gap-6">
							<Link to="/mentions-legales" className="hover:text-primary transition-colors duration-200">Mentions Légales</Link>
							<Link to="/politique-confidentialite" className="hover:text-primary transition-colors duration-200">Politique de Confidentialité</Link>
							<Link to="/cgu" className="hover:text-primary transition-colors duration-200">CGU</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
