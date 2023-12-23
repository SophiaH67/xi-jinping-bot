FROM node:20-slim
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
WORKDIR /app/packages/bot
RUN yarn build
CMD ["yarn", "start:prod"]
