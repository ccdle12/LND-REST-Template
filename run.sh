#!/bin/bash

# Build the docker image.
docker build -t rest-api .

# Run the docker image.
docker run -d -it -p 8085:8085 --mount source=$PWD, target=/api --name rest-api rest-api

