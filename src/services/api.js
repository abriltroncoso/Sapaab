const API_URL = "https://sapaab.onrender.com/api";

// Obtener el token del localStorage
const getToken = () => {
  const usuario = localStorage.getItem("user");
  if (usuario) {
    return JSON.parse(usuario).token;
  }
  return null;
};

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

// POST - Crear perrito (requiere autenticación)
export const createPerrito = async (formData) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/perros`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // NO incluir 'Content-Type' aquí
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al crear perrito");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en createPerrito:", error);
    throw error;
  }
};

// PUT - Actualizar perrito (requiere autenticación)
export const updatePerrito = async (id, data) => {
  const token = getToken();

  try {
    // Si es FormData (con fotos nuevas), no agregar Content-Type
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Solo agregar Content-Type si NO es FormData
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}/perros/${id}`, {
      method: "PUT",
      headers: headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || "Error al actualizar perrito");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en updatePerrito:", error);
    throw error;
  }
};
// DELETE - Eliminar perrito (requiere autenticación)
export const deletePerrito = async (id) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/perros/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar perrito");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en deletePerrito:", error);
    throw error;
  }
};
