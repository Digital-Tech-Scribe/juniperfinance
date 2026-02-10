import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';

interface FormData {
  name: string;
  email: string;
  phone: string;
  investmentGoal: string;
  message: string;
}

const Contact: React.FC = () => {
  const { profile } = useData();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    investmentGoal: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', investmentGoal: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
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
    <section id="contact" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
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
          <GlassCard className="p-8 lg:p-10" glow>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-poppins">Message Sent!</h3>
                <p className="text-foreground-secondary">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
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
                    <Select
                      value={formData.investmentGoal}
                      onValueChange={(value: string) => setFormData({ ...formData, investmentGoal: value })}
                    >
                      <SelectTrigger className="h-11 bg-background-secondary border-border text-foreground focus:border-accent/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-background-secondary border-border">
                        <SelectItem value="portfolio-management" className="text-foreground focus:bg-background-tertiary">Portfolio Management</SelectItem>
                        <SelectItem value="wealth-planning" className="text-foreground focus:bg-background-tertiary">Wealth Planning</SelectItem>
                        <SelectItem value="forex-trading" className="text-foreground focus:bg-background-tertiary">Forex Trading</SelectItem>
                        <SelectItem value="crypto-investment" className="text-foreground focus:bg-background-tertiary">Crypto Investment</SelectItem>
                        <SelectItem value="options-strategies" className="text-foreground focus:bg-background-tertiary">Options Strategies</SelectItem>
                        <SelectItem value="general-consultation" className="text-foreground focus:bg-background-tertiary">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
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
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
