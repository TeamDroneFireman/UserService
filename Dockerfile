# Official Node image for fat version
# FROM node:argon
# Awesome tiny node image
FROM alpine
RUN apk update && apk upgrade
RUN apk add nodejs

WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
# launch should be done using : -e NODE_ENV=XXX
ENTRYPOINT [ "node", "." ]
