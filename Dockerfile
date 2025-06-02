# Use official Node.js LTS image
FROM node:18

# Create and set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app files
COPY . .

# Expose the application port (update if different)
EXPOSE 3500

# Command to run the application
CMD ["node", "index.js"]
