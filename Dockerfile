FROM node:10.12.0-jessie
EXPOSE 3001:3001
WORKDIR /find-the-pair
COPY ./.build ./.build
ENTRYPOINT ["node", ".build/server.js"]
