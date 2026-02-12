import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { navLinks } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import logoImage from '../../assets/images/logo.png';

const Footer: React.FC = () => {
  const { profile } = useData();
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-background-tertiary relative">
      {/* Top Border - Single accent color */}
      <div className="h-1 bg-accent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground font-poppins">{profile.name}</p>
                <p className="text-xs text-foreground-muted">Investment Specialist</p>
              </div>
            </div>
            <p className="text-foreground-secondary text-sm leading-relaxed mb-6">
              Building wealth through disciplined, data-driven investment strategies across forex, cryptocurrency, and stock options.
            </p>
            <div className="flex gap-3">
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-light rounded-lg flex items-center justify-center transition-all hover:border-accent/30 hover:text-accent text-foreground-muted border border-border"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-light rounded-lg flex items-center justify-center transition-all hover:border-accent/30 hover:text-accent text-foreground-muted border border-border"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground font-poppins">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground-secondary hover:text-accent text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground font-poppins">Services</h4>
            <nav className="flex flex-col gap-2">
              <a href="#services" className="text-foreground-secondary hover:text-accent text-sm transition-colors">
                Portfolio Management
              </a>
              <a href="#services" className="text-foreground-secondary hover:text-accent text-sm transition-colors">
                Wealth Planning
              </a>
              <a href="#services" className="text-foreground-secondary hover:text-accent text-sm transition-colors">
                Forex Trading
              </a>
              <a href="#services" className="text-foreground-secondary hover:text-accent text-sm transition-colors">
                Crypto Investments
              </a>
              <a href="#services" className="text-foreground-secondary hover:text-accent text-sm transition-colors">
                Options Strategies
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground font-poppins">Contact</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-foreground-secondary hover:text-accent text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                {profile.email}
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 text-foreground-secondary hover:text-accent text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Chat
              </a>
              <div className="flex items-start gap-3 text-foreground-secondary text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground-muted text-sm">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-foreground-muted hover:text-accent text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground-muted hover:text-accent text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-foreground-muted hover:text-accent text-sm transition-colors">
              Disclosures
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-8">
          <p className="text-xs text-foreground-muted/60 leading-relaxed">
            Investment advisory services offered through registered investment advisors. Securities offered through licensed broker-dealers. 
            Past performance is not indicative of future results. All investments involve risk including loss of principal. 
            Please review all disclosures and consult with a qualified professional before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
