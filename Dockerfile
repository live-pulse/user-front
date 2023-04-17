FROM node:19-alpine

RUN npm i -g pnpm

WORKDIR /app/build

COPY . .

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start"]
