#!/bin/bash

podman build -t "localhost/polymesh-apps:$(git rev-parse HEAD)" -f deploy/Dockerfile .
