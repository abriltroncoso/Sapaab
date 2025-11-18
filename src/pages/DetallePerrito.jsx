import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPerroById } from "../services/api.js"
import './detalle-perrito.css'

export default function DetallePerrito() {
    const { id } = useParams();
    const [perrito, setPerrito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarDetallePerrito();
    }, [id]);

    const cargarDetallePerrito = async () => {
        try {
            setLoading(true);
            const data = await getPerroById(id);

            setPerrito(data);   // Asegurate que data sea el objeto del perrito
        } catch (error) {
            setError("No se pudo cargar el detalle del perrito");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando detalle del perrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="detalle-perrito-container">
            <div className="detalle-info">
                <h1 className="perrito-nombre">{perrito.nombre}</h1>
                <p className="perrito-descripcion">{perrito.descripcion}</p>
                <button className="btn-adoptar">¡Adoptar!</button>
                
                <div className="estrellas-container">
                    <div className="estrellas">
                        <span className="estrella naranja">★</span>
                        <p className="label-estrella">Se lleva con chicos</p>
                    </div>
                    <div className="estrellas">
                        <span className="estrella gris">★</span>
                        <p className="label-estrella">se lleva con perros</p>
                    </div>
                </div>
            </div>

            <div className="galeria-fotos">
                <img src={perrito.foto} alt={`${perrito.nombre} 1`} className="foto-galeria" />
                <img src={perrito.foto} alt={`${perrito.nombre} 2`} className="foto-galeria" />
                <img src={perrito.foto} alt={`${perrito.nombre} 3`} className="foto-galeria" />
                <img src={perrito.foto} alt={`${perrito.nombre} 4`} className="foto-galeria" />
            </div>
        </div>
    )
}
