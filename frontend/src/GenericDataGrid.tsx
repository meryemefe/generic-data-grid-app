import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface GenericDataGridProps {
    columns: string[];
    onLoadData: (params: {
        page: number;
        pageSize: number;
        sortField?: string;
        sortOrder?: string;
        filter?: Record<string, any>;
    }) => Promise<{ data: any[]; total: number }>;
    onRowDoubleClick?: (row: any) => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    showEdit?: boolean;
    showDelete?: boolean;
}

export const GenericDataGrid = ({
                                    columns,
                                    onLoadData,
                                    onRowDoubleClick,
                                    onEdit,
                                    onDelete,
                                    showEdit = false,
                                    showDelete = false,
                                }: GenericDataGridProps) => {
    const datasource = {
        getRows: async (params: any) => {
            const {startRow, endRow, sortModel, filterModel} = params.request;

            const sortField = sortModel && sortModel.length > 0 ? sortModel[0].colId : undefined;
            const sortOrder = sortModel && sortModel.length > 0 ? sortModel[0].sort : undefined;

            const filter = filterModel;

            const pageSize = endRow - startRow;

            const {data, total} = await onLoadData({
                page: Math.floor(startRow / pageSize) + 1,
                pageSize,
                sortField,
                sortOrder,
                filter,
            });

            console.log(data, total);

            // re-render the grid
            params.success({
                rowData: data,
                rowCount: total,
            });
        },
    };

    const onGridReady = (params: any) => {
        params.api.setGridOption('serverSideDatasource', datasource);
    };

    const getColumnDefs = () => {
        const baseColumns = columns.map((column) => ({
            headerName: column,
            field: column,
            sortable: true,
            filter: "agTextColumnFilter",
        }));

        if (showEdit || showDelete) {
            baseColumns.push({
                headerName: "Actions",
                field: "actions",
                cellRenderer: (params: any) => (
                    <div style={{display: "flex", gap: "10px"}}>
                        {showEdit && (
                            <IconButton size="small" color="primary" onClick={() => onEdit && onEdit(params.data)}>
                                <EditIcon/>
                            </IconButton>
                        )}
                        {showDelete && (
                            <IconButton size="small" color="secondary"
                                        onClick={() => onDelete && onDelete(params.data)}>
                                <DeleteIcon/>
                            </IconButton>
                        )}
                    </div>
                ),
                sortable: false,
                filter: false,
                pinned: "right",
            });
        }

        return baseColumns;
    };

    return (
        <div
            className="ag-theme-alpine-dark"
            style={{
                height: "60vh",
                margin: "0 auto",
                paddingTop: "20px",
            }}
        >
            <AgGridReact
                theme={"legacy"}
                columnDefs={getColumnDefs()}
                rowModelType={"serverSide"}
                pagination={true}
                paginationPageSize={20}
                onGridReady={onGridReady}
                onRowDoubleClicked={(event) => onRowDoubleClick && onRowDoubleClick(event.data)}
            />
        </div>
    );
};
