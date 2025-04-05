import React, { useState, useEffect } from 'react';
import '../../styles/survey.css';
import type { Survey } from '../../data/surveyDefinition'; // Adjusted path
import ProgressBar from './ProgressBar'; // Use subcomponent
import QuestionRenderer from './QuestionRenderer'; // Use subcomponent
import NavigationButtons from './NavigationButtons'; // Use subcomponent
import ThankYouScreen from './ThankYouScreen'; // Importar el componente de agradecimiento
import { submitSurvey } from '../../utils/api'; // Adjusted path

// --- Survey JSON Data (Removed) ---

// --- Interfaces for Type Safety (Removed) ---


interface SurveyFormProps {
    survey: Survey;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ survey }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showContext, setShowContext] = useState(true);
    const [showIntermediate, setShowIntermediate] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [animation, setAnimation] = useState('fade-in');
    const [isSubmitted, setIsSubmitted] = useState(false); // Nueva variable para controlar si se ha enviado

    const totalSteps = survey.blocks.length;

    const handleContextClick = () => {
        setShowContext(false);
        setShowIntermediate(true);
        setTimeout(() => {
            setShowIntermediate(false);
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Final Survey Data:', formData);
        try {
            // Mostrar indicador de carga
            setShowIntermediate(true);
            
            await submitSurvey(survey.id, formData);
            
            // Ocultar indicador de carga y mostrar la pantalla de agradecimiento
            setShowIntermediate(false);
            setIsSubmitted(true); // Marcar como enviado para mostrar la pantalla de agradecimiento
            
            console.log("Estado de isSubmitted después de enviado:", true);
        } catch (error) {
            console.error("Error submitting survey:", error);
            setShowIntermediate(false);
            alert('Hubo un error al enviar la encuesta. Por favor, inténtalo de nuevo.');
        }
    };

    const showStep = (step: number) => {
        setAnimation('fade-out');
        setTimeout(() => {
            setCurrentStep(step);
            setAnimation('fade-in');
        }, 300);
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    };

    // Dependency check logic updated to use camelCase
    const checkDependency = (dependsOn?: Survey['blocks'][0]['questions'][0]['dependsOn']): boolean => { // Use camelCase type
        if (!dependsOn) {
            return true;
        }
        const { fieldId, value, condition } = dependsOn; // Use camelCase
        const dependentValue = formData[fieldId]; // Use camelCase
        if (condition === 'not_empty') {
            return !!dependentValue && dependentValue !== '';
        }
        if (condition === 'includes') {
            // Ensure value is treated as string for includes check if needed, though current use case is string
            return Array.isArray(dependentValue) && dependentValue.includes(value as string);
        }
        // Compare correctly for numbers vs strings from form state
        return dependentValue?.toString() === value?.toString();
    };

    // Use existing icons sequentially, add more if needed or use a default
    const stepIcons = [
        <svg key="user" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        <svg key="clipboard" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        <svg key="pencil" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
        <svg key="tools" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        <svg key="star" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
        <svg key="heart" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    ];

    // Primero verificamos si la encuesta se ha enviado
    if (isSubmitted) {
        console.log("Mostrando pantalla de agradecimiento");
        return <ThankYouScreen formData={formData} />;
    }

    if (showContext) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border-t-4 border-indigo-600 transform transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center mb-6">
                    <svg className="w-16 h-16 mx-auto text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a4 4 0 00-5.656 0L12 17.25l-1.772-1.822a4 4 0 10-5.656 5.656l1.772 1.822L12 21l6.343-6.343a4 4 0 000-5.657zM12 3v6m0 0l-3-3m3 3l3-3" /></svg>
                    <h2 className="text-2xl font-bold text-indigo-900 mb-4">{survey.title}</h2>
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
                    {survey.description}
                </p>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    Tu perspectiva es fundamental para ayudarnos a construir AURA, una herramienta pensada para ti. ¡Gracias por tu tiempo!
                </p>
                <button
                    onClick={handleContextClick}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-lg"
                >
                    Comenzar Encuesta
                </button>
            </div>
        );
    }

    if (showIntermediate) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center transform transition-all duration-500 animate-pulse">
                <svg className="w-16 h-16 mx-auto text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 text-xl">Enviando tu encuesta...</p>
            </div>
        );
    }

    const currentBlock = survey.blocks[currentStep - 1];

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4">
            <ProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
                blocks={survey.blocks}
            />

            <div className={`space-y-6 ${animation}`}>
                {survey.blocks.map((block, index) => (
                    <fieldset
                        key={block.blockId}
                        className={`step ${currentStep === index + 1 ? 'block' : 'hidden'} border-t-4 border-indigo-600 bg-white p-4 md:p-6 rounded-lg shadow-md transform transition-all duration-300`}
                    >
                        {/* Mostrar el título actual en móvil en la parte superior */}
                        <div className="md:hidden text-center mb-4 pb-3 border-b border-gray-100">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 border-2 border-indigo-600 mb-2">
                                <span>{currentStep}</span>
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">{block.title}</h3>
                        </div>
                        
                        {/* Diseño para desktop con icono */}
                        <div className="hidden md:flex items-start mb-6">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1 flex-shrink-0">
                                {stepIcons[index] || stepIcons[0]}
                            </div>
                            <div>
                                <legend className="text-xl font-semibold text-gray-900">{block.title}</legend>
                                <p className="text-sm text-gray-500 mt-1">{block.description}</p>
                            </div>
                        </div>
                        
                        {/* Mostrar descripción en móvil si existe */}
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
                                />
                            ))}
                        </div>
                    </fieldset>
                ))}
            </div>

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