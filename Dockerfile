# build
FROM node:24-slim
WORKDIR /app
COPY package*.json ./

RUN apt-get update
RUN npm ci

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "./dist/server/entry.mjs" ]
