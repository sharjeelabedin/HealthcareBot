# Dockerfile
 
# Use an existing node alpine image as a base image.
FROM node:16-alpine
 
# set working directory
WORKDIR /app
#USER root
# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./

RUN npm install --force
#RUN npm install react-scripts@3.4.1 -g --silent
RUN chown -R node:node /app/
# add app
COPY . .
 
# Expose the port.
EXPOSE 3000
 
# Run the application.
CMD ["npm", "start"]
