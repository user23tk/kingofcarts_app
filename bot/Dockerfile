# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY src ./src
COPY scripts ./scripts
RUN npm run build

# run stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY content ./content
COPY scripts ./scripts
USER node
CMD ["node", "dist/index.js"]
