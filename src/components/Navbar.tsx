import { useState, useEffect } from 'react';
import freakscodeLogo from '../assets/images/logos/Freakscode-Logo.webp';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full p-4 z-50 transition-all duration-300 ${
      hasScrolled 
        ? 'bg-[#301E47]/90 backdrop-blur-sm shadow-lg' 
        : 'bg-[#301E47]'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={freakscodeLogo.src}
            alt="Freakscode Logo" 
            className="h-10 w-auto mr-2 object-contain"
            loading="lazy"
          />
        </div>
        
        {/* Menú para móvil */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú para desktop */}
        <div className="hidden md:flex space-x-8">
          <a href="#inicio" className="hover:text-[#FAC657] transition-colors">Inicio</a>
          <a href="#nosotros" className="hover:text-[#FAC657] transition-colors">Nosotros</a>
          <a href="#productos" className="hover:text-[#FAC657] transition-colors">Productos</a>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className={`absolute top-full left-0 right-0 ${
            hasScrolled 
              ? 'bg-[#301E47]/90 backdrop-blur-sm shadow-lg' 
              : 'bg-[#301E47]'
          } transition-all duration-300 md:hidden`}>
            <div className="flex flex-col items-center py-4 space-y-4">
              <a href="#inicio" className="hover:text-[#FAC657] transition-colors">Inicio</a>
              <a href="#nosotros" className="hover:text-[#FAC657] transition-colors">Nosotros</a>
              <a href="#productos" className="hover:text-[#FAC657] transition-colors">Productos</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 