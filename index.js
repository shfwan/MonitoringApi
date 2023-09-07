import dotenv from 'dotenv'
import { app } from './src/app/app.js';
import { logger } from './src/app/logging.js';

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
})
