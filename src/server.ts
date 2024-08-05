import express  from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { apiRouter } from './api/index.js'
import { jsonResponseMiddleware } from './middleware/jsonResponseMiddleware.js'
import { bootstrapDB } from './database/index.js'

await bootstrapDB()
dotenv.config();
const PORT = process.env.PORT || "8000";


const app = express()

app.use(jsonResponseMiddleware)
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// healthcheck
app.get('/ping', (_req, res) => {
  res.status(200).send('pong')
})

// api apiRouter
app.use('/api', apiRouter)

// final middleware

// start server
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});
