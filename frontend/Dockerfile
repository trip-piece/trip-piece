FROM node:16-alpine
WORKDIR /var/jenkins_home/workspace/trippiece/frontend
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:latest

COPY /var/jenkins_home/workspace/trippiece/frontend/dist /usr/share/nginx/html
COPY /var/jenkins_home/workspace/trippiece/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"] 