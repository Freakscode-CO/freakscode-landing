export const prerender = false; // Mark endpoint as server-rendered

import type { APIRoute } from 'astro';
import { BlobServiceClient } from '@azure/storage-blob';

export const POST: APIRoute = async ({ request }) => {
  // Leer las variables de entorno (Astro las carga automáticamente desde .env)
  const AZURE_STORAGE_CONNECTION_STRING = import.meta.env.AZURE_STORAGE_CONNECTION_STRING;
  const AZURE_STORAGE_CONTAINER_NAME = import.meta.env.AZURE_STORAGE_CONTAINER_NAME;

  if (!AZURE_STORAGE_CONNECTION_STRING || !AZURE_STORAGE_CONTAINER_NAME) {
    console.error(
      'Azure Storage credentials not configured.'
    );
    return new Response(
      JSON.stringify({
        message:
          'Error de configuración del servidor: El servicio de almacenamiento no está configurado.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let requestBodyAsText = ''; // Declarar en un scope más amplio
  try {
    requestBodyAsText = await request.text();
    console.log('Raw request body received by server:', requestBodyAsText);

    if (!requestBodyAsText) {
        // Si el cuerpo está vacío, JSON.parse fallará, así que lo manejamos aquí.
        console.error('Request body is empty.');
        return new Response(JSON.stringify({ message: 'El cuerpo de la solicitud está vacío.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const surveyData = JSON.parse(requestBodyAsText);

    if (!surveyData || typeof surveyData !== 'object' || !surveyData.surveyId) {
      return new Response(JSON.stringify({ message: 'Datos inválidos o faltantes parseados.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear un nombre único para el blob (archivo)
    const blobName = `survey-${surveyData.surveyId}-response-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.json`;
    const blobContent = JSON.stringify(surveyData, null, 2); // Guardar como JSON formateado

    // Conectar al servicio de Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
      AZURE_STORAGE_CONTAINER_NAME
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Subir el contenido al blob
    await blockBlobClient.upload(blobContent, blobContent.length, {
      blobHTTPHeaders: { blobContentType: 'application/json' },
    });

    console.log(`Survey response successfully uploaded to Azure Blob Storage as ${blobName}`);

    return new Response(
      JSON.stringify({
        message: 'Respuesta de la encuesta enviada y guardada en Azure con éxito.',
        blobName: blobName,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing survey and uploading to Azure:', error.message); // Loguear el mensaje del error
    // Si el error es de JSON.parse, el mensaje será más específico y ya hemos logueado el cuerpo
    if (error instanceof SyntaxError) {
        console.error('Failed to parse request body as JSON. Body was:', requestBodyAsText); // Loguear el cuerpo si falla el parseo
    }
    return new Response(
      JSON.stringify({
        message: 'Error al procesar la encuesta para Azure.',
        error: error.message, // Enviar el mensaje de error al cliente
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 