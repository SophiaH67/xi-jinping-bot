FROM node:20-slim
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
WORKDIR /app/packages/backend
RUN yarn build
CMD ["yarn", "start:prod"]
