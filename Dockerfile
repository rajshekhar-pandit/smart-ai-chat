FROM node:18-alpine

WORKDIR /app

# Copy root package.json
COPY package.json package-lock.json ./

# Copy backend
COPY backend ./backend

# Install dependencies
RUN npm install && npm --prefix backend install

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "--prefix", "backend", "start"]
