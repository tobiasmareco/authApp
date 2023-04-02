import jwt from 'jsonwebtoken'

export const generateToken = () => {
    const random = Math.random().toString(32).substring(32)
    const dateNow = Date.now().toString(32)
    return random + dateNow
}

export const jsonwebtoken = {
    generate: (payload) => {
        const options = { expiresIn: '24h' }
        return jwt.sign({ payload }, process.env.API_JWT_SECRET, options)
    },
    verify: (token) => {
        return jwt.verify(token, process.env.API_JWT_SECRET)
    }
}