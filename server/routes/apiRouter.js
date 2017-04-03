import express from 'express';
import index  from '../controllers/indexController';

const router = express.Router();

//index route
router.get('/', index.home);



export default router;