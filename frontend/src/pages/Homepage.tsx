import { Typography, Button, Container, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function HomePage() {
    return (
        <div>

            {/* Hero Section */}
            <Box
                sx={{
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h2">Welcome to FlexiGrid</Typography>
                <Typography variant="h6">Explore, Filter, and Manage Your Data Seamlessly</Typography>
                <Button variant="contained">Get Started</Button>
            </Box>

            {/* Main Content Section */}
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Features
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Paper elevation={3} sx={{p: 2}}>
                            <Typography variant="h6">Data Modeling</Typography>
                            <Typography>
                                Easily create a model of your data or import a CSV file to get started.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper elevation={3} sx={{p: 2}}>
                            <Typography variant="h6">Dynamic DataGrid</Typography>
                            <Typography>
                                Easily display structured data with customizable columns and actions.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper elevation={3} sx={{p: 2}}>
                            <Typography variant="h6">Search Functionality</Typography>
                            <Typography>
                                Quickly search through your data with real-time backend integration.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper elevation={3} sx={{p: 2}}>
                            <Typography variant="h6">Advanced Filtering</Typography>
                            <Typography>
                                Filter data with powerful options like "contains", "equals", and more.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
