import React from 'react';
import { Briefcase, Target, LineChart, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '../../data/mockData';
import { Button } from '../ui/button';

const iconMap = {
  Briefcase,
  Target,
  LineChart
};

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Services
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Investment Solutions
          </h2>
          <p className="text-lg text-slate-600">
            Tailored strategies to meet your unique financial goals, whether you're building wealth, generating income, or actively trading.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Top Accent */}
                <div className="h-1 bg-gradient-to-r from-slate-300 to-slate-500 group-hover:from-slate-700 group-hover:to-slate-900 transition-all duration-300" />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 group/btn"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
