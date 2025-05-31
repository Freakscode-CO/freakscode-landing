const { CosmosClient } = require('@azure/cosmos');

// Configuración de Cosmos DB (asegúrate de tener estas variables de entorno en tu Function App)
// Se recomienda usar variables de entorno para las cadenas de conexión y claves.
const endpoint = process.env.COSMOS_ENDPOINT; // ej. "https://tu-cuenta.documents.azure.com:443/"
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE_ID || 'aura-wellness';
const containerId = process.env.COSMOS_CONTAINER_ID || 'survey-responses';

// Inicializar cliente de Cosmos DB fuera del manejador para reutilizar la conexión
// Esto es una optimización importante para Azure Functions (especialmente en planes de consumo)
let client;
let database;
let container;

function getCosmosContainer(context) {
    if (!client) {
        if (!endpoint || !key) {
            context.log.error('Error: Variables de entorno COSMOS_ENDPOINT o COSMOS_KEY no están definidas.');
            // No lances un error aquí directamente, deja que el llamador maneje la ausencia de cliente
            return null; 
        }
        try {
            client = new CosmosClient({ endpoint, key });
            database = client.database(databaseId);
            container = database.container(containerId);
            context.log('Cliente de Cosmos DB inicializado.');
        } catch (dbError) {
            context.log.error('Error inicializando el cliente de Cosmos DB:', dbError.message);
            client = null; // Asegurarse de que no se reutilice un cliente fallido
            return null;
        }
    }
    return container;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function procesó una solicitud para Encuesta de Bienestar.');

    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            body: { error: 'Método no permitido. Por favor, usa POST.' }
        };
        return;
    }

    const cosmosContainer = getCosmosContainer(context);
    if (!cosmosContainer) {
        context.res = {
            status: 500,
            body: { error: 'Error de configuración del servidor: No se pudo conectar a la base de datos.' }
        };
        return;
    }

    try {
        const surveyData = req.body;

        if (!surveyData || typeof surveyData !== 'object') {
            context.res = {
                status: 400,
                body: { error: 'Cuerpo de la solicitud inválido. Se esperaba un objeto JSON.' }
            };
            return;
        }

        const { surveyId, responses, metadata, timestamp } = surveyData;

        // Validaciones básicas de los datos de entrada
        if (surveyId !== 'encuesta_bienestar_aura_v1') {
            context.res = {
                status: 400,
                body: { error: 'Tipo de encuesta inválido para este endpoint. Se esperaba encuesta_bienestar_aura_v1.' }
            };
            return;
        }

        if (!responses || typeof responses !== 'object' || Object.keys(responses).length === 0) {
            context.res = {
                status: 400,
                body: { error: 'Datos de respuestas inválidos o vacíos.' }
            };
            return;
        }
        
        // Crear el documento a guardar
        const documentToSave = {
            id: `${timestamp || new Date().toISOString()}-${surveyId}-${Math.random().toString(36).substr(2, 9)}`, // ID único más descriptivo
            surveyId,
            responses,
            metadata: metadata || { userAgent: context.req.headers['user-agent'], language: context.req.headers['accept-language']?.split(',')[0] },
            timestamp: timestamp || new Date().toISOString(),
            processedAt: new Date().toISOString(), // Timestamp del servidor
            _partitionKey: surveyId // Asumiendo que surveyId es tu clave de partición
        };
        
        context.log(`Intentando guardar documento con ID: ${documentToSave.id}`);
        const { resource: createdItem } = await cosmosContainer.items.create(documentToSave);
        
        if (createdItem) {
            context.log(`Datos de encuesta guardados en Cosmos DB con ID: ${createdItem.id}`);
            context.res = {
                status: 201, // 201 Created es más apropiado para POST exitosos que crean un recurso
                body: { 
                    success: true, 
                    id: createdItem.id,
                    message: 'Datos de encuesta recibidos y guardados exitosamente.' 
                }
            };
        } else {
            throw new Error('La creación del item en Cosmos DB no devolvió un recurso.');
        }

    } catch (error) {
        context.log.error('Error procesando la encuesta:', error.message);
        if (error.stack) {
            context.log.error('Stack trace:', error.stack);
        }
        if (error.code) {
             context.log.error('Código de error de Cosmos DB:', error.code);
        }

        context.res = {
            status: 500,
            body: { 
                error: 'Error interno del servidor al procesar la encuesta.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined // No exponer detalles sensibles en producción
            }
        };
    }
};