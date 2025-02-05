import { useEffect, useState } from 'react';
import auraLogo from '../assets/images/logos/AURA-Logo.webp';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['inicio', 'nosotros', 'productos'];
      const currentPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  const scrollToNextSection = () => {
    const sections = ['inicio', 'nosotros', 'productos'];
    const nextSection = sections[(currentSection + 1) % sections.length];
    document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-[#301E47] text-white pt-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -left-24 w-96 h-96 bg-[#FAC657]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 bg-[#FAC657]/10 rounded-full blur-3xl"></div>

      <div className={`container mx-auto px-4 py-16 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#FAC657]">Freakscode</span>
          </h1>
          <p className="text-xl md:text-2xl mb-16 text-gray-300">
            Transformando ideas en soluciones tecnológicas innovadoras
          </p>

          {/* Featured Product Section */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-[#AA49CC]/20 via-[#FAC657]/20 to-[#7CE0C8]/20 rounded-3xl blur-xl transform scale-105"></div>
            <div className="relative border border-[#FAC657]/20 rounded-2xl backdrop-blur-sm p-8 bg-[#301E47]/50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FAC657] text-[#301E47] px-4 py-1 rounded-full text-sm font-semibold">
                  Nuevo Lanzamiento
                </span>
              </div>

              <a href="/aura" className="block group">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#AA49CC] via-[#FAC657] to-[#7CE0C8] rounded-full opacity-25 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                    <img 
                      src={auraLogo.src}
                      alt="AURA"
                      className="relative w-32 h-32 object-contain transform group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <h2 className="mt-6 text-3xl font-bold text-[#FAC657] mb-4">AURA</h2>
                  <p className="text-lg text-gray-300 max-w-2xl mb-6">
                    Descubre nuestra plataforma de bienestar integral que revoluciona 
                    la forma en que las personas alcanzan su máximo potencial.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AA49CC] via-[#FAC657] to-[#7CE0C8] p-[1px] rounded-full group-hover:from-[#7CE0C8] group-hover:via-[#FAC657] group-hover:to-[#AA49CC] transition-all duration-500">
                    <span className="px-6 py-2 rounded-full bg-[#301E47] text-white group-hover:bg-[#301E47]/90 transition-colors">
                      Conoce más →
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Scroll Button */}
          <button 
            onClick={scrollToNextSection}
            className="group inline-flex items-center gap-2 text-[#FAC657] hover:text-white transition-colors duration-300"
          >
            <span className="text-lg">Explorar más</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 