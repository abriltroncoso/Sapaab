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

      if (loading) {
    return (
        <div className="loading-container">
            <p className="loading-text">Cargando informacion del perrito...</p>
        </div>
    );
}
    if (error) return <p>{error}</p>;

    return (
        <div className="detalle-perrito-container">
            <div className="detalle-info">
                <h1 className="perrito-nombre">{perrito.nombre}</h1>
                <p className="perrito-descripcion">{perrito.descripcion}</p>
                <button className="btn-adoptar" onClick={() =>
                        window.open("https://wa.me/5492314412280?text=Hola!%20Quiero%20hacer%20una%20consulta", "_blank")
                    }>¡Adoptar!</button>
            </div>

            <div className="galeria-fotos">
                {perrito.fotos.map((url, index) => (
                    <img
                    key={index}
                    src={url}
                    alt={`${perrito.nombre} ${index + 1}`}
                    className="foto-galeria"
                    />
                ))}
            </div>
        </div>
    )
}
