import express from 'express';
import index  from '../controllers/index_controller';

const router = express.Router();

//index route
router.get('/', index.home);



export default router;