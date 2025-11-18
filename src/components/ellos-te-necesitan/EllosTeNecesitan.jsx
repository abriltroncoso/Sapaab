
import './Ellos-te-necesitan.css';
import dog from '../../assets/image 1.svg';
import { useNavigate } from 'react-router-dom';

export default function EllosTeNecesitan() {
    const navigate = useNavigate();
    const handleComoAyudar = () => {
        navigate('/como-ayudar');
    }
    return(
        <div className="ellos-te-necesitan">
            <h2>Ellos te necesitan</h2>
            <p>
                Si no podes adoptar en este momento, <strong>igual podes hacer la diferencia</strong> con una donacion, como voluntario o participando en nuestra rifa mensual!
            </p>
            <button className="btn-quiero-adoptar" onClick={handleComoAyudar}>Como ayudar</button>

            <img className="dog-illustration" src={dog} alt="perro ilustracion" />
        </div>
    )
}