// src/data/surveyDefinition.ts

// --- Interfaces Updated for camelCase and Numeric Values ---
export interface Option {
    readonly value: string | number; // Allow number for Likert
    readonly label: string;
}

export interface DependsOn {
    readonly fieldId: string; // camelCase
    readonly value?: string | number; // Allow number for potential future Likert dependency
    readonly condition?: 'includes' | 'not_empty';
}

export interface Question {
    readonly id: string;
    readonly questionText: string; // camelCase
    readonly type: 'select_one' | 'select_multiple' | 'text' | 'text_area' | 'email';
    readonly required: boolean;
    readonly options?: readonly Option[];
    readonly hasOtherOption?: boolean; // camelCase
    readonly dependsOn?: DependsOn; // camelCase
    readonly displayType?: 'likert'; // camelCase
}

export interface Block {
    readonly blockId: string; // camelCase
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
// --- End Interfaces ---

// --- Survey JSON Data Updated --- //
export const surveyData = {
    "survey": {
        "id": "encuesta_profesionales_bienestar_aura_v1",
        "title": "Encuesta para Profesionales del Bienestar",
        "description": "Objetivo: Entender las prácticas actuales, dolores, herramientas y factores de éxito de los profesionales del bienestar para validar la necesidad de AURA y refinar su enfoque MVP.",
        "language": "es",
        "version": "1.0.0",
        "blocks": [
            {
                "blockId": "informacionContacto",
                "title": "Información de Contacto",
                "description": "Para poder contactarte sobre los resultados de la encuesta y mantenerte informado sobre AURA.",
                "questions": [
                    {
                        "id": "nombreContacto",
                        "questionText": "¿Cuál es tu nombre completo?",
                        "type": "text",
                        "required": true
                    },
                    {
                        "id": "emailContacto",
                        "questionText": "¿Cuál es tu correo electrónico?",
                        "type": "email",
                        "required": true
                    }
                ]
            },
            {
                "blockId": "perfilProfesional", // camelCase
                "title": "Perfil Profesional",
                "description": "Información para segmentación.",
                "questions": [
                    {
                        "id": "rolProfesional", // camelCase
                        "questionText": "¿Cuál es tu principal rol profesional?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "entrenador_personal", "label": "Entrenador Personal / Preparador Físico / Entrenador Deportivo" },
                            { "value": "fisioterapeuta", "label": "Fisioterapeuta / Kinesiólogo" },
                            { "value": "nutricionista", "label": "Nutricionista / Dietista" },
                            { "value": "coach_salud", "label": "Coach de Salud / Bienestar" },
                            { "value": "psicologo", "label": "Psicólogo / Psicólogo Clínico" },
                            { "value": "nutrilogo", "label": "Nutrilogo/a" },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "rolProfesionalOtro", // camelCase
                        "questionText": "Por favor, especifica tu rol profesional:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "rolProfesional", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "experienciaAnos", // camelCase
                        "questionText": "¿Cuántos años de experiencia tienes en tu rol principal?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "<1", "label": "Menos de 1 año" },
                            { "value": "1-3", "label": "1-3 años" },
                            { "value": "4-7", "label": "4-7 años" },
                            { "value": "8-15", "label": "8-15 años" },
                            { "value": ">15", "label": "Más de 15 años" }
                        ]
                    },
                    {
                        "id": "entornoTrabajo", // camelCase
                        "questionText": "¿Cuál es tu principal entorno de trabajo?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "gimnasio", "label": "Gimnasio / Centro deportivo (como empleado o independiente)" },
                            { "value": "clinica", "label": "Clínica / Consultorio propio o de terceros" },
                            { "value": "online", "label": "Trabajo principalmente online / remoto" },
                            { "value": "domicilio", "label": "A domicilio" },
                            { "value": "combinacion", "label": "Combinación de varios" },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "entornoTrabajoOtro", // camelCase
                        "questionText": "Por favor, especifica tu entorno de trabajo:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "entornoTrabajo", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "entornoTrabajoCombinacionDetalle", // Nuevo ID
                        "questionText": "Por favor, selecciona los entornos que combinas:", // Nuevo texto
                        "type": "select_multiple", // Tipo Checkbox
                        "required": true, // Requerido si se seleccionó "combinacion"
                        "options": [
                            // Opciones principales (excluyendo "combinacion" y "otro")
                            { "value": "gimnasio", "label": "Gimnasio / Centro deportivo" },
                            { "value": "clinica", "label": "Clínica / Consultorio" },
                            { "value": "online", "label": "Online / Remoto" },
                            { "value": "domicilio", "label": "A domicilio" }
                        ],
                        "dependsOn": { // Dependencia
                            "fieldId": "entornoTrabajo", // Depende de la pregunta original
                            "value": "combinacion" // Aparece solo si se selecciona "combinacion"
                        }
                    },
                    {
                        "id": "numClientes", // camelCase
                        "questionText": "¿Aproximadamente cuántos clientes/pacientes gestionas activamente en un mes promedio?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "1-10", "label": "1-10" },
                            { "value": "11-25", "label": "11-25" },
                            { "value": "26-50", "label": "26-50" },
                            { "value": "51-100", "label": "51-100" },
                            { "value": ">100", "label": "Más de 100" }
                        ]
                    }
                ]
            },
            {
                "blockId": "gestionClientesDolor", // camelCase
                "title": "Gestión y Dolor Principal",
                "description": "Comprender métodos actuales y puntos de fricción.",
                "questions": [
                    {
                        "id": "organizacionInfoGeneral", // camelCase
                        "questionText": "¿Cómo organizas PRINCIPALMENTE la información general de tus clientes/pacientes (datos de contacto, historial básico, objetivos)?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "hojas_calculo", "label": "Hojas de cálculo (Excel, Google Sheets)" },
                            { "value": "documentos_texto", "label": "Documentos de texto (Word, Google Docs, Notas)" },
                            { "value": "software_crm", "label": "Software/App especializada de gestión de clientes (CRM)" },
                            { "value": "agenda_fisica", "label": "Agenda física / Cuadernos" },
                            { "value": "sistema_interno", "label": "Sistema propio dentro de un gimnasio/clínica" },
                            { "value": "memoria_conversaciones", "label": "Principalmente en mi memoria / conversaciones" },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "organizacionInfoGeneralOtro", // camelCase
                        "questionText": "Por favor, especifica cómo organizas la información general:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "organizacionInfoGeneral", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "seguimientoProgreso", // camelCase
                        "questionText": "¿Cómo realizas PRINCIPALMENTE el seguimiento del progreso y las sesiones de tus clientes/pacientes (notas de sesión, métricas, feedback)?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "hojas_calculo", "label": "Hojas de cálculo (Excel, Google Sheets)" },
                            { "value": "documentos_texto_notas", "label": "Documentos de texto / Notas por cliente" },
                            { "value": "software_seguimiento", "label": "Software/App especializada con funciones de seguimiento" },
                            { "value": "agenda_fisica_especifica", "label": "Agenda física / Cuadernos específicos por cliente" },
                            { "value": "mensajeria", "label": "Mensajería instantánea (WhatsApp, etc.)" },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "seguimientoProgresoOtro", // camelCase
                        "questionText": "Por favor, especifica cómo realizas el seguimiento:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "seguimientoProgreso", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "facilidadEncontrarInfo", // camelCase
                        "questionText": "En una escala de 1 (Muy fácil) a 5 (Muy difícil), ¿qué tan fácil o difícil te resulta encontrar información específica de un cliente/paciente cuando la necesitas rápidamente?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "displayType": "likert", // camelCase
                        "options": [
                            { "value": 1, "label": "1 - Muy fácil" }, // Numeric value
                            { "value": 2, "label": "2 - Fácil" }, // Numeric value
                            { "value": 3, "label": "3 - Neutral" }, // Numeric value
                            { "value": 4, "label": "4 - Difícil" }, // Numeric value
                            { "value": 5, "label": "5 - Muy difícil" } // Numeric value
                        ]
                    },
                    {
                        "id": "mayorDolorGestion", // camelCase
                        "questionText": "Pensando en la GESTIÓN ADMINISTRATIVA Y SEGUIMIENTO de tus clientes/pacientes (NO en la parte técnica de tu profesión), ¿cuál de los siguientes consideras tu MAYOR \"dolor de cabeza\" o fuente de frustración?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "organizacion_centralizacion", "label": "Mantener toda la información organizada y centralizada." },
                            { "value": "buscar_datos_pasados", "label": "Perder tiempo buscando notas o datos pasados." },
                            { "value": "seguimiento_personalizado", "label": "Realizar seguimiento constante y personalizado del progreso." },
                            { "value": "comunicacion_eficiente", "label": "Comunicación eficiente (recordatorios, feedback, etc.)." },
                            { "value": "gestion_horarios", "label": "Gestionar horarios y citas." },
                            { "value": "facturacion_cobros", "label": "Facturación y cobros." },
                            { "value": "sin_frustraciones", "label": "No tengo mayores frustraciones en esta área." },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "detalleDolor", // Renamed field
                        "questionText": "Si seleccionaste \"Otro\" o quieres detallar, ¿podrías describir brevemente ese mayor dolor de cabeza?", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "mayorDolorGestion", // camelCase (Points to the renamed parent ID)
                            "value": "otro"
                        }
                    }
                ]
            },
            {
                "blockId": "creacionEntregaPlanes", // camelCase
                "title": "Creación y Entrega de Planes",
                "description": "Entender los procesos de diseño y distribución de planes.",
                "questions": [
                    {
                        "id": "creacionPlanes", // camelCase
                        "questionText": "¿Cómo creas PRINCIPALMENTE los planes de entrenamiento, nutrición o bienestar para tus clientes/pacientes?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "desde_cero", "label": "Desde cero para cada cliente usando documentos/hojas de cálculo." },
                            { "value": "plantillas", "label": "Adaptando plantillas pre-existentes que tengo." },
                            { "value": "software_creacion", "label": "Usando un software/app especializada que me ayuda a crear planes." },
                            { "value": "verbal_demostracion", "label": "Verbalmente o con demostraciones directas en sesión." },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "creacionPlanesOtro", // camelCase
                        "questionText": "Por favor, especifica cómo creas los planes:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "creacionPlanes", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "entregaPlanes", // camelCase
                        "questionText": "¿Cómo entregas PRINCIPALMENTE estos planes a tus clientes/pacientes?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "archivo_digital", "label": "Archivo PDF/Documento enviado por email o mensajería." },
                            { "value": "impreso", "label": "Impreso en papel." },
                            { "value": "app_plataforma", "label": "A través de una App/Plataforma específica donde el cliente puede verlo." },
                            { "value": "explicacion_verbal", "label": "Explicación verbal/demostración en sesión." },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "entregaPlanesOtro", // camelCase
                        "questionText": "Por favor, especifica cómo entregas los planes:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "entregaPlanes", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "tiempoCreacionPlanes", // camelCase
                        "questionText": "En una escala de 1 (Nada de tiempo) a 5 (Muchísimo tiempo), ¿cuánto tiempo sientes que inviertes SEMANALMENTE en la creación y ajuste de planes para tus clientes?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "displayType": "likert", // camelCase
                        "options": [
                            { "value": 1, "label": "1 - Nada/Casi nada" }, // Numeric value
                            { "value": 2, "label": "2 - Poco tiempo" }, // Numeric value
                            { "value": 3, "label": "3 - Tiempo moderado" }, // Numeric value
                            { "value": 4, "label": "4 - Bastante tiempo" }, // Numeric value
                            { "value": 5, "label": "5 - Muchísimo tiempo" } // Numeric value
                        ]
                    }
                ]
            },
            {
                "blockId": "usoPlataformasDigitales", // camelCase
                "title": "Uso de Plataformas Digitales",
                "description": "Evaluar la adopción tecnológica actual y la apertura a nuevas herramientas.",
                "questions": [
                    {
                        "id": "usaSoftwareEspecifico", // camelCase
                        "questionText": "¿Utilizas actualmente alguna aplicación móvil o software específico para apoyar tu trabajo profesional (gestión, planes, seguimiento, comunicación, etc.)?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "si", "label": "Sí" },
                            { "value": "no", "label": "No" }
                        ]
                    },
                    {
                        "id": "herramientasDigitalesUsadas", // camelCase
                        "questionText": "¿Cuáles de las siguientes herramientas digitales usas REGULARMENTE? (Puedes marcar varias)", // camelCase
                        "type": "select_multiple",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "usaSoftwareEspecifico", // camelCase
                            "value": "si"
                        },
                        "options": [
                            { "value": "gestion_citas", "label": "Apps de gestión de citas/agenda (Calendly, Google Calendar avanzado, etc.)" },
                            { "value": "software_entrenamiento", "label": "Software de creación de planes de entrenamiento (Trainerize, TrueCoach, etc.)" },
                            { "value": "software_nutricion", "label": "Software de gestión nutricional (MyFitnessPal para pro, software específico, etc.)" },
                            { "value": "telemedicina", "label": "Plataformas de Telemedicina/Teleconsulta" },
                            { "value": "crm", "label": "CRM (Software de Gestión de Relación con Clientes)" },
                            { "value": "comunicacion_grupal", "label": "Herramientas de comunicación grupal (Grupos WhatsApp/Telegram específicos, Slack)" },
                            { "value": "facturacion_pagos", "label": "Herramientas de facturación/pagos online" },
                            { "value": "hojas_calculo_nube", "label": "Hojas de Cálculo/Documentos en la nube (uso avanzado)" },
                            { "value": "ninguna_especifica", "label": "Ninguna específica, uso herramientas generales (email, WhatsApp básico)" },
                            { "value": "otra", "label": "Otra (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "herramientasDigitalesUsadasOtra", // camelCase
                        "questionText": "Por favor, especifica qué otra herramienta digital usas regularmente:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "herramientasDigitalesUsadas", // camelCase
                            "value": "otra",
                            "condition": "includes"
                        }
                    },
                    {
                        "id": "satisfaccionHerramientasActuales", // camelCase
                        "questionText": "En una escala de 1 (Muy insatisfecho) a 5 (Muy satisfecho), ¿cuál es tu nivel general de satisfacción con las herramientas digitales que usas actualmente para tu trabajo?", // camelCase
                        "type": "select_one",
                        "required": false,
                        "displayType": "likert", // camelCase
                        "dependsOn": { // camelCase
                            "fieldId": "usaSoftwareEspecifico", // camelCase
                            "value": "si"
                        },
                        "options": [
                            { "value": 1, "label": "1 - Muy insatisfecho" }, // Numeric value
                            { "value": 2, "label": "2 - Insatisfecho" }, // Numeric value
                            { "value": 3, "label": "3 - Neutral" }, // Numeric value
                            { "value": 4, "label": "4 - Satisfecho" }, // Numeric value
                            { "value": 5, "label": "5 - Muy satisfecho" } // Numeric value
                        ]
                    },
                    {
                        "id": "aperturaNuevaPlataforma", // camelCase
                        "questionText": "En una escala de 1 (Nada dispuesto/a) a 5 (Totalmente dispuesto/a), ¿qué tan dispuesto/a estarías a probar una **nueva solución integral** como AURA para gestionar tu práctica profesional?", 
                        "type": "select_one",
                        "required": true,
                        "displayType": "likert", // camelCase
                        "options": [
                            { "value": 1, "label": "1 - Nada dispuesto/a" }, 
                            { "value": 2, "label": "2 - Poco dispuesto/a" }, 
                            { "value": 3, "label": "3 - Neutral/Depende" },
                            { "value": 4, "label": "4 - Dispuesto/a" }, 
                            { "value": 5, "label": "5 - Totalmente dispuesto/a" } 
                        ]
                    }
                ]
            },
            {
                "blockId": "factorDiferenciador", // camelCase
                "title": "Factor Diferenciador",
                "description": "Identificar ventajas competitivas percibidas.",
                "questions": [
                    {
                        "id": "factorDiferenciadorPrincipal", // camelCase
                        "questionText": "¿Qué consideras que es tu PRINCIPAL factor diferenciador para atraer y retener clientes/pacientes frente a otros profesionales?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "personalizacion_atencion", "label": "Mi nivel de personalización y atención individualizada." },
                            { "value": "conocimientos_tecnicos", "label": "Mis conocimientos técnicos / especialización." },
                            { "value": "resultados_comprobados", "label": "Los resultados comprobados que obtienen mis clientes." },
                            { "value": "enfoque", "label": "Mi enfoque (ej. holístico, basado en ciencia, etc.)." },
                            { "value": "carisma_conexion", "label": "Mi carisma / Habilidad de conexión personal." },
                            { "value": "precio_ofertas", "label": "Precio / Ofertas." },
                            { "value": "tecnologia_innovacion", "label": "Uso de tecnología / Herramientas innovadoras." },
                            { "value": "otro", "label": "Otro (Especificar)" }
                        ],
                        "hasOtherOption": true // camelCase
                    },
                    {
                        "id": "factorDiferenciadorPrincipalOtro", // camelCase
                        "questionText": "Por favor, especifica tu principal factor diferenciador:", // camelCase
                        "type": "text",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "factorDiferenciadorPrincipal", // camelCase
                            "value": "otro"
                        }
                    },
                    {
                        "id": "comunicaFactorDiferenciador", // camelCase
                        "questionText": "¿Inviertes tiempo o recursos en comunicar activamente ese factor diferenciador?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "si", "label": "Sí" },
                            { "value": "no", "label": "No" }
                        ]
                    },
                    {
                        "id": "percepcionCliente", // Renamed field
                        "questionText": "(Opcional - Abierta): ¿Podrías describir brevemente cómo crees que tus clientes perciben ese factor diferenciador?", // camelCase
                        "type": "text_area",
                        "required": false
                    }
                ]
            },
            {
                "blockId": "interesAura", // camelCase
                "title": "Interés en AURA",
                "description": "Estamos desarrollando AURA, una plataforma que busca integrar gestión simplificada de clientes, creación rápida de planes personalizados y seguimiento visual del progreso.",
                "questions": [
                    {
                        "id": "valorPercibidoAura", // camelCase
                        "questionText": "Basado en esta breve descripción, ¿qué tan valioso crees que sería para tu práctica profesional una herramienta como AURA?", // camelCase
                        "type": "select_one",
                        "required": true,
                        "displayType": "likert", // camelCase
                        "options": [
                            { "value": 1, "label": "1 - Nada valioso" }, // Numeric value
                            { "value": 2, "label": "2 - Poco valioso" }, // Numeric value
                            { "value": 3, "label": "3 - Algo valioso" }, // Numeric value
                            { "value": 4, "label": "4 - Bastante valioso" }, // Numeric value
                            { "value": 5, "label": "5 - Extremadamente valioso" } // Numeric value
                        ]
                    },
                    {
                        "id": "funcionalidadIndispensable", // Renamed field
                        "questionText": "(Opcional - Abierta): ¿Hay alguna funcionalidad específica que considerarías INDISPENSABLE en una plataforma como esta para que te sea realmente útil?", // camelCase
                        "type": "text_area",
                        "required": false
                    },
                    {
                        "id": "nombreContacto", // camelCase
                        "questionText": "Si estás interesado/a en probar AURA o saber más, déjanos tu nombre:", // camelCase
                        "type": "text",
                        "required": false
                    },
                    {
                        "id": "emailContacto", // camelCase
                        "questionText": "Y tu correo electrónico:", // camelCase
                        "type": "email",
                        "required": false,
                        "dependsOn": { // camelCase
                            "fieldId": "nombreContacto", // camelCase
                            "condition": "not_empty"
                        }
                    }
                ]
            }
        ]
    }
} as const;
// --- End Survey JSON Data --- 