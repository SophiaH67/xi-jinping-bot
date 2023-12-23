FROM archlinux:base
RUN pacman -Sy nodejs-lts-hydrogen npm openssl --noconfirm
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["sh", "-c", "node dist/main.js"]