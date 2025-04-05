/**
 * Envía los datos de la encuesta al backend en AWS.
 * @param surveyId El ID de la encuesta que se está enviando.
 * @param formData Los datos recopilados de la encuesta.
 */
export const submitSurvey = async (surveyId: string, formData: Record<string, any>): Promise<void> => {
    console.log(`Enviando datos de encuesta ${surveyId} al servidor...`);
    
    // URL del endpoint AWS
    const SURVEY_ENDPOINT = import.meta.env.PUBLIC_SURVEY_ENDPOINT || 
                           "https://oyvtmor2xd.execute-api.us-east-1.amazonaws.com/survey";
    
    try {
        // Preparar los datos para enviar
        const payload = {
            surveyId,
            responses: formData,
            timestamp: new Date().toISOString(),
            metadata: {
                userAgent: navigator.userAgent,
                language: navigator.language
            }
        };
        
        // Realizar la petición al endpoint
        const response = await fetch(SURVEY_ENDPOINT, {
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
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
}; 