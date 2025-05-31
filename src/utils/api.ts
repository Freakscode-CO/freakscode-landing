/**
 * Envía los datos de la encuesta al backend.
 * @param surveyId El ID de la encuesta que se está enviando.
 * @param formData Los datos recopilados de la encuesta.
 */
export const submitSurvey = async (surveyId: string, formData: Record<string, any>): Promise<void> => {
    console.log(`Enviando datos de encuesta ${surveyId} al servidor...`);
    
    // URLs de los endpoints
    const AWS_SURVEY_ENDPOINT = import.meta.env.PUBLIC_SURVEY_ENDPOINT || 
                               "https://oyvtmor2xd.execute-api.us-east-1.amazonaws.com/survey";
    
    const CLOUDFLARE_WORKER_ENDPOINT = 'https://freakscode-survey-api.gabcardona.workers.dev/';

    // Decidir qué endpoint usar basado en el tipo de survey
    const isWellnessSurvey = surveyId === "encuesta_bienestar_aura_v1";
    let endpoint: string;
    let targetPlatform: string;

    if (isWellnessSurvey) {
        endpoint = CLOUDFLARE_WORKER_ENDPOINT;
        targetPlatform = 'Cloudflare Worker';
    } else {
        // Para otras encuestas, usa AWS (o la lógica que prefieras)
        endpoint = AWS_SURVEY_ENDPOINT;
        targetPlatform = 'AWS';
    }
    
    try {
        // Preparar los datos para enviar
        const payload = {
            surveyId,
            responses: formData,
            timestamp: new Date().toISOString(),
            metadata: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                surveyType: isWellnessSurvey ? 'wellness' : 'professional' // Ajustado para reflejar el tipo correcto
            }
        };
        
        console.log(`Enviando a: ${targetPlatform} (${endpoint})`);
        
        // Realizar la petición al endpoint
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        // Validar la respuesta
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor' }));
            throw new Error(errorData.message || `Error del servidor: ${response.status} en ${targetPlatform}`);
        }
        
        const data = await response.json().catch(() => ({})); // El Worker devuelve un JSON, así que esto está bien
        console.log("Encuesta enviada con éxito a", targetPlatform, ":", data);
        
    } catch (error) {
        console.error(`Error al enviar la encuesta a ${targetPlatform}:`, error);
        
        // Aquí podrías implementar un fallback si lo deseas, por ejemplo, a AWS si el Worker falla.
        // Por ahora, solo re-lanzamos el error.
        // Ejemplo de fallback a AWS si el Worker falla:
        // if (targetPlatform === 'Cloudflare Worker') {
        //     console.log("Cloudflare Worker falló. Intentando envío de fallback a AWS...");
        //     // Aquí iría la lógica para enviar a AWS_SURVEY_ENDPOINT
        //     // ... (similar a tu código de fallback anterior, pero adaptado)
        // }

        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
}; 