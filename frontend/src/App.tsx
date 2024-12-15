import "./App.css";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateOrImportModel from "./pages/CreateOrImportModel.tsx";
import DataDetailPage from "./pages/DataDetailPage.tsx";
import ModelsPage from "./pages/ModelsPage.tsx";
import HomePage from "./pages/Homepage.tsx";
import DataPage from "./pages/DataPage.tsx";

function App() {

    return (
        <Router>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden",
                }}>
                {/* Fixed Header */}
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" sx={{flexGrow: 1}} textAlign={"left"}>
                            FlexiGrid
                        </Typography>
                        <nav>
                            <Link to="/" style={{margin: "0 10px", color: "white", textDecoration: "none"}}>
                                Home
                            </Link>
                            <Link to="/models" style={{margin: "0 10px", color: "white", textDecoration: "none"}}>
                                Data Models
                            </Link>
                            <Link to="/about" style={{margin: "0 10px", color: "white", textDecoration: "none"}}>
                                About
                            </Link>
                        </nav>
                    </Toolbar>
                </AppBar>

                {/* Define Routes */}
                <div
                    style={{
                        flex: 1,
                        marginTop: "64px",
                        marginBottom: "40px",
                        overflow: "auto", // Make this area scrollable
                    }}>
                    <Container sx={{marginTop: 8}}>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/models" element={<ModelsPage/>}/>
                            <Route path="/create-or-import-model" element={<CreateOrImportModel/>}/>
                            <Route path="/models/:name" element={<DataPage/>}/>
                            <Route path="/models/:name/details/:id" element={<DataDetailPage/>}/>
                        </Routes>
                    </Container>
                </div>
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
