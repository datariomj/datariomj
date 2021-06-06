# Build
FROM node:16-alpine3.11 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Host
FROM nginx:1.17.1-alpine
COPY --from=build-step /dist/datariomj/browser /usr/share/nginx/html