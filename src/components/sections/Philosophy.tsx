import React from 'react';
import { TrendingUp, Shield, BarChart3, MessageSquare } from 'lucide-react';
import { philosophyPoints } from '../../data/mockData';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Shield,
  BarChart3,
  MessageSquare
};

const Philosophy: React.FC = () => {
  const reveal = useScrollReveal();
  return (
    <section id="philosophy" className="py-12 lg:py-16 bg-background-secondary relative overflow-hidden">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={reveal} className="max-w-3xl mx-auto text-center mb-10 scroll-reveal">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Investment Philosophy
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins">
            Principles That Guide Every <GradientText>Decision</GradientText>
          </h2>
          <p className="text-lg text-foreground-secondary">
            A disciplined approach built on proven principles that have weathered market cycles and delivered consistent results.
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {philosophyPoints.map((point, index) => {
            const IconComponent = iconMap[point.icon];
            return (
              <GlassCard
                key={point.id}
                ref={reveal}
                className={`group p-8 scroll-reveal reveal-delay-${(index + 1) * 200} tilt-effect`}
                hover
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 glass-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all duration-300 border border-accent/20">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-accent">0{index + 1}</span>
                      <div className="flex-1 h-px bg-accent/30" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 font-poppins">
                      {point.title}
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <GlassCard className="inline-block px-8 py-6 max-w-2xl" hover>
            <blockquote className="text-xl lg:text-2xl font-medium text-foreground-secondary italic">
              "The stock market is a device for transferring money from the impatient to the patient."
            </blockquote>
            <p className="mt-3 text-accent font-medium">— Warren Buffett</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
