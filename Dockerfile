# Prep
FROM node:14.17.0 as build-step
RUN apt update && apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb -y
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run validate
RUN npm run e2e:ci
RUN npm run build --prod

# Host
FROM nginx:1.21.0-alpine
COPY --from=build-step /app/.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/datariomj/browser /usr/share/nginx/html