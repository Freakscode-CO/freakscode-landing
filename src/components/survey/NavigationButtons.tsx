import React from 'react';

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    prevStep: () => void;
    nextStep: () => void;
    // No need for handleSubmit here, it's handled by the form element in SurveyForm
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, totalSteps, prevStep, nextStep }) => {
    return (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {currentStep > 1 ? (
                <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={prevStep}
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 py-3 sm:py-2 px-6 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center text-sm font-medium"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                </button>
            ) : (
                <div className="hidden sm:block" /> // Placeholder solo visible en desktop
            )}

            {currentStep < totalSteps ? (
                <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-indigo-600 text-white py-3 sm:py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm font-medium order-first sm:order-last"
                >
                    Siguiente
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            ) : (
                <button
                    type="submit" // Final button IS type="submit"
                    className="w-full sm:w-auto bg-green-600 text-white py-3 sm:py-2 px-6 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center text-sm font-medium order-first sm:order-last"
                >
                    Enviar Encuesta
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </button>
            )}
        </div>
    );
};

export default NavigationButtons; 