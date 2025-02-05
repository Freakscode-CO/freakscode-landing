import { useState } from 'react';
import auraBanner from '../assets/images/logos/Aura-Banner.webp';

const AuraNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: 'Características', href: '#features' },
    { name: 'Usuarios', href: '#users' },
  ];

  return (
    <nav className="fixed w-full z-50">
      {/* Fondo con gradiente y blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A1B3D]/95 to-[#2A1B3D]/90 backdrop-blur-md border-b border-white/10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={auraBanner.src}
              alt="AURA Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="text-[#E2E2E0] hover:text-[#7CE0C8] transition-colors duration-300"
              >
                {section.name}
              </a>
            ))}
            <a 
              href="/registro"
              className="px-6 py-2 bg-[#FFC33F] hover:bg-[#FFC33F]/90 text-[#2A1B3D] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#FFC33F]/20"
            >
              Solicitar acceso
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <button 
            className="md:hidden relative z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg 
              className="w-6 h-6 text-[#E2E2E0]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Móvil */}
        <div 
          className={`
            md:hidden fixed inset-0 bg-gradient-to-br from-[#2A1B3D]/98 to-[#2A1B3D]/95 backdrop-blur-lg transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="text-xl text-[#E2E2E0] hover:text-[#7CE0C8] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {section.name}
              </a>
            ))}
            <a 
              href="/registro"
              className="px-8 py-3 bg-[#FFC33F] hover:bg-[#FFC33F]/90 text-[#2A1B3D] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#FFC33F]/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar acceso
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuraNavbar; 