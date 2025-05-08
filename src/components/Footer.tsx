import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#073366] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/assets/abbaquar-logo.webp" 
                alt="RaiseUp Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-xl font-bold">RaiseUp</span>
            </div>
            <p className="mb-6 text-gray-300 text-sm leading-relaxed">
              We are a cultural organization geared towards assisting, uplifting and rebuilding our community.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <MapPin className="h-5 w-5 text-[#D72660]" />
                </div>
                <span className="text-gray-300 text-sm">61 Gardenia Road, Wentworth,<br />Durban, 4052</span>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <Phone className="h-5 w-5 text-[#D72660]" />
                </div>
                <span className="text-gray-300 text-sm">084 251 5740</span>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <Mail className="h-5 w-5 text-[#D72660]" />
                </div>
                <span className="text-gray-300 text-sm break-all">info@abbaquar-sandreamcentre.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Service Times</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300">Mon - Thu: 9am - 4pm</li>
              <li className="text-gray-300">Friday: 10am - 2pm</li>
              <li className="text-gray-300">Sat & Sun: Closed</li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="mb-4 text-gray-300">
              Join our community to receive updates about our activities and events.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#D72660] flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#D72660] flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#D72660] flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6">
          <p className="text-center text-gray-300">
            Copyright © 2025 Abbaquar - San Dream Centre. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
