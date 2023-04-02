import nodemailer from 'nodemailer'

export const sendEmailConfirmAccount = async (data) => {

    const transport = nodemailer.createTransport({
        host: process.env.API_EMAIL_HOST,
        port: process.env.API_EMAIL_PORT,
        auth: {
            user: process.env.API_EMAIL_USER,
            pass: process.env.API_EMAIL_PASS
        }
    })

    await transport.sendMail({
        from: 'tmareco123@gmail.com',
        to: data.email,
        subject: 'Bienvenido a AppAuht',
        text: 'Bienvenido a App Auth',
        // html:`welcome ${data.name} ${process.env.API_CLIENT_URL}/auth/confirm-account/${data.token}`
        html: `<div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 1rem; font-family: sans-serif;"> <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;"> Bienvenido a AppAuth </h1> <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;"> Hola <span style="font-weight: bold;">${data.name}</span>, gracias por registrarte en AppAuth, para confirmar tu cuenta, por favor ingresa al siguiente link ${process.env.API_CLIENT_URL}/auth/confirm-account/${data.token}`
    })
}

export const sendEmailForgotPass = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.API_EMAIL_HOST,
        port: process.env.API_EMAIL_PORT,
        auth: {
            user: process.env.API_EMAIL_USER,
            pass: process.env.API_EMAIL_PASS
        }
    })

    await transport.sendMail({
        from: 'tmareco123@gmail.com',
        to: data.email,
        subject: 'Recuperar clave en App Auht',
        text: 'Recuperar clave en App Auth',
        // html:`welcome ${data.name} ${process.env.API_CLIENT_URL}/auth/confirm-account/${data.token}`
        html: `<div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 1rem; font-family: sans-serif;"> <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;"> Bienvenido a AppAuth </h1> <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;"> Hola <span style="font-weight: bold;">${data.name}</span>, has solicitado reestablecer la clave de tu cuenta, por favor ingresa al siguiente link ${process.env.API_CLIENT_URL}/auth/forget-password/${data.token}`
    })
}