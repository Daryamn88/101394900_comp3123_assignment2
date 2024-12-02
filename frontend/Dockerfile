# Use Node.js for building the React app
FROM node:20 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci # Prefer npm ci to ensure a clean and consistent install

# Copy the entire frontend codebase
COPY . .

# Build the React app
ARG REACT_APP_API_BASE_URL=http://localhost:3006
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the built React app to Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
