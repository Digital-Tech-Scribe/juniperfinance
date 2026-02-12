import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { navLinks } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import logoImage from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const { profile } = useData();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'glass border-b border-border shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105">
              <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <p className="font-semibold text-lg leading-none transition-colors text-foreground font-poppins">
                {profile.name}
              </p>
              <p className="text-xs leading-none mt-1 text-foreground-muted">
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
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-foreground-secondary hover:text-accent hover:bg-background-tertiary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle & Social */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <div className="w-px h-6 bg-border" />
            
            {/* Social Media Links */}
            <div className="flex items-center gap-1">
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground-muted hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground-muted hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border bg-background/98 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-foreground-secondary hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 px-4 space-y-3">
              {/* Social Media Links - Mobile */}
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground-muted hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground-muted hover:text-accent hover:bg-background-tertiary rounded-lg transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
