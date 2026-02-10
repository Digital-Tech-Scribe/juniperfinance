import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useData } from '../../context/DataContext';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  const reveal = useScrollReveal();
  
  return (
    <section className="py-12 lg:py-16 bg-background relative overflow-hidden">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={reveal} className="max-w-3xl mx-auto text-center mb-10 scroll-reveal">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins">
            What Clients <GradientText>Say</GradientText>
          </h2>
          <p className="text-lg text-foreground-secondary">
            Building long-term relationships through trust, transparency, and results.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <GlassCard
              key={testimonial.id}
              ref={reveal}
              className={`relative p-6 scroll-reveal reveal-delay-${(index + 1) * 200} tilt-effect`}
              hover
            >
              {/* Quote Icon - positioned better */}
              <div className="absolute -top-3 left-6 z-10">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                  <Quote className="w-5 h-5 text-white fill-white" />
                </div>
              </div>

              {/* Stars - filled properly */}
              <div className="flex gap-1 mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-accent" 
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-foreground-secondary leading-relaxed mb-6 text-base">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                  <span className="text-accent font-semibold font-poppins">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground font-poppins">{testimonial.name}</p>
                  <p className="text-sm text-foreground-muted">{testimonial.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
