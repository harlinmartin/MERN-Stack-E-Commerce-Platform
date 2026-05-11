import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-fade-in py-12 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-5xl font-black text-slate-900">Get in Touch</h1>
        <p className="text-slate-500 text-lg">We're here to help you with anything you need.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                  <p className="font-semibold text-slate-900">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                  <p className="font-semibold text-slate-900">support@elitecommerce.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-50 rounded-2xl text-pink-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                  <p className="font-semibold text-slate-900">123 Elite St, Tech City, TC 10101</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-10 rounded-[40px]">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="p-6 bg-green-100 rounded-full text-green-600">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you within 24 hours.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full btn-primary !py-4 flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
