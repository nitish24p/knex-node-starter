import express from 'express';
import { renderHomePage } from './helpers/htmlGenerator.js'

const clientRoutes = express.Router();


/**
 * all routes start from here
 **/

//index route
clientRoutes.get('/', (req, res, next) => {
  res.send(renderHomePage(req))
});



module.exports = clientRoutes;