import "./App.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DataModels from "./DataModels.tsx";
import HomePage from "./Homepage.tsx";

function App() {

    return (
        <Router>
            <div>
                {/* Fixed Header */}
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" sx={{flexGrow: 1}} textAlign={"left"}>
                            FlexiGrid
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/data-models">
                            Data Models
                        </Button>
                        <Button color="inherit">About</Button>
                    </Toolbar>
                </AppBar>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/data-models" element={<DataModels/>}/>
                </Routes>

                {/* Fixed Footer */}
                <Box
                    bgcolor="text.secondary"
                    py={0.5}
                    textAlign="center"
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%"
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} FlexiGrid. All rights reserved.
                    </Typography>
                </Box>
            </div>
        </Router>
    );
}

export default App;
