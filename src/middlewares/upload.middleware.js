import multer from "multer";
import path from "path";

//tipos de archivos permitidos y extensiones varias
const ALLOWED_MIMES = ["image/png", "image/jpeg", "image/gif"];
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg","gif"];

//configuracion de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

//filtro de archivos poara validar tipo y extension

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype) && ALLOWED_EXTENSIONS.includes(path.extname(file.originalname).slice(1))) {
        cb(null, true);
    } else {
        const err = new Error("Tipo de archivo no permitido");
        err.status = 400;
        cb(err);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
});


