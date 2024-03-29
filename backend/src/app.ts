import { connectToDatabase } from './utils/config'
import express from 'express'
import cors from 'cors'
import middleware from './utils/middleware'
import userRouter from './routes/user';

const app = express()

connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(middleware.morganMiddleWare)

app.use('/user', userRouter);

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app;