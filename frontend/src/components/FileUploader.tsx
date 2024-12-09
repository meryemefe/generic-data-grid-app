import React, { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    loading?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({onFileSelect, loading = false}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
            onFileSelect(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            onFileSelect(selectedFile);
        }
    };

    return (
        <Box
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("file-input")?.click()}
            sx={{
                border: "2px dashed #aaa",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: file ? "#e8f5e9" : "#f5f5f5",
                position: "relative",
            }}
        >
            {loading ? (
                <CircularProgress/>
            ) : file ? (
                <Typography variant="body1">File: {file.name}</Typography>
            ) : (
                <>
                    <CloudUploadIcon fontSize="large" color="action"/>
                    <Typography variant="body2" color="textSecondary">
                        Drag and drop a file here, or click to select a file
                    </Typography>
                </>
            )}
            <input
                id="file-input"
                type="file"
                accept=".csv"
                style={{display: "none"}}
                onChange={handleFileSelect}
            />
        </Box>
    );
};

export default FileUploader;
