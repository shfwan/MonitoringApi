import express from 'express'
import { logger } from './app/logging.js';


const PORT = process.env.PORT || 5000
const app = express()

app.use('/home', (req,res) => res.send('Hello World'))

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
})