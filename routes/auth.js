import express from 'express';
import {
  getLoginController,
  postLoginController,
} from '../controllers/auth.js';

const router = express.Router();

router.get('/login', getLoginController);
router.post('/login', postLoginController);

export default router;
