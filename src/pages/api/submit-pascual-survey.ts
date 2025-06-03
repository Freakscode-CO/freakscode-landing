import type { APIRoute } from 'astro';

// This is a placeholder for the actual KV namespace binding provided by Cloudflare.
// In a Cloudflare Pages/Workers environment, you would declare this in your wrangler.toml
// or it would be automatically available. For local development, you'd need a way to mock this.
// declare global {
//   const AURA_SURVEYS_KV: KVNamespace;
// }

export const POST: APIRoute = async ({ request, locals }) => {
  const kvBinding = (locals?.runtime?.env as any)?.AURA_SURVEYS_KV;

  // Environment variables for local fallback via Cloudflare API
  // Astro loads .env files automatically into import.meta.env
  const CLOUDFLARE_API_TOKEN = import.meta.env.CLOUDFLARE_API_TOKEN;
  const CLOUDFLARE_ACCOUNT_ID = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
  const KV_NAMESPACE_ID = import.meta.env.KV_NAMESPACE_ID; // This is your specific KV namespace ID

  try {
    const data = await request.json();

    if (!data || typeof data !== 'object' || !data.surveyId) {
      return new Response(JSON.stringify({ message: 'Datos inválidos o faltantes.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submissionId = `survey-${data.surveyId}-submission-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const valueToStore = JSON.stringify(data);

    if (kvBinding) {
      // Running on Cloudflare: Use KV binding
      await kvBinding.put(submissionId, valueToStore);
    } else if (CLOUDFLARE_API_TOKEN && CLOUDFLARE_ACCOUNT_ID && KV_NAMESPACE_ID) {
      // Running locally (or binding not available): Use Cloudflare API
      console.log(`Attempting to write to KV namespace ${KV_NAMESPACE_ID} via Cloudflare API (local dev mode)`);
      const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${submissionId}`;
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'text/plain', // KV expects the raw string value as the body
        },
        body: valueToStore,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error writing to Cloudflare KV API:', response.status, errorText);
        throw new Error(`Cloudflare API Error (${response.status}): ${errorText}`);
      }
      console.log('Successfully wrote to KV via Cloudflare API');
    } else {
      console.error(
        'KV namespace AURA_SURVEYS_KV is not available, and Cloudflare API credentials for local development are missing.'
      );
      return new Response(
        JSON.stringify({ message: 'Servicio de guardado no disponible temporalmente (configuración incompleta).' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ message: 'Encuesta enviada con éxito.', submissionId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al procesar la encuesta:', error.message);
    return new Response(JSON.stringify({ message: 'Error al procesar la encuesta.', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}; 