FROM node
COPY . /vos-ng
WORKDIR /vos-ng
RUN npm i
RUN npm install node-sass
RUN npm run build:ssr
CMD npm run serve:ssr