import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1B4332] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/abbaquar-logo.webp"
                alt="RaiseUp Logo"
                className="h-12 w-12 rounded-lg"
              />
              <span className="ml-3 text-xl font-bold text-white">RaiseUp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 text-white hover:text-white/80 transition-all">
              Home
            </Link>
            <Link to="/about-us" className="px-4 py-2 text-white hover:text-white/80 transition-all">
              About Us
            </Link>
            <Link to="/activities" className="px-4 py-2 text-white hover:text-white/80 transition-all">
              Activities
            </Link>
            <Link to="/gallery" className="px-4 py-2 text-white hover:text-white/80 transition-all">
              Gallery
            </Link>
            <Link to="/contact" className="px-4 py-2 text-white hover:text-white/80 transition-all">
              Contact
            </Link>
            <div className="ml-4">
              <a
                href="/#donate"
                className="px-6 py-2.5 rounded-full font-medium bg-[#2D6A4F] text-white hover:bg-opacity-90 transition-all"
              >
                Donate Now
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-lg p-2 hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[72px] bg-[#1B4332] transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/activities"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              to="/gallery"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="/#donate"
              className="px-6 py-2.5 rounded-full font-medium bg-[#2D6A4F] text-white hover:bg-opacity-90 transition-all text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
