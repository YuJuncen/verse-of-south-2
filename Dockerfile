FROM node
COPY . /vos-ng
WORKDIR /vos-ng
RUN npm i
RUN npm install node-sass
CMD npm run build:ssr && npm run serve:ssr