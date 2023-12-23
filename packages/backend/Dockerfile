FROM node:16-slim
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
WORKDIR /app/packages/backend
RUN yarn build
CMD ["yarn", "start:prod"]
