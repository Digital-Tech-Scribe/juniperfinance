import React from 'react';
import { Award, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { profileData, credentials } from '../../data/mockData';
import { Button } from '../ui/button';

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              {/* Placeholder for professional image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-6xl">JB</span>
                </div>
              </div>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>

            {/* Floating Credentials Card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-xl shadow-xl p-6 max-w-xs border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Credentials</p>
                  <p className="text-xs text-slate-500">Verified Qualifications</p>
                </div>
              </div>
              <div className="space-y-2">
                {credentials.slice(0, 3).map((cred, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                About
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Dedicated to Your Financial Success
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                With over {profileData.yearsExperience} years of experience in the financial markets, I've dedicated my career to helping clients build and preserve wealth through disciplined, research-driven investment strategies.
              </p>
              <p>
                My approach combines rigorous fundamental analysis with technical market insights across multiple asset classes—including equities, forex, cryptocurrency, and options. This diversified perspective allows me to identify opportunities and manage risk across market conditions.
              </p>
              <p>
                As a registered investment professional, I maintain the highest standards of compliance and fiduciary responsibility. Transparency and open communication are the foundation of every client relationship.
              </p>
            </div>

            {/* Trust Verification */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">Verify My Credentials</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Transparency matters. Verify my registration and background through FINRA's official BrokerCheck system.
                  </p>
                  <a
                    href={profileData.finraLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                    >
                      Check FINRA BrokerCheck
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* All Credentials */}
            <div className="pt-4">
              <p className="text-sm font-medium text-slate-700 mb-3">Professional Certifications</p>
              <div className="flex flex-wrap gap-2">
                {credentials.map((cred, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
