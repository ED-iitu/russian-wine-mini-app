# Use an official Node.js image from Docker Hub
FROM node:22.15.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the app for production
RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start"]
