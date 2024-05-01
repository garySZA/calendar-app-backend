FROM node:20.5-alpine3.18 as dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:20.5-alpine3.18 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn add -D typescript
RUN yarn build

FROM node:20.5-alpine3.18 as production
EXPOSE 3004
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD [ "node", "dist/app.js" ]