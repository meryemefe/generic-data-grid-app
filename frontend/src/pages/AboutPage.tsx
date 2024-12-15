import {
    Typography,
    Box,
    Container,
    Paper,
    Link,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function AboutPage() {
    return (
        <div>
            {/* Hero Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                        paddingTop: "10vh",
                    }}
                >
                    About FlexiGrid
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        maxWidth: "600px",
                        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    Dynamic data management at your fingertips.
                </Typography>
            </Box>

            {/* Content Section */}
            <Container sx={{marginTop: "64px", marginBottom: "64px"}}>
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
                        Tech Stack
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "React + TypeScript",
                                description:
                                    "Frontend developed using React with TypeScript for a robust and intuitive UI.",
                                image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
                            },
                            {
                                title: "Ag-Grid Enterprise",
                                description:
                                    "Advanced data grid for large datasets, providing server-side data sourcing.",
                                image: "https://blog.ag-grid.com/content/images/2021/11/1920x327-AG-Grid-logo-dark-writing-transparent-bg.png",
                            },
                            {
                                title: "Material UI",
                                description:
                                    "Designed with Material UI for a sleek and responsive interface.",
                                image: "https://v4.mui.com/static/logo.png",
                            },
                            {
                                title: "Express + TypeScript",
                                description:
                                    "Backend API built with Express.js and TypeScript for type safety and scalability.",
                                image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
                            },
                            {
                                title: "MongoDB",
                                description:
                                    "A flexible, NoSQL database for dynamic and scalable storage.",
                                image: "https://www.svgrepo.com/show/331488/mongodb.svg",
                            },
                            {
                                title: "Docker",
                                description:
                                    "Containerized deployment using Docker for portability and simplicity.",
                                image: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
                            },
                        ].map((tech, index) => (
                            <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        p: 2,
                                        borderRadius: "12px",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                                        },
                                        height: "80%",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={tech.image}
                                        alt={tech.title}
                                        sx={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "contain",
                                            mb: 2,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#1976d2",
                                            }}
                                        >
                                            {tech.title}
                                        </Typography>
                                        <Typography sx={{color: "#555"}}>
                                            {tech.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                            color: "#1976d2",
                            paddingTop: "32px",
                        }}
                    >
                        Vision
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            textAlign: "justify",
                            lineHeight: 1.8,
                            color: "#555",
                        }}
                    >
                        FlexiGrid was created with a vision to enable dynamic collections
                        that can be generated either by importing CSV files or manual
                        creation. CSV imports automatically extract the schema from rows,
                        while manual creation offers a user interface to define fields and
                        their types effortlessly.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            textAlign: "justify",
                            lineHeight: 1.8,
                            color: "#555",
                        }}
                    >
                        To support large datasets, FlexiGrid leverages a client-server
                        datasource approach with Ag-Grid Enterprise, ensuring that even
                        large datasets are handled efficiently without overloading the
                        client.
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                            color: "#1976d2",
                        }}
                    >
                        Future Enhancements
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            textAlign: "justify",
                            lineHeight: 1.8,
                            color: "#555",
                        }}
                    >
                        FlexiGrid has been designed with extensibility in mind. Here are a
                        few future enhancements that can be implemented:
                        <ul>
                            <li>
                                Support for additional data types such as boolean, double,
                                and clob fields.
                            </li>
                            <li>
                                Configurable field options like required/not-null, default
                                values, and constraints.
                            </li>
                            <li>
                                Advanced filtering options and integrations with external
                                data sources.
                            </li>
                        </ul>
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                            color: "#1976d2",
                        }}
                    >
                        About Me
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            textAlign: "justify",
                            color: "#555",
                            lineHeight: 1.8,
                        }}
                    >
                        Hi! I'm Meryem Efe, a master's student in the Information Systems
                        department at the Technical University of Munich (TUM). I built
                        FlexiGrid to showcase my skills in full-stack web development and
                        database management using modern technologies like React, Express,
                        and MongoDB. Despite working solo on this project, I followed
                        professional practices like meaningful commits to simulate a
                        collaborative development environment. This demonstrates my
                        teamwork-oriented mindset and attention to detail.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: "#555",
                        }}
                    >
                        Contact:{" "}
                        <Link href="mailto:meryemefe.cs@gmail.com" color="primary">
                            meryemefe.cs@gmail.com
                        </Link>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: "#555",
                        }}
                    >
                        GitHub Repository:{" "}
                        <Link
                            href="https://github.com/meryemefe/generic-data-grid-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            FlexiGrid GitHub
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </div>
    );
}
