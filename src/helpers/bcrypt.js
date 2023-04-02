import bcrypt from 'bcryptjs'


const functionsBcrypt = {
    encriptar: (password) => {
        return bcrypt.hash(password, 10)

    },
    desencriptar: (normalPass, hasedPass) => {
        return bcrypt.compare(normalPass, hasedPass)
    }
}

export default functionsBcrypt