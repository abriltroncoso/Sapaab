import './porqueAdoptar.css';
import imgA from '../assets/porque1.svg';
import imgB from '../assets/porque2.svg';
import imgC from '../assets/porque3.svg';
import imgD from '../assets/porque4.svg';
import imgE from '../assets/porque5.svg';
export default function PorqueAdoptar() {

    return(
        <div className="porque-adoptar">
            <div className="img-column left">
                <img className='img1' src={imgA} alt="perrito 1" />
                <img className= 'img2' src={imgB} alt="perritos 2" />
                <img className='img3' src={imgC} alt="" />

            </div>

            <div className="content">
                <h2>¿Por qué adoptar?</h2>
                <p>
                     Cuando adoptas, le das una segunda oportunidad a un ser lleno de amor. Cada callejerito ha superado grandes desafios y esta listo para encontrar un nuevo hogar.
                </p>
                <p>
                    Adoptar es mucho mas que llevar un perro a casa: es salvar una vida y liberar un espacio en el Refugio para que otro callejito pueda ser rescatado. <strong>Es un acto de amor, responsabilidad y compromiso.</strong> 
                </p>
                <button className="btn-quiero-adoptar">Adopta ahora</button>
            </div>

            <div className="img-column right">
                <img  className='img4' src={imgD} alt="perrito 3" />
                <img className='img5' src={imgE} alt="perrito 4" />
            </div>
        </div>

    );
}
  
