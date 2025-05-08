import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#073366] text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Abbaquar</h3>
            <p className="mb-4 text-gray-300">
              We are a cultural organization geared towards assisting, uplifting and rebuilding our community.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-abbaquar-accent" />
                <span className="text-gray-300">61 Gardenia Road, Wentworth, Durban, 4052</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-abbaquar-accent" />
                <span className="text-gray-300">084 251 5740</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Mon - Thu: 9am - 4pm</li>
              <li>Friday: 10am - 2pm</li>
              <li>Sat & Sun: Closed</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <p className="mb-4 text-gray-300">
              Join our community to receive updates about our activities and events.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-abbaquar-accent flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-abbaquar-accent flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-abbaquar-accent flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-6">
          <p className="text-center text-white-400">
            Copyright © 2025 Abbaquar - San Dream Centre. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
