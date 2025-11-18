import mongoose from "mongoose";

const perroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  raza: { type: String, required: true },
  edad: { type: Number, required: true },
  adoptado: { type: Boolean, default: false },
  tamaño: {
    type: String,
    enum: ["pequeño", "mediano", "grande"],
    required: true,
  },
  descripcion: { type: String },
  fechaIngreso: { type: Date, default: Date.now },
  fotos: { type: [String], required: true },
});

export default mongoose.model("Perro", perroSchema);
