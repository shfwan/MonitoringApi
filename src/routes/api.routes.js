import express from "express";
import supirController from "../controller/supir.controller.js";
import userController from "../controller/user.controller.js";
import userProfileController from "../controller/userProfile.controller.js";
// import auth from "../middleware/auth.js";

const apiRoutes = express.Router();
// apiRoutes.use(auth.adminAuth)

/*Supir*/
apiRoutes.get("/api/v1/supir", supirController.get);
apiRoutes.get("/api/v1/supir/id", supirController.getById);

/*User Profil*/
apiRoutes.get("/api/v1/user/userProfile", userProfileController.get);
apiRoutes.get("/api/v1/user/userProfile/id", userProfileController.getById);


export {apiRoutes};
