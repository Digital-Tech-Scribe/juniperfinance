import React from 'react';
import { Award, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import consultImage from '../../assets/images/juniper_consult.webp';

const About: React.FC = () => {
  const { profile } = useData();
  const credentials: string[] = profile.credentials || [];
  const reveal = useScrollReveal();
  
  return (
    <section id="about" className="py-12 lg:py-16 bg-background relative overflow-hidden">
      {/* Background Glow - Subtle accent color */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual Side */}
          <div ref={reveal} className="relative scroll-reveal">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card group tilt-effect">
              <img 
                src={consultImage}
                alt="Juniper Broz Consulting" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              
              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                 <p className="text-foreground/90 italic text-sm font-medium border-l-2 border-accent pl-3">
                   "My mission is to provide the clarity and confidence you need to make sound financial decisions."
                 </p>
              </div>
            </div>

            {/* Floating Credentials Card - Desktop only (overflows on mobile) */}
            <GlassCard className="hidden lg:block absolute -top-6 -right-12 p-6 max-w-xs z-20" hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-poppins">Credentials</p>
                  <p className="text-xs text-foreground-muted">Verified Qualifications</p>
                </div>
              </div>
              <div className="space-y-2">
                {credentials.slice(0, 3).map((cred, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Content Side */}
          <div ref={reveal} className="space-y-6 scroll-reveal reveal-delay-300">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                About
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-poppins">
                Dedicated to Your <GradientText>Financial Success</GradientText>
              </h2>
            </div>

            <div className="space-y-4 text-foreground-secondary leading-relaxed">
              <p>
                With over {profile.yearsExperience} years of experience in the financial markets, I've dedicated my career to helping clients build and preserve wealth through disciplined, research-driven investment strategies.
              </p>
              <p>
                My approach combines rigorous fundamental analysis with technical market insights across multiple asset classes—including equities, forex, cryptocurrency, and options. This diversified perspective allows me to identify opportunities and manage risk across market conditions.
              </p>
              <p>
                As a registered investment professional, I maintain the highest standards of compliance and fiduciary responsibility. Transparency and open communication are the foundation of every client relationship.
              </p>
            </div>

            {/* Trust Verification */}
            <GlassCard className="p-6 border-emerald-500/30" hover>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 font-poppins">Verify My Credentials</h3>
                  <p className="text-sm text-foreground-secondary mb-3">
                    Transparency matters. Verify my registration and background through FINRA's official BrokerCheck system.
                  </p>
                  <a
                    href={profile.finraLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    >
                      Check FINRA BrokerCheck
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </GlassCard>


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
