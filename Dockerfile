FROM node:20 AS build

WORKDIR /api

COPY . .

RUN npm install \
    && npm run build \
    && cd build \
    && npm ci --omit="dev"


FROM node:20-alpine as prod

WORKDIR /api

COPY --from=build /api/build/ /api/
COPY --from=build /api/.docker/ /api/.docker

RUN npm install

EXPOSE 3333

USER node

ENTRYPOINT ["./.docker/entrypoint.sh"]
