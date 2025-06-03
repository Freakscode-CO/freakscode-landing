// src/pages/api/guardar-encuesta-cf.js

export async function POST({ request, platform, locals }) {
  try {
    const kvBinding = platform?.env?.SURVEY_KV;

    // Environment variables for local fallback via Cloudflare API
    // These are typically set in your .env file for local development
    // and in Cloudflare Pages project settings for deployed environments (accessed via locals.runtime.env)
    // For local development, Astro automatically loads .env variables into import.meta.env
    const CLOUDFLARE_API_TOKEN = import.meta.env.CLOUDFLARE_API_TOKEN;
    const CLOUDFLARE_ACCOUNT_ID = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
    const KV_NAMESPACE_ID_FOR_API_FALLBACK = import.meta.env.KV_NAMESPACE_ID_BIENESTAR;

    const data = await request.json();

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return new Response(
        JSON.stringify({ message: 'Datos inválidos o vacíos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique ID specific to this survey type
    const surveyId = `survey_bienestar_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const valueToStore = JSON.stringify(data);

    if (kvBinding) {
      // Running on Cloudflare Pages with binding: Use KV binding directly
      console.log('guardar-encuesta-cf: Using KV binding: SURVEY_KV');
      await kvBinding.put(surveyId, valueToStore);
    } else if (CLOUDFLARE_API_TOKEN && CLOUDFLARE_ACCOUNT_ID && KV_NAMESPACE_ID_FOR_API_FALLBACK) {
      // Running locally (or binding not available) AND .env variables are set: Use Cloudflare API
      console.log(`guardar-encuesta-cf: Attempting to write to KV namespace ${KV_NAMESPACE_ID_FOR_API_FALLBACK} via Cloudflare API (local dev mode for bienestar survey)`);
      const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID_FOR_API_FALLBACK}/values/${surveyId}`;
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'text/plain', // KV API expects the raw string value as the body
        },
        body: valueToStore,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('guardar-encuesta-cf: Error writing to Cloudflare KV API (bienestar):', response.status, errorText);
        throw new Error(`Cloudflare API Error (bienestar survey) (${response.status}): ${errorText}`);
      }
      console.log('guardar-encuesta-cf: Successfully wrote to KV (bienestar survey) via Cloudflare API');
    } else {
      // KV binding is not available AND local development .env variables are missing/incomplete
      console.error(
        'guardar-encuesta-cf: KV namespace SURVEY_KV is not available, and Cloudflare API credentials for local development (bienestar survey) are missing or incomplete.'
      );
      let missingVarsMessage = "Missing or incomplete configuration for local fallback: ";
      if (!CLOUDFLARE_API_TOKEN) missingVarsMessage += "CLOUDFLARE_API_TOKEN, ";
      if (!CLOUDFLARE_ACCOUNT_ID) missingVarsMessage += "CLOUDFLARE_ACCOUNT_ID, ";
      if (!KV_NAMESPACE_ID_FOR_API_FALLBACK) missingVarsMessage += "KV_NAMESPACE_ID_BIENESTAR.";
      // Ensure the message ends correctly if some variables are present
      if (missingVarsMessage.endsWith(", ")) {
        missingVarsMessage = missingVarsMessage.slice(0, -2) + ".";
      }
      console.error(missingVarsMessage);

      return new Response(
        JSON.stringify({ 
          message: 'Servicio de guardado no disponible temporalmente (configuración incompleta para encuesta bienestar).',
          details: 'KV binding \"SURVEY_KV\" not found and local fallback configuration is incomplete. Check server logs and .env file for CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, KV_NAMESPACE_ID_BIENESTAR.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } } // 503 Service Unavailable
      );
    }

    return new Response(
      JSON.stringify({ message: 'Encuesta de bienestar guardada exitosamente!', surveyId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('guardar-encuesta-cf: Error al procesar la solicitud POST:', error);
    let errorMessage = 'Error interno del servidor al guardar la encuesta de bienestar.';
    let statusCode = 500;

    if (error instanceof SyntaxError) { // Error parsing request.json()
      errorMessage = 'Error: El cuerpo de la solicitud no es un JSON válido.';
      statusCode = 400;
    } else if (error.message && error.message.startsWith('Cloudflare API Error')) {
      // Specific error from our Cloudflare API call attempt
      errorMessage = error.message;
      // statusCode could remain 500 or be more specific if parsed from error
    }
    
    return new Response(
      JSON.stringify({ message: errorMessage, errorDetails: error.message }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Endpoint GET de ejemplo para verificar que la ruta funciona.
// Podrías usarlo para listar algunas claves si lo necesitas para depuración (con precaución).
export async function GET({ platform }) {
  // This GET function does not need modification for the KV writing part.
  // If it were to read from KV, similar logic for binding/API fallback would apply.
  return new Response(
    JSON.stringify({ message: "Hola desde el endpoint GET de guardar-encuesta-cf.js. El KV se maneja en POST." }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
