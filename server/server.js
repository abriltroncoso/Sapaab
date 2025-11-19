import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import perroRoutes from "./routes/Perros.js";
import authRoutes from "./routes/auth.js";
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//conexion a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) =>
    console.error("Error de conexión a la base de datos:", error)
  );

//rutas
app.use("/api/perros", perroRoutes);
app.use("/api/auth", authRoutes);
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
