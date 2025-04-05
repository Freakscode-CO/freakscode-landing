import React from 'react';
import type { Question } from '../../data/surveyDefinition';

interface QuestionRendererProps {
    question: Question;
    formData: Record<string, any>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    checkDependency: (dependsOn?: Question['dependsOn']) => boolean;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, formData, handleInputChange, checkDependency }) => {
    if (!checkDependency(question.dependsOn)) {
        return null; // Don't render if dependency not met
    }

    const commonProps = {
        id: question.id,
        name: question.id,
        required: question.required,
        onChange: handleInputChange,
        className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
    };

    const label = (
        <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-1">
            {question.questionText} {question.required && <span className="text-red-500">*</span>}
        </label>
    );

    switch (question.type) {
        case 'text':
        case 'email':
            return (
                <div key={question.id} className="mb-4">
                    {label}
                    <input
                        type={question.type === 'email' ? 'email' : 'text'}
                        {...commonProps}
                        value={formData[question.id] || ''}
                    />
                </div>
            );
        case 'text_area':
            return (
                <div key={question.id} className="mb-4">
                    {label}
                    <textarea
                        {...commonProps}
                        rows={4}
                        value={formData[question.id] || ''}
                    />
                </div>
            );
        case 'select_one':
            if (question.displayType === 'likert') {
                // Implementación responsive de Likert con etiquetas a los extremos
                const hasOptions = question.options && question.options.length > 0;
                const firstOption = hasOptions ? question.options[0] : null;
                const lastOption = hasOptions ? question.options[question.options.length - 1] : null;
                
                return (
                    <div key={question.id} className="mb-4">
                        {label}
                        
                        {/* Etiquetas de extremos - visibles solo en versión móvil */}
                        {hasOptions && (
                            <div className="flex justify-between text-xs text-gray-500 mt-1 md:hidden">
                                <span>{firstOption?.label}</span>
                                <span>{lastOption?.label}</span>
                            </div>
                        )}
                        
                        {/* Opciones de Likert */}
                        <div className="grid grid-cols-5 gap-1 md:flex md:flex-wrap md:gap-x-4 md:gap-y-2 mt-2">
                            {question.options?.map((option, index) => (
                                <label 
                                    key={option.value.toString()} 
                                    className="flex flex-col md:flex-row items-center text-xs md:text-sm p-1 md:p-0 rounded-md hover:bg-indigo-50 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={option.value}
                                        checked={formData[question.id]?.toString() === option.value.toString()}
                                        required={question.required}
                                        onChange={handleInputChange}
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 mr-1"
                                    />
                                    {/* En móvil solo mostramos el número, en desktop el texto completo */}
                                    <span className="md:hidden mt-1">{index + 1}</span>
                                    <span className="hidden md:inline">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={question.id} className="mb-4">
                        {label}
                        <select {...commonProps} value={formData[question.id] || ''}>
                            <option value="" disabled={question.required}>Selecciona una opción</option>
                            {question.options?.map(option => (
                                <option key={option.value.toString()} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                );
            }

        case 'select_multiple':
            return (
                <div key={question.id} className="mb-4">
                    {label}
                    <div className="mt-2 space-y-2">
                        {question.options?.map(option => (
                            <label key={option.value.toString()} className="flex items-center p-2 hover:bg-indigo-50 rounded-md transition-colors">
                                <input
                                    type="checkbox"
                                    name={question.id}
                                    value={option.value}
                                    checked={(formData[question.id] || []).includes(option.value)}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );

        default:
            // Basic fallback for unsupported types
            return <div key={question.id} className="mb-4 text-red-500">Unsupported question type: {question.type} for question ID: {question.id}</div>;
    }
};

export default QuestionRenderer; 