import React from 'react';
import type { Block } from '../../data/surveyDefinition';

// --- Mapas de Clases CSS para Colores Dinámicos (Actualizados con prefijo aura-) ---
const bgColorClasses: { [key: string]: string } = {
    'aura-primary': 'bg-aura-primary/10',
    'aura-secondary': 'bg-aura-secondary/10',
    'aura-accent': 'bg-aura-accent/10',
    'aura-rose': 'bg-aura-rose/10',
    'aura-orange': 'bg-aura-orange/10',
    'aura-green': 'bg-aura-green/10',
};

const bgDarkColorClasses: { [key: string]: string } = {
    'aura-primary': 'bg-aura-primary',
    'aura-secondary': 'bg-aura-secondary',
    'aura-accent': 'bg-aura-accent',
    'aura-rose': 'bg-aura-rose',
    'aura-orange': 'bg-aura-orange',
    'aura-green': 'bg-aura-green',
};

const textColorClasses: { [key: string]: string } = {
    'aura-primary': 'text-aura-primary',
    'aura-secondary': 'text-aura-secondary',
    'aura-accent': 'text-aura-accent',
    'aura-rose': 'text-aura-rose',
    'aura-orange': 'text-aura-orange',
    'aura-green': 'text-aura-green',
};

const borderColorClasses: { [key: string]: string } = {
    'aura-primary': 'border-aura-primary',
    'aura-secondary': 'border-aura-secondary',
    'aura-accent': 'border-aura-accent',
    'aura-rose': 'border-aura-rose',
    'aura-orange': 'border-aura-orange',
    'aura-green': 'border-aura-green',
};
// --- Fin Mapas de Clases ---

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    blocks: readonly Block[];
    currentBlockColor: string; // Color del bloque actual (nombre, ej: 'aura-primary')
    colorMap: { [key: string]: string }; // Mapa de colores por blockId
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
    currentStep, 
    totalSteps, 
    blocks, 
    currentBlockColor, // Recibe el nombre del color, ej: 'aura-primary'
    colorMap 
}) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-2 px-1">
                {blocks.map((block, index) => {
                    const stepNumber = index + 1;
                    const blockColorName = colorMap[block.blockId] || 'aura-primary';
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const isFuture = stepNumber > currentStep;
                    
                    let circleClasses = 'bg-gray-100 text-gray-400 border-gray-300'; // Default (future)
                    let textClasses = 'text-gray-400';
                    let titleOpacity = 'opacity-50';

                    if (isCompleted) {
                        circleClasses = `${bgDarkColorClasses[blockColorName]} text-aura-text-light ${borderColorClasses[blockColorName]}`;
                        textClasses = textColorClasses[blockColorName];
                        titleOpacity = '';
                    } else if (isCurrent) {
                        circleClasses = `${bgColorClasses[blockColorName]} ${textColorClasses[blockColorName]} ${borderColorClasses[blockColorName]}`;
                        textClasses = textColorClasses[blockColorName];
                        titleOpacity = '';
                    }
                    
                    return (
                        <div
                            key={block.blockId}
                            className={`flex flex-col items-center text-center ${textClasses}`}
                            style={{ flexBasis: `${100 / totalSteps}%` }}
                        >
                            <div
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
                    className={`h-2 ${bgDarkColorClasses[currentBlockColor]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0}%` }} 
                />
            </div>
        </div>
    );
};

export default ProgressBar; 