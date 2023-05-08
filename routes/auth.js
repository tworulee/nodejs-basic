import express from 'express';
import {
  getLoginController,
  getRegisterController,
  postRegisterController,
  logoutController,
  postLoginController,
} from '../controllers/auth.js';
import { authMiddleware } from '../middleware/auth.js';
import { body } from 'express-validator';
import { registerValidation } from '../validations/register-validation.js';

const router = express.Router();

router.get('/login', authMiddleware, getLoginController);
router.post('/login', authMiddleware, postLoginController);
router.get('/register', authMiddleware, getRegisterController);

router.post(
  '/register',
  authMiddleware,
  registerValidation(),
  postRegisterController
);
router.get('/logout', logoutController);

export default router;
