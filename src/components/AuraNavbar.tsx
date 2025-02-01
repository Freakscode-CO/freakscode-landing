import { useState } from 'react';
import freakscodeLogo from '../assets/images/logos/Freakscode-Logo.webp';

const AuraNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-[#301E47]/80 backdrop-blur-sm text-white p-6 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img 
            src={freakscodeLogo.src}
            alt="Freakscode Logo" 
            className="h-12 w-auto mr-2 object-contain"
            loading="lazy"
          />
        </a>
        
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
          <a href="#features" className="hover:text-[#FFC33F] transition-colors">Características</a>
          <a href="#benefits" className="hover:text-[#FFC33F] transition-colors">Beneficios</a>
          <a href="#download" className="hover:text-[#FFC33F] transition-colors">Descargar</a>
          <a href="/" className="hover:text-[#FFC33F] transition-colors">Volver</a>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#301E47]/95 backdrop-blur-sm md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <a href="#features" className="hover:text-[#FFC33F] transition-colors">Características</a>
              <a href="#benefits" className="hover:text-[#FFC33F] transition-colors">Beneficios</a>
              <a href="#download" className="hover:text-[#FFC33F] transition-colors">Descargar</a>
              <a href="/" className="hover:text-[#FFC33F] transition-colors">Volver</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AuraNavbar; 