FROM node:22-alpine3.19
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
EXPOSE 8080
CMD yarn start
