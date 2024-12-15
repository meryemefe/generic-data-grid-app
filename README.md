# **FlexiGrid**

FlexiGrid is a dynamic data management application that allows users to create, edit, and manage datasets. With support
for CSV imports and manual data modeling, FlexiGrid provides an intuitive interface for handling datasets. It
uses client-server architecture to handle large datasets efficiently with advanced filtering and sorting capabilities.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

---

## **Features**

- **Dynamic Data Models**: Create data models manually or import CSV files.
- **Schema Inference**: Automatically infer field types (e.g., text, number, date) from CSV files.
- **Custom DataGrid**: Powerful client-server DataGrid with:
    - Advanced filtering (`contains`, `equals`, `inRange`, etc.)
    - Pagination
    - Sorting
- **Data Management**: Add, edit, delete data within datasets.
- **Real-Time Updates**: Reflect changes immediately in the UI.
- **User-Friendly Interface**: Built with Material UI for a clean and intuitive user experience.

---

## **Tech Stack**

### **Frontend**

- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/) for UI components
- [AG-Grid Enterprise](https://www.ag-grid.com/) for DataGrid
- [Vite](https://vitejs.dev/) for fast development and build tooling

### **Backend**

- [Express](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) as the database
- [Multer](https://github.com/expressjs/multer) for handling file uploads

### **Containerization**

- [Docker](https://www.docker.com/) for containerized deployment

---

## **Setup and Installation**

### **Prerequisites**

1. [Node.js](https://nodejs.org/) (v16+)
2. [Docker](https://www.docker.com/) and Docker Compose
3. [MongoDB](https://www.mongodb.com/) (optional if not using Docker)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/meryemefe/flexigrid.git
   cd flexigrid
    ```

2. [Optional] To run the application without Docker:
    ```bash
    # Install backend dependencies
    cd backend
    npm install
    npm run dev
    
    # Install frontend dependencies
    cd ../frontend
    npm install
    npm run dev
    ```

3. To run the application with Docker:
    ```bash
    docker-compose up --build
    ```

4. Open your browser:
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend: [http://localhost:8080](http://localhost:8080)

## **Usage**

1. Creating Models
    - Navigate to the "Create or Import Model" page.
    - For manual creation:
        - Define model fields with names and types (text, number, or date).
    - For CSV imports:
        - Upload a CSV file to generate a model schema and populate data automatically.
2. Managing Data
    - Double-click on a model to view its data.
    - Use the DataGrid to:
        - Filter rows with advanced conditions (e.g., contains, equals, greater than).
        - Sort by any column.
        - Add new data, edit or delete existing data.

## **Future Enhancements**

FlexiGrid is designed with scalability in mind. Potential future improvements include:

- Supporting additional data types like boolean, double, and clob.
- Adding field validation (e.g., required, unique).
- Implementing dataset level authorization and access control.
