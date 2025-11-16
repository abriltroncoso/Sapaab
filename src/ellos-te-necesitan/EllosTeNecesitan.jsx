
import './Ellos-te-necesitan.css';
import dog from '../assets/image 1.svg';

export default function EllosTeNecesitan() {
    return(
        <div className="ellos-te-necesitan">
            <h2>Ellos te necesitan</h2>
            <p>
                Si no podes adoptar en este momento, <strong>igual podes hacer la diferencia</strong> con una donacion, como voluntario o participando en nuestra rifa mensual!
            </p>
            <button className="btn-quiero-adoptar">Como ayudar</button>

            <img className="dog-illustration" src={dog} alt="perro ilustracion" />
        </div>
    )
}