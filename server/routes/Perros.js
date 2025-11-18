import express from "express"; // ✅ Así se importa en ES6
const router = express.Router();
import Perro from "../models/Perro.js"; // ✅ Importa el modelo, no el "controller"

// Get all perros
router.get("/", async (req, res) => {
  try {
    const perritos = await Perro.find({ adoptado: false }); // ✅ Usa "Perro"
    res.json(perritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get perro by ID
router.get("/:id", async (req, res) => {
  try {
    const perro = await Perro.findById(req.params.id); // ✅ Usa "Perro"
    if (!perro) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }
    res.json(perro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post new perro
router.post("/", async (req, res) => {
  const nuevoPerro = new Perro(req.body); // ✅ Usa "Perro"
  try {
    const perroGuardado = await nuevoPerro.save();
    res.status(201).json(perroGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update perro by ID
router.put("/:id", async (req, res) => {
  try {
    const perroActualizado = await Perro.findByIdAndUpdate(
      // ✅ Usa "Perro"
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!perroActualizado) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }
    res.json(perroActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete perro by ID
router.delete("/:id", async (req, res) => {
  try {
    const perroEliminado = await Perro.findByIdAndDelete(
      // ✅ Usa "Perro"
      req.params.id
    );
    if (!perroEliminado) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }
    res.json({ message: "Perro eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
