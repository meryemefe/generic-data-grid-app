import { Typography, Button, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function HomePage() {
    return (
        <div
            style={{
                padding: 0,
                margin: 0,
                paddingBottom: "10vh",
            }}
        >
            {/* Hero Section */}
            <Box
                sx={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "linear-gradient(45deg, #1976d2 50%, #90caf9 100%)",
                    color: "white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Welcome to FlexiGrid
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        maxWidth: "600px",
                        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    Explore, Filter, and Manage Your Data Seamlessly
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: "white",
                        color: "#1565c0",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        "&:hover": {backgroundColor: "#f5f5f5"},
                    }}
                >
                    Get Started
                </Button>
            </Box>

            {/* Features Section */}
            <Box
                sx={{
                    marginTop: "64px",
                    marginBottom: "64px",
                    paddingX: "16px", // Adjusts padding for a no-space look
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        padding: "32px",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            mb: 6,
                            color: "#1565c0",
                        }}
                    >
                        Features
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "Data Modeling",
                                description:
                                    "Easily create a model of your data or import a CSV file to get started.",
                                icon: "📊",
                            },
                            {
                                title: "Dynamic DataGrid",
                                description:
                                    "Easily display structured data with customizable columns and actions.",
                                icon: "📋",
                            },
                            {
                                title: "Search Functionality",
                                description:
                                    "Quickly search through your data with real-time backend integration.",
                                icon: "🔍",
                            },
                            {
                                title: "Advanced Filtering",
                                description:
                                    "Filter data with powerful options like 'contains', 'equals', and more.",
                                icon: "⚙️",
                            },
                        ].map((feature, index) => (
                            <Grid key={index} size={{xs: 12, sm: 6, md: 6}}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        backgroundColor: "#f5faff",
                                        borderRadius: "12px",
                                        transition:
                                            "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow:
                                                "0px 12px 24px rgba(0, 0, 0, 0.2)",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: "2rem",
                                            color: "#1976d2",
                                            mb: 2,
                                        }}
                                    >
                                        {feature.icon}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1,
                                            color: "#1565c0",
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography sx={{color: "#555"}}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        </div>
    );
}
