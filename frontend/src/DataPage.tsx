import { useState } from "react";
import { useParams } from "react-router-dom";
import { GenericDataGrid } from "./GenericDataGrid";
import { Typography } from "@mui/material";
import { listGenericData } from "./utils/api";

export default function DataPage() {
    const {name} = useParams<{ name: string }>();
    const [columns, setColumns] = useState<string[]>([]);

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
        if (columns.length === 0 && response.fields?.length > 0) {
            setColumns(response.fields);
        }

        return {
            data: response.data || [],
            total: response.total || 0,
        };
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Data for Model: {name}
            </Typography>
            <GenericDataGrid columns={columns} onLoadData={loadData} onRowDoubleClick={() => {
                console.log("Row double-clicked");
            }}/>
        </div>
    );
}
