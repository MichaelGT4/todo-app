FROM node:16.20.0-bullseye-slim as base

WORKDIR /src
COPY . /

RUN npm install

EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "start"]