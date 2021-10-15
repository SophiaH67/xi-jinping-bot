FROM node:16 AS compiler
WORKDIR /app
COPY ./package* ./
ENV NODE_ENV development
RUN npm i
COPY . .
RUN ./node_modules/.bin/tsc

FROM node:16 AS runner
WORKDIR /app
COPY ./package* ./
COPY --from=compiler /app/dist/ ./dist/
ENV NODE_ENV production
RUN npm i
CMD [ "node", "dist/index.js" ]