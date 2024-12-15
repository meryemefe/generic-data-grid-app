import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { updateGenericData } from "../utils/api.ts";

export default function DataDetailPage() {
    const {name} = useParams<{ name: string }>();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {_id, ...initialData} = state?.row || {}; // Row data passed via navigation state
    const fieldTypes = state?.columns || {}; // Field types passed via navigation state

    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (key: string, value: any) => {
        setData({...data, [key]: value});
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedData = await updateGenericData(name as string, _id, data);
            setData(updatedData);
            setOpen(false);
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderField = (key: string, value: any) => {
        const type = fieldTypes[key]?.type || "text";

        if (key === "_id") {
            return <Typography>{value}</Typography>; // _id should not be editable
        }

        switch (type) {
            case "number":
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={value || ""}
                        onChange={(e) =>
                            handleInputChange(key, e.target.value === "" ? null : Number(e.target.value))
                        }
                    />
                );
            case "date":
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={value ? dayjs(value) : null}
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
                        value={value || ""}
                        onChange={(e) =>
                            handleInputChange(key, e.target.value)
                        }
                    />
                );
        }
    };

    return (
        <Paper elevation={3} sx={{padding: "20px", margin: "20px"}}>
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => navigate(-1)} sx={{mr: 1}}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h4" align="center" flexGrow={1}>
                    Details for Model: {name}
                </Typography>
            </Box>
            <Table>
                <TableBody>
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>
                                <strong>{key}</strong>
                            </TableCell>
                            <TableCell>{renderField(key, value)}</TableCell>
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
                    Save Changes
                </Button>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    Are you sure you want to save the changes?
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
    );
}
