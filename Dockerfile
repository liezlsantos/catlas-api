# Install dependencies
FROM node:20-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

# Build production image
FROM dependencies as builder
RUN npm run build
EXPOSE 3000
CMD npm run start
