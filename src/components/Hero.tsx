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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sections = ['inicio', 'nosotros', 'productos'];
      if (e.deltaY > 0) {
        const nextSection = sections[(currentSection + 1) % sections.length];
        document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        const prevSection = sections[(currentSection - 1 + sections.length) % sections.length];
        document.getElementById(prevSection)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection]);

  const scrollToNextSection = () => {
    const sections = ['inicio', 'nosotros', 'productos'];
    const nextSection = sections[(currentSection + 1) % sections.length];
    document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-[#301E47] text-white pt-16 relative">
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

          {/* Aura Section */}
          <div className="mb-16 border-t border-b border-[#FAC657]/20 py-16">
            <a href="/aura" className="inline-block group">
              <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 blur-2xl bg-[#FAC657]/20 scale-150 group-hover:bg-[#FAC657]/30 transition-colors duration-500"></div>
                <img 
                  src={auraLogo.src}
                  alt="AURA"
                  className="relative w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="mt-4 flex items-center justify-center gap-2 text-[#FAC657] font-semibold">
                  <span className="text-lg">AURA</span>
                </div>
              </div>
            </a>
          </div>

          {/* Scroll Button */}
          <button 
            onClick={scrollToNextSection}
            className="group inline-flex items-center gap-2 text-[#FAC657] hover:text-white transition-colors duration-300"
          >
            <span className="text-lg">Explorar</span>
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