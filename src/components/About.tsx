import React from 'react';

const About = () => {
  const principles = [
    {
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de resolver problemas y mejorar la vida de las personas a través de la tecnología.'
    },
    {
      title: 'Calidad',
      description: 'Nos comprometemos a entregar productos de la más alta calidad, siguiendo las mejores prácticas de desarrollo.'
    },
    {
      title: 'Usuario Primero',
      description: 'Diseñamos nuestras soluciones pensando siempre en la experiencia y necesidades de nuestros usuarios.'
    }
  ];

  const scrollToNextSection = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="nosotros" className="py-20 bg-[#FDFDF7] relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#301E47] mb-12">
          Sobre Nosotros
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            En Freakscode, nos dedicamos a crear soluciones tecnológicas innovadoras 
            que transforman la manera en que las personas interactúan con la tecnología. 
            Nuestro compromiso es desarrollar productos que no solo sean funcionales, 
            sino que también mejoren la calidad de vida de nuestros usuarios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-[#301E47] mb-4">
                {principle.title}
              </h3>
              <p className="text-gray-600">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Button */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group inline-flex items-center gap-2 text-[#301E47] hover:text-[#FAC657] transition-colors duration-300"
        >
          <span className="text-lg">Conoce nuestros productos</span>
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
    </section>
  );
};

export default About; 