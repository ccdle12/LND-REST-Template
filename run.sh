#!/bin/bash

# Build the docker image.
docker build -t rest-api .

# Run the docker image.
docker run -d -it -p 3005:3005 -v $PWD:/api --name rest-api rest-api

