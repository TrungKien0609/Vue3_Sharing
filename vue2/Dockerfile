FROM node:16-alpine 

WORKDIR /frontend_vue2

COPY package* ./

RUN yarn

RUN chmod -R 777 node_modules

COPY . .

EXPOSE 9000

# CMD ["yarn", "dev"]
