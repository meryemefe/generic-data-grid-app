import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GenericDataGrid } from "../components/GenericDataGrid.tsx";
import { useNavigate } from "react-router-dom";
import { deleteModel, listModels } from "../utils/api.ts";

export default function ModelsPage() {
    const navigate = useNavigate();
    const columns = {name: {type: "string"}, createdAt: {type: "date"}}; // Predefined columns for models listing
    const loadModels = async ({page, pageSize, sortField, sortOrder, filter}: {
        page: number;
        pageSize: number;
        sortField?: string;
        sortOrder?: string;
        filter?: Record<string, any>;
    }) => {
        try {
            const data = await listModels({
                page,
                pageSize,
                sortField,
                sortOrder,
                filter,
            });

            return {
                data: data.models || [],
                total: data.total || 0,
            };
        } catch (error) {
            console.error("Error loading models:", error);
            return {data: [], total: 0};
        }
    };

    const handleRowDoubleClick = (row: any) => {
        navigate(`/models/${row.name}`);
    };

    const handleDelete = async (row: any) => {
        if (window.confirm(`Are you sure you want to delete model: ${row.name}?`)) {
            try {
                await deleteModel(row.name);
                console.log("Model deleted successfully.");
            } catch (error) {
                console.error("Error deleting model:", error);
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Data Models
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                You can create new models or import existing ones. Double-click on a model to view its data.
            </Typography>
            <Grid container justifyContent="center" spacing={2} sx={{marginBottom: "20px"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/create-or-import-model", {state: {tab: "1"}})}
                >
                    Import Model
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/create-or-import-model", {state: {tab: "2"}})}
                >
                    Create New Model
                </Button>

            </Grid>
            <GenericDataGrid
                columns={columns}
                onLoadData={loadModels}
                onRowDoubleClick={handleRowDoubleClick}
                onDelete={handleDelete}
                showDelete={true}
            />
        </div>
    );
}
