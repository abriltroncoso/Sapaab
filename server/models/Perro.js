import mongoose from "mongoose";

const perroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  raza: { type: String, required: true },
  edad: { type: Number, required: true },
  adoptado: {
    type: String,
    enum: ["si", "no"],
    default: "no",
    require: true,
  },
  tamano: {
    type: String,
    enum: ["pequeño", "mediano", "grande"],
    required: false,
  },
  descripcion: { type: String },
  fechaIngreso: { type: Date, default: Date.now },
  fotos: { type: [String], required: true },
});

export default mongoose.model("Perro", perroSchema);
