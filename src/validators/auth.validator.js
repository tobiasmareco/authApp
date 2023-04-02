import { check, validationResult } from 'express-validator'

export const validatorCreateUser = [
    check('name').exists().withMessage('El nombre es obligatorio.'),
    check('lastname').exists().withMessage('El apelido es obligatorio.'),
    check('email').exists().withMessage('El email es obligatorio').isEmail().withMessage('El email no es valido.'),
    check('password').exists().withMessage('La contrasena es obligatoria').isLength({ min: 6 }).withMessage('La contrasena debe tener al menos 6 caracteres'),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next()
        } catch (error) {
            return res.status(403).json({ errors: error.array() })
        }
    }
]

export const validatorConfirmAccount = [
    check('token').exists().withMessage('El token es obligatorio.'),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next()
        } catch (error) {
            return res.status(403).json({ errors: error.array() })
        }
    }
]

export const validatorForgotPassword = [
    check('email').exists().isEmail(),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            next()
        } catch (error) {
            return res.status(403).json({ errors: error.array() })
        }
    }
]

export const validatorChangePassword = [
    check('token').exists().withMessage('El token no es valido.'),
    check('password').exists().withMessage('La contrasena es obligatoria.').isLength({ min: 6 }).withMessage('La contrasena debe tener almenos 6 caracteres.'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            next()
        } catch (error) {
            return res.status(403).json({ errors: error.array() })
        }
    }
]

export const validatorLogin = [
    check('email').exists().withMessage('El email es obligatorio.').isEmail().withMessage('El email no es valido.'),
    check('password').exists().withMessage('La constrasena es obligatoria.'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            next()
        } catch (error) {
            res.status(404).json({errors:error.array()})
        }
    }
]