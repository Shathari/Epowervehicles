FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 4000

# Applies any pending migrations against DATABASE_URL, then starts the API.
# For a multi-instance deployment, run `npx prisma migrate deploy` as a separate
# release step instead and change this CMD to just start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/server.ts"]
