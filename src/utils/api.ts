/**
 * Simulates sending survey data to a backend.
 * Replace with actual API call.
 * @param surveyId The ID of the survey being submitted.
 * @param formData The collected survey data.
 */
export const submitSurvey = async (surveyId: string, formData: Record<string, any>): Promise<void> => {
    console.log(`Simulating submission for survey: ${surveyId}`);
    console.log("Data:", JSON.stringify(formData, null, 2));

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Descomentar para probar errores (e.g., 10% chance of failure)
    // if (Math.random() < 0.1) {
    //    console.error("Simulated API Error: Failed to submit.");
    //    throw new Error("Simulated network or server error during submission.");
    // }

    console.log("Survey submission successful (simulated).");
    // No hacemos nada más, simplemente dejamos que la promesa se resuelva
}; 