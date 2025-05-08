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
      className={`bg-white shadow-sm z-50 transition-all duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed w-full`}
      style={{ willChange: 'transform' }}
    >
      <div className="container-custom py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="/assets/abbaquar-logo.webp" 
                alt="Abbaquar Logo" 
                className="h-16 mr-3 rounded-2xl" 
                width="64" 
                height="64" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              <div className="flex items-center space-x-1 px-4 border-r border-gray-200">
                <Link to="/" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50">
                  Home
                </Link>
                <Link to="/about-us" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50">
                  About Us
                </Link>
                <Link to="/activities" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50">
                  Activities
                </Link>
                <Link to="/gallery" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50">
                  Gallery
                </Link>
                <Link to="/contact" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50">
                  Contact
                </Link>
              </div>
              <div className="flex items-center pl-4">
                <a 
                  href="/#donate" 
                  className="px-6 py-2.5 rounded-full font-semibold bg-[#D72660] text-white hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full p-2 hover:bg-gray-50 transition-all"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <nav className="py-4 px-4 flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50 text-center">
                Home
              </Link>
              <Link to="/about-us" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50 text-center">
                About Us
              </Link>
              <Link to="/activities" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50 text-center">
                Activities
              </Link>
              <Link to="/gallery" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50 text-center">
                Gallery
              </Link>
              <Link to="/contact" className="px-4 py-2 text-gray-600 hover:text-[#073366] transition-all rounded-full hover:bg-gray-50 text-center">
                Contact
              </Link>
              <a 
                href="/#donate" 
                className="px-6 py-2.5 rounded-full font-semibold bg-[#D72660] text-white hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100 text-center"
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
