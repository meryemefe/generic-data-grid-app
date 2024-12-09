import React, { useState } from "react";
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
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createModel, importModel } from "./utils/api";
import FileUploader from "./components/FileUploader";

export default function CreateOrImportModel() {
    const [tabIndex, setTabIndex] = useState("1");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [modelName, setModelName] = useState("");

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
            const formData = new FormData(event.currentTarget);
            const modelName = formData.get("name") as string;
            const fields = (formData.get("fields") as string).split(",").map((f) => f.trim());

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

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Create or Import Model
            </Typography>

            <Paper elevation={3} sx={{padding: "20px", marginTop: "20px"}}>
                <TabContext value={tabIndex}>
                    <TabList onChange={handleTabChange} centered>
                        <Tab label="Import Model from CSV" value="1"/>
                        <Tab label="Create Model Manually" value="2"/>
                    </TabList>

                    <TabPanel value="1">
                        <Typography variant="h6" gutterBottom>
                            Import Model from CSV
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                maxWidth: "500px",
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
                                maxWidth: "500px",
                                margin: "0 auto",
                            }}
                        >
                            <TextField label="Model Name" name="name" variant="outlined" required/>
                            <TextField
                                label="Fields (comma-separated)"
                                name="fields"
                                variant="outlined"
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
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