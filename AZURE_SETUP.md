# Configuración de Azure para AURA - Encuesta de Bienestar

## Resumen

La nueva encuesta de bienestar de AURA está configurada para enviar datos a Azure como destino principal, con AWS como fallback. Esta configuración permite una mejor segmentación de datos y análisis específico por tipo de encuesta.

## Variables de Entorno Necesarias

### Para Desarrollo Local

Crea un archivo `.env` en la raíz del proyecto con:

```env
# Endpoint existente de AWS (para encuestas profesionales)
PUBLIC_SURVEY_ENDPOINT=https://oyvtmor2xd.execute-api.us-east-1.amazonaws.com/survey

# Nuevo endpoint de Azure (para encuestas de bienestar)
PUBLIC_AZURE_SURVEY_ENDPOINT=https://tu-function-app.azurewebsites.net/api/wellness-survey
```

### Para Producción

Configura las variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.):

- `PUBLIC_SURVEY_ENDPOINT`: Endpoint de AWS existente
- `PUBLIC_AZURE_SURVEY_ENDPOINT`: Endpoint de Azure para bienestar

## Estructura de Datos Enviados

### Encuesta de Bienestar (Azure)

```json
{
  "surveyId": "encuesta_bienestar_aura_v1",
  "responses": {
    "nombre": "string",
    "edad": "number",
    "email": "string",
    "ocupacion": "string",
    "needsInterests": "string",
    "wellnessGoals": "string",
    "physicalActivityType": ["array"],
    "activityDuration": "number",
    "activityIntensity": "string",
    "moodReport": "string",
    "stressLevel": "number",
    "sleepQuality": "string",
    "spiritualInterests": ["array"],
    "contentPreferences": ["array"],
    "feedback": "string",
    "dailyRoutine": "string"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "metadata": {
    "userAgent": "string",
    "language": "string",
    "surveyType": "wellness"
  }
}
```

## Configuración Recomendada de Azure

### 1. Crear Azure Function App

1. Ve al Portal de Azure
2. Crear recurso > Function App
3. Configurar:
   - Runtime: Node.js 18+
   - Hosting: Consumption Plan
   - Storage: Crear nueva cuenta

### 2. Configurar Azure Cosmos DB (Recomendado)

1. Crear recurso > Azure Cosmos DB
2. Seleccionar Core (SQL) API
3. Configurar:
   - Nombre de la base de datos: `aura-wellness`
   - Contenedor: `survey-responses`
   - Partition key: `/surveyId`

### 3. Function Code Ejemplo

```javascript
const { CosmosClient } = require('@azure/cosmos');

const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const database = cosmosClient.database('aura-wellness');
const container = database.container('survey-responses');

module.exports = async function (context, req) {
    context.log('Processing wellness survey submission');

    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            body: { error: 'Method not allowed' }
        };
        return;
    }

    try {
        const surveyData = req.body;
        
        // Validar que es una encuesta de bienestar
        if (surveyData.surveyId !== 'encuesta_bienestar_aura_v1') {
            context.res = {
                status: 400,
                body: { error: 'Invalid survey type for this endpoint' }
            };
            return;
        }

        // Agregar ID único y timestamp de procesamiento
        const document = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...surveyData,
            processedAt: new Date().toISOString()
        };

        // Guardar en Cosmos DB
        const { resource } = await container.items.create(document);
        
        context.res = {
            status: 200,
            body: { 
                success: true, 
                id: resource.id,
                message: 'Survey saved successfully' 
            }
        };

    } catch (error) {
        context.log.error('Error processing survey:', error);
        context.res = {
            status: 500,
            body: { error: 'Internal server error' }
        };
    }
};
```

### 4. Configurar CORS

En la Function App, ve a:
- API > CORS
- Agregar tu dominio de producción
- Para desarrollo: `http://localhost:4321`

## Fallback a AWS

Si Azure no está disponible, el sistema automáticamente envía los datos a AWS con metadata adicional indicando que fue un fallback desde Azure.

## Monitoreo y Análisis

### Azure Application Insights

Configurar Application Insights para monitorear:
- Número de submissions
- Errores de procesamiento
- Tiempos de respuesta
- Patrones de uso por demografía

### Queries Útiles

```kusto
// Submissions por día
requests
| where name == "wellness-survey"
| where success == true
| summarize count() by bin(timestamp, 1d)

// Errores más comunes
exceptions
| where cloud_RoleName == "wellness-survey-function"
| summarize count() by type, outerMessage
```

## Backup y Recuperación

1. **Backup automático**: Cosmos DB tiene backup automático habilitado por defecto
2. **Backup manual**: Exportar datos usando Azure Data Factory
3. **Replicación**: Configurar replicación en múltiples regiones si es necesario

## Costos Estimados

### Development/Testing
- Function App: ~$0-5/mes
- Cosmos DB: ~$5-25/mes (Request Units bajo)
- Application Insights: ~$0-10/mes

### Producción (1000 respuestas/mes)
- Function App: ~$10-20/mes
- Cosmos DB: ~$25-50/mes
- Application Insights: ~$20-40/mes

## Siguiente Pasos

1. [ ] Crear Function App en Azure
2. [ ] Configurar Cosmos DB
3. [ ] Desplegar function code
4. [ ] Configurar variables de entorno
5. [ ] Probar endpoint con datos de prueba
6. [ ] Configurar monitoreo
7. [ ] Documentar proceso de análisis de datos 