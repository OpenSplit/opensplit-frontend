FROM node:12 as builder
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build --mode $ENV

# Stage 2
FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
