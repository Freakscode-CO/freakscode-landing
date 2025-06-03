import type { APIRoute } from 'astro';

// This endpoint acts as a proxy to the external survey API
// to handle CORS and potentially other logic.

export const prerender = false; // Ensures this is a dynamic server-rendered endpoint

const EXTERNAL_API_URL = 'https://freakscode-survey-api.gabcardona.workers.dev/pascual';

// Define allowed origins. For development, this might be your local dev server.
// For production, it should be your actual domain.
const allowedOrigins = [
  'http://127.0.0.1:4321', // Astro dev server
  'http://localhost:4321',  // Astro dev server (alternative)
  // Add your production domain here when deploying
  // e.g., 'https://your-production-site.com'
];

const corsHeaders = (origin: string | null) => {
  const headers = new Headers();
  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Added Authorization as an example, adjust if needed
  headers.set('Access-Control-Max-Age', '86400'); // Cache preflight request for 1 day
  return headers;
};

export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get('Origin');
  return new Response(null, {
    status: 204, // No Content
    headers: corsHeaders(origin),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('Origin');
  const responseHeaders = corsHeaders(origin);

  try {
    const data = await request.json();

    // Forward the request to the external API
    const externalApiResponse = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers required by the external API, e.g., an API key
        // 'Authorization': `Bearer ${YOUR_EXTERNAL_API_KEY}`
      },
      body: JSON.stringify(data),
    });

    // Get the response body from the external API
    const externalApiResponseBody = await externalApiResponse.json().catch(() => ({})); // Gracefully handle non-JSON or empty responses

    // Set Content-Type for the response to the client
    responseHeaders.set('Content-Type', 'application/json');

    // Return the response from the external API to the client
    return new Response(JSON.stringify(externalApiResponseBody), {
      status: externalApiResponse.status,
      statusText: externalApiResponse.statusText,
      headers: responseHeaders,
    });

  } catch (error: any) {
    console.error('------------------------------------------------------------');
    console.error('Error proxying survey submission to external API:');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error Name:', error?.name);
    console.error('Error Message:', error?.message);
    if (error?.cause) {
      console.error('Error Cause:', error.cause);
    }
    if (error?.stack) {
      console.error('Error Stack:', error.stack);
    }
    console.error('Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('------------------------------------------------------------');

    responseHeaders.set('Content-Type', 'application/json');
    return new Response(JSON.stringify({ 
      message: 'Error interno del servidor al procesar la encuesta.', 
      errorDetails: error?.message || 'Unknown error',
      errorName: error?.name || 'UnknownError'
    }), {
      status: 500,
      headers: responseHeaders,
    });
  }
};