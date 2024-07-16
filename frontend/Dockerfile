FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.0-alpine AS final

COPY --from=builder /app/dist /usr/share/nginx/html
