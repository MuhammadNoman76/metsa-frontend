FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
