# Use a base Node.js image
FROM node:20.13.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the server will listen on
EXPOSE 8080

# Initialize the database and start the server
CMD ["npm", "run", "start"]

