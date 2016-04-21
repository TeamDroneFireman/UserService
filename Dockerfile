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
# then in npm use this : process.env.NODE_ENV if necessary
# use this in jenkins deploy
# if [ -f README.md ]; then echo elllo; else echo oiike; fi
ENTRYPOINT [ "npm", "run-script", "start_env" ]
