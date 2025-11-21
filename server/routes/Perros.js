import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();
import Perro from "../models/Perro.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { protegerRuta, soloAdmin } from "../middleware/Auth.js";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de Multer (usa memoria para subir directo a Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

/* -----------------------------------------
   Helper para convertir upload_stream en Promesa
-------------------------------------------- */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "perritos" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

/* -----------------------------------------
   GET - Obtener todos los perros NO adoptados
-------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const perritos = await Perro.find({ adoptado: "no" });
    res.json(perritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   GET - Obtener perro por ID
-------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const perro = await Perro.findById(req.params.id);
    if (!perro) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }
    res.json(perro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   POST - Crear nuevo perro con fotos
-------------------------------------------- */
router.post(
  "/",
  protegerRuta,
  soloAdmin,
  upload.array("fotos", 4), // ✅ MULTER PRIMERO

  async (req, res) => {
    try {
      // Validar que haya archivos
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          mensaje: "Debes subir al menos una foto",
        });
      }

      // Validar máximo 4 fotos
      if (req.files.length > 4) {
        return res.status(400).json({
          mensaje: "Máximo 4 fotos permitidas",
        });
      }

      const fotosUrls = [];

      for (let file of req.files) {
        const url = await uploadToCloudinary(file.buffer);
        fotosUrls.push(url);
      }

      // Crear perro
      const perro = new Perro({
        nombre: req.body.nombre,
        raza: req.body.raza,
        edad: parseInt(req.body.edad),
        tamano: req.body.tamano,
        adoptado: req.body.adoptado,
        descripcion: req.body.descripcion,
        fotos: fotosUrls,
      });

      const perroGuardado = await perro.save();

      res.status(201).json(perroGuardado);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }
);

// PUT - Actualizar perro (PROTEGIDA)
router.put(
  "/:id",
  upload.array("fotos", 4), // Fotos opcionales
  protegerRuta,
  soloAdmin,
  async (req, res) => {
    try {
      const updateData = {
        nombre: req.body.nombre,
        raza: req.body.raza,
        edad: parseInt(req.body.edad),
        tamano: req.body.tamano,
        adoptado: req.body.adoptado,
        descripcion: req.body.descripcion,
      };

      // Si hay nuevas fotos, subirlas a Cloudinary
      if (req.files && req.files.length > 0) {
        const fotosUrls = [];
        for (let file of req.files) {
          const url = await uploadToCloudinary(file.buffer);
          fotosUrls.push(url);
        }

        updateData.fotos = fotosUrls;
      }

      const perroActualizado = await Perro.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!perroActualizado) {
        return res.status(404).json({ mensaje: "Perro no encontrado" });
      }

      console.log("✅ Perro actualizado");
      res.json(perroActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }
);

/* -----------------------------------------
   DELETE - Eliminar perro por ID
-------------------------------------------- */
router.delete("/:id", protegerRuta, soloAdmin, async (req, res) => {
  try {
    const perroEliminado = await Perro.findByIdAndDelete(req.params.id);

    if (!perroEliminado) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    res.json({ message: "Perro eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
