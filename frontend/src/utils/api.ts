const API_URL = import.meta.env.VITE_API_URL as string;

export async function createModel(
    name: string,
    fields: { name: string; type: string }[]
): Promise<any> {
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

export async function listModels(
    params: { page?: number; pageSize?: number; sortField?: string; sortOrder?: string; filter?: any }
): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/models/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching models:", error);
        throw error;
    }
}

export async function deleteModel(name: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/models/${name}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting model:", error);
        throw error;
    }
}


export async function listGenericData(
    modelName: string,
    params: { page?: number; pageSize?: number; sortField?: string; sortOrder?: string; filter?: any }
): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/generic/${modelName}/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching model data:", error);
        throw error;
    }
}


export async function deleteGenericData(modelName: string, id: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/generic/${modelName}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting model data:", error);
        throw error;
    }
}

export async function updateGenericData(modelName: string, id: string, data: any): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/generic/${modelName}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating model data:", error);
        throw error;
    }
}

export async function createGenericData(modelName: string, data: any): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/generic/${modelName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}
