import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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
}

export const GenericDataGrid = ({columns, onLoadData, onRowDoubleClick}: GenericDataGridProps) => {

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


    return (
        <div className="ag-theme-alpine" style={{height: "500px", width: "100%", margin: "0 auto"}}>
            <AgGridReact
                theme={"legacy"}
                columnDefs={columns.map((column) => ({
                    headerName: column,
                    field: column,
                    sortable: true,
                    filter: "agTextColumnFilter", // TODO: check filtering
                }))}
                rowModelType={"serverSide"}
                pagination={true}
                paginationPageSize={20}
                onGridReady={onGridReady}
                onRowDoubleClicked={(event) => onRowDoubleClick && onRowDoubleClick(event.data)}
            />
        </div>
    );
};
