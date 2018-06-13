FROM node:10 as builder
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn run build

# Stage 2
FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
