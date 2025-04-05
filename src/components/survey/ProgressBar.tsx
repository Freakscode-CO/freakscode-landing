import React from 'react';
import type { Block } from '../../data/surveyDefinition';

// --- Mapas de Clases CSS para Colores Dinámicos ---
const bgColorClasses: { [key: string]: string } = {
    indigo: 'bg-indigo-100',
    purple: 'bg-purple-100',
    sky: 'bg-sky-100',
    teal: 'bg-teal-100',
    rose: 'bg-rose-100',
    emerald: 'bg-emerald-100',
};

const bgDarkClasses: { [key: string]: string } = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    sky: 'bg-sky-600',
    teal: 'bg-teal-600',
    rose: 'bg-rose-600',
    emerald: 'bg-emerald-600',
};

const textColorClasses: { [key: string]: string } = {
    indigo: 'text-indigo-600',
    purple: 'text-purple-600',
    sky: 'text-sky-600',
    teal: 'text-teal-600',
    rose: 'text-rose-600',
    emerald: 'text-emerald-600',
};

const borderColorClasses: { [key: string]: string } = {
    indigo: 'border-indigo-600',
    purple: 'border-purple-600',
    sky: 'border-sky-600',
    teal: 'border-teal-600',
    rose: 'border-rose-600',
    emerald: 'border-emerald-600',
};
// --- Fin Mapas de Clases ---

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    blocks: readonly Block[];
    currentBlockColor: string; // Color del bloque actual
    colorMap: { [key: string]: string }; // Mapa de colores
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
    currentStep, 
    totalSteps, 
    blocks, 
    currentBlockColor, 
    colorMap 
}) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-2 px-1">
                {blocks.map((block, index) => {
                    const stepNumber = index + 1;
                    const blockColor = colorMap[block.blockId] || 'indigo';
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const isFuture = stepNumber > currentStep;
                    
                    let circleClasses = 'bg-gray-100 text-gray-400 border-gray-300'; // Default (future)
                    let textClasses = 'text-gray-400';
                    let titleOpacity = 'opacity-50';

                    if (isCompleted) {
                        circleClasses = `${bgDarkClasses[blockColor]} text-white ${borderColorClasses[blockColor]}`;
                        textClasses = textColorClasses[blockColor];
                        titleOpacity = '';
                    } else if (isCurrent) {
                        circleClasses = `${bgColorClasses[blockColor]} ${textColorClasses[blockColor]} ${borderColorClasses[blockColor]}`;
                        textClasses = textColorClasses[blockColor];
                        titleOpacity = '';
                    }
                    
                    return (
                        <div
                            key={block.blockId}
                            className={`flex flex-col items-center text-center ${textClasses}`}
                            style={{ flexBasis: `${100 / totalSteps}%` }}
                        >
                            <div
                                // Aplicar clases de círculo dinámicas
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 border-2 ${circleClasses}`}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                ) : (
                                    <span className="text-xs md:text-sm">{stepNumber}</span>
                                )}
                            </div>
                            <span className={`text-xs font-medium hidden md:block ${titleOpacity}`}>{block.title}</span>
                        </div>
                    );
                })}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
                <div
                    // Usar el color del bloque actual para la barra de progreso
                    className={`h-2 ${bgDarkClasses[currentBlockColor]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0}%` }} 
                />
            </div>
        </div>
    );
};

export default ProgressBar; 