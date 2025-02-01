import React from 'react';
import auraBanner from '../assets/images/logos/Aura-Banner.webp';

const Products = () => {
  return (
    <section id="productos" className="py-20 bg-[#301E47]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#FAC657] mb-12">
          Nuestros Productos
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
            <a href="/aura" className="block group">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src={auraBanner.src}
                  alt="AURA Banner"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
              <div className="p-8">                
                <h3 className="text-2xl font-bold text-center text-[#301E47] mb-4">
                  AURA
                </h3>
                
                <p className="text-gray-600 text-center mb-6">
                  Plataforma de bienestar integral que te ayuda a alcanzar 
                  un equilibrio perfecto entre cuerpo y mente.
                </p>

                <div className="text-center">
                  <span className="inline-flex items-center space-x-2 bg-[#FAC657] text-[#301E47] px-6 py-2 rounded-full font-semibold group-hover:bg-[#301E47] group-hover:text-[#FAC657] transition-all">
                    <span>Descubre más</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products; 