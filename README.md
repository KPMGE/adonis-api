# adonis api
This is a simple api made with [adonis](https://adonisjs.com/).


## How to run it? :running:
The easiest way to run this api is by using [docker](https://www.docker.com/).
Make sure to have it properly set up before going further!

### Seting up environment
Before running the api, you need to set up some environment variables for
this api. You can use the default ones and change them later according to your
needs.

First, create a **.env** file at the root directory:

```bash
touch .env
```

Then, copy the contents of the example env file into that file:

```bash
cat .env.example >> .env
```

Now everything should be fine. You can change those configurations later if
needed.


Running the api now is as simple as executing the command:

```bash
sudo docker-compose up
```

This command will build a docker image for this api as well as initializing a
mysql database for you. It will run the api migrations once the container starts
too, so don't worry about it.

After a little while, everything should be up and running. The api will be
running by default on the port 3333. Now you can start playing with it! :rocket:


## Documentation
You can find more information about the routes and how to use them in the
[docs](https://github.com/KPMGE/adonis-api/tree/main/docs)
