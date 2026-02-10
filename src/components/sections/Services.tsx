import React from 'react';
import { Briefcase, Target, LineChart, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '../../data/mockData';
import { Button } from '../ui/button';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Target,
  LineChart
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Services
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins">
            Comprehensive <GradientText>Investment Solutions</GradientText>
          </h2>
          <p className="text-lg text-foreground-secondary">
            Tailored strategies to meet your unique financial goals, whether you're building wealth, generating income, or actively trading.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <GlassCard
                key={service.id}
                className="group relative overflow-hidden"
                hover
              >
                {/* Top Accent */}
                <div className="h-1 bg-accent" />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className="w-14 h-14 glass-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all duration-300 border border-accent/20">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 font-poppins">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-foreground-secondary">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground-secondary hover:bg-background-tertiary hover:border-accent/50 group/btn"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
