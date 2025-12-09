# -----------------------
# 1. Builder Stage
# -----------------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install only production dependencies if using npm/yarn/pnpm
RUN npm install

# Copy rest of app
COPY . .

# Build Next.js app
RUN npm run build

# -----------------------
# 2. Runner Stage
# -----------------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Don’t run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary build output from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

USER nextjs

# Expose app port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
