# Use Node base image (includes npm already)
FROM node:alpine

# Create app directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
