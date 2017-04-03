# knex-node-starter

### Tech Details
This a full stack javascript application using [Express](http://expressjs.com/) as a backend framework, [Knex](http://knexjs.org/) as a query builder, [Bookshelf](http://bookshelfjs.org/) as an ORM for node and uses [React](https://facebook.github.io/react/) with server side rendering on the front end.

### Dev Setup

**Prerequisites**
* [NodeJS](https://nodejs.org/en/) (v6.9.4) - Javascript runtime environment.


**Quick start**
Install dependencies
```bash
npm install
```
Copy config file
```bash
cp config/config.json.sample config/config.json
  
```
Edit ```config.json``` with your required configs. 

Start app
```
npm run migrate
npm run build
npm start
```

The above command will run the sample migration consisting of 2 tables, build the basic landing page and start the server
[App is here](http://localhost:3000). All api routes are prefixed with ```/api/v1/``` like this one [here](http://localhost:3000/api/v1)

**Some salient points**

* Sample migrations and models

```bash
A sample migration and sample models have been added in :
/server/migration and /server/models
```
* Run migrations
```bash
npm run migrate
```

* Build client side
```bash
npm run build:dev // will run webpack with a watcher
npm run build // production build
```

* Build server side
```bash
npm start // production build with no watcher
npm run start:dev // production build with no watcher

```

* Migrate to a version
```bash
node_modules/.bin/knex-migrate down {Version_number}  --env server_env

node_modules/.bin/knex-migrate up {Version_number}  --env server_env

```

* Change port number and env variables
```bash
vim server/pm2_config/pm2_config.json

```
and edit. Other process.env variables can be added here too.
