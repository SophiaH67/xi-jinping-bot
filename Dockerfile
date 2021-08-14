FROM node:15-alpine
WORKDIR /app
COPY ./package* ./
RUN ["npm", "install"]
COPY . .
CMD ["npx", "ts-node", "--transpile-only", "index.ts"]