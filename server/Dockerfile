# 1. Use an official Node.js image as base
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Build TypeScript code
RUN npm run build

# 7. Expose port (choose the one your server uses, like 3000)
EXPOSE 3000

# 8. Command to run the server
CMD ["node", "dist/server.js"]
