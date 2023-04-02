import User from "../models/user.model.js";
import { generateToken } from "../helpers/tokens.js";
import { sendEmailConfirmAccount, sendEmailForgotPass } from "../helpers/Email.js";
import functionsBcrypt from "../helpers/bcrypt.js";
import { jsonwebtoken } from "../helpers/tokens.js";

//-CREAR NUEVOS USUARIOS 
export const createUserController = async (req, res) => {
    const { name, lastname, email, password } = req.body

    //-validate for dont exist user...

    const userEmail = await User.findOne({ email })
    if (userEmail) {
        return res.status(404).json({ response: "error", msg: 'El email ya esta registrado' })
    }

    try {
        const newUser = new User({ name, lastname, email, password, token: generateToken() });

        //-encript pass before save to the database...

        const hasedPassword = await functionsBcrypt.encriptar(password)
        newUser.password = hasedPassword
        const savedUser = await newUser.save()

        //-send email for confirm account...

        await sendEmailConfirmAccount({
            name: `${savedUser.name} ${savedUser.lastname}`,
            email: savedUser.email,
            token: savedUser.token
        })
        return res.status(201).json({ response: 'success', msg: 'Usuario creado correctamente.', user: savedUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: 'error', msg: "Error del servidor" })
    }
}

//- CONFIRMAR CUENTA DE USUARIOS.
export const confirmAccountController = async (req, res) => {
    const { token } = req.body
    const user = await User.findOne({ token });
    if (!user) {
        return res.status(404).json({ response: 'error', msg: "El token no es valido" })
    }
    try {
        user.token = null
        user.active = true
        await user.save()
        res.status(200).json({ response: 'success', msg: 'Se ha confirmado la cuenta correctamente.' })
    } catch (error) {
        return res.status(500).json({ response: 'error', msg: "Error del servidor" })
    }
}

//- INSTRUCCIONES PARA CAMBIO DE CONTRASENA.
export const forgetPasswordController = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
        return res.status(404).json({ response: "error", msg: 'El email no existe.' })
    }
    try {
        user.token = generateToken()
        const savedUser = await user.save()

        //-send email instruction for reset password...

        await sendEmailForgotPass({
            name: `${savedUser.name} ${savedUser.lastname}`,
            email: savedUser.email,
            token: savedUser.token
        });
        return res.status(200).json({ response: 'success', msg: 'Se ha enviado un correo con las instrucciones.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: 'error', msg: "Error del servidor" })
    }
}

//- CAMBIAR A UNA NUEVA CONTRASENA.
export const changePasswordController = async (req, res) => {
    const { token, password } = req.body;
    const user = await User.findOne({ token });
    if (!user) {
        return res.status(400).json({ response: 'error', msg: 'El token no existe.' })
    }
    if (!user.active) {
        return res.status(400).json({ response: 'error', msg: 'La cuenta no esta activa.' })
    }
    try {
        user.password = await functionsBcrypt.encriptar(password);
        user.token = null
        await user.save()
        return res.status(200).json({ response: 'success', msg: `Se ha actualizado la contrasena de ${user.email}` })
    } catch (error) {
        return res.status(500).json({ response: "error", msg: error.message })
    }
}
//- INICIO DE SESION USUARIO. 
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ response: 'error', msg: 'El email no ha sido registrado.' })
        }
        if (!user.active) {
            return res.status(401).json({ response: 'error', msg: 'La cuenta no ha sido activada.' })
        }
        if (!await functionsBcrypt.desencriptar(password, user.password)) {
            return res.status(404).json({ response: 'error', msg: 'Error en el usuario o la contrasena.' })
        }
        //~GENERANDO UN TOKEN DE SESSION.
        const tokenSession = jsonwebtoken.generate(user._id.toString())
        return res.status(200).json({ response: 'success', user, tokenSession })
    } catch (error) {
        return res.status(500).json({ response: "error", msg: error.message })
    }

}

export const getDataUserLogin = async (req, res) => {
    //!PENDIENTE...
}