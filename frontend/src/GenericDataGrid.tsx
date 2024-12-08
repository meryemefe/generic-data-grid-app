import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Basic AgGrid component that takes in columns and data as props
export const GenericDataGrid = (props: { columns: string[], data: any[] }) => {
    return (
        <div className="ag-theme-quartz" style={{
            height: "500px",
            maxWidth: "90%",
            margin: "0 auto",
            paddingTop: "100px"
        }}>
            <AgGridReact
                columnDefs={props.columns.map((column) => ({
                    headerName: column,
                    field: column,
                    sortable: true,
                    filter: true,
                }))}
                rowData={props.data}
                pagination={true}
                paginationPageSize={20}
            />
        </div>
    )
}