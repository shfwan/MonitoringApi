import { PrismaClient } from '@prisma/client'
import { logger } from './logging.js'

const prismaClient  = new PrismaClient({
    log:[
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ]
})

prismaClient.$on('error', (event) => {
    logger.error(event)
})

prismaClient.$on('warn', (event) => {
    logger.warn(event)
})

prismaClient.$on('info', (event) => {
    logger.info(event)
})

prismaClient.$on('query', (event) => {
    logger.query(event)
})

export default prismaClient