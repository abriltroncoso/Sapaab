import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioPerrito from "../components/FormularioPerrito";
import './editar-perrito.css'
import { getPerroById } from "../services/api";

export default function EditarPerrito(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [perrito, setPerrito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        cargarPerrito();
    },[id]);

    const cargarPerrito = async () => {
         try {
            setLoading(true);
            const data = await getPerroById(id);
            setPerrito(data);
        } catch (error) {
            setError('error al cargar el perrito');
            
        }finally{
            setLoading(false);
        }
        
    };
    
    const handleSuccess = () =>{
        navigate('/admin');
    }

    if (loading) {
    return (
      <div className="editar-perrito-container">
        <div className="loading">Cargando datos del perrito...</div>
      </div>
    );
  }

    return (
      <div className="editar-perrito-container">
      <div className="editar-header">
        <button onClick={() => navigate('/admin')} className="btn-volver">
          ← Volver
        </button>
        <h1>Editar Perrito</h1>
      </div>

      {perrito && (
        <FormularioPerrito 
          perritoEdit={perrito}  
          onSuccess={handleSuccess}
        />
      )}
    </div>
  ) }
