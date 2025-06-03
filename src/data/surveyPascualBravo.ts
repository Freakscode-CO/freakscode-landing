export interface Option {
    readonly value: string | number;
    readonly label: string;
}

export interface DependsOn {
    readonly fieldId: string;
    readonly value?: string | number;
    readonly condition?: 'includes' | 'not_empty';
}

export interface Question {
    readonly id: string;
    readonly questionText: string;
    readonly type: 'select_one' | 'select_multiple' | 'text' | 'text_area' | 'email' | 'number';
    readonly required: boolean;
    readonly options?: readonly Option[];
    readonly hasOtherOption?: boolean;
    readonly dependsOn?: DependsOn;
    readonly displayType?: 'likert';
    readonly min?: number;
    readonly max?: number;
    readonly placeholder?: string;
}

export interface Block {
    readonly blockId: string;
    readonly title: string;
    readonly description: string;
    readonly questions: readonly Question[];
}

export interface Survey {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly language: string;
    readonly version: string;
    readonly blocks: readonly Block[];
}

// --- Definición de la Survey de Bienestar para el Pascual Bravo ---
export const surveyPascualBravoData = {
    "survey": {
        "id": "survey_pascual_bravo_v1",
        "title": "Encuesta de Bienestar para la IU Pascual Bravo",
        "description": "Comprendemos profundamente la importancia de tu bienestar y te invitamos a hacer parte de nuestra comunidad de bienestar integral a través de AURA360, un programa de bienestar integral que te ofrecemos a través de AURA.",
        "language": "es",
        "version": "1.0.0",
        "blocks": [
            {
                "blockId": "informacionPersonal",
                "title": "Información Personal",
                "description": "Queremos que tu experiencia en AURA sea lo más personalizada posible. Por favor, proporciona la información personal para poder personalizar la encuesta.",
                "questions": [
                    {
                        "id": "nombre",
                        "questionText": "¿Cuál es tu nombre completo?",
                        "type": "text",
                        "required": true,
                        "placeholder": "Ejemplo: María González"
                    },
                    {
                        "id": "edad",
                        "questionText": "¿Cuál es tu edad?",
                        "type": "number",
                        "required": true,
                        "min": 16,
                        "max": 100,
                        "placeholder": "Ejemplo: 30"
                    },
                    {
                        "id": "genero_percibido",
                        "questionText": "¿Con qué género te identificas?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            {
                                "value": "hombre",
                                "label": "Hombre"
                            },
                            {
                                "value": "mujer",
                                "label": "Mujer"
                            },
                            {
                                "value": "otro",
                                "label": "Otro"
                            },
                            {
                                "value": "comunidad_lgbt",
                                "label": "Comunidad LGBT+"
                            }
                        ]
                    }
                ]
            },
            {
                "blockId": "informacionAcademica",
                "title": "Información Académica",
                "description": "Esta encuesta está especialmente diseñada para los estudiantes de la IU Pascual Bravo, queremos conocer un poco más sobre tu trayectoria académica.",
                "questions": [
                    {
                        "id": "gradoPercibido",
                        "questionText": "¿Qué tan avanzado consideras que estás en tu carrera?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            {
                                "value": "inicial",
                                "label": "Iniciando"
                            },
                            {
                                "value": "intermedio",
                                "label": "Intermedio"
                            },
                            {
                                "value": "avanzado",
                                "label": "Ya casi me graduo"
                            }
                        ]
                    }
                ]
            },
            {
                "blockId": "contacto",
                "title": "Contacto",
                "description": "Excelente! Este es el primer paso para que pertenezcas a la comunidad de AURA, por el momento como estamos en fase de prueba te invitamos a que hagas parte de nuestra beta cerrada ¿Te gustaría ser parte de esta comunidad?",
                "questions": [
                    {
                        "id": "confirmacion",
                        "questionText": "¿Te gustaría ser parte de esta comunidad?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            {
                                "value": "si",
                                "label": "Si"
                            },
                            {
                                "value": "no",
                                "label": "No"
                            }
                        ]
                    },
                    {
                        "id": "correo",
                        "questionText": "¿Cuál es tu correo electrónico?",
                        "type": "email",
                        "required": true,
                        
                    }
                ]
            }
        ]
    }
} as const;   