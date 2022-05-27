FROM node:lts-alpine
# RUN apt-get update && apt-get install && apt-get clean

WORKDIR ''

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent

ENV NODE_ENV=production

EXPOSE $PORT

CMD [ "npm", "start" ]