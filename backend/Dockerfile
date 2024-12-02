# Use Node.js base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm ci # Prefer npm ci for consistency

# Copy the application code
COPY . .

# Expose the backend port
EXPOSE 3006

# Define environment variables for production
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongo:27017/employeeManagerDB

# Start the application
CMD ["npm", "start"]
