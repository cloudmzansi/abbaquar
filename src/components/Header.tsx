import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
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
      className={`bg-white shadow-sm z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'} fixed w-full`}
      style={{ willChange: 'transform' }}
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/abbaquar-logo.png" 
                alt="Abbaquar Logo" 
                className="h-16 mr-3"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center font-bold">
            <Link to="/" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Home
            </Link>
            <Link to="/about-us" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              About Us
            </Link>
            <Link to="/activities" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Activities
            </Link>
            <Link to="/gallery" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Gallery
            </Link>
            <Link to="/contact" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Contact
            </Link>
            <a href="/#donate" className="ml-4 px-6 py-2 rounded-md font-bold bg-[#D72660] text-white hover:bg-[#b81e4b] transition-colors shadow-md">
              Donate
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-abbaquar-purple" />
            ) : (
              <Menu className="h-6 w-6 text-abbaquar-purple" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4 font-bold">
            <Link to="/" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Home
            </Link>
            <Link to="/about-us" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              About Us
            </Link>
            <Link to="/activities" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Activities
            </Link>
            <Link to="/gallery" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Gallery
            </Link>
            <Link to="/contact" className="text-abbaquar-dark hover:text-abbaquar-purple transition-colors">
              Contact
            </Link>
            <a href="/#donate" className="px-4 py-2 rounded-md font-bold bg-[#D72660] text-white text-base hover:bg-[#b81e4b] transition-colors shadow-md">
              Donate
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
