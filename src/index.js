import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(uploadRoutes);


//manejador de errores de multer y validacion de datos

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "El archivo es demasiado grande" }); 
  }
  if(err.status){
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: "Error interno del servidor" });
});


app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
