import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { createGenericData } from "../utils/api.ts";

export default function DataCreatePage() {
    const {name} = useParams<{ name: string }>();
    const navigate = useNavigate();
    const {state} = useLocation();
    const fieldTypes = state?.columns || {}; // Field types passed via navigation state
    const [data, setData] = useState<Record<string, any>>({});

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (key: string, value: any) => {
        setData({...data, [key]: value});
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await createGenericData(name as string, data);
            navigate(`/models/${name}`); // Redirect to the data grid after saving
        } catch (error) {
            console.error("Error saving new row:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderField = (key: string) => {
        const type = fieldTypes[key]?.type || "text";

        switch (type) {
            case "number":
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={data[key] || ""}
                        onChange={(e) =>
                            handleInputChange(key, e.target.value === "" ? null : Number(e.target.value))
                        }
                    />
                );
            case "date":
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={data[key] ? dayjs(data[key]) : null}
                            onChange={(newValue) =>
                                handleInputChange(key, newValue ? newValue.toISOString() : null)
                            }
                        />
                    </LocalizationProvider>
                );
            default:
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={data[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                );
        }
    };

    return (
        <Container className={"main-content"}>
            <Paper elevation={3} sx={{padding: "20px", margin: "20px"}}>
                <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={() => navigate(-1)} sx={{mr: 1}}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h4" align="center" flexGrow={1}>
                        Create New Data for Model: {name}
                    </Typography>
                </Box>
                <Table>
                    <TableBody>
                        {Object.entries(fieldTypes).map(([key]) => (
                            <TableRow key={key}>
                                <TableCell>
                                    <strong>{key}</strong>
                                </TableCell>
                                <TableCell>{renderField(key)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box mt={2} textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Confirm Save</DialogTitle>
                    <DialogContent>
                        Are you sure you want to save this new data?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
}
