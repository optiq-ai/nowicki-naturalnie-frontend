# Use an official Node.js runtime as a parent image
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application (optional, can be done in a separate stage if needed for production)
# RUN pnpm run build

# Expose the port the app runs on (Vite default is 5173, but prompt mentioned 3000)
# Let's stick to Vite default 5173 for now, can be mapped in docker-compose
EXPOSE 5173

# Command to run the application in development mode
CMD ["pnpm", "run", "dev", "--host"]
