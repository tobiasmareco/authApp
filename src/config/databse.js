import mongoose from 'mongoose';
const conectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.API_MONGO_URL, {

        })
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`databased conected ${url}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default conectDatabase