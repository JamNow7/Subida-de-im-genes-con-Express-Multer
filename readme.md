# Foto Upload - API de subida de imágenes

API REST construida con **Express** y **Multer** para la subida de archivos de imagen.

El servidor se levanta en `http://localhost:3000`.

**Cómo probarlo en Postman:**

1. Método: `POST`
2. URL: `http://localhost:3000/upload`
3. Pestaña **Body** → seleccionar `form-data`
4. Añadir una clave con nombre `foto`, cambiar el tipo de `Text` a **File**
5. Seleccionar el archivo de imagen desde tu equipo
6. Enviar la petición

**Ejemplo de respuesta exitosa:**

```json
{
  "message": "Archivo subido correctamente",
  "filename": "foto-1717500000000.jpg"
}
```
