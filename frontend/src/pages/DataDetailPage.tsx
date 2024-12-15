import { useLocation, useParams } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";

export default function DataDetailPage() {
    const {name} = useParams<{ name: string }>();
    const {state} = useLocation();
    const data = state?.row || {}; // Row data passed via navigation state

    return (
        <Paper elevation={3} sx={{padding: "20px", margin: "20px"}}>
            <Typography variant="h4" align="center" gutterBottom>
                Details for Model: {name}
            </Typography>
            <Table>
                <TableBody>
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>
                                <strong>{key}</strong>
                            </TableCell>
                            <TableCell>
                                {String(value)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
