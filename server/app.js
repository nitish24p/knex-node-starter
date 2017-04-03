
import config from './../config/config.json';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import raven from 'raven';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import redis from 'redis';


import { default as apiRoutes } from './routes/apiRouter.js';
import clientRoutes from './../client/clientRouter.js'

const favicon = require('serve-favicon');

const redisStore = require('connect-redis')(session);
let redisClient = redis.createClient(config.redis.port, config.redis.host);


let winston = require('winston');
let app = express();
let ravenClient = config.sentry.enabled ? new raven.Client(config.sentry.dsn) : null;

let logger = new winston.Logger({
  transports: [new (winston.transports.Console)({colorize:true})],
  exitOnError: false // prevent winston's exit after logging an uncaughtException
});

// /* Sentry */
if (config.sentry.enabled) {
  app.use(raven.requestHandler(config.sentry.dsn));
  ravenClient.install();
  app.use(raven.errorHandler(config.sentry.dsn));
}

/*redis*/
let redis_status;

redisClient.on('connect', ()=> {
  logger.log('info','redis connected');
  redis_status = 'Connected';
});

redisClient.on('error', ()=> {
  logger.log('info', 'redis connection failure');
  redis_status = 'Connection failed';
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(
  {
    secret : config.secretKeys.session_secret_key,
    store: new redisStore({host: config.redis.host, port : config.redis.port, client: redisClient}),
    resave: false,
    saveUninitialized: false
  }
));

// Api Prefix
//Prefix api routes : good practice
app.use('/api/v1/', apiRoutes);

// All other routes can be stored here
app.use('/', clientRoutes);


// Static Folder
app.use(express.static(path.join(__dirname, '../client')));
app.use(favicon(path.join(__dirname, '..', 'client', 'static','favicon.ico')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.message = 'Not Found';
  err.status = 404;
  res.sendFile(path.join(__dirname, '..','client' ,'common/404.html'));
});

//error handler
app.use((err, req, res, next)=> {
  //res.status();
  res.status(err.status || 500).send({status: err.status ? `${err.status}` : 500, message: err.message})
  next(err);
});

/**
* This function is used to get a valid json object while parsing objects
**/
process.common = function() {
  let response = {};
  response.getJSONObject = (val) => {
    if (typeof val === 'object') {
      return val;
    } else if (val) {
      try {
        return JSON.parse(val);
      } catch (e) {
        logger.log('%s', val);
        return {};
      }
    }
  };
  return response;
}();

/**
* response interceptor for checking if the headers have already been set or not.
**/

/* istanbul ignore next */
app.use((req,res,next)=>{
  let _send = res.send;
  let sent = false;
  res.send = (data)=>{
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
  };
  next();
});


/* function to log sentry errors */
/* istanbul ignore next */
let sentryLog = (e,info) => {
  if (config.sentry.enabled) {
    if (e!==null) {ravenClient.captureError(e);}
    if (info) {
      ravenClient.captureMessage(info);}
  }
};

/* function to log sentry userContext */
 //istanbul ignore next
let sentrySetUserContext = (id) => {
  if (config.sentry.enabled) {
    if (id) {
      try {
        ravenClient.setUserContext({
          id: id
        });
      } catch (e) {
        ravenClient.captureError(e);
      }
    }
  }
};

export { app, sentryLog, sentrySetUserContext, redisClient, redis_status };
