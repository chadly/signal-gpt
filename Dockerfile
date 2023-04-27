FROM node:20.0.0-buster as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src ./src

RUN npm ci --force
RUN npm run build

FROM node:20.0.0-alpine
WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/dist .
COPY --from=build /app/node_modules node_modules

CMD ["node", "index.js"]
