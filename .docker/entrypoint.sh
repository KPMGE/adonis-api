#!/bin/sh

# runs the migrations against the db
node ace migration:run

# runs the api
node bin/server.js
