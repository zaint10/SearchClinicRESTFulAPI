# Use an official Node.js image as the base image
FROM node:16.15.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5000
# Specify the command to run when the container starts
CMD [ "npm", "run", "start" ]