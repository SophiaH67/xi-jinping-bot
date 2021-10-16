FROM node:16-slim
WORKDIR /app
COPY ./package* ./
RUN ["npm", "install"]
COPY . .
RUN [ "sh", "-c", "./node_modules/typescript/bin/tsc --esModuleInterop index.ts || :" ]
CMD ["node", "index.js"]