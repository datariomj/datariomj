# Build
FROM node:14.17.0-alpine3.11 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run validate
RUN npm run build --prod

# Host
FROM nginx:1.21.0-alpine
COPY --from=build-step /app/.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/datariomj/browser /usr/share/nginx/html