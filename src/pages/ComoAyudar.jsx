import img from '../assets/perrito-como-ayudar.jpg';

import './como-ayudar.css'
import EllosTenecesitan from '../components/ellos-te-necesitan/EllosTeNecesitan'
export default function ComoAyudar() {
 
    return (
       
        <div className="como-ayudar-container">
            <div className='tu-donacion'>
                 <div className='columna-izq'>
                <h1>Tu donacion transforma vidas</h1>
                <h2>Con tu ayuda podemos seguir rescatando y concientizando. Involucrate y marca la diferencia</h2>
                <button onClick={() => window.open("https://www.instagram.com/direct/t/sapaab_bolivar/", "_blank")}
                    >Contactanos</button>
            </div>
            <div>
                <img src={img} alt="" />
            </div>
            </div>
           

            <div className="donaciones">
                    <h2>Transparencia y compromiso: Asi usamos tu donacion</h2>
                    <div className='donaciones-item'>
                        <p> <i class="fa-solid fa-utensils"></i>Alimentacion, medicacion y limpieza para mas de 200 callejeritos</p>
                        <p> <i class="fa-solid fa-house-medical"></i>Cuidados medicos y rescate de animales</p>
                        <p><i class="fa-solid fa-user-doctor"></i>Protocolos que incluyen controles,estudios y tratamientos</p>
                        <p> <i class="fa-solid fa-stethoscope"></i>Castraciones e interconsultas con veterinarios</p>
                    </div>
            </div>

            <div className='como-donar' id='donaciones'>
                <div>
                    <h3>Dona via cuenta bancaria</h3>
                        <h4>Banco provincia</h4>
                        <p>Sapaab refugio</p>
                        <p>CBU:</p>
                        <p>CUIT:</p>
                        <p>Alias:</p>
                </div>

                <div>
                    <h3>Dona otros insumos</h3>
                   <ul>
                        <li>Alimento medicado: Renal, Urinary y Hepático</li>
                        <li>Pañales XL sin elástico / zaleas</li>
                        <li>Mantas, frazadas y sábanas, toallas</li>
                        <li>Camitas o colchonetas, alfombras de goma o tapetes lavables</li>
                        <li>Cepillos, peines y cortaúñas</li>
                        <li>Paños descartables o trapos de piso</li>
                        <li>Guantes de limpieza</li>
                        <li>Escobas, palas y bolsas de consorcio</li>
                        <li>Lavandina, detergente y desinfectantes no tóxicos</li>
                        <li>Alcohol, gasas, vendas y guantes descartables</li>
                        <li>Pelotas, sogas y juguetes resistentes</li>
                        <li>Platos de acero o plástico duro</li>
                        <li>Materiales de construcción</li>
                        <li>Electrodomésticos</li>
                    </ul>

                </div>


            </div>
        
        </div>

        
    )
}