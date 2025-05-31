// src/pages/api/guardar-encuesta-cf.js

export async function POST({ request, platform }) {
  try {
    // platform.env es donde Cloudflare inyecta los bindings, incluyendo el KV namespace.
    // Necesitarás crear un binding llamado 'SURVEY_KV' (o el nombre que elijas)
    // en la configuración de tu sitio en Cloudflare Pages, y enlazarlo al KV Namespace
    // que creaste en el panel de Cloudflare.
    const kvNamespace = platform?.env?.SURVEY_KV;

    if (!kvNamespace) {
      console.error('Error: El KV Namespace (SURVEY_KV) no está configurado o enlazado correctamente en Cloudflare Pages.');
      return new Response(
        JSON.stringify({ message: 'Error de configuración del servidor: KV Namespace no encontrado.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await request.json();

    // Validación básica de los datos (puedes expandir esto)
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return new Response(
        JSON.stringify({ message: 'Datos inválidos o vacíos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generar un ID único para cada entrada de la encuesta
    const surveyId = `survey_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Guardar los datos en KV. Los valores deben ser strings, ArrayBuffers, o Streams.
    // Guardamos el objeto de datos como un string JSON.
    await kvNamespace.put(surveyId, JSON.stringify(data));

    return new Response(
      JSON.stringify({ message: 'Encuesta guardada exitosamente!', surveyId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error al procesar la solicitud POST:', error);
    let errorMessage = 'Error interno del servidor al guardar la encuesta.';
    let statusCode = 500;

    if (error instanceof SyntaxError) {
      errorMessage = 'Error: El cuerpo de la solicitud no es un JSON válido.';
      statusCode = 400;
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
  return new Response(
    JSON.stringify({ message: 'Endpoint para guardar encuestas. Usa POST para enviar datos.' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
