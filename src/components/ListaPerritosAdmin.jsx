import { useState, useEffect } from "react";
import { getPerritos, deletePerrito, updatePerrito } from "../services/api";
import { useNavigate } from "react-router-dom";
import './listaPerritosAdmin.css'

export default function listaPerritosAdmin(){
    const [perritos, setPerritos] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        cargarPerritos();
    },[]);

    const cargarPerritos = async () => {
        try{
            const data = await getPerritos();
            setPerritos(data);
        }catch(error){
            console.error('error al cargar los perritos',error);
        }
    };

    const handleDelete= async (id) => {
        try{
           await deletePerrito(id);
           cargarPerritos();

        }catch(error){
            console.error('error al eliminar el perrito');
        }
    }

    const handleEdit = (id) => {
    navigate(`/admin/editar/${id}`);
  };

  return (
    <div className="lista-admin-container">
      <h2>Administrar Perritos</h2>

      <table className="tabla-perritos">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {perritos.map((p) => (
            <tr key={p._id}>
              <td>
                <img src={p.fotos?.[0]} alt={p.nombre} className="foto-mini" />
              </td>
              <td>{p.nombre}</td>
              <td>{p.edad} años</td>
              <td className="btns">
                <button className="btn-editar" onClick={() => handleEdit(p._id)}>
                  Editar
                </button>

                <button className="btn-eliminar" onClick={() => handleDelete(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
