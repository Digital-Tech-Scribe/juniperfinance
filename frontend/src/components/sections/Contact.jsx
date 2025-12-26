import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Calendar, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { profileData } from '../../data/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentGoal: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - store in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', investmentGoal: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-br from-slate-100 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Get In Touch
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Let's Discuss Your Financial Goals
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Schedule a consultation to explore how we can help you build and protect your wealth. No obligation, just a conversation about your financial future.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                  <Mail className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="text-sm text-slate-500">{profileData.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${profileData.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <MessageCircle className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">WhatsApp Chat</p>
                  <p className="text-sm text-slate-500">Quick response, direct communication</p>
                </div>
              </a>

              <a
                href={`https://t.me/${profileData.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <Send className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Telegram Forex Signals</p>
                  <p className="text-sm text-slate-500">Join the community for daily signals</p>
                </div>
              </a>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Location</p>
                  <p className="text-sm text-slate-500">New York, NY</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Response Time</p>
                  <p className="text-sm text-slate-500">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-200">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Schedule a Consultation</h3>
                    <p className="text-sm text-slate-500">Fill out the form below</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentGoal">Investment Interest</Label>
                    <Select
                      value={formData.investmentGoal}
                      onValueChange={(value) => setFormData({ ...formData, investmentGoal: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portfolio-management">Portfolio Management</SelectItem>
                        <SelectItem value="wealth-planning">Wealth Planning</SelectItem>
                        <SelectItem value="forex-trading">Forex Trading</SelectItem>
                        <SelectItem value="crypto-investment">Crypto Investment</SelectItem>
                        <SelectItem value="options-strategies">Options Strategies</SelectItem>
                        <SelectItem value="general-consultation">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your financial goals and how I can help..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Request Consultation
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  By submitting, you agree to our privacy policy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
