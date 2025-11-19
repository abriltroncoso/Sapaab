import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {getPerritos} from "../services/api"
import './lista-perritos.css'
export default function ListaPerritos() {
    const [perritos, setPerritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarPerritos();
    }, []);

    const cargarPerritos = async () => {
        try {
            setLoading(true);
            const data = await getPerritos();
            setPerritos(data);
        }
        catch (error) {
            setError('no se pudieron cargar los perritos');
             console.error(error);   
        } finally {
            setLoading(false);
        }
    };

    const verDetallePerro = (id) => {
        navigate(`/perrito/${id}`);
    };

    if (loading) {
        return <p>Cargando perritos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="lista-perritos-container">
            <h2>Nuestros callejeritos</h2>
            <div className="perritos-grid">
                {perritos.map((perrito) => (
                    <div key={perrito._id} className="perrito-card" onClick={() => verDetallePerro(perrito._id)}>
                    <img src={perrito.fotos[0]} alt={perrito.nombre} className="perrito-foto" />
                    <div className="perrito-info">
                        <h4>{perrito.nombre}</h4>
                    </div>
                </div>
                )) }
            </div>
        </div>
    )
}