import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["user", "admin"], default: "admin" },
});

//midleware para hashear la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

export default mongoose.model("Usuario", usuarioSchema);
