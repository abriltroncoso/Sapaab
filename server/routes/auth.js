import express from "express";
import JWT from "jsonwebtoken";
import usuario from "../models/Usuario.js";
import process from "process";

const router = express.Router();

//generar JWT
const generarToken = (usuario) => {
  return JWT.sign(
    {
      id: usuario._id,
      rol: usuario.rol,
      email: usuario.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

//ruta para registrar usuario
router.post("/registro", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const usuarioExistente = await usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const nuevoUsuario = new usuario({ nombre, email, password, rol });
    await nuevoUsuario.save();
    const token = generarToken(nuevoUsuario);
    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      token,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

//ruta para login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioEncontrado = await usuario.findOne({ email });
    if (
      usuarioEncontrado &&
      (await usuarioEncontrado.compararPassword(password))
    ) {
      const token = generarToken(usuarioEncontrado);
      res.json({
        _id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol,
        token,
      });
    } else {
      res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

export default router;
