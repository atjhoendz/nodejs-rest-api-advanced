# NodeJS REST API Advanced
A project exploration to create rest api in advanced with nodejs. It will be a long-term development with flexible features.

[![Build Status](https://app.travis-ci.com/atjhoendz/nodejs-rest-api-advanced.svg?branch=main)](https://app.travis-ci.com/atjhoendz/nodejs-rest-api-advanced)

## Table Of Content
- [NodeJS REST API Advanced](#nodejs-rest-api-advanced)
  - [Table Of Content](#table-of-content)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Running the service](#running-the-service)
  - [API Documentation](#api-documentation)
  - [Features](#features)

## Development
### Prerequisites
```
- Docker
- Docker Compose
```
### Running the service
```sh
# DEVELOPMENT

# build image then run with logs 
$ make build_run_logs_api_dev

# stop service
$ make stop


# DATABASE

# init database table
$ make init_db_dev

# drop all table
$ make drop_db_dev

# refresh db
$ make refresh_db_dev

```

## API Documentation 

[API Docs Link](https://documenter.getpostman.com/view/6010208/U16nKPNY)


## Features
- [x] Docker Environment
- [x] Database PostgreSQL
- [x] Pure SQL doesn't use ORM (main branch)
- [x] End to End Testing Using Jest & Supertest
- [x] Integrate Testing with TravisCI
- [ ] Redis
- [ ] Sync PostgreSQL with Elasticsearch
- [ ] Elasticsearch
