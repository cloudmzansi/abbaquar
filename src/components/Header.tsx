import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  // Close mobile menu and reset body overflow when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-[#073366] z-[100] transition-all duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed w-full border-b border-white/40`}
      style={{ willChange: 'transform' }}
    >
      <div className="container-custom py-3">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/abbaquar-logo.webp" 
                alt="Abbaquar Logo" 
                className="h-16 mr-3 rounded-2xl" 
                width="64" 
                height="64" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              <Link to="/" className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10">
                Home
              </Link>
              <Link to="/about-us" className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10">
                About Us
              </Link>
              <Link to="/activities" className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10">
                Activities
              </Link>
              <Link to="/gallery" className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10">
                Gallery
              </Link>
              <Link to="/contact" className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10">
                Contact
              </Link>
            </div>
            <div className="flex items-center ml-24">
              <a 
                href="/#donate" 
                className="px-6 py-2.5 rounded-full font-semibold bg-[#D72660] text-white hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100"
              >
                Donate
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full p-2 hover:bg-white/10 transition-all z-[101]"
            onClick={toggleMobileMenu}
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
          className={`md:hidden fixed inset-x-0 top-[84px] bottom-0 bg-[#073366] border-t border-white/40 transition-transform duration-300 z-[99] ${
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <nav className="container-custom py-6 flex flex-col space-y-2 overflow-y-auto max-h-[calc(100vh-84px)]">
            <Link 
              to="/" 
              className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10 text-center"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/about-us" 
              className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10 text-center"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link 
              to="/activities" 
              className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10 text-center"
              onClick={toggleMobileMenu}
            >
              Activities
            </Link>
            <Link 
              to="/gallery" 
              className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10 text-center"
              onClick={toggleMobileMenu}
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 text-white/90 hover:text-white transition-all rounded-lg hover:bg-white/10 text-center"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <a 
              href="/#donate" 
              className="px-6 py-2.5 rounded-full font-semibold bg-[#D72660] text-white hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100 text-center"
              onClick={toggleMobileMenu}
            >
              Donate
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
