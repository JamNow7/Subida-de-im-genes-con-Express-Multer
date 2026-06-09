import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadPhoto } from "../controllers/upload.controller.js"; 

const router = Router();

//ruta para subir una foto
router.post("/upload", upload.single("foto"), uploadPhoto);

export default router;