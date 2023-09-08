import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import supirController from "../controller/supir.controller.js";
import userController from "../controller/user.controller.js";
import userProfileController from "../controller/userProfile.controller.js";
import kehadiranController from "../controller/kehadiran.controller.js";
import path from 'path'
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'assets')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        if (
            ext !== '.jpeg' &&
            ext !== '.jpg'  &&
            ext !== '.png'
            ) {
                return callback(new Error("Images not supported"))
            }
        callback(null, true)
    },
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const privateRoutes = express.Router();


/*Supir*/
privateRoutes.post("/api/v2/supir", supirController.create);
privateRoutes.patch("/api/v2/supir/id", supirController.update);
privateRoutes.delete("/api/v2/supir/id", supirController.remove);

/*User*/
privateRoutes.patch("/api/v2/user/password/id", userController.updatePassword);
privateRoutes.patch("/api/v2/user/logout", userController.logOut)

/* User Profile */
privateRoutes.patch("/api/v2/user/userProfile/data", userProfileController.update)
privateRoutes.patch("/api/v2/user/userProfile/images/id", upload.single('foto'), userProfileController.update);
privateRoutes.use('/assets/images', express.static(join(__dirname, '../../assets/images')));
privateRoutes.use('/assets/random', express.static(join(__dirname, '../../assets/random')));

/* Kehadiran */
privateRoutes.get("/api/v2/user/kehadiran", kehadiranController.getAllKehadiran);
privateRoutes.patch("/api/v2/user/hadir", kehadiranController.absenHadir);
privateRoutes.patch("/api/v2/user/pulang", kehadiranController.absenPulang);
privateRoutes.patch("/api/v2/user/sakit", kehadiranController.absenSakit);
privateRoutes.patch("/api/v2/user/izin", kehadiranController.absenSakit);

export { privateRoutes };
