FROM node:16-alpine 

WORKDIR /frontend_vue3

COPY package* ./

RUN npm install

RUN chmod -R 777 node_modules

COPY . .

EXPOSE 9000

# CMD ["yarn", "dev"]
