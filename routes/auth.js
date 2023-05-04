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

const router = express.Router();

router.get('/login', authMiddleware, getLoginController);
router.post('/login', authMiddleware, postLoginController);
router.get('/register', authMiddleware, getRegisterController);
('');
router.post(
  '/register',
  [
    authMiddleware,
    body('username')
      .isLength({ min: 3, max: 10 })
      .withMessage('Kullanıcı adı en az 3 karakter olmalıdır')
      .isAlphanumeric()
      .withMessage('Kullanıcı adı sadece sayı ve harflerden olusmalıdır'),
    body('email').isEmail().withMessage('Gecerli bir eposta adresi girin'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Şifre en az 6 karakter olmalıdır'),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Sifre dogrulama eslesmiyor.');
      }
      return true;
    }),
  ],
  postRegisterController
);
router.get('/logout', logoutController);

export default router;
