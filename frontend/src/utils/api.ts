const API_URL = import.meta.env.VITE_API_URL as string;

export async function createModel(name: string, fields: string[]): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/models`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, fields}),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Model creation error:", error);
        throw error;
    }
}

export async function importModel(modelName: string, file: File): Promise<any> {
    console.log("API URL", API_URL);
    const formData = new FormData();
    formData.append("modelName", modelName);
    formData.append("file", file);

    try {
        const response = await fetch(`${API_URL}/models/import`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Model import error:", error);
        throw error;
    }
}