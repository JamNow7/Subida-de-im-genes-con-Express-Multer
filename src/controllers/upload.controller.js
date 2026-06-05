export const uploadPhoto = (req, res) => {
 if(!req.file){
    return res.status(400).json({error:"no se proporciono ningun archivo"});
 }

 return res.status(201).json({message:"archivo subido correctamente",

    file: {
        url: req.file.path,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
    },
 });
};
