FROM node

RUN npm i -g pnpm

WORKDIR /app/build

COPY . .

#RUN pnpm install
#
#RUN pnpm build
#
#EXPOSE 3000

CMD ["pnpm", "start"]
