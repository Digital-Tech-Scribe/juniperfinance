import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { navLinks, profileData } from '../../data/mockData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">JB</span>
            </div>
            <div className="hidden sm:block">
              <p className={`font-semibold text-lg transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-slate-900'
              }`}>
                {profileData.name}
              </p>
              <p className={`text-xs transition-colors ${
                isScrolled ? 'text-slate-500' : 'text-slate-500'
              }`}>
                Investment Specialist
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Verification */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={profileData.finraLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <Shield className="w-4 h-4" />
              FINRA Verified
              <ExternalLink className="w-3 h-3" />
            </a>
            <Button
              className="bg-slate-900 hover:bg-slate-800 text-white px-5"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 bg-white">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 px-4 space-y-3">
              <a
                href={profileData.finraLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium"
              >
                <Shield className="w-4 h-4" />
                FINRA Verified
                <ExternalLink className="w-3 h-3" />
              </a>
              <Button
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
