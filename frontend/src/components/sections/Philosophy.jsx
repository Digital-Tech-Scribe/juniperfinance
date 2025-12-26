import React from 'react';
import { TrendingUp, Shield, BarChart3, MessageSquare } from 'lucide-react';
import { philosophyPoints } from '../../data/mockData';

const iconMap = {
  TrendingUp,
  Shield,
  BarChart3,
  MessageSquare
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Investment Philosophy
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Principles That Guide Every Decision
          </h2>
          <p className="text-lg text-slate-600">
            A disciplined approach built on proven principles that have weathered market cycles and delivered consistent results.
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {philosophyPoints.map((point, index) => {
            const IconComponent = iconMap[point.icon];
            return (
              <div
                key={point.id}
                className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-sm border border-slate-200">
            <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 italic">
              "The stock market is a device for transferring money from the impatient to the patient."
            </blockquote>
            <p className="mt-3 text-slate-500">— Warren Buffett</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
