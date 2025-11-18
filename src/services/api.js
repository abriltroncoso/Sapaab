const API_URL = "http://localhost:3000/api";

//funcion para obtener la lista de perros
export const getPerritos = async () => {
  try {
    const response = await fetch(`${API_URL}/perros`);

    if (!response.ok) {
      throw new Error("Error al obtener los perritos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//funcion para obtener un perro por ID
export const getPerroById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/perros/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el perro");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
