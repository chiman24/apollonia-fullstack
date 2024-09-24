# Dockerfile for Node.js Backend
# 1. Use an official Node.js runtime as a parent image
FROM node:16

# 2. Set the working directory in the container to /server
WORKDIR /server

# 3. Copy the package.json and package-lock.json files to the container
COPY ./server/package*.json ./

# 4. Install any needed dependencies for the backend
RUN npm install --production

# 5. Copy the rest of the backend code into the container
COPY ./server/ .

# 6. Expose the port that the backend listens on
EXPOSE 5001

# 7. Define the command to run your app
CMD ["npm", "start"]
