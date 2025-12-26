import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { profileData, navLinks } from '../../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">JB</span>
              </div>
              <div>
                <p className="font-semibold text-lg">{profileData.name}</p>
                <p className="text-xs text-slate-400">Investment Specialist</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Building wealth through disciplined, data-driven investment strategies across forex, cryptocurrency, and stock options.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                Portfolio Management
              </a>
              <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                Wealth Planning
              </a>
              <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                Forex Trading
              </a>
              <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                Crypto Investments
              </a>
              <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                Options Strategies
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                {profileData.email}
              </a>
              <a
                href={`https://wa.me/${profileData.whatsapp.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Chat
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Disclosures
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-8">
          <p className="text-xs text-slate-500 leading-relaxed">
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
