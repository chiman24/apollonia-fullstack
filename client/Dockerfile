# Dockerfile for React Frontend
# 1. Use the official Node.js image to build the React app
FROM node:16 as build

# 2. Set the working directory in the container to /client
WORKDIR /client

# 3. Copy the package.json and package-lock.json files to the container
COPY ./client/package*.json ./

# 4. Install any needed dependencies
RUN npm install

# 5. Copy the rest of the client code into the container
COPY ./client/ .

# 6. Build the React app for production
RUN npm run build

# 7. Use an Nginx image to serve the build
FROM nginx:alpine

# 8. Copy the build files from the previous image stage to Nginx
COPY --from=build /client/build /usr/share/nginx/html

# 9. Expose the port Nginx will run on
EXPOSE 80

# 10. Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
