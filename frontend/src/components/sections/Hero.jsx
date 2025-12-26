import React from 'react';
import { ArrowRight, Shield, ExternalLink, MessageCircle, Send, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { profileData } from '../../data/mockData';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <a
              href={profileData.finraLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
            >
              <Shield className="w-4 h-4" />
              FINRA BrokerCheck Verified
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Strategic Wealth Building Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                  Disciplined Investment
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                {profileData.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              <div>
                <p className="text-3xl font-bold text-slate-900">{profileData.yearsExperience}+</p>
                <p className="text-sm text-slate-500">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{profileData.clientsServed}+</p>
                <p className="text-sm text-slate-500">Clients Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{profileData.assetsManaged}</p>
                <p className="text-sm text-slate-500">Assets Managed</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a
                href={`https://wa.me/${profileData.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 h-12 text-base w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
              </a>
              <a
                href={`https://t.me/${profileData.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 h-12 text-base w-full sm:w-auto"
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
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">JB</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl">{profileData.name}</h3>
                    <p className="text-slate-500">{profileData.title}</p>
                  </div>
                </div>
                
                {/* Mini Chart */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-700">Portfolio Performance</span>
                    <span className="text-sm font-semibold text-emerald-600">+18.4% YTD</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 55, 45, 60, 52, 70, 65, 80, 75, 85, 78, 90].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-slate-300 to-slate-500 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">1.85</p>
                    <p className="text-xs text-slate-500">Sharpe Ratio</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">-8.3%</p>
                    <p className="text-xs text-slate-500">Max Drawdown</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Verified Professional
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium shadow-lg text-slate-700">
                CFP® | CMT® | Series 7 & 66
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
