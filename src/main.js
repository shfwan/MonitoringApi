import express from 'express'
import dotenv from 'dotenv';
import { logger } from './app/logging.js';

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use('/home', (req,res) => res.send('Hello World'))
logger.info(process.env.PORT)
app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
})