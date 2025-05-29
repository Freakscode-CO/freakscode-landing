/**
 * Envía los datos de la encuesta al backend en AWS o Azure.
 * @param surveyId El ID de la encuesta que se está enviando.
 * @param formData Los datos recopilados de la encuesta.
 */
export const submitSurvey = async (surveyId: string, formData: Record<string, any>): Promise<void> => {
    console.log(`Enviando datos de encuesta ${surveyId} al servidor...`);
    
    // URLs de los endpoints
    const AWS_SURVEY_ENDPOINT = import.meta.env.PUBLIC_SURVEY_ENDPOINT || 
                               "https://oyvtmor2xd.execute-api.us-east-1.amazonaws.com/survey";
    
    const AZURE_SURVEY_ENDPOINT = import.meta.env.PUBLIC_AZURE_SURVEY_ENDPOINT || null;
    
    // Decidir qué endpoint usar basado en el tipo de survey
    const isWellnessSurvey = surveyId === "encuesta_bienestar_aura_v1";
    const endpoint = isWellnessSurvey && AZURE_SURVEY_ENDPOINT ? AZURE_SURVEY_ENDPOINT : AWS_SURVEY_ENDPOINT;
    
    try {
        // Preparar los datos para enviar
        const payload = {
            surveyId,
            responses: formData,
            timestamp: new Date().toISOString(),
            metadata: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                surveyType: isWellnessSurvey ? 'wellness' : 'professional'
            }
        };
        
        console.log(`Enviando a: ${isWellnessSurvey && AZURE_SURVEY_ENDPOINT ? 'Azure' : 'AWS'}`);
        
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
            // Si el servidor respondió con un error, intentamos obtener el mensaje
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor' }));
            throw new Error(errorData.message || `Error del servidor: ${response.status}`);
        }
        
        // Respuesta exitosa
        const data = await response.json().catch(() => ({}));
        console.log("Encuesta enviada con éxito:", data);
        
    } catch (error) {
        console.error("Error al enviar la encuesta:", error);
        
        // Si es una encuesta de bienestar y falla Azure, intentar con AWS como fallback
        if (isWellnessSurvey && AZURE_SURVEY_ENDPOINT && endpoint === AZURE_SURVEY_ENDPOINT) {
            console.log("Intentando envío de fallback a AWS...");
            try {
                const fallbackPayload = {
                    surveyId,
                    responses: formData,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        surveyType: 'wellness',
                        fallbackReason: 'Azure endpoint failed'
                    }
                };
                
                const fallbackResponse = await fetch(AWS_SURVEY_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(fallbackPayload)
                });
                
                if (fallbackResponse.ok) {
                    console.log("Encuesta enviada con éxito usando fallback a AWS");
                    return;
                }
            } catch (fallbackError) {
                console.error("Error en fallback a AWS:", fallbackError);
            }
        }
        
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
}; 