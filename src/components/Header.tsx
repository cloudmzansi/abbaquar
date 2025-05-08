import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 20);
          if (currentScrollY < 50) {
            setShowHeader(true);
          } else if (currentScrollY > lastScrollY) {
            setShowHeader(false);
          } else {
            setShowHeader(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`glass-nav shadow-lg z-50 transition-all duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'glass-nav' : 'bg-transparent'} fixed w-full`}
      style={{ willChange: 'transform' }}
    >
      <div className="container-custom py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="/assets/abbaquar-logo.webp" 
                alt="Abbaquar Logo" 
                className="h-16 mr-3" 
                width="64" 
                height="64" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-1 items-center rounded-full glass-effect px-4 py-2">
              <Link to="/" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Home
              </Link>
              <Link to="/about-us" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                About Us
              </Link>
              <Link to="/activities" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Activities
              </Link>
              <Link to="/gallery" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Gallery
              </Link>
              <Link to="/contact" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Contact
              </Link>
              <a 
                href="/#donate" 
                className="ml-2 px-6 py-2 rounded-full font-bold bg-[#D4A017] text-white hover:bg-opacity-90 transition-all shadow-md"
              >
                Donate
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full p-2 hover:bg-white/10 transition-colors"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl glass-nav-mobile overflow-hidden">
            <nav className="py-4 px-4 flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Home
              </Link>
              <Link to="/about-us" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                About Us
              </Link>
              <Link to="/activities" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Activities
              </Link>
              <Link to="/gallery" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Gallery
              </Link>
              <Link to="/contact" className="px-4 py-2 text-white hover:text-[#D4A017] transition-colors rounded-full hover:bg-white/10">
                Contact
              </Link>
              <a 
                href="/#donate" 
                className="px-6 py-2 rounded-full font-bold bg-[#D4A017] text-white hover:bg-opacity-90 transition-all shadow-md text-center"
              >
                Donate
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
