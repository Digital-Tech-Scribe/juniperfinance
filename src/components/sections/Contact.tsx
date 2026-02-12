import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, Send, Calendar, MapPin, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  investmentGoal: string;
  message: string;
}

const Contact: React.FC = () => {
  const { profile } = useData();
  const navigate = useNavigate();
  const reveal = useScrollReveal();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    investmentGoal: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsLoading(false); // Enable button if we want to allow quick re-submit, but we're navigating away.
      navigate('/success');
      setFormData({ name: '', email: '', phone: '', investmentGoal: '', message: '' });
      
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 lg:py-16 bg-background relative">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Info */}
          <div ref={reveal} className="space-y-8 scroll-reveal">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Get In Touch
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins">
                Let's Discuss Your <GradientText>Financial Goals</GradientText>
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                Schedule a consultation to explore how we can help you build and protect your wealth. No obligation, just a conversation about your financial future.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 glass-light rounded-lg flex items-center justify-center group-hover:bg-accent transition-all border border-accent/20">
                  <Mail className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-poppins">Email</p>
                  <p className="text-sm text-foreground-muted">{profile.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 glass-light rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-all border border-emerald-500/20">
                  <MessageCircle className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-poppins">WhatsApp Chat</p>
                  <p className="text-sm text-foreground-muted">Quick response, direct communication</p>
                </div>
              </a>

              <a
                href={`https://t.me/${profile.telegram?.replace('@', '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 glass-light rounded-lg flex items-center justify-center group-hover:bg-accent transition-all border border-accent/20">
                  <Send className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-poppins">Telegram Forex Signals</p>
                  <p className="text-sm text-foreground-muted">Join the community for daily signals</p>
                </div>
              </a>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-foreground-muted">New York, NY</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-sm text-foreground-muted">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div ref={reveal} className="scroll-reveal reveal-delay-300">
            <GlassCard className="p-8 lg:p-10" glow>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-poppins">Schedule a Consultation</h3>
                    <p className="text-sm text-foreground-muted">Fill out the form below</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground-secondary">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11 bg-background-secondary border-border text-foreground placeholder:text-foreground-muted focus:border-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground-secondary">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11 bg-background-secondary border-border text-foreground placeholder:text-foreground-muted focus:border-accent/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground-secondary">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 bg-background-secondary border-border text-foreground placeholder:text-foreground-muted focus:border-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentGoal" className="text-foreground-secondary">Investment Interest</Label>
                    <div className="relative">
                      <select
                        id="investmentGoal"
                        name="investmentGoal"
                        value={formData.investmentGoal}
                        onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}
                        className="flex h-11 w-full appearance-none rounded-md border border-border bg-background-secondary px-3 py-2 pr-10 text-base text-foreground shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring focus:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="" disabled className="text-foreground-muted">Select an option</option>
                        <option value="portfolio-management">Portfolio Management</option>
                        <option value="wealth-planning">Wealth Planning</option>
                        <option value="forex-trading">Forex Trading</option>
                        <option value="crypto-investment">Crypto Investment</option>
                        <option value="options-strategies">Options Strategies</option>
                        <option value="general-consultation">General Consultation</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground-secondary">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your financial goals and how I can help..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="resize-none bg-background-secondary border-border text-foreground placeholder:text-foreground-muted focus:border-accent/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-base shadow-lg"
                  disabled={isLoading}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {isLoading ? 'Submitting...' : 'Request Consultation'}
                </Button>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <p className="text-xs text-foreground-muted text-center">
                  By submitting, you agree to our privacy policy. Your information will never be shared.
                </p>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
