import prismaClient from "../app/database.js"

const userAuth = async (req, res, next) => {
    console.log(req.body.id)
    const user = await prismaClient.user.findFirst({
        where: {
            id: Number(req.body.id),
        },
        select: {
            role: true
        }
    })

    if(user.role === false) {
        next()
    } else {
        res.status(401).json({
            message: 'You are not allowed to'
        })
    }
}


const adminAuth = async (req, res, next) => {
    console.log(req.body)
    const admin = await prismaClient.user.findFirst({
        where: {
            id:  Number(req.body.id),
        },
        select: {
            role: true
        }
    })
    if(admin.role === true) {
        next()
    } else {
        res.status(401).json({
            message: "Invalid role"
        })
    }}

const userAdminAuth = async (req, res, next) => {
    const userAdmin = await prismaClient.user.findFirst({
        where: {
            id: Number(req.body.id),
        },
        select: {
            role: true
        }    })
    if(userAdmin.role === null) {
        throw new Error("Invalid input")
    } else {
        next()
    }
}

export default {
    userAuth,
    adminAuth,
    userAdminAuth
}