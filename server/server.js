import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import perroRoutes from "./routes/Perros.js";
import process from "process";

dotenv.config();

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

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
