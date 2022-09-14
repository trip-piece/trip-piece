FROM node:16.15.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage ./dist /usr/share/nginx/html
COPY --from=build-stage ./deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]