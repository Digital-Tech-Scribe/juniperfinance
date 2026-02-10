import React from 'react';
import { ArrowRight, Shield, ExternalLink, MessageCircle, Send, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { useData } from '../../context/DataContext';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import AnimatedCounter from '../ui/AnimatedCounter';

const Hero: React.FC = () => {
  const { profile } = useData();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background Pattern - Subtle and professional */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <a
              href={profile.finraLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-background-tertiary transition-all border border-emerald-500/30"
            >
              <Shield className="w-4 h-4" />
              FINRA BrokerCheck Verified
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-poppins">
                Strategic Wealth Building Through{' '}
                <GradientText>Disciplined Investment</GradientText>
              </h1>
              <p className="text-lg sm:text-xl text-foreground-secondary leading-relaxed max-w-xl">
                {profile.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              <div>
                <p className="text-3xl font-bold text-foreground font-poppins">
                  <AnimatedCounter end={profile.yearsExperience} suffix="+" />
                </p>
                <p className="text-sm text-foreground-muted">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground font-poppins">
                  <AnimatedCounter end={profile.clientsServed} suffix="+" />
                </p>
                <p className="text-sm text-foreground-muted">Clients Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground font-poppins">{profile.assetsManaged}</p>
                <p className="text-sm text-foreground-muted">Assets Managed</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 h-12 text-base shadow-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a
                href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground-secondary hover:bg-background-tertiary hover:border-accent/50 px-8 h-12 text-base w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
              </a>
              <a
                href={`https://t.me/${profile.telegram?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground-secondary hover:bg-background-tertiary hover:border-accent/50 px-8 h-12 text-base w-full sm:w-auto"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Telegram Signals
                </Button>
              </a>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img 
                  src="/src/assets/images/juniper_portrait_1.webp" 
                  alt="Juniper Broz - Financial Advisor" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-bold text-xl font-poppins">{profile.name}</p>
                  <p className="text-white/90 text-sm">{profile.title}</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 -right-8 bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl animate-float z-30 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verified Professional
              </div>
              
              <div className="absolute -bottom-6 -left-8 glass-card px-6 py-4 rounded-xl shadow-xl text-foreground border border-accent/20 z-30 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">15+</span>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted uppercase tracking-wider font-semibold">Experience</p>
                    <p className="font-bold text-foreground font-poppins">Years in Market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
