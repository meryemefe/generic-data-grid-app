import { useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Tab,
    Paper,
    Container,
    CircularProgress,
    Alert,
    IconButton,
    MenuItem,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { createModel, importModel } from "../utils/api.ts";
import FileUploader from "../components/FileUploader.tsx";

const COLUMN_TYPES = ["text", "number", "date"];

export default function CreateOrImportModel() {
    const {state} = useLocation();
    const defaultTab = state?.tab || "1";

    const [tabIndex, setTabIndex] = useState(defaultTab);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [modelName, setModelName] = useState("");
    const [fields, setFields] = useState<{ name: string; type: string }[]>([
        {name: "", type: "text"},
    ]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
        setMessage(null);
        setError(null);
    };

    const handleCreateModel = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);

        try {
            if (!modelName || fields.length === 0 || fields.some((field) => !field.name || !field.type)) {
                setError("Please provide a model name and valid fields.");
                setLoading(false);
                return;
            }

            const response = await createModel(modelName, fields);
            setMessage(`Model "${response.name}" created successfully!`);
        } catch (err: any) {
            setError(`Error creating model: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleImportModel = async () => {
        if (!file || !modelName) {
            setError("Model name and file are required.");
            return;
        }

        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await importModel(modelName, file);
            setMessage(`Model "${response.modelName}" created and data imported successfully!`);
            setFile(null);
        } catch (err: any) {
            setError(`Error importing model: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddField = () => {
        setFields([...fields, {name: "", type: "text"}]);
    };

    const handleFieldChange = (index: number, key: string, value: string) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? {...field, [key]: value} : field
        );
        setFields(updatedFields);
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    return (
        <Container className={"main-content"}>
            <Typography variant="h4" align="center" gutterBottom>
                Create or Import Model
            </Typography>

            <Paper elevation={3} sx={{padding: "20px", marginTop: "20px"}}>
                <TabContext value={tabIndex}>
                    <TabList onChange={handleTabChange} centered>
                        <Tab label="Import Model from CSV" value="1"/>
                        <Tab label="Create Model Manually" value="2"/>
                    </TabList>

                    {/* Import Model Tab */}
                    <TabPanel value="1">
                        <Typography variant="h6" gutterBottom>
                            Import Model from CSV
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                maxWidth: "600px",
                                margin: "0 auto",
                            }}
                        >
                            <TextField
                                label="Model Name"
                                variant="outlined"
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                required
                            />
                            <FileUploader
                                onFileSelect={(file) => setFile(file)}
                                loading={loading}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleImportModel}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24}/> : "Import File"}
                            </Button>
                        </Box>
                    </TabPanel>

                    {/* Create Model Manually Tab */}
                    <TabPanel value="2">
                        <Typography variant="h6" gutterBottom>
                            Create New Model
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleCreateModel}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                maxWidth: "600px",
                                margin: "0 auto",
                            }}
                        >
                            <TextField
                                label="Model Name"
                                variant="outlined"
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                required
                            />

                            <Typography variant="h6" sx={{mt: 2}}>
                                Define Fields
                            </Typography>
                            {fields.map((field, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <TextField
                                        label={`Field Name ${index + 1}`}
                                        value={field.name}
                                        onChange={(e) =>
                                            handleFieldChange(index, "name", e.target.value)
                                        }
                                        required
                                        fullWidth
                                        sx={{flex: 2}}
                                    />
                                    <TextField
                                        select
                                        label="Field Type"
                                        value={field.type}
                                        onChange={(e) =>
                                            handleFieldChange(index, "type", e.target.value)
                                        }
                                        required
                                        sx={{flex: 1}}
                                    >
                                        {COLUMN_TYPES.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveField(index)}
                                        sx={{flexShrink: 0}}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={handleAddField}
                                disabled={fields.length >= 20}
                            >
                                Add Field
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{mt: 2}}
                            >
                                {loading ? <CircularProgress size={24}/> : "Create Model"}
                            </Button>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Paper>

            {message && (
                <Alert severity="success" sx={{marginTop: "20px"}}>
                    {message}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{marginTop: "20px"}}>
                    {error}
                </Alert>
            )}
        </Container>
    );
}
