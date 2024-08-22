FROM node:18-alpine  # Use a Node.js base image
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]  # Run your React app
