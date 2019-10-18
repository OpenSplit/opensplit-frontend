# opensplit-vuejs
[![Build Status](https://travis-ci.org/OpenSplit/opensplit-frontend.svg?branch=master)](https://travis-ci.org/OpenSplit/opensplit-frontend)

> new fancy webfrontend for the OpenSplit project

CSS-Framework: [bulma.io](https://bulma.io/)

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn serve

# build for production with minification
yarn build

```

## Run the backend
For local development you need a backend running. The easiest way is to use the prebuild Docker container

* copy the example config.py from the backend repo to config.py
* Start the backend container with
```
docker run --rm --name opensplit_backend -v $(pwd)/config.py:/code/config.py:ro -p 5000:5000 -it opensplit/backend:stable
```
* Open a second terminal to tun these commands to create a new database in the container and populate it with some testdata
```
docker exec -it opensplit_backend  /bin/sh -c "pipenv run python create_db.py"
docker exec -it opensplit_backend  /bin/sh -c "pipenv run python init_testdata.py"
```

Now you have the backend running on port 