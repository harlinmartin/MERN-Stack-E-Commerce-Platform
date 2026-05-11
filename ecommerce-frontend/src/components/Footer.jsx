import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">EliteCommerce</h2>
          <p className="text-sm leading-relaxed">
            Your premium destination for high-quality electronics, fashion, and lifestyle products. 
            Delivered with care and speed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Shop</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Home & Living</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-6">Connect</h3>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" /> <span>+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" /> <span>support@elitecommerce.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" /> <span>123 Elite St, Tech City</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} EliteCommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
