import React, { useEffect, useState } from 'react';
import { thankYouMessages } from '../../data/thankYouMessages';

interface ThankYouScreenProps {
    formData: Record<string, any>;
}

// Definir los roles como un tipo para evitar errores de acceso
type RoleMap = {
    [key: string]: string;
};

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ formData }) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Asegurarnos de que el componente esté montado antes de animarlo
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        // Seleccionar un mensaje aleatorio
        const randomIndex = Math.floor(Math.random() * thankYouMessages.length);
        let selectedMessage = thankYouMessages[randomIndex];
        
        // Intentar obtener el nombre del profesional de los datos del formulario
        let name = '';
        
        // Buscar por el ID correcto: "nombreContacto"
        if (formData.nombreContacto) {
            name = formData.nombreContacto;
        } else if (formData.rolProfesional) {
            // Si no tenemos nombre, usamos su rol profesional
            const roles: RoleMap = {
                'entrenador_personal': 'entrenador',
                'fisioterapeuta': 'fisioterapeuta',
                'nutricionista': 'nutricionista',
                'coach_salud': 'coach',
                'otro': 'profesional'
            };
            
            // Convertir a string para asegurar que es una clave válida
            const rolKey = String(formData.rolProfesional);
            name = roles[rolKey] || 'profesional';
        } else {
            // Si no tenemos nada, usamos un término genérico
            name = 'profesional';
        }
        
        // Reemplazar el placeholder con el nombre
        selectedMessage = selectedMessage.replace('{name}', name);
        setMessage(selectedMessage);
        
        console.log("ThankYouScreen montado. Nombre usado:", name, "Mensaje:", selectedMessage);
    }, [formData]);
    
    return (
        <div className={`max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border-t-4 border-green-600 transform transition-all duration-500 ${isVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Encuesta Completada!</h2>
                <p className="text-lg text-gray-700 mb-6">{message}</p>
                <p className="text-sm text-gray-500">Nos pondremos en contacto contigo cuando AURA esté lista para su lanzamiento.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-md font-medium text-gray-700 mb-2">¿Qué sigue?</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Analizaremos todas las respuestas recibidas para diseñar AURA exactamente como la necesitas.
                </p>
                <div className="flex items-center mt-4">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">¿Tienes dudas o comentarios?</p>
                        <a href="mailto:contact@freakscode.com" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            Escríbenos a gabcardona@freakscode.com
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver a la página principal
                </a>
            </div>
        </div>
    );
};

export default ThankYouScreen; 