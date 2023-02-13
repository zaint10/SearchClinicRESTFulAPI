# Use an official Node.js image as the base image
FROM node:16.15.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./package.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Specify the command to run when the container starts
RUN npm run build

# Use the official nginx image as the base image
FROM nginx

# This exposes port 3000 so that it can be mapped to a host machine port and accessed from the host machine.
EXPOSE 3000

# Copy the default.conf file to the nginx conf.d directory
# This copies the default.conf file, which contains the nginx configuration, to the /etc/nginx/conf.d/ directory in the container.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the build files from the builder stage to the nginx html directory
# This copies the build files generated in the builder stage to the /usr/share/nginx/html directory in the container, which is the default directory for serving static files with nginx.
COPY --from=builder /app/build /usr/share/nginx/html
