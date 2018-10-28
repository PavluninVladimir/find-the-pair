FROM node:10.12.0-jessie
EXPOSE 3001:3001
WORKDIR /find-the-pair
COPY ./ ./
RUN npm install
RUN npm lint-js
RUN npm run jest
RUN npm run build
ENTRYPOINT ["node", ".build/server.js"]