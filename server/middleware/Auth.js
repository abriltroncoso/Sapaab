import jwt from "jsonwebtoken";
import usuario from "../models/Usuario.js";
import process from "process";

export const protegerRuta = async (req, res, next) => {
  let token;
  // 1. Verificar si el token existe en el header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extraer el token (formato: "Bearer TOKEN_AQUI")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //4. buscar el usuario
      req.usuario = await usuario.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Error en la autenticación del token:", error);
      res.status(401).json({ mensaje: "No autorizado, token inválido" });
    }
  }
  if (!token) {
    res.status(401).json({ mensaje: "No autorizado, token no proporcionado" });
  }
};

// Middleware adicional para verificar si es admin
export const soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
};
