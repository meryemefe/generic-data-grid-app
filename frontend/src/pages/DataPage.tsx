import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GenericDataGrid } from "../components/GenericDataGrid.tsx";
import { Typography } from "@mui/material";
import { deleteGenericData, listGenericData } from "../utils/api.ts";

export default function DataPage() {
    const {name} = useParams<{ name: string }>();
    const navigate = useNavigate();
    const [columns, setColumns] = useState<Record<string, { type: string }>>({}); // Updated for field types

    const loadData = async ({
                                page,
                                pageSize,
                                sortField,
                                sortOrder,
                                filter,
                            }: {
        page: number;
        pageSize: number;
        sortField?: string;
        sortOrder?: string;
        filter?: Record<string, any>;
    }) => {
        console.log("Loading data for model:", name);
        console.log("Page:", page, "PageSize:", pageSize, "SortField:", sortField, "SortOrder:", sortOrder, "Filter:", filter);
        const response = await listGenericData(name as string, {page, pageSize, sortField, sortOrder, filter});

        // Dynamically set columns based on backend fields
        if (Object.keys(columns).length === 0 && Object.keys(response.fields).length > 0) {
            setColumns(response.fields);
        }

        return {
            data: response.data || [],
            total: response.total || 0,
        };
    };

    const handleEdit = (row: any) => {
        navigate(`/models/${name}/details/${row._id}`, {state: {row}});
    };

    const handleDelete = async (row: any) => {
        if (window.confirm(`Are you sure you want to delete this row?`)) {
            try {
                await deleteGenericData(name as string, row._id);
                console.log("Row deleted successfully.");
            } catch (error) {
                console.error("Error deleting row:", error);
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Data for Model: {name}
            </Typography>
            <GenericDataGrid
                columns={columns}
                onLoadData={loadData}
                onRowDoubleClick={handleEdit}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showEdit={true}
                showDelete={true}
            />
        </div>
    );
}
