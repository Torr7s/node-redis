FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY .env         ./

RUN yarn

COPY . .

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "start:dev"]