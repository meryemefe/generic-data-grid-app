import { GenericDataGrid } from "./GenericDataGrid.tsx";

export default function DataModels() {

    // create temp dataModels, we are going to take them from backend later, its fields should be id, name, fields, and created_at
    const dataModels = [
        {
            id: 1,
            name: "Model 1",
            created_at: "2022-01-01"
        },
        {
            id: 2,
            name: "Model 2",
            created_at: "2022-01-02"
        },
        {
            id: 3,
            name: "Model 3",
            created_at: "2022-01-03"
        }
    ];
    return (
        <>
            <GenericDataGrid columns={["id", "name", "created_at"]} data={dataModels}/>
        </>

    );
}
