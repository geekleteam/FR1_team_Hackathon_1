FROM node:20-alpine

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN apk add --no-cache nginx

EXPOSE 80

CMD ["sh", "-c", "cp -R ./dist/* /usr/share/nginx/html && nginx -g 'daemon off;'"]