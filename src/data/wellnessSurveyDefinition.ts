// src/data/wellnessSurveyDefinition.ts

// --- Interfaces para la Survey de Bienestar ---
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

// --- Definición de la Survey de Bienestar ---
export const wellnessSurveyData = {
    "survey": {
        "id": "encuesta_bienestar_aura_v1",
        "title": "Encuesta de Bienestar Personal",
        "description": "Ayúdanos a conocerte mejor para personalizar tu experiencia en AURA y brindarte el mejor contenido y recomendaciones para tu bienestar.",
        "language": "es",
        "version": "1.0.0",
        "blocks": [
            {
                "blockId": "informacionPersonal",
                "title": "Información Personal",
                "description": "Datos básicos para conocerte mejor y personalizar tu experiencia.",
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
                        "placeholder": "Ejemplo: 28"
                    },
                    {
                        "id": "email",
                        "questionText": "¿Cuál es tu correo electrónico?",
                        "type": "email",
                        "required": true,
                        "placeholder": "ejemplo@correo.com"
                    },
                    {
                        "id": "ocupacion",
                        "questionText": "¿Cuál es tu ocupación actual?",
                        "type": "text",
                        "required": true,
                        "placeholder": "Ejemplo: Ingeniera de Software, Estudiante, etc."
                    },
                    {
                        "id": "ubicacion",
                        "questionText": "¿En qué ciudad/país te encuentras?",
                        "type": "text",
                        "required": false,
                        "placeholder": "Ejemplo: Madrid, España"
                    },
                    {
                        "id": "estadoCivil",
                        "questionText": "¿Cuál es tu estado civil?",
                        "type": "select_one",
                        "required": false,
                        "options": [
                            { "value": "soltero", "label": "Soltero/a" },
                            { "value": "pareja", "label": "En pareja" },
                            { "value": "casado", "label": "Casado/a" },
                            { "value": "divorciado", "label": "Divorciado/a" },
                            { "value": "viudo", "label": "Viudo/a" },
                            { "value": "prefiero_no_decir", "label": "Prefiero no decirlo" }
                        ]
                    },
                    {
                        "id": "tieneHijos",
                        "questionText": "¿Tienes hijos?",
                        "type": "select_one",
                        "required": false,
                        "options": [
                            { "value": "si", "label": "Sí" },
                            { "value": "no", "label": "No" },
                            { "value": "prefiero_no_decir", "label": "Prefiero no decirlo" }
                        ]
                    }
                ]
            },
            {
                "blockId": "necesidadesObjetivos",
                "title": "Necesidades y Objetivos",
                "description": "Cuéntanos sobre tus necesidades específicas y objetivos de bienestar.",
                "questions": [
                    {
                        "id": "needsInterests",
                        "questionText": "¿Cuáles son tus principales necesidades e intereses en cuanto a bienestar personal? (Describe libremente)",
                        "type": "text_area",
                        "required": true,
                        "placeholder": "Ejemplo: Busco reducir el estrés del trabajo, mejorar mi condición física, encontrar balance vida-trabajo..."
                    },
                    {
                        "id": "wellnessGoals",
                        "questionText": "¿Cuáles son tus objetivos específicos de bienestar que te gustaría alcanzar? (Describe libremente)",
                        "type": "text_area",
                        "required": true,
                        "placeholder": "Ejemplo: Perder 5kg, meditar 10 minutos diarios, dormir mejor, sentirme más energético/a..."
                    }
                ]
            },
            {
                "blockId": "actividadFisica",
                "title": "Actividad Física",
                "description": "Información sobre tu actividad física actual.",
                "questions": [
                    {
                        "id": "physicalActivityType",
                        "questionText": "¿Qué tipos de actividad física realizas normalmente? (Puedes seleccionar varias)",
                        "type": "select_multiple",
                        "required": true,
                        "options": [
                            { "value": "caminar", "label": "Caminar" },
                            { "value": "correr", "label": "Correr" },
                            { "value": "bicicleta", "label": "Bicicleta" },
                            { "value": "yoga", "label": "Yoga" },
                            { "value": "fuerza", "label": "Entrenamiento de fuerza/gimnasio" },
                            { "value": "natacion", "label": "Natación" },
                            { "value": "baile", "label": "Baile" },
                            { "value": "deportes", "label": "Deportes en equipo" },
                            { "value": "escalada", "label": "Escalada" },
                            { "value": "pilates", "label": "Pilates" },
                            { "value": "ninguna", "label": "No realizo actividad física regular" },
                            { "value": "otro", "label": "Otro" }
                        ],
                        "hasOtherOption": true
                    },
                    {
                        "id": "physicalActivityTypeOtro",
                        "questionText": "Por favor, especifica qué otro tipo de actividad física realizas:",
                        "type": "text",
                        "required": false,
                        "dependsOn": {
                            "fieldId": "physicalActivityType",
                            "value": "otro",
                            "condition": "includes"
                        }
                    },
                    {
                        "id": "activityDuration",
                        "questionText": "¿Cuántos minutos de actividad física realizas en una sesión típica?",
                        "type": "number",
                        "required": true,
                        "min": 0,
                        "max": 480,
                        "placeholder": "Ejemplo: 30"
                    },
                    {
                        "id": "activityFrequency",
                        "questionText": "¿Con qué frecuencia realizas actividad física?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "diario", "label": "Diariamente" },
                            { "value": "5-6_veces", "label": "5-6 veces por semana" },
                            { "value": "3-4_veces", "label": "3-4 veces por semana" },
                            { "value": "1-2_veces", "label": "1-2 veces por semana" },
                            { "value": "ocasional", "label": "Ocasionalmente" },
                            { "value": "nunca", "label": "Nunca o casi nunca" }
                        ]
                    },
                    {
                        "id": "activityIntensity",
                        "questionText": "¿Cómo describirías la intensidad de tu actividad física habitual?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "baja", "label": "Baja (actividad ligera, caminar tranquilo)" },
                            { "value": "moderada", "label": "Moderada (sudor ligero, puedo mantener conversación)" },
                            { "value": "alta", "label": "Alta (sudor intenso, dificultad para hablar)" }
                        ]
                    }
                ]
            },
            {
                "blockId": "estadoEmocional",
                "title": "Estado Emocional y Mental",
                "description": "Información sobre tu estado de ánimo y bienestar mental actual.",
                "questions": [
                    {
                        "id": "moodReport",
                        "questionText": "¿Cómo describirías tu estado de ánimo en general durante las últimas 2 semanas?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "muy_feliz", "label": "Muy feliz - Me siento excelente la mayor parte del tiempo" },
                            { "value": "feliz", "label": "Feliz - Me siento bien en general" },
                            { "value": "neutral", "label": "Neutral - Ni muy bien ni muy mal" },
                            { "value": "triste", "label": "Triste - He tenido días difíciles" },
                            { "value": "estresado", "label": "Estresado - Siento mucha presión o tensión" },
                            { "value": "ansioso", "label": "Ansioso - Siento preocupación o nerviosismo frecuente" }
                        ]
                    },
                    {
                        "id": "stressLevel",
                        "questionText": "En una escala del 1 al 10, ¿cuál es tu nivel de estrés promedio? (1 = Sin estrés, 10 = Estrés extremo)",
                        "type": "number",
                        "required": true,
                        "min": 1,
                        "max": 10,
                        "placeholder": "Ejemplo: 6"
                    },
                    {
                        "id": "stressCauses",
                        "questionText": "¿Cuáles son las principales fuentes de estrés en tu vida? (Puedes seleccionar varias)",
                        "type": "select_multiple",
                        "required": false,
                        "options": [
                            { "value": "trabajo", "label": "Trabajo/Estudios" },
                            { "value": "finanzas", "label": "Situación financiera" },
                            { "value": "relaciones", "label": "Relaciones personales" },
                            { "value": "salud", "label": "Salud personal o familiar" },
                            { "value": "tiempo", "label": "Falta de tiempo" },
                            { "value": "futuro", "label": "Incertidumbre sobre el futuro" },
                            { "value": "autoestima", "label": "Autoestima/Imagen personal" },
                            { "value": "tecnologia", "label": "Sobrecarga de información/tecnología" },
                            { "value": "otro", "label": "Otro" }
                        ],
                        "hasOtherOption": true
                    },
                    {
                        "id": "stressCausesOtro",
                        "questionText": "Por favor, especifica otra fuente de estrés:",
                        "type": "text",
                        "required": false,
                        "dependsOn": {
                            "fieldId": "stressCauses",
                            "value": "otro",
                            "condition": "includes"
                        }
                    }
                ]
            },
            {
                "blockId": "suenioDescanso",
                "title": "Sueño y Descanso",
                "description": "Información sobre tus patrones de sueño y calidad de descanso.",
                "questions": [
                    {
                        "id": "sleepQuality",
                        "questionText": "¿Cómo calificarías la calidad de tu sueño en las últimas 2 semanas?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "excelente", "label": "Excelente - Duermo profundamente y despierto renovado/a" },
                            { "value": "buena", "label": "Buena - Generalmente duermo bien" },
                            { "value": "regular", "label": "Regular - A veces duermo bien, a veces no" },
                            { "value": "mala", "label": "Mala - Con frecuencia tengo problemas para dormir" },
                            { "value": "muy_mala", "label": "Muy mala - Casi siempre tengo problemas para dormir" }
                        ]
                    },
                    {
                        "id": "sleepHours",
                        "questionText": "¿Cuántas horas duermes normalmente por noche?",
                        "type": "number",
                        "required": true,
                        "min": 3,
                        "max": 12,
                        "placeholder": "Ejemplo: 7"
                    },
                    {
                        "id": "sleepProblems",
                        "questionText": "¿Tienes alguno de estos problemas relacionados con el sueño? (Puedes seleccionar varios)",
                        "type": "select_multiple",
                        "required": false,
                        "options": [
                            { "value": "dificultad_dormir", "label": "Dificultad para quedarme dormido/a" },
                            { "value": "despertares", "label": "Despertares frecuentes durante la noche" },
                            { "value": "despertar_temprano", "label": "Despertar muy temprano sin poder volver a dormir" },
                            { "value": "sueno_no_reparador", "label": "Sensación de sueño no reparador" },
                            { "value": "pesadillas", "label": "Pesadillas o sueños inquietos" },
                            { "value": "ronquidos", "label": "Ronquidos (propios o de la pareja)" },
                            { "value": "ninguno", "label": "No tengo problemas de sueño" }
                        ]
                    }
                ]
            },
            {
                "blockId": "espiritualidadMindfulness",
                "title": "Espiritualidad y Mindfulness",
                "description": "Tus intereses en prácticas espirituales y de conciencia plena.",
                "questions": [
                    {
                        "id": "spiritualInterests",
                        "questionText": "¿Cuáles de estas prácticas espirituales o de crecimiento personal te interesan? (Puedes seleccionar varias)",
                        "type": "select_multiple",
                        "required": false,
                        "options": [
                            { "value": "meditacion", "label": "Meditación" },
                            { "value": "mindfulness", "label": "Mindfulness (atención plena)" },
                            { "value": "gratitud", "label": "Prácticas de gratitud" },
                            { "value": "valores", "label": "Reflexión sobre valores y propósito de vida" },
                            { "value": "conexion", "label": "Conexión con la naturaleza" },
                            { "value": "paz_interior", "label": "Búsqueda de paz interior" },
                            { "value": "oracion", "label": "Oración o prácticas religiosas" },
                            { "value": "filosofia", "label": "Filosofía de vida" },
                            { "value": "ninguna", "label": "No me interesan estas prácticas" }
                        ]
                    },
                    {
                        "id": "meditationExperience",
                        "questionText": "¿Tienes experiencia previa con la meditación?",
                        "type": "select_one",
                        "required": false,
                        "dependsOn": {
                            "fieldId": "spiritualInterests",
                            "value": "meditacion",
                            "condition": "includes"
                        },
                        "options": [
                            { "value": "principiante", "label": "Soy principiante, nunca o casi nunca he meditado" },
                            { "value": "ocasional", "label": "He probado ocasionalmente" },
                            { "value": "regular", "label": "Medito regularmente (al menos 1-2 veces por semana)" },
                            { "value": "avanzado", "label": "Tengo una práctica avanzada y constante" }
                        ]
                    }
                ]
            },
            {
                "blockId": "preferenciasContenido",
                "title": "Preferencias de Contenido",
                "description": "Qué tipo de contenido y herramientas te gustaría recibir.",
                "questions": [
                    {
                        "id": "contentPreferences",
                        "questionText": "¿Qué tipo de contenido te gustaría recibir en AURA? (Puedes seleccionar varios)",
                        "type": "select_multiple",
                        "required": true,
                        "options": [
                            { "value": "meditaciones_guiadas", "label": "Meditaciones guiadas" },
                            { "value": "ejercicios_mindfulness", "label": "Ejercicios de mindfulness" },
                            { "value": "tecnicas_tcc", "label": "Técnicas de terapia cognitivo-conductual (TCC)" },
                            { "value": "coaching_vida", "label": "Contenido de coaching de vida" },
                            { "value": "planes_ejercicio", "label": "Planes de ejercicio personalizados" },
                            { "value": "recetas_nutricionales", "label": "Recetas y consejos nutricionales" },
                            { "value": "habitos_saludables", "label": "Guías para crear hábitos saludables" },
                            { "value": "gestion_estres", "label": "Técnicas de gestión del estrés" },
                            { "value": "mejora_sueno", "label": "Contenido para mejorar el sueño" },
                            { "value": "motivacion_diaria", "label": "Mensajes motivacionales diarios" }
                        ]
                    },
                    {
                        "id": "preferredContentLength",
                        "questionText": "¿Qué duración prefieres para las actividades guiadas (meditaciones, ejercicios, etc.)?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "corta", "label": "Corta (5-10 minutos)" },
                            { "value": "media", "label": "Media (10-20 minutos)" },
                            { "value": "larga", "label": "Larga (20-30 minutos)" },
                            { "value": "variable", "label": "Variable, dependiendo del día" }
                        ]
                    },
                    {
                        "id": "reminderPreference",
                        "questionText": "¿Te gustaría recibir recordatorios para realizar tus actividades de bienestar?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "si_diario", "label": "Sí, recordatorios diarios" },
                            { "value": "si_varios_por_dia", "label": "Sí, varios recordatorios por día" },
                            { "value": "si_semanal", "label": "Sí, recordatorios semanales" },
                            { "value": "no", "label": "No, prefiero recordar por mi cuenta" }
                        ]
                    }
                ]
            },
            {
                "blockId": "rutinaPersonalizacion",
                "title": "Rutina y Personalización",
                "description": "Información sobre tu rutina diaria para personalizar mejor la experiencia.",
                "questions": [
                    {
                        "id": "dailyRoutine",
                        "questionText": "Describe brevemente tu rutina diaria típica (horarios de trabajo, momentos libres, etc.) - Esto nos ayudará a sugerir los mejores momentos para actividades de bienestar",
                        "type": "text_area",
                        "required": false,
                        "placeholder": "Ejemplo: Trabajo de 9-18h, almuerzo 13-14h, libre por las noches después de las 19h..."
                    },
                    {
                        "id": "bestTimeForWellness",
                        "questionText": "¿Cuál es el mejor momento del día para ti para realizar actividades de bienestar?",
                        "type": "select_multiple",
                        "required": true,
                        "options": [
                            { "value": "manana_temprano", "label": "Mañana temprano (6-8 AM)" },
                            { "value": "manana", "label": "Mañana (8-12 PM)" },
                            { "value": "mediodia", "label": "Mediodía (12-14 PM)" },
                            { "value": "tarde", "label": "Tarde (14-18 PM)" },
                            { "value": "noche", "label": "Noche (18-22 PM)" },
                            { "value": "noche_tardia", "label": "Noche tardía (después de 22 PM)" },
                            { "value": "variable", "label": "Variable, depende del día" }
                        ]
                    },
                    {
                        "id": "motivationFactors",
                        "questionText": "¿Qué te motiva más para mantener hábitos saludables? (Puedes seleccionar varios)",
                        "type": "select_multiple",
                        "required": true,
                        "options": [
                            { "value": "resultados_visibles", "label": "Ver resultados visibles" },
                            { "value": "sentirse_mejor", "label": "Sentirme mejor física y mentalmente" },
                            { "value": "logros_metas", "label": "Alcanzar metas y logros" },
                            { "value": "apoyo_comunidad", "label": "Apoyo de una comunidad" },
                            { "value": "competencia", "label": "Competencia saludable con otros" },
                            { "value": "recordatorios", "label": "Recordatorios y estructura" },
                            { "value": "recompensas", "label": "Sistema de recompensas" },
                            { "value": "progreso_gradual", "label": "Progreso gradual y sostenible" }
                        ]
                    }
                ]
            },
            {
                "blockId": "feedbackComentarios",
                "title": "Comentarios Finales",
                "description": "Tus comentarios adicionales y expectativas sobre AURA.",
                "questions": [
                    {
                        "id": "feedback",
                        "questionText": "¿Hay algo específico que te gustaría que AURA incluyera o algún comentario adicional que quieras compartir?",
                        "type": "text_area",
                        "required": false,
                        "placeholder": "Comparte cualquier idea, sugerencia o expectativa que tengas..."
                    },
                    {
                        "id": "howDidYouHear",
                        "questionText": "¿Cómo conociste AURA?",
                        "type": "select_one",
                        "required": false,
                        "options": [
                            { "value": "redes_sociales", "label": "Redes sociales" },
                            { "value": "recomendacion", "label": "Recomendación de amigo/familiar" },
                            { "value": "profesional_salud", "label": "Recomendación de profesional de salud" },
                            { "value": "busqueda_internet", "label": "Búsqueda en internet" },
                            { "value": "publicidad", "label": "Publicidad online" },
                            { "value": "evento", "label": "Evento o conferencia" },
                            { "value": "otro", "label": "Otro" }
                        ],
                        "hasOtherOption": true
                    },
                    {
                        "id": "howDidYouHearOtro",
                        "questionText": "Por favor, especifica cómo conociste AURA:",
                        "type": "text",
                        "required": false,
                        "dependsOn": {
                            "fieldId": "howDidYouHear",
                            "value": "otro"
                        }
                    },
                    {
                        "id": "newsletterConsent",
                        "questionText": "¿Te gustaría recibir actualizaciones sobre el desarrollo de AURA y consejos de bienestar?",
                        "type": "select_one",
                        "required": true,
                        "options": [
                            { "value": "si", "label": "Sí, me gustaría recibir actualizaciones" },
                            { "value": "no", "label": "No, prefiero no recibir comunicaciones" }
                        ]
                    }
                ]
            }
        ]
    } as const
} as const;

// Exportar la survey como Survey type-safe
export const wellnessSurvey: Survey = wellnessSurveyData.survey; 