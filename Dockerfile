FROM node:16
WORKDIR /app
COPY ./package* ./
RUN ["npm", "install"]
COPY . .
CMD ["npx", "ts-node", "--transpile-only", "index.ts"]