import React from 'react';
import type { Block } from '../../data/surveyDefinition';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    blocks: readonly Block[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, blocks }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-2 px-1">
                {blocks.map((block, index) => (
                    <div
                        key={block.blockId}
                        className={`flex flex-col items-center text-center ${index + 1 <= currentStep ? 'text-indigo-600' : 'text-gray-400'}`}
                        style={{ flexBasis: `${100 / totalSteps}%` }}
                    >
                        <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 border-2 ${index + 1 < currentStep
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : index + 1 === currentStep
                                    ? 'bg-indigo-100 text-indigo-600 border-indigo-600'
                                    : 'bg-gray-100 text-gray-400 border-gray-300'
                                }`}
                        >
                            {index + 1 < currentStep ? (
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            ) : (
                                <span className="text-xs md:text-sm">{index + 1}</span>
                            )}
                        </div>
                        <span className={`text-xs font-medium hidden md:block ${index + 1 > currentStep ? 'opacity-50' : ''}`}>{block.title}</span>
                    </div>
                ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
                <div
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0}%` }} // Avoid division by zero if only one step
                />
            </div>
        </div>
    );
};

export default ProgressBar; 