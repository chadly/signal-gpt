FROM node:20.0.0-buster as build
WORKDIR /app

COPY .eslintrc.json .
COPY next-env.d.ts .
COPY next.config.js .
COPY package.json .
COPY package-lock.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .

COPY src ./src

RUN npm ci
RUN npm run build

CMD ["npm", "run", "serve"]
