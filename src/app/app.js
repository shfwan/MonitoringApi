import express from 'express'
import {apiRoutes} from "../routes/api.routes.js";
import {privateRoutes} from "../routes/private-api.routes.js";
import {publicRoutes} from "../routes/public-api.routes.js";
import { errorMiddleware } from '../middleware/error.middleware.js';

export const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, UPDATE, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(express.json())
app.use(apiRoutes)
app.use(privateRoutes)
app.use(publicRoutes)

app.use(errorMiddleware)
