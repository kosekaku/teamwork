// api documentation route
import express from 'express';
import docController from '../controllers/doc';

const router = express.Router();
router.get('', docController.docs);

export default { router };
