# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.6.1

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=production

WORKDIR /app


# Build
FROM base as build

COPY --link package.json package-lock.json .
RUN npm install --production=false

COPY --link . .

RUN npm run build-only
RUN npm prune


# Run
FROM base

ENV PORT=3000

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY server /app/server

CMD [ "node", "server/index.mjs" ]
