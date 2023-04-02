import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/v1/auth.routes.js'
import conectDatabase from './config/databse.js'
dotenv.config()
const app = express()
//Config Json
app.use(express.json())
//Conect database
conectDatabase()
//Cors
app.use(cors())
//Rutas
app.use('/api/v1/auth',authRouter)
app.listen(process.env.API_SERVER_PORT,()=>{
    console.log(`listening on port ${process.env.API_SERVER_PORT}`)
})