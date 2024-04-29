import { Router } from 'express';
import { check } from 'express-validator';
import { login, register, renew } from '../controllers';
import { validateFields } from '../middlewares';

export const authRouter = Router();

authRouter.post('/login', [
    check( 'email', 'El email es obligatorio').isEmail(),
    check( 'password', 'El password es obligatorio').not().isEmpty(),
    check( 'password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], login);

authRouter.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], register);

authRouter.get('/renew', renew);