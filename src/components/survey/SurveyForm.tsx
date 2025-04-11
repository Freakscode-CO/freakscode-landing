import React, { useState, useEffect } from 'react';
import '../../styles/survey.css';
import type { Survey, Question } from '../../data/surveyDefinition'; // Import Question type
import ProgressBar from './ProgressBar'; // Use subcomponent
import QuestionRenderer from './QuestionRenderer'; // Use subcomponent
import NavigationButtons from './NavigationButtons'; // Use subcomponent
import ThankYouScreen from './ThankYouScreen'; // Importar el componente de agradecimiento
import { submitSurvey } from '../../utils/api'; // Adjusted path

// --- Survey JSON Data (Removed) ---

// --- Interfaces for Type Safety (Removed) ---

// --- Mapa de Colores por Bloque (Actualizado con colores AURA) ---
const blockColorMap: { [key: string]: string } = {
  perfilProfesional: 'aura-primary',     // Morado
  gestionClientesDolor: 'aura-rose',      // Rosa/Morado
  creacionEntregaPlanes: 'aura-secondary', // Turquesa
  usoPlataformasDigitales: 'aura-green',    // Verde Claro
  diferenciacionComunicacion: 'aura-orange',   // Naranja
  interesAura: 'aura-accent',        // Amarillo
};
// --- Fin Mapa de Colores ---

// --- Mapas de Clases CSS para Colores Dinámicos (Actualizados con prefijo aura-) ---
const borderColorClasses: { [key: string]: string } = {
  'aura-primary': 'border-t-4 border-aura-primary',
  'aura-secondary': 'border-t-4 border-aura-secondary',
  'aura-accent': 'border-t-4 border-aura-accent',
  'aura-rose': 'border-t-4 border-aura-rose',
  'aura-orange': 'border-t-4 border-aura-orange',
  'aura-green': 'border-t-4 border-aura-green',
};

const bgColorClasses: { [key: string]: string } = {
  'aura-primary': 'bg-aura-primary/10', // Usar opacidad para fondos claros
  'aura-secondary': 'bg-aura-secondary/10',
  'aura-accent': 'bg-aura-accent/10',
  'aura-rose': 'bg-aura-rose/10',
  'aura-orange': 'bg-aura-orange/10',
  'aura-green': 'bg-aura-green/10',
};

const textColorClasses: { [key: string]: string } = {
  'aura-primary': 'text-aura-primary',
  'aura-secondary': 'text-aura-secondary',
  'aura-accent': 'text-aura-accent',
  'aura-rose': 'text-aura-rose',
  'aura-orange': 'text-aura-orange',
  'aura-green': 'text-aura-green',
};

// Clases para fondos oscuros (botones, barra de progreso)
const bgDarkColorClasses: { [key: string]: string } = {
  'aura-primary': 'bg-aura-primary',
  'aura-secondary': 'bg-aura-secondary',
  'aura-accent': 'bg-aura-accent',
  'aura-rose': 'bg-aura-rose',
  'aura-orange': 'bg-aura-orange',
  'aura-green': 'bg-aura-green',
};

// Clases para hover de fondos oscuros
const hoverBgDarkColorClasses: { [key: string]: string } = {
  'aura-primary': 'hover:bg-aura-primary/90',
  'aura-secondary': 'hover:bg-aura-secondary/90',
  'aura-accent': 'hover:bg-aura-accent/90',
  'aura-rose': 'hover:bg-aura-rose/90',
  'aura-orange': 'hover:bg-aura-orange/90',
  'aura-green': 'hover:bg-aura-green/90',
};

// Clases para texto oscuro (títulos, etc.)
const textDarkClasses: { [key: string]: string } = {
  'aura-primary': 'text-aura-primary', // Usar el color principal para títulos oscuros
  'aura-secondary': 'text-aura-secondary',
  'aura-accent': 'text-aura-text-dark', // Texto oscuro normal para acento amarillo
  'aura-rose': 'text-aura-rose',
  'aura-orange': 'text-aura-orange',
  'aura-green': 'text-aura-green',
};
// --- Fin Mapas de Clases ---

interface SurveyFormProps {
    survey: Survey;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ survey }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showContext, setShowContext] = useState(true);
    const [showIntermediate, setShowIntermediate] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [animation, setAnimation] = useState('fade-in');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const totalSteps = survey.blocks.length;

    // Función para validar el formato del email
    const validarEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleContextClick = () => {
        setShowContext(false);
        setShowIntermediate(true);
        setTimeout(() => {
            setShowIntermediate(false);
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            const currentValues = formData[name] || [];
            let newValues;
            if (checkbox.checked) {
                newValues = [...currentValues, value];
            } else {
                newValues = currentValues.filter((v: string) => v !== value);
            }
            setFormData(prev => ({ ...prev, [name]: newValues }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Dependency check logic (reutilizada para validación)
    const checkDependency = (dependsOn?: Question['dependsOn']): boolean => {
        if (!dependsOn) {
            return true;
        }
        const { fieldId, value, condition } = dependsOn;
        const dependentValue = formData[fieldId];
        if (condition === 'not_empty') {
            return !!dependentValue && dependentValue !== '';
        }
        if (condition === 'includes') {
            return Array.isArray(dependentValue) && dependentValue.includes(value as string);
        }
        return dependentValue?.toString() === value?.toString();
    };

    // --- Función de Validación Modificada ---
    const validateAllRequiredFields = (): string[] => {
        const errors: string[] = [];
        for (const block of survey.blocks) {
            for (const question of block.questions) {
                const isVisible = checkDependency(question.dependsOn);
                if (isVisible && question.required) {
                    const value = formData[question.id];
                    const isEmpty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
                    if (isEmpty) {
                        console.warn(`Validación fallida: Pregunta requerida '${question.id}' (${question.questionText}) está vacía.`);
                        errors.push(question.id);
                    }
                    
                    // Validación específica para campos de tipo email
                    if (question.type === 'email' && value && !isEmpty) {
                        if (!validarEmail(value)) {
                            console.warn(`Validación fallida: El email '${value}' no es válido.`);
                            errors.push(question.id);
                        }
                    }
                }
            }
        }
        return errors; // Devuelve array de IDs con error
    };
    // --- Fin Función de Validación Modificada ---

    // --- Nueva Función de Validación por Paso ---
    const validateCurrentStepFields = (stepIndex: number): string[] => {
        const errors: string[] = [];
        const currentBlock = survey.blocks[stepIndex - 1]; // 0-based index
        if (!currentBlock) return errors; // Seguridad por si acaso
        
        for (const question of currentBlock.questions) {
            const isVisible = checkDependency(question.dependsOn);
            if (isVisible && question.required) {
                const value = formData[question.id];
                const isEmpty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
                if (isEmpty) {
                    console.warn(`Validación Paso ${stepIndex}: Pregunta requerida '${question.id}' está vacía.`);
                    errors.push(question.id);
                }
                
                // Validación específica para campos de tipo email
                if (question.type === 'email' && value && !isEmpty) {
                    if (!validarEmail(value)) {
                        console.warn(`Validación Paso ${stepIndex}: El email '${value}' no es válido.`);
                        errors.push(question.id);
                    }
                }
            }
        }
        return errors; // Devuelve array de IDs con error PARA ESTE PASO
    };
    // --- Fin Función de Validación por Paso ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        // --- Validación ANTES de enviar ---
        const currentErrors = validateAllRequiredFields();
        if (currentErrors.length > 0) {
            setValidationErrors(currentErrors);
            alert('Por favor, revisa los campos marcados en rojo. Son obligatorios o contienen datos inválidos.');
            // Opcional: Scroll al primer campo con error
            const firstErrorElement = document.getElementById(currentErrors[0]);
            if (firstErrorElement) {
                firstErrorElement.focus({ preventScroll: false }); // Intentar hacer focus
                // A veces el focus necesita un pequeño delay o scroll manual
                setTimeout(() => firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }
            return; // Detener el envío
        }
        // --- Fin Validación ---
        
        setValidationErrors([]); // Limpiar errores si la validación pasa
        console.log('Final Survey Data:', formData);
        setIsSubmitting(true);
        try {
            await submitSurvey(survey.id, formData);
            setIsSubmitted(true);
            console.log("Estado de isSubmitted después de enviado:", true);
        } catch (error) {
            console.error("Error submitting survey:", error);
            alert('Hubo un error al enviar la encuesta. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showStep = (step: number) => {
        setAnimation('fade-out');
        setTimeout(() => {
            setCurrentStep(step);
            setAnimation('fade-in');
        }, 300);
    };

    // --- nextStep Modificado para Validar Paso Actual ---
    const nextStep = () => {
        const stepErrors = validateCurrentStepFields(currentStep);
        if (stepErrors.length > 0) {
            setValidationErrors(stepErrors);
             alert('Por favor, completa todas las preguntas obligatorias de esta sección antes de continuar.');
            // Opcional: Scroll al primer error del paso actual
             const firstErrorElement = document.getElementById(stepErrors[0]);
             if (firstErrorElement) {
                 setTimeout(() => firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
             }
            return; // No avanzar si hay errores en el paso actual
        }
        
        // Si no hay errores en el paso actual, limpiar y avanzar
        setValidationErrors([]); 
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    };
    // --- Fin nextStep Modificado ---

    const prevStep = () => {
        // Limpiar errores al retroceder también puede ser buena idea
        setValidationErrors([]); 
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    };

    // Use existing icons sequentially, add more if needed or use a default
    // Icons from Heroicons (https://heroicons.com/)
    const stepIcons = [
        // 1. Perfil Profesional
        <svg key="user" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>,
        // 2. Gestión y Dolor Principal
        <svg key="clipboard" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08H10.5A2.25 2.25 0 008.25 6.108v8.384a2.25 2.25 0 002.25 2.25h1.5M12 9.75h.008v.008H12V9.75z" />
        </svg>,
        // 3. Creación y Entrega de Planes
        <svg key="sparkles" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L24.75 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L18.25 12zM18.25 12l-2.846.813a4.5 4.5 0 00-3.09 3.09L11.25 18.75l.813-2.846a4.5 4.5 0 003.09-3.09L18.25 12z" />
        </svg>,
        // 4. Uso de Plataformas Digitales
        <svg key="computer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>,
        // 5. Interés en AURA
        <svg key="star" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.518a.563.563 0 01.32.988l-4.018 2.927a.563.563 0 00-.184.53l1.528 4.736a.563.563 0 01-.84.61l-4.736-3.522a.563.563 0 00-.665 0l-4.736 3.522a.563.563 0 01-.84-.61l1.528-4.736a.563.563 0 00-.184-.53L2.478 9.91a.563.563 0 01.32-.988h5.518a.563.563 0 00.475-.31L11.48 3.5z" />
        </svg>,
        // 6. Información Adicional
        <svg key="comment" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-2.138a.5.5 0 01.274-.07c1.15-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
    ];

    // Determinar color del bloque actual para ProgressBar
    const currentBlockColorName = blockColorMap[survey.blocks[currentStep - 1]?.blockId] || 'aura-primary';

    // Orden de prioridad: Enviado > Enviando > Contexto > Intermedio Inicial > Formulario
    if (isSubmitted) {
        console.log("Render: Pantalla de agradecimiento");
        return <ThankYouScreen formData={formData} />;
    }

    if (isSubmitting) {
        console.log("Render: Enviando encuesta...");
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center transform transition-all duration-500 animate-pulse">
                <svg className="w-16 h-16 mx-auto text-aura-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 text-xl">Enviando tu encuesta...</p>
            </div>
        );
    }

    // Usar color índigo por defecto para la pantalla de contexto
    const contextColor = 'aura-primary'; 
    if (showContext) {
        console.log("Render: Pantalla de contexto");
        return (
            <div className={`max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg ${borderColorClasses[contextColor]} transform transition-all duration-500 hover:scale-[1.02]`}>
                <div className="text-center mb-6">
                    <img 
                        src="/images/logos/AURA-Logo.webp" 
                        alt="Logo AURA"
                        className="w-auto h-16 mx-auto mb-4"
                    />
                    <h2 className={`text-2xl font-bold ${textDarkClasses[contextColor]} mb-4`}>{survey.title}</h2>
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
                    {survey.description}
                </p>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    Tu perspectiva es fundamental para ayudarnos a construir AURA, una herramienta pensada para ti. ¡Gracias por tu tiempo!
                </p>
                <button
                    onClick={handleContextClick}
                    className={`w-full ${bgDarkColorClasses[contextColor]} text-aura-text-light py-3 px-6 rounded-lg ${hoverBgDarkColorClasses[contextColor]} transition-colors transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-aura-primary/50 focus:ring-offset-2 font-medium text-lg`}
                >
                    Comenzar Encuesta
                </button>
            </div>
        );
    }

    if (showIntermediate) {
        console.log("Render: Cargando primera sección...");
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center transform transition-all duration-500 animate-pulse">
                 <svg className="w-16 h-16 mx-auto text-aura-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 text-xl">¡Genial! Cargando la primera sección...</p>
            </div>
        );
    }

    console.log(`Render: Formulario, paso ${currentStep}`);
    const currentBlock = survey.blocks[currentStep - 1];
    return (
        <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto px-4">
            <ProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
                blocks={survey.blocks}
                currentBlockColor={currentBlockColorName}
                colorMap={blockColorMap}
            />

            <div className={`space-y-6 ${animation}`}>
                {survey.blocks.map((block, index) => {
                    const blockColorName = blockColorMap[block.blockId] || 'aura-primary';
                    const isCurrent = currentStep === index + 1;

                    return (
                        <fieldset
                            key={block.blockId}
                            className={`step ${isCurrent ? 'block' : 'hidden'} ${borderColorClasses[blockColorName]} bg-white p-4 md:p-6 rounded-lg shadow-md transform transition-all duration-300`}
                        >
                            <div className="md:hidden text-center mb-4 pb-3 border-b border-gray-100">
                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${bgColorClasses[blockColorName]} ${textColorClasses[blockColorName]} border-2 ${borderColorClasses[blockColorName].replace('border-t-4 ','')} mb-2`}>
                                    <span>{index + 1}</span>
                                </span>
                                <h3 className="text-lg font-semibold text-aura-text-dark">{block.title}</h3>
                            </div>
                            
                            <div className="hidden md:flex items-start mb-6">
                                <div className={`${bgColorClasses[blockColorName]} p-3 rounded-full mr-4 mt-1 flex-shrink-0`}>
                                    {React.cloneElement(stepIcons[index] || stepIcons[0], {
                                        className: `w-6 h-6 ${textColorClasses[blockColorName]}`,
                                    })}
                                </div>
                                <div>
                                    <legend className="text-xl font-semibold text-aura-text-dark">{block.title}</legend>
                                    <p className="text-sm text-gray-500 mt-1">{block.description}</p>
                                </div>
                            </div>
                            
                            {block.description && (
                                <p className="md:hidden text-sm text-gray-500 mb-4">{block.description}</p>
                            )}
                            
                            <div className="space-y-4">
                                {block.questions.map(question => (
                                    <QuestionRenderer
                                        key={question.id}
                                        question={question}
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        checkDependency={checkDependency}
                                        validationErrors={validationErrors}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    );
                })}
            </div>

            {validationErrors.length > 0 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                    Por favor, completa todos los campos obligatorios marcados en rojo.
                </div>
            )}

            <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                prevStep={prevStep}
                nextStep={nextStep}
            />
        </form>
    );
};

export default SurveyForm; 