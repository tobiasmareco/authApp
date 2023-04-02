import express from 'express'
import { changePasswordController, confirmAccountController, createUserController, forgetPasswordController, loginController } from '../../controllers/auth.controller.js'
import { validatorChangePassword, validatorConfirmAccount, validatorCreateUser, validatorForgotPassword, validatorLogin } from '../../validators/auth.validator.js'
const router = express.Router()

router.post('/', validatorCreateUser, createUserController)
router.put('/confirm-account', validatorConfirmAccount, confirmAccountController)
router.put('/forget-password', validatorForgotPassword, forgetPasswordController)
router.post('/change-password', validatorChangePassword, changePasswordController)
router.post('/login', validatorLogin, loginController)
export default router;