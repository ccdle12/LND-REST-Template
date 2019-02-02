FROM node:latest

# Set the Working Directory to /api.
# COPY ./ /api
WORKDIR /api

RUN npm i

EXPOSE 3005

CMD npm start
