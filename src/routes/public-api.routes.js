import express from "express"
import userController from "../controller/user.controller.js";
const publicRoutes = express.Router()

publicRoutes.get("/api/v0/user/login", userController.checkPhoneNumber);
publicRoutes.patch("/api/v0/user/login/register", userController.register)
publicRoutes.patch("/api/v0/user/login", userController.login)


export { publicRoutes }